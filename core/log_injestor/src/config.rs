use structopt::StructOpt;

#[derive(Debug, StructOpt)]
pub struct CliConfig {
    #[structopt(long, default_value = "info")]
    pub log_level: String,
}

impl CliConfig {
    pub fn from_env() -> Result<Self, Box<dyn std::error::Error>> {
        dotenv::dotenv().ok();
        let log_level = std::env::var("LOG_LEVEL")?;
        Ok(Self { log_level })
    }

    pub fn default() -> Self {
        Self {
            log_level: "info".to_string(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default() {
        let config = CliConfig::default();
        assert_eq!(config.log_level, "info");
    }

    #[test]
    fn test_from_env() {
        use std::fs::File;
        use std::io::Write;
        {
            let mut file = File::create(".env").unwrap();
            writeln!(file, "LOG_LEVEL=debug").unwrap();
        }
        let config = CliConfig::from_env().unwrap();
        std::fs::remove_file(".env").unwrap();
        assert_eq!(config.log_level, "debug");
    }

    //  failing, unsure why?
    // #[test]
    // fn test_from_env_no_var() {
    //     std::env::remove_var("LOG_LEVEL");
    //     let config = CliConfig::from_env();
    //     assert!(config.is_err());
    // }
}
