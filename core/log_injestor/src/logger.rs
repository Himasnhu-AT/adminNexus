use crate::config::CliConfig;
use chrono::DateTime;

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

    pub fn log_info(&self, timestamp: DateTime<chrono::Utc>, message: &str) {
        if self.should_store_in_db(LogLevel::Info) {
            // store in db
        }
        println!("[{} INFO] {}", timestamp, message);
    }

    pub fn log_error(&self, timestamp: DateTime<chrono::Utc>, message: &str) {
        if self.should_store_in_db(LogLevel::Error) {
            // store in db
        }
        println!("[{} ERROR] {}", timestamp, message);
    }

    pub fn log_debug(&self, timestamp: DateTime<chrono::Utc>, message: &str) {
        if self.should_store_in_db(LogLevel::Debug) {
            // store in db
        }
        println!("[{} DEBUG] {}", timestamp, message);
    }

    pub fn log_warn(&self, timestamp: DateTime<chrono::Utc>, message: &str) {
        if self.should_store_in_db(LogLevel::Warn) {
            // store in db
        }
        println!("[{} WARN] {}", timestamp, message);
    }

    pub fn log_trace(&self, timestamp: DateTime<chrono::Utc>, message: &str) {
        if self.should_store_in_db(LogLevel::Trace) {
            // store in db
        }
        println!("[{} TRACE] {}", timestamp, message);
    }

    pub fn log_fatal(&self, timestamp: DateTime<chrono::Utc>, message: &str) {
        if self.should_store_in_db(LogLevel::Fatal) {
            // store in db
        }
        println!("[{} FATAL] {}", timestamp, message);
    }

    pub fn log_log(&self, timestamp: DateTime<chrono::Utc>, message: &str) {
        if self.should_store_in_db(LogLevel::Log) {
            // store in db
        }
        println!("[{} LOG] {}", timestamp, message);
    }

    pub fn log(&self, level: LogLevel, timestamp: DateTime<chrono::Utc>, message: &str) {
        match level {
            LogLevel::Error => self.log_error(timestamp, message),
            LogLevel::Warn => self.log_warn(timestamp, message),
            LogLevel::Info => self.log_info(timestamp, message),
            LogLevel::Log => self.log_log(timestamp, message),
            LogLevel::Debug => self.log_debug(timestamp, message),
            LogLevel::Trace => self.log_trace(timestamp, message),
            LogLevel::Fatal => self.log_fatal(timestamp, message),
        }
    }
}
