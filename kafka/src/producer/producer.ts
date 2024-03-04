import { Kafka, Producer as KafkaProducer } from "kafkajs";

export class Producer {
  private _kafka: Kafka
  private _producer: KafkaProducer

  async init() {
    this._kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:19092', 'localhost:29092', 'localhost:39092'],
      ssl: false
    })

    this.producer = this._kafka.producer()
    await this.producer.connect()   

    return this
  }

  async send() {
    await this.producer.send({
      topic: 'unit.data.raw',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
  }

  private async handler({ topic, partition, message }) {  
    console.log({
      partition,
      offset: message.offset,
      value: message.value.toString(),
    })
   }
  
  set producer(_producer: KafkaProducer) {
    this._producer = _producer
  }

  get producer() {
    return this._producer
  }
}