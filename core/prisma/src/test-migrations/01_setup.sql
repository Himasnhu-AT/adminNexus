CREATE TABLE test_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO test_table (name) VALUES ('Test');

CREATE INDEX idx_test_table_name ON test_table(name);

CREATE OR REPLACE FUNCTION test_function() RETURNS TRIGGER AS $$
BEGIN
   NEW.name := 'Changed in trigger';
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER test_trigger BEFORE INSERT ON test_table FOR EACH ROW EXECUTE PROCEDURE test_function();

CREATE OR REPLACE VIEW test_view AS SELECT name FROM test_table;

CREATE OR REPLACE FUNCTION test_procedure() RETURNS VOID AS $$
BEGIN
   INSERT INTO test_table (name) VALUES ('Inserted in procedure');
END;
$$ LANGUAGE plpgsql;

SELECT test_procedure();
