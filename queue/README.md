# Async Queue


In certain scenarios within a Node.js application, there exist producer and consumer components operating within the same process. Producers generate data or messages and push them to consumers through API calls, EventEmitters, or similar means.

However, situations may arise where the producer generates messages at a significantly faster rate than the consumer can handle, leading to potential bottlenecks or even crashing of the process.

This is where AsyncQueue steps in to alleviate the issue. AsyncQueue serves as a mediator between the producer and consumer, incorporating a controlled buffer. Messages are allowed to enter the buffer up to a certain limit, awaiting consumption by the consumer, thus preventing overwhelming the system.

#### Init the queue
> this instance is shared by the consumer and producer
````typescript
// init the queue, this shared between producer and consumer
const queue = new AsyncQueue<string>(10)
````

#### Consume message

````typescript
async function consumer(queue: AsyncQueue<string>) {  
  
  // get 5 strings from the queue
  const data = await queue.get(5)

  // process data
}
````

The consumer will wait until the queue is full with at least 5 elements (string in this case)

#### Put some messages
queue is limited (10 messages in this case). 
if queue is full then put will await until some space is available

````typescript
async function producer(queue: AsyncQueue<string>) {
  // write some messages to the queue
  // if queue is full (10 messages in this case) then put will await until some space is available
  await queue.put('task-1')
  await queue.put('task-2')
  await queue.put('task-3')
  await queue.put('task-4')
  await queue.put('task-5')  
}

````

#### Consume messages with event
You can subscribe to "put" events, where each "put" operation triggers an event indicating the length of the data added to the queue.
````typescript
// the queue
const queue = new AsyncQueue<string>(10)

// consume message with events
const getcb: AsyncEventEmitterCB = async (length: number) => {    
  const data = await queue.get(length)    
}
queue.on(getcb)
````
