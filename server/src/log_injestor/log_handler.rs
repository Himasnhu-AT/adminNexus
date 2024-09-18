use crate::log_injestor::types::LogMessage;
use log_injestor::config::CliConfig;
use log_injestor::logger::{LogLevel, Logger};

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
