use log_injestor::config::CliConfig;
use log_injestor::logger::{LogLevel, Logger};

pub struct LogMessage {
    pub log_level: String,
    pub message: String,
}

pub fn logger_service(log_message: LogMessage) {
    let config = CliConfig::default();
    let logger = Logger::new(config);

    let log_level = match log_message.log_level.to_lowercase().as_str() {
        "fatal" => LogLevel::Fatal,
        "trace" => LogLevel::Trace,
        "debug" => LogLevel::Debug,
        "log" => LogLevel::Log,
        "info" => LogLevel::Info,
        "warn" => LogLevel::Warn,
        "error" => LogLevel::Error,
        _ => LogLevel::Log, // Default log level
    };

    logger.log(log_level, &log_message.message);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_logger_service() {
        let log_message = LogMessage {
            log_level: String::from("info"),
            message: String::from("Test message"),
        };

        logger_service(log_message);
    }

    #[test]
    fn test_logger_service_with_invalid_log_level() {
        let log_message = LogMessage {
            log_level: String::from("invalid"),
            message: String::from("Test message"),
        };

        logger_service(log_message);
    }
}
