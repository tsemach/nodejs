import { MongoDbTestServer } from "./common/MongodbTestServer";
import { main } from "../src/main";

describe("main test", () => {
  const mongodb = new MongoDbTestServer();

  beforeAll( async () => {
    // await mongodb.start();
  });

  afterEach(async () => {
    // await mongodb.clear();
  })

  test("main return 1", async () => {
    await main();
  }) 
})