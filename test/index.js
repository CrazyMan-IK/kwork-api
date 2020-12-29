const kwork = require('../build/index.js');

let kw = new kwork('Login', 'Password');

console.log(kw.getToken());
