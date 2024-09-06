use crate::config::CliConfig;
use chrono::Local;

#[derive(PartialEq, Eq, Debug)]
pub enum LogLevel {
    Error,
    Warn,
    Info,
    Log,
    Debug,
    Trace,
    Fatal,
}

impl LogLevel {
    fn from_str(level: &str) -> Option<Self> {
        match level {
            "error" => Some(LogLevel::Error),
            "warn" => Some(LogLevel::Warn),
            "info" => Some(LogLevel::Info),
            "log" => Some(LogLevel::Log),
            "debug" => Some(LogLevel::Debug),
            "trace" => Some(LogLevel::Trace),
            "fatal" => Some(LogLevel::Fatal),
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

    fn should_store_in_db(&self, level: LogLevel) -> bool {
        let levels = [
            LogLevel::Fatal,
            LogLevel::Error,
            LogLevel::Trace,
            LogLevel::Warn,
            LogLevel::Info,
            LogLevel::Debug,
            LogLevel::Log,
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
        if self.should_store_in_db(LogLevel::Info) {
            // store in db
        }
        println!("[{} INFO] {}", Self::timestamp(), message);
    }

    pub fn log_error(&self, message: &str) {
        if self.should_store_in_db(LogLevel::Error) {
            // store in db
        }
        println!("[{} ERROR] {}", Self::timestamp(), message);
    }

    pub fn log_debug(&self, message: &str) {
        if self.should_store_in_db(LogLevel::Debug) {
            // store in db
        }
        println!("[{} DEBUG] {}", Self::timestamp(), message);
    }

    pub fn log_warn(&self, message: &str) {
        if self.should_store_in_db(LogLevel::Warn) {
            // store in db
        }
        println!("[{} WARN] {}", Self::timestamp(), message);
    }

    pub fn log_trace(&self, message: &str) {
        if self.should_store_in_db(LogLevel::Trace) {
            // store in db
        }
        println!("[{} TRACE] {}", Self::timestamp(), message);
    }

    pub fn log_fatal(&self, message: &str) {
        if self.should_store_in_db(LogLevel::Fatal) {
            // store in db
        }
        println!("[{} FATAL] {}", Self::timestamp(), message);
    }

    pub fn log_log(&self, message: &str) {
        if self.should_store_in_db(LogLevel::Log) {
            // store in db
        }
        println!("[{} LOG] {}", Self::timestamp(), message);
    }

    pub fn log(&self, level: LogLevel, message: &str) {
        match level {
            LogLevel::Error => self.log_error(message),
            LogLevel::Warn => self.log_warn(message),
            LogLevel::Info => self.log_info(message),
            LogLevel::Log => self.log_log(message),
            LogLevel::Debug => self.log_debug(message),
            LogLevel::Trace => self.log_trace(message),
            LogLevel::Fatal => self.log_fatal(message),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_log_level_from_str() {
        assert_eq!(LogLevel::from_str("error"), Some(LogLevel::Error));
        assert_eq!(LogLevel::from_str("warn"), Some(LogLevel::Warn));
        assert_eq!(LogLevel::from_str("info"), Some(LogLevel::Info));
        assert_eq!(LogLevel::from_str("log"), Some(LogLevel::Log));
        assert_eq!(LogLevel::from_str("debug"), Some(LogLevel::Debug));
        assert_eq!(LogLevel::from_str("trace"), Some(LogLevel::Trace));
        assert_eq!(LogLevel::from_str("fatal"), Some(LogLevel::Fatal));
        assert_eq!(LogLevel::from_str("unknown"), None);
    }

    #[test]
    fn test_should_store_in_db() {
        let config = CliConfig::default();
        let logger = Logger::new(config);

        assert_eq!(logger.should_store_in_db(LogLevel::Error), true);
        assert_eq!(logger.should_store_in_db(LogLevel::Warn), true);
        assert_eq!(logger.should_store_in_db(LogLevel::Info), true);
        assert_eq!(logger.should_store_in_db(LogLevel::Log), false);
        assert_eq!(logger.should_store_in_db(LogLevel::Debug), false);
        assert_eq!(logger.should_store_in_db(LogLevel::Trace), true);
        assert_eq!(logger.should_store_in_db(LogLevel::Fatal), true);
    }
}
