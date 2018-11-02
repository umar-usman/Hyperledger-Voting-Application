const dateFormat = require('dateformat');

function pad(num, size) {
   let s = num + '';
   while (s.length < size) {
       s = '0' + s;
   }
   return s;
}

function generate() {
   const randomnumber = Math.floor(Math.random() * 10000);
   const random4 = pad(randomnumber, 4);
   const currenttime = dateFormat('yymmddhhMMss');
   return parseInt(currenttime + '' + random4, 10);
}

module.exports = generate