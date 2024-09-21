// TODO: Improve proper sanitization of error messages

mod log_injestor;

use clap::{App, Arg};
use log_injestor::log_handler::logger_service;
use log_injestor::types::LogMessage;
use serde_json::from_str;
use std::fmt;
use tiny_http::{Method, Response, Server, StatusCode};

use db_handler;
// use prisma;

#[derive(Debug)]
pub enum LogError {
    MissingField(String),
    ParseError(serde_json::Error),
}

impl fmt::Display for LogError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            LogError::MissingField(field) => write!(f, "missing field `{}`", field),
            LogError::ParseError(e) => write!(f, "parse error: {}", e),
        }
    }
}

impl std::error::Error for LogError {}

impl From<serde_json::Error> for LogError {
    fn from(e: serde_json::Error) -> Self {
        LogError::ParseError(e)
    }
}

#[derive(serde::Deserialize)]
struct LogRequest {
    level: String,
    message: String,
    timestamp: String,
}

impl LogRequest {
    fn validate(&self) -> Result<(), LogError> {
        if self.level.is_empty() {
            Err(LogError::MissingField("level".to_string()))
        } else if self.message.is_empty() {
            Err(LogError::MissingField("message".to_string()))
        } else if self.timestamp.is_empty() {
            Err(LogError::MissingField("timestamp".to_string()))
        } else {
            Ok(())
        }
    }
}

#[derive(serde::Deserialize)]
struct LogsRequest {
    logs: Vec<LogRequest>,
}

impl LogsRequest {
    fn validate(&self) -> Result<(), LogError> {
        for log in &self.logs {
            log.validate()?;
        }
        Ok(())
    }
}

#[derive(serde::Serialize)]
struct ErrorResponse {
    error: String,
}

fn start_server() {
    let matches = App::new("Admin Nexus Server")
        .arg(
            Arg::with_name("port")
                .short("p")
                .long("port")
                .value_name("PORT")
                .help("Sets the port to run the server on")
                .takes_value(true)
                .default_value("8080"),
        )
        .arg(
            Arg::with_name("logs_level")
                .short("l")
                .long("logs_level")
                .value_name("LOGS_LEVEL")
                .help("Sets the level of logs to display")
                .takes_value(true)
                .default_value("info"),
        )
        .get_matches();

    let port = matches.value_of("port").unwrap();

    let server = Server::http(format!("0.0.0.0:{}", port)).unwrap();

    println!("Server started on port {}", port);
    for mut request in server.incoming_requests() {
        match (request.method(), request.url()) {
            (&Method::Post, "/add/log") => {
                let mut content = String::new();
                match request.as_reader().read_to_string(&mut content) {
                    Ok(_) => {
                        let log: Result<LogRequest, LogError> =
                            from_str(&content).map_err(LogError::from);
                        match log {
                            Ok(log) => {
                                if let Err(e) = log.validate() {
                                    eprintln!("Validation error: {}", e);
                                    let error_response = ErrorResponse {
                                        error: format!("Validation error: {}", e),
                                    };
                                    let response = Response::from_string(
                                        serde_json::to_string(&error_response).unwrap(),
                                    )
                                    .with_status_code(StatusCode(400));
                                    if let Err(e) = request.respond(response) {
                                        eprintln!("Failed to send response: {}", e);
                                    }
                                    continue;
                                }
                                let log_message = LogMessage {
                                    log_level: log.level,
                                    message: log.message,
                                    timestamp: log.timestamp,
                                };
                                logger_service(log_message);
                                let response = Response::from_string("Log received")
                                    .with_status_code(StatusCode(200));
                                if let Err(e) = request.respond(response) {
                                    eprintln!("Failed to send response: {}", e);
                                }
                            }
                            Err(e) => {
                                // Improve proper sanitization of error messages
                                eprintln!("Failed to parse log request: {}", e);
                                let error_message = match &e {
                                    LogError::ParseError(e) => {
                                        let error_string = e.to_string();
                                        if e.is_eof() {
                                            let missing_field = error_string
                                                .split_at(error_string.find("`").unwrap())
                                                .1;
                                            format!(
                                                "Failed to parse log request: missing field {}",
                                                missing_field
                                            )
                                        } else {
                                            format!("Failed to parse log request: {}", error_string)
                                        }
                                    }
                                    _ => format!("Failed to parse log request: {}", e),
                                };
                                let error_response = ErrorResponse {
                                    error: error_message,
                                };
                                let response = Response::from_string(
                                    serde_json::to_string(&error_response).unwrap(),
                                )
                                .with_status_code(StatusCode(400));
                                if let Err(e) = request.respond(response) {
                                    eprintln!("Failed to send response: {}", e);
                                }
                            }
                        }
                    }
                    Err(e) => {
                        eprintln!("Failed to parse log request: {}", e);
                        let error_response = ErrorResponse {
                            error: e.to_string(),
                        };
                        let response =
                            Response::from_string(serde_json::to_string(&error_response).unwrap())
                                .with_status_code(StatusCode(400));
                        if let Err(e) = request.respond(response) {
                            eprintln!("Failed to send response: {}", e);
                        }
                    }
                }
            }
            (&Method::Post, "/add/logs") => {
                let mut content = String::new();
                match request.as_reader().read_to_string(&mut content) {
                    Ok(_) => {
                        let logs: Result<LogsRequest, LogError> =
                            from_str(&content).map_err(LogError::from);
                        match logs {
                            Ok(logs) => {
                                if let Err(e) = logs.validate() {
                                    eprintln!("Validation error: {}", e);
                                    let error_response = ErrorResponse {
                                        error: format!("Validation error: {}", e),
                                    };
                                    let response = Response::from_string(
                                        serde_json::to_string(&error_response).unwrap(),
                                    )
                                    .with_status_code(StatusCode(400));
                                    if let Err(e) = request.respond(response) {
                                        eprintln!("Failed to send response: {}", e);
                                    }
                                    continue;
                                }
                                for log in logs.logs {
                                    let log_message = LogMessage {
                                        log_level: log.level,
                                        message: log.message,
                                        timestamp: log.timestamp,
                                    };
                                    logger_service(log_message);
                                }
                                let response = Response::from_string("Logs received")
                                    .with_status_code(StatusCode(200));
                                if let Err(e) = request.respond(response) {
                                    eprintln!("Failed to send response: {}", e);
                                }
                            }
                            Err(e) => {
                                eprintln!("Failed to parse logs request: {}", e);
                                let error_response = ErrorResponse {
                                    error: format!("Failed to parse logs request: {}", e),
                                };
                                let response = Response::from_string(
                                    serde_json::to_string(&error_response).unwrap(),
                                )
                                .with_status_code(StatusCode(400));
                                if let Err(e) = request.respond(response) {
                                    eprintln!("Failed to send response: {}", e);
                                }
                            }
                        }
                    }
                    Err(e) => {
                        eprintln!("Failed to parse logs request: {}", e);
                        let error_response = ErrorResponse {
                            error: e.to_string(),
                        };
                        let response =
                            Response::from_string(serde_json::to_string(&error_response).unwrap())
                                .with_status_code(StatusCode(400));
                        if let Err(e) = request.respond(response) {
                            eprintln!("Failed to send response: {}", e);
                        }
                    }
                }
            }
            _ => {
                let error_response = ErrorResponse {
                    error: String::from("API endpoint not defined."),
                };
                let response =
                    Response::from_string(serde_json::to_string(&error_response).unwrap())
                        .with_status_code(StatusCode(404));
                if let Err(e) = request.respond(response) {
                    eprintln!("Failed to send response: {}", e);
                }
            }
        }
    }
}

#[tokio::main]
async fn main() {
    let pg_url = "postgresql://postgres:rootpassword@localhost:5432";
    let mysql_url = "mysql://root:rootpassword@localhost:3306";
    let mongodb_url = "mongodb://localhost:27017";

    db_handler::connect_db("pg", pg_url).await;
    db_handler::connect_db("mysql", mysql_url).await;
    db_handler::connect_db("mg", mongodb_url).await;
    db_handler::connect_db("error", pg_url).await;

    start_server();
}
