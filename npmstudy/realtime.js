//moment.jsを使用して現在時刻を表示。
const moment = require('moment');
moment.locale('ja');
const realtime = moment().format();
console.log(realtime);
