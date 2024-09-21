use prisma;
use tokio;

async fn connect_to_pg(url: &str) -> Result<(), Box<dyn std::error::Error>> {
    let _pg_pool = prisma::connect_to_pg(url).await?;
    Ok(())
}

async fn connect_to_mysql(url: &str) -> Result<(), Box<dyn std::error::Error>> {
    let _mysql_pool = prisma::connect_to_mysql(url).await?;
    Ok(())
}

async fn connect_to_mongodb(url: &str) -> Result<(), Box<dyn std::error::Error>> {
    let _mongodb_client = prisma::connect_to_mongodb(url).await?;
    Ok(())
}

pub async fn connect_db(db: &str, url: &str) {
    match db {
        "pg" => match connect_to_pg(url).await {
            Ok(_) => println!("Successfully connected to the PostgreSQL database."),
            Err(e) => println!("Failed to connect to the PostgreSQL database: {}", e),
        },
        "mysql" => match connect_to_mysql(url).await {
            Ok(_) => println!("Successfully connected to the MySQL database."),
            Err(e) => println!("Failed to connect to the MySQL database: {}", e),
        },
        "mg" => match connect_to_mongodb(url).await {
            Ok(_) => println!("Successfully connected to the MongoDB database."),
            Err(e) => println!("Failed to connect to the MongoDB database: {}", e),
        },
        _ => println!("Invalid database type."),
    }
}
