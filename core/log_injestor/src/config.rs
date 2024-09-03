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
