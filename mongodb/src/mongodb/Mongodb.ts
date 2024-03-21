// import mongoose from "mongoose";

// export class Mongodb {

//   async connect() {    
//     const { USERNAME, PASSWORD } = process.env
//     await mongoose.connect(`mongodb://admin:admin@127.0.0.1:27017/elementor`);        
//   }
// }

import mongoose from "mongoose";

export class Mongodb {
  async connect() {
    const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env; 
    await mongoose.connect(`mongodb://127.0.0.1:27017/elementor`, {
      auth: { username: MONGODB_USERNAME, password: MONGODB_PASSWORD },
      // authSource: "admin", // Authenticate against the `admin` database
    });
    console.log("Connected to MongoDB");
  }
}
