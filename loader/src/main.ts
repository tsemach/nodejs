// main.js
import fs from 'fs';
import path from 'path';

async function loadClass(className: string, classFile: string) {
  const filePath = path.join(__dirname, `${classFile}.js`);
  const module = await import(filePath);
  return module[className];
}

(async () => {
  const MyClass = await loadClass('MyClass', 'myclass');
  const myClassInstance = new MyClass();
  myClassInstance.myMethod()
})();