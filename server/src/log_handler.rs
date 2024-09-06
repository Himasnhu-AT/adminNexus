use log_injestor::config::CliConfig;
use log_injestor::logger::{LogLevel, Logger};

pub struct LogMessage {
    pub log_level: LogLevel,
    pub message: String,
}

pub fn logger_service(log_message: LogMessage) {
    let config = CliConfig::default();
    let logger = Logger::new(config);

    logger.log(log_message.log_level, &log_message.message);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_logger_service() {
        let log_message = LogMessage {
            log_level: LogLevel::Info,
            message: String::from("Test message"),
        };

        logger_service(log_message);
    }

    #[test]
    fn test_logger_service_error() {
        let log_message = LogMessage {
            log_level: LogLevel::Error,
            message: String::from("Test message"),
        };

        logger_service(log_message);
    }

    #[test]
    fn test_logger_service_debug() {
        let log_message = LogMessage {
            log_level: LogLevel::Debug,
            message: String::from("Test message"),
        };

        logger_service(log_message);
    }

    #[test]
    fn test_logger_service_log() {
        let log_message = LogMessage {
            log_level: LogLevel::Log,
            message: String::from("Test message"),
        };

        logger_service(log_message);
    }

    #[test]
    fn test_logger_service_warn() {
        let log_message = LogMessage {
            log_level: LogLevel::Warn,
            message: String::from("Test message"),
        };

        logger_service(log_message);
    }
}
