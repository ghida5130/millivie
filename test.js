const obj = { a: 1, b: 2, c: 3 };
const key = ["a", "c"];
const obj2 = {};

for (let i of key) {
    obj2[i] = obj[i];
}

console.log(obj2);
