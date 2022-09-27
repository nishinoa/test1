import doGet from './functions/doGet'
import insertRecord from './functions/insertRecord'
// import updateRecord from './functions/updateRecord'
import connectDb from './functions/connectDb'
import prepareSql from './functions/prepareSql'

global.doGet = doGet
global.insertRecord = insertRecord
// global.updateRecord = updateRecord
global.connectDb = connectDb
global.prepareSql = prepareSql
