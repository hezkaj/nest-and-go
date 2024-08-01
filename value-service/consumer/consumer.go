package consumer

import (
	"database/sql"
	"encoding/json"
	"strconv"
	"strings"

	"fmt"

	"example.com/value-service/services"
	"github.com/streadway/amqp"
)

func ConsumerRouter(db *sql.DB, ch *amqp.Channel) {
	err := ch.ExchangeDeclare("exchange1", "topic", true, false, false, false, nil)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("exchange is ok")
	q, err := ch.QueueDeclare("", true, false, false, false, nil) //dur
	if err != nil {
		fmt.Println(err)
	}
	err = ch.QueueBind(
		q.Name,      // queue name
		"test",      // routing key
		"exchange1", // exchange
		false,
		nil,
	)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("qeue is ok")

	msgs, err := ch.Consume(q.Name, "", false, false, false, false, nil)
	if err != nil {
		fmt.Println(err)
	}
	forever := make(chan bool)
	go func() {
		for d := range msgs {
			mybyte := d.Body
			fmt.Println("I GOT MESSAGEE")
			strbyte := string(mybyte[:]) //
			fmt.Println(strbyte)
			str_list := strings.Split(strbyte, `"`)
			fmt.Println(str_list)
			pattern := strings.Fields(str_list[3])[0]
			switch pattern {
			case "createStringValue":
				value := strings.Fields(str_list[5])[0]
				taskId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[9])[0])
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(value, fieldId, taskId)
				model, err := services.CreateStringValue(value, fieldId, taskId, db)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("model:", model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true) //
			case "createEnumValue":
				value := strings.Fields(str_list[5])[0]
				taskId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[9])[0])
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(value, fieldId, taskId)
				model, err := services.CreateEnumValue(value, fieldId, taskId, db)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("model:", model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true) //
			case "createNumberValue":
				value, err := strconv.Atoi(strings.Fields(str_list[5])[0])
				if err != nil {
					fmt.Println(err)
				}
				taskId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[9])[0])
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(value, fieldId, taskId)
				model, err := services.CreateNumberValue(value, fieldId, taskId, db)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("model:", model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true) //
			case "updateStringValue":
				value := strings.Fields(str_list[5])[0]
				taskId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[9])[0])
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(value, fieldId, taskId)
				model, err := services.UpdateStringValue(value, fieldId, taskId, db)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("model:", model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			case "updateEnumValue":
				value := strings.Fields(str_list[5])[0]
				taskId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[9])[0])
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(value, fieldId, taskId)
				model, err := services.UpdateEnumValue(value, fieldId, taskId, db)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("model:", model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			case "updateNumberValue":
				value, err := strconv.Atoi(strings.Fields(str_list[5])[0])
				if err != nil {
					fmt.Println(err)
				}
				taskId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[9])[0])
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(value, fieldId, taskId)
				model, err := services.UpdateNumberValue(value, fieldId, taskId, db)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("model:", model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			case "deleteStringValue":
				taskId, err := strconv.Atoi(strings.Fields(str_list[5])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				deletErr := services.DeleteStringValue(db, taskId, fieldId)
				if deletErr != nil {
					fmt.Println(deletErr)
				}
				bytes, err := json.Marshal("ok")
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			case "deleteNumberValue":
				taskId, err := strconv.Atoi(strings.Fields(str_list[5])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				deletErr := services.DeleteNumberValue(db, taskId, fieldId)
				if deletErr != nil {
					fmt.Println(deletErr)
				}
				bytes, err := json.Marshal("ok")
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			case "deleteEnumValue":
				taskId, err := strconv.Atoi(strings.Fields(str_list[5])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				deletErr := services.DeleteEnumValue(db, taskId, fieldId)
				if deletErr != nil {
					fmt.Println(deletErr)
				}
				bytes, err := json.Marshal("ok")
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			case "findOneStringValue":
				taskId, err := strconv.Atoi(strings.Fields(str_list[5])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				model, err := services.FindOneStringValue(db, &taskId, &fieldId)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			case "findOneEnumValue":
				taskId, err := strconv.Atoi(strings.Fields(str_list[5])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				model, err := services.FindOneEnumValue(db, &taskId, &fieldId)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			case "findOneNumberValue":
				taskId, err := strconv.Atoi(strings.Fields(str_list[5])[0])
				if err != nil {
					fmt.Println(err)
				}
				fieldId, err := strconv.Atoi(strings.Fields(str_list[7])[0])
				if err != nil {
					fmt.Println(err)
				}
				model, err := services.FindOneNumberValue(db, &taskId, &fieldId)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println(model)
				bytes, err := json.Marshal(model.Value)
				if err != nil {
					fmt.Println(err)
				}
				err = ch.Publish("", d.ReplyTo, false, false, amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          bytes,
				})
				if err != nil {
					fmt.Println("PUBLISH ERR: ", err)
				}
				d.Ack(true)
			}
		}
	}()
	<-forever
}
