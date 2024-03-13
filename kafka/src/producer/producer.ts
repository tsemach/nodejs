import { Kafka, Producer as KafkaProducer, Partitioners } from "kafkajs";

export class Producer {
  private _kafka: Kafka
  private _producer: KafkaProducer

  async init() {    

    this._kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:19092', 'localhost:29092', 'localhost:39092'],
      // brokers: [
      //   'fms-test-fms-local-kafka1.sddc.mobileye.com:19092', 
      //   'fms-test-fms-local-kafka2.sddc.mobileye.com:29092', 
      //   'fms-test-fms-local-kafka3.sddc.mobileye.com:39092'
      // ],      
      ssl: false,      
    })

    this.producer = this._kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
    await this.producer.connect()   

    return this
  }

  async send() {
    console.log('going to send to unit.data.raw')
    await this.producer.send({
      topic: 'unit.data.raw',
      messages: [
        { value: 'unit.data.raw: Hello KafkaJS user!' },
      ],
    })

    console.log('going to send to fms.deleter.jobs-topic')
    await this.producer.send({
      topic: 'fms.deleter.jobs-topic',
      messages: [
        { value: 'fms.deleter.jobs-topic: Hello KafkaJS user!' },
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