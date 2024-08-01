package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func DatabaseConnection() *sql.DB {

	connStr := "user=postgres password=root dbname=godb sslmode=disable host=postgres"
	DB, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	_, err = DB.Exec(`CREATE TABLE IF NOT EXISTS enumValue  (
    	id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    	value  varchar(30) NOT NULL,
		fieldId integer NOT NULL,
		taskId integer NOT NULL
	)`)
	if err != nil {
		panic(err)
	}
	_, err = DB.Exec(`CREATE TABLE IF NOT EXISTS numberValue  (
    	id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    	value  integer NOT NULL,
		fieldId integer NOT NULL,
		taskId integer NOT NULL
	)`)
	if err != nil {
		panic(err)
	}
	_, err = DB.Exec(`CREATE TABLE IF NOT EXISTS stringValue  (
    	id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    	value  varchar(30) NOT NULL,
		fieldId integer NOT NULL,
		taskId integer NOT NULL
	)`)
	if err != nil {
		panic(err)
	}

	fmt.Println("Database connection successful...")
	return DB
}
