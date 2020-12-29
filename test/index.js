const kwork = require('../build/index.js');

let kw = new kwork('Superdanik2004@gmail.com', 'Smile2299', '3506');

(async function() {
	console.log(await kw.token);
})();
