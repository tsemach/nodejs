import EventEmitter from 'node:events'

function waitForEvent<T>(emitter: EventEmitter, event: string): Promise<T> {
  return new Promise((resolve, reject) => { 
    const success = (val: T) => {
          emitter.off("error", fail);
          resolve(val);
      };
      const fail = (err: Error) => {
          emitter.off(event, success);
          reject(err);
      };
      emitter.once(event, success);
      emitter.once("error", fail);
  });
}

function run() {
  const emitter = new EventEmitter();

  setTimeout(() => {
      console.log("emitting error");
      emitter.emit("error", new Error("boom"));
  }, 500);

  setTimeout(() => {
      console.log("emitting greeting");
      emitter.emit("greet", "hello");
  }, 1000);

  waitForEvent(emitter, "greet")
      .then(val => console.log("greeted with", val))
      .catch(err => console.log("greeting failed with", err));
}