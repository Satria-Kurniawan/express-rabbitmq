const express = require("express")
const amqplib = require("amqplib")

const app = express()

let ch

const connect = async () => {
  const conn = await amqplib.connect("amqp://rabbitmq:5672")

  ch = await conn.createChannel()

  const queue = "cobacoba"

  await ch.assertQueue(queue)

  await ch.consume(
    queue,
    (msg) => {
      if (msg !== null) {
        let pesan = JSON.parse(msg.content)
        console.log(pesan)
        pesan = null
        console.log("pesan telah dihapus" + pesan)
        //   ch.ack(msg)
      } else {
        console.log("Consumer cancelled by server")
      }
    },
    { noAck: true }
  )
}

connect()

app.listen(7002, () => console.log("Server running on port 7002"))
