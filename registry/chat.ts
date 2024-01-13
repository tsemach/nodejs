class MyClassA {
  constructor(public name: string) {}
  sayHello() {
    console.log(`Hello from MyClassA, ${this.name}!`);
  }
}

class MyClassB {
  constructor(public name: string) {}
  sayHello() {
    console.log(`Hello from MyClassB, ${this.name}!`);
  }
}

// Class registry
const classRegistry: { [key: string]: new (name: string) => any } = {
  MyClassA,
  MyClassB,
};

// Factory function to create instances by name
function createInstanceByName(className: string, name: string): any {
  const selectedClass = classRegistry[className];
  if (selectedClass) {
    return new selectedClass(name);
  } else {
    throw new Error(`Class with name '${className}' not found in the registry.`);
  }
}

// Example usage
const instanceA = createInstanceByName('MyClassA', 'World');
const instanceB = createInstanceByName('MyClassB', 'World');

instanceA.sayHello(); // Output: Hello from MyClassA, World!
instanceB.sayHello(); // Output: Hello from MyClassB, World!
