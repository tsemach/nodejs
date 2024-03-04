import { Consumer } from './consumer'

async function main() {

  const producer = await new Consumer().init()
} 

main()