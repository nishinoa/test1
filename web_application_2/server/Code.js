import doGet from './functions/doGet'
import insertRecord from './functions/insertRecord'
import updateRecord from './functions/updateRecord'
import connectDb from './functions/connectDb'
import prepareSql from './functions/prepareSql'
import selectAllRecord from './functions/selectAllRecord'
import createSql from './functions/createSql'
import selectSearchRecord from './functions/selectSearchRecord'
import deleteRecord from './functions/deleteRecord'

global.doGet = doGet
global.insertRecord = insertRecord
global.updateRecord = updateRecord
global.connectDb = connectDb
global.prepareSql = prepareSql
global.selectAllRecord = selectAllRecord
global.createSql = createSql
global.selectSearchRecord = selectSearchRecord
global.deleteRecord = deleteRecord
