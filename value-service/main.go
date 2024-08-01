package main

import (
	"fmt"

	"example.com/value-service/consumer"
	"example.com/value-service/database"
	"github.com/streadway/amqp"
)

func main() {
	fmt.Println("Starting application ...")
	db := database.DatabaseConnection()
	conn, err := amqp.Dial("amqp://myrabbit:5672/")
	if err != nil {
		fmt.Println("connection error: ", err)
		panic(err)
	}
	//defer conn.Close()
	channel := createChannel(conn)
	consumer.ConsumerRouter(db, channel)
	fmt.Println("RabbitMq connection successful...")
}

func createChannel(c *amqp.Connection) *amqp.Channel {
	fmt.Println("channel creating...")
	ch, err := c.Channel()
	if err != nil {
		fmt.Println("channel error: ", err)
		panic(err)
	}
	//defer ch.Close()
	return ch
}
