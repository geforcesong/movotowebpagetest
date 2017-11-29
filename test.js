var a ={
    name :'george',
    age: 10,
    display:function () {
        console.log(`${this.name}, ${this.age}`);
    }
}

console.log(a);
a.display();

for(var k in a){
    if(typeof(a[k]) === 'function'){
        delete a[k];
    }
}

console.log(a)

var b = JSON.parse(JSON.stringify(a));
console.log(b);