mod log_injestor;

use log_injestor::log_handler::logger_service;
use log_injestor::types::LogMessage;

fn main() {
    let log_message = LogMessage {
        log_level: String::from("info"),
        message: String::from("Test message"),
    };

    logger_service(log_message);
}
