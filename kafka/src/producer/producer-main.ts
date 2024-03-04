import { Producer } from './producer'

async function main() {

  const producer = await new Producer().init()

  await producer.send()
}

main()