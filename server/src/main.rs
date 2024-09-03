use log_injestor::config::CliConfig;
use log_injestor::logger::{LogLevel, Logger};

fn main() {
    let config = CliConfig::default();
    let logger = Logger::new(config);

    logger.log_info("Hello, world!");
}
