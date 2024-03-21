
import { run } from 'jest-cli';
// import jest from "jest";

async function main() {
  const config = {    
    roots: ['./dist/tests'],
    testRegex: '\\.spec\\.js$'    
  }

  try {    
    await run(config as any, process.cwd())
    console.log('main: running jest is ok')
  }
  catch (e) {
    console.log("main: failed running jest, e:", e)
  }
}

main()