import { Kafka, Consumer as KafkaConsumber, Partitioners } from "kafkajs";

export class Consumer {
  private _kafka: Kafka
  private _consumer: KafkaConsumber

  async init() {
    this._kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:19092', 'localhost:29092', 'localhost:39092'],
      ssl: false
    })

    this.consumer = this._kafka.consumer({ groupId: 'unit.data.raw' })
    await this.consumer.connect()
    await this.consumer.subscribe({ topic: 'unit.data.raw', fromBeginning: true })

    await this.consumer.run({
      eachMessage: this.handler
      // eachMessage: async ({ topic, partition, message }) => {
      //   console.log({
      //     partition,
      //     offset: message.offset,
      //     value: message.value.toString(),
      //   })
      // },
    })
  }

  private async handler({ topic, partition, message }) {  
    console.log({
      partition,
      offset: message.offset,
      value: message.value.toString(),
    })
   }
  
  set consumer(_consumber: KafkaConsumber) {
    this._consumer = _consumber
  }

  get consumer() {
    return this._consumer
  }
}