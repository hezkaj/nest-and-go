package services

import (
	"database/sql"
	"fmt"

	"example.com/value-service/models"
)

// create by models..Value, return nil
func CreateStringValue(value string, fieldId int, taskId int, db *sql.DB) (*models.StringValue, error) {
	db.Begin()
	fmt.Println("in service: ", value, fieldId, taskId)
	_, err := db.Exec(`INSERT INTO stringValue(value,fieldId,taskId)VALUES ($1,$2,$3)`,
		value, fieldId, taskId)
	if err != nil {
		return nil, err
	}
	return FindOneStringValue(db, &taskId, &fieldId)
}
func CreateEnumValue(value string, fieldId int, taskId int, db *sql.DB) (*models.StringValue, error) {
	db.Begin()
	_, err := db.Exec(`INSERT INTO enumValue(value,fieldId,taskId)VALUES ($1,$2,$3)`,
		value, fieldId, taskId)
	if err != nil {
		return nil, err
	}
	return FindOneEnumValue(db, &taskId, &fieldId)
}
func CreateNumberValue(value int, fieldId int, taskId int, db *sql.DB) (*models.IntValue, error) {
	db.Begin()
	_, err := db.Exec(`INSERT INTO numberValue(value,fieldId,taskId)VALUES ($1,$2,$3)`,
		value, fieldId, taskId)
	if err != nil {
		return nil, err
	}
	return FindOneNumberValue(db, &taskId, &fieldId)
}

// find one value, return models..Value
func FindOneEnumValue(db *sql.DB, taskId *int, fieldId *int) (*models.StringValue, error) {
	db.Begin()
	rows, err := db.Query(`SELECT * FROM enumValue 
	where taskId = $1 AND fieldId=$2`,
		taskId, fieldId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	p := models.StringValue{}
	for rows.Next() {
		err := rows.Scan(&p.Id, &p.Value, &p.FieldId, &p.TaskId)
		if err != nil {
			fmt.Println(err)
			continue
		}
	}
	if p.Id == 0 {
		return nil, nil
	}
	return &p, nil
}
func FindOneStringValue(db *sql.DB, taskId *int, fieldId *int) (*models.StringValue, error) {
	db.Begin()
	rows, err := db.Query(`SELECT * FROM stringValue 
		where taskId = $1 AND fieldId=$2`,
		taskId, fieldId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	p := models.StringValue{}
	for rows.Next() {
		err := rows.Scan(&p.Id, &p.Value, &p.FieldId, &p.TaskId)
		if err != nil {
			fmt.Println(err)
			continue
		}
	}
	if p.Id == 0 {
		return nil, nil
	}
	return &p, nil
}
func FindOneNumberValue(db *sql.DB, taskId *int, fieldId *int) (*models.IntValue, error) {
	db.Begin()
	rows, err := db.Query(`SELECT * FROM numberValue 
		where taskId = $1 AND fieldId=$2`,
		taskId, fieldId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	p := models.IntValue{}
	for rows.Next() {
		err := rows.Scan(&p.Id, &p.Value, &p.FieldId, &p.TaskId)
		if err != nil {
			fmt.Println(err)
			continue
		}
	}
	if p.Id == 0 {
		return nil, nil
	}
	return &p, nil
}

// update by id & models..Value, return nil
func UpdateEnumValue(value string, fieldId int, taskId int, db *sql.DB) (*models.StringValue, error) {
	db.Begin()
	_, err := db.Exec(`update enumValue set value = $1 
		where taskId = $2 AND fieldId=$3`, value, taskId, fieldId)
	if err != nil {
		return nil, err
	}
	return FindOneEnumValue(db, &taskId, &fieldId)
}
func UpdateStringValue(value string, fieldId int, taskId int, db *sql.DB) (*models.StringValue, error) {
	db.Begin()
	_, err := db.Exec(`update stringValue set value = $1 
		where taskId = $2 AND fieldId=$3`, value, taskId, fieldId)
	if err != nil {
		return nil, err
	}
	return FindOneStringValue(db, &taskId, &fieldId)
}
func UpdateNumberValue(value int, fieldId int, taskId int, db *sql.DB) (*models.IntValue, error) {
	db.Begin()
	_, err := db.Exec(`update enumValue set value = $1 
		where taskId = $2 AND fieldId=$3`, value, taskId, fieldId)
	if err != nil {
		return nil, err
	}
	return FindOneNumberValue(db, &taskId, &fieldId)
}

// delete by id, return nil
func DeleteEnumValue(db *sql.DB, taskId int, fieldId int) *error {
	db.Begin()
	_, err := db.Exec(`delete from enumValue where taskId = $1 AND fieldId=$2`, taskId, fieldId)
	if err != nil {
		return &err
	}
	return nil
}
func DeleteStringValue(db *sql.DB, taskId int, fieldId int) *error {
	db.Begin()
	_, err := db.Exec(`delete from stringValue where taskId = $1 AND fieldId=$2`, taskId, fieldId)
	if err != nil {
		return &err
	}
	return nil
}
func DeleteNumberValue(db *sql.DB, taskId int, fieldId int) *error {
	db.Begin()
	_, err := db.Exec(`delete from numberValue where taskId = $1 AND fieldId=$2`, taskId, fieldId)
	if err != nil {
		return &err
	}
	return nil
}
