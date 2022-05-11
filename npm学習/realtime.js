//moment.jsを使用して現在時刻を表示する。
const moment = require('moment');
moment.locale('ja');
const realtime = moment().format();
console.log(realtime);