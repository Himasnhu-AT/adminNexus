use mongodb::{options::ClientOptions, Client};
use sqlx::{MySqlPool, PgPool};
use std::error::Error;

pub async fn connect_to_pg(url: &str) -> Result<PgPool, Box<dyn Error>> {
    let pool = PgPool::connect(url).await?;
    Ok(pool)
}

pub async fn connect_to_mysql(url: &str) -> Result<MySqlPool, Box<dyn Error>> {
    let pool = MySqlPool::connect(url).await?;
    Ok(pool)
}

pub async fn connect_to_mongodb(url: &str) -> Result<Client, Box<dyn Error>> {
    let mut client_options = ClientOptions::parse(url).await?;
    client_options.app_name = Some("My App".to_string());
    let client = Client::with_options(client_options)?;
    Ok(client)
}
