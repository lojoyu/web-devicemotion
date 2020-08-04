//let DeviceMotion = require("../dist/index.min.js");
//let DeviceMotion = require("../src/index.js");
import DeviceMotion from '../src/index';
console.log('open', document.getElementById('start'));
let dm = new DeviceMotion(callback);

document.getElementById('start').onclick = () =>{
    alert('click!');
    dm.requestPermission();
};

function callback(evt) {
    //console.log(JSON.parse(evt));
    //console.log(dm.orient);
    document.getElementById('orient').innerHTML = toString(dm.orient);
    document.getElementById('vel').innerHTML = toString(dm.orientVel);
    document.getElementById('acc').innerHTML = toString(dm.orientAcc);
}

function toString(jsonData) {
    let html = "";
    for (let k in jsonData) {
        if (!k) continue;
        html += `${k}: ${jsonData[k].toFixed(3)} </br>`
    }
    return html;
}