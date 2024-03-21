import { utils } from "./common"
import { duration } from './decorators/duration.decorator'
import { correlation } from './decorators/correlation.decorator'

class Stam {
  @duration('duration')
  async duratiionMain() {
    console.info("going to call to util.sleep")
    await utils.sleep(1000)
  }
}

async function duratiionMain()  {
  await new Stam().duratiionMain()
}

duratiionMain()
