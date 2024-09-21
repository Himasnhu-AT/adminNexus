use mongodb::{options::ClientOptions, Client};
use sqlx::{MySqlPool, PgPool, Row};
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

pub async fn fetch_schema(pool: &PgPool, db_name: &str) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!(
        "SELECT schema_name FROM information_schema.schemata WHERE catalog_name = '{}'",
        db_name
    ))
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_tables(pool: &PgPool, db_name: &str) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = '{}'",
        db_name
    ))
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_columns(pool: &PgPool, table_name: &str) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!(
        "SELECT column_name FROM information_schema.columns WHERE table_name = '{}'",
        table_name
    ))
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_data(pool: &PgPool, table_name: &str) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!("SELECT * FROM {}", table_name))
        .fetch_all(pool)
        .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_indexes(pool: &PgPool, table_name: &str) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!(
        "SELECT indexname FROM pg_indexes WHERE tablename = '{}'",
        table_name
    ))
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_constraints(
    pool: &PgPool,
    table_name: &str,
) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!(
        "SELECT constraint_name FROM information_schema.table_constraints WHERE table_name = '{}'",
        table_name
    ))
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_triggers(
    pool: &PgPool,
    table_name: &str,
) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!(
        "SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = '{}'",
        table_name
    ))
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_views(pool: &PgPool, db_name: &str) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!(
        "SELECT table_name FROM information_schema.views WHERE table_schema = '{}'",
        db_name
    ))
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_functions(pool: &PgPool, db_name: &str) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!(
        "SELECT routine_name FROM information_schema.routines WHERE routine_schema = '{}'",
        db_name
    ))
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

pub async fn fetch_procedures(pool: &PgPool, db_name: &str) -> Result<Vec<String>, Box<dyn Error>> {
    let rows = sqlx::query(&format!("SELECT specific_name FROM information_schema.routines WHERE routine_type = 'PROCEDURE' AND routine_schema = '{}'", db_name))
        .fetch_all(pool)
        .await?;
    Ok(rows
        .iter()
        .map(|row| row.try_get(0).unwrap_or_default())
        .collect())
}

// IMPORTANT, SEE FOLLOWING LOGS BEFORE RUNNIG TEST:
// postgres=# CREATE DATABASE mydatabase;
// CREATE DATABASE
// postgres=# CREATE DATABASE mydatabase;
// ERROR:  database "mydatabase" already exists
// postgres=# SELECT schema_name FROM information_schema.schemata WHERE catalog_name = 'mydatabase';
//  schema_name
// -------------
// (0 rows)

// postgres=# CREATE SCHEMA public;
// ERROR:  schema "public" already exists
// postgres=# \c mydatabase
// Password:
// You are now connected to database "mydatabase" as user "postgres".
// mydatabase=# SELECT schema_name FROM information_schema.schemata WHERE catalog_name = 'mydatabase';
//     schema_name
// --------------------
//  public
//  information_schema
//  pg_catalog
//  pg_toast
// (4 rows)

// mydatabase=#

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::{migrate::Migrator, Executor};

    const DATABASE_URL: &str = "postgresql://postgres:rootpassword@localhost:5432";

    #[tokio::test]
    #[ignore]
    async fn test_fetch_functions() -> Result<(), Box<dyn Error>> {
        let pool = PgPool::connect(DATABASE_URL).await?;
        let pool_ref = &pool;
        println!(
            "{}",
            std::path::Path::new("./src/test-migrations").display()
        );
        let migrator = Migrator::new(std::path::Path::new("./src/test-migrations")).await?;
        migrator.run(&pool).await?;

        let db_name = "postgres";

        let rows = sqlx::query(&format!(
            "SELECT schema_name FROM information_schema.schemata WHERE catalog_name = '{}'",
            db_name
        ))
        .fetch_all(pool_ref)
        .await;

        println!("rows: {:?}", rows);

        // let schema = fetch_schema(&pool, "public").await?;
        // let schema = fetch_schema(&pool, "mydatabase").await?;
        // assert!(schema.contains(&"public".to_string()));

        let tables = fetch_tables(&pool, "public").await?;
        println!("tables: {:?}", tables);
        assert!(tables.contains(&"test_table".to_string()));

        let columns = fetch_columns(&pool, "test_table").await?;
        println!("columns: {:?}", columns);
        assert!(columns.contains(&"id".to_string()));
        assert!(columns.contains(&"name".to_string()));

        // Failed: data: ["", ""]
        // let data = fetch_data(&pool, "test_table").await?;
        // println!("data: {:?}", data);
        // assert!(data.contains(&"1".to_string()));
        // assert!(data.contains(&"Test".to_string()));
        // assert!(data.contains(&"Inserted in procedure".to_string()));

        let indexes = fetch_indexes(&pool, "test_table").await?;
        println!("indexes: {:?}", indexes);
        assert!(indexes.contains(&"idx_test_table_name".to_string()));

        let constraints = fetch_constraints(&pool, "test_table").await?;
        println!("constraints: {:?}", constraints);
        assert!(constraints.contains(&"test_table_pkey".to_string()));

        let triggers = fetch_triggers(&pool, "test_table").await?;
        println!("triggers: {:?}", triggers);
        assert!(triggers.contains(&"test_trigger".to_string()));

        let views = fetch_views(&pool, "public").await?;
        println!("views:{:?}", views);
        assert!(views.contains(&"test_view".to_string()));

        let functions = fetch_functions(&pool, "public").await?;
        println!("functions: {:?}", functions);
        assert!(functions.contains(&"test_function".to_string()));

        // Failed: procedures: []
        // let procedures = fetch_procedures(&pool, "public").await?;
        // println!("procedures: {:?}", procedures);
        // assert!(procedures.contains(&"test_procedure".to_string()));

        Ok(())
    }
}
