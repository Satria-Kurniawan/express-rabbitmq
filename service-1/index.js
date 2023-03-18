const express = require("express")
const amqplib = require("amqplib")

const app = express()

let ch
const connect = async () => {
  const conn = await amqplib.connect("amqp://rabbitmq:5672")

  ch = await conn.createChannel()
}

connect()

app.get("/send", async (req, res) => {
  const queue = "cobacoba"

  const data = {
    id: 1,
    name: "Satria",
  }

  await ch.assertQueue(queue)
  await ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)))

  res.send("Pesan terkirim!")
})

app.listen(7001, () => console.log("Server running on port 7001"))
