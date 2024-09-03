use crate::config::CliConfig;
use chrono::Local;

#[derive(PartialEq, Eq)]
pub enum LogLevel {
    Error,
    Warn,
    Info,
    Log,
    Debug,
}

impl LogLevel {
    fn from_str(level: &str) -> Option<Self> {
        match level {
            "error" => Some(LogLevel::Error),
            "warn" => Some(LogLevel::Warn),
            "info" => Some(LogLevel::Info),
            "log" => Some(LogLevel::Log),
            "debug" => Some(LogLevel::Debug),
            _ => None,
        }
    }
}

pub struct Logger {
    config: CliConfig,
}

impl Logger {
    pub fn new(config: CliConfig) -> Self {
        Self { config }
    }

    fn timestamp() -> String {
        let now = Local::now();
        now.format("%Y-%m-%d %H:%M:%S").to_string()
    }

    fn should_log(&self, level: LogLevel) -> bool {
        let levels = [
            LogLevel::Error,
            LogLevel::Warn,
            LogLevel::Info,
            LogLevel::Log,
            LogLevel::Debug,
        ];

        // Attempt to convert the log level from the config string to LogLevel
        if let Some(current_level) = LogLevel::from_str(&self.config.log_level) {
            let current_position = levels.iter().position(|l| *l == current_level);
            let message_position = levels.iter().position(|l| *l == level);

            match (current_position, message_position) {
                (Some(current), Some(message)) => message <= current,
                _ => false,
            }
        } else {
            false
        }
    }

    pub fn log_info(&self, message: &str) {
        if self.should_log(LogLevel::Info) {
            println!("[{} INFO] {}", Self::timestamp(), message);
        }
    }

    // Similar methods for log_warn, log_error, log_debug, log...
}
