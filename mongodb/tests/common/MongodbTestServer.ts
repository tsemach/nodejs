import * as os from "os";
import { MongoMemoryServer, MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";

export class MongoDbTestServer {
  private readonly mongod: Promise<MongoMemoryReplSet | MongoMemoryServer>;

  constructor(private isReplSet?: boolean) {
    if (this.isReplSet) {
      this.mongod = Promise.resolve(
        new MongoMemoryReplSet({
            replSet: {
              storageEngine: "wiredTiger",
            },
          }),
      );
    } else {
      this.mongod = MongoMemoryServer.create({
        instance: {
            storageEngine: "wiredTiger",
        },
      });
    }
  }

  async start(): Promise<void> {
    const mongod = await this.mongod;
    if (mongod instanceof MongoMemoryReplSet) {
      await mongod.start();
      await mongod.waitUntilRunning();
    }

    const uri = mongod.getUri();
    console.log("MongoDbTestServer: mongodb uri:", uri);
    // set MONGOCON so existing code will connect with same connection string
    if (os.type() !== "Windows_NT") {
      process.env.MONGOCON = uri;
    }
    await mongoose.connect(uri).catch(console.error);
  }

  async clear(): Promise<void> {
    await mongoose.connection.db?.dropDatabase();
  }

  async stop(): Promise<void> {
    await mongoose.disconnect();
    const mongod = await this.mongod;
    await mongod.stop();
  }
}

export default new MongoDbTestServer();