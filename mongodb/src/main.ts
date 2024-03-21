import { Mongodb } from "./mongodb/Mongodb";
import mongoose from "mongoose";

export async function main() {
  // console.log("main called!");

  // const mongodb = new Mongodb();
  // await mongodb.connect();
  
  await mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/elementor');
  
  const Cat = mongoose.model('Cat', { name: String } as any);
  
  const kitty = new Cat({ name: 'Zildjian' });
  kitty.save().then(() => console.log('meow'));
  console.log("database connected");

  return 1;
}

main();