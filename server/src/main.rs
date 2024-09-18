mod log_injestor;

use clap::{App, Arg};
use log_injestor::log_handler::logger_service;
use log_injestor::types::LogMessage;
use serde_json::{from_slice, from_str};
use std::io::Read;
use tiny_http::{Method, Response, Server, StatusCode};

#[derive(serde::Deserialize)]
struct LogRequest {
    level: String,
    message: String,
}

#[derive(serde::Deserialize)]
struct LogsRequest {
    logs: Vec<LogRequest>,
}

#[derive(serde::Serialize)]
struct ErrorResponse {
    error: String,
}

fn main() {
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
    let logs_level = matches.value_of("logs_level").unwrap();

    let server = Server::http(format!("0.0.0.0:{}", port)).unwrap();

    println!("Server started on port {}", port);
    for mut request in server.incoming_requests() {
        match (request.method(), request.url()) {
            (&Method::Post, "/add/log") => {
                let mut content = String::new();
                match request.as_reader().read_to_string(&mut content) {
                    Ok(_) => {
                        let log: Result<LogRequest, _> = from_slice(content.as_bytes());
                        match log {
                            Ok(log) => {
                                let log_message = LogMessage {
                                    log_level: log.level,
                                    message: log.message,
                                };
                                logger_service(log_message);
                                let response = Response::from_string("Log received")
                                    .with_status_code(StatusCode(200));
                                if let Err(e) = request.respond(response) {
                                    eprintln!("Failed to send response: {}", e);
                                }
                            }
                            Err(e) => {
                                eprintln!("Failed to parse log request: {}", e);
                                let error_response = ErrorResponse {
                                    error: format!("Failed to parse log request: {}", e),
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
                        eprintln!("Failed to read request: {}", e);
                        let error_response = ErrorResponse {
                            error: format!("Failed to read request: {}", e),
                        };
                        let response =
                            Response::from_string(serde_json::to_string(&error_response).unwrap())
                                .with_status_code(StatusCode(500));
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
                        let logs: Result<LogsRequest, _> = from_str(&content);
                        match logs {
                            Ok(logs) => {
                                for log in logs.logs {
                                    let log_message = LogMessage {
                                        log_level: log.level,
                                        message: log.message,
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
                        eprintln!("Failed to read request: {}", e);
                        let error_response = ErrorResponse {
                            error: format!("Failed to read request: {}", e),
                        };
                        let response =
                            Response::from_string(serde_json::to_string(&error_response).unwrap())
                                .with_status_code(StatusCode(500));
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
