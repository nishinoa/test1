function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

const SHEET_ID = '16EgRD0EgamTEq21ojp9k2z5VXJNsuOmXuNH-Jt9sfq0';
const SHEET_NAME = 'シート1';

// スプレッドシートに値を設定する
function setSheetData(value) {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const range = sheet.getRange('A1');
  range.setValue(value);
}

// スプレッドシートから値を取得する
function getSheetData() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const range = sheet.getRange('A1');
  return range.getValue();
}
 
// データベース接続情報
const instance  = 'esm-gcp-study:us-central1:modern-study';
const userName  = 'esm';
const password  = 'esm';
const database  = 'web_counter_nishinoa';
const url = 'jdbc:google:mysql://' + instance + '/' + database;

// カウント結果保存
function saveCounter(value) {
  const counter = selectRecord();
  if (counter == null) {
    insertRecord(value);
  } else {
    updateRecord(value);
  }
}

// レコード取得
function selectRecord() {
  const connection = Jdbc.getCloudSqlConnection(url, userName, password);
  const statement = connection.createStatement();
  let sql = "";
  sql += "select ";
  sql += "counter ";
  sql += "from web_counter_nishinoa ";
  sql += "where id=999999 ";
  const results = statement.executeQuery(sql);
  results.last();
  const count = results.getRow();
  results.beforeFirst();
  if (count === 0) {
    return null;

    results.close();
    statement.close();
    connection.close();
  } else {
    results.next();
    const counter = results.getInt('counter');
    return counter;

    results.close();
    statement.close();
    connection.close();
  }
}  

// レコード登録
function insertRecord(value) {
  const connection = Jdbc.getCloudSqlConnection(url, userName, password);
  let sql = "";
  sql += "insert into ";
  sql += "web_counter_nishinoa ";
  sql += "(id, counter) ";
  sql += "values (?, ?) ";
  const statement = connection.prepareStatement(sql);
  statement.setInt(1, 999999);
  statement.setInt(2, value);
  statement.executeUpdate();
  
  statement.close();
  connection.close();
}

// レコード更新
function updateRecord(value) {
  const connection = Jdbc.getCloudSqlConnection(url, userName, password);
  let sql = "";
  sql += "UPDATE ";
  sql += "web_counter_nishinoa ";
  sql += "SET counter=? ";
  sql += "WHERE id=? ";
  const statement = connection.prepareStatement(sql);
  statement.setInt(1, value);
  statement.setInt(2, 999999);
  statement.executeUpdate();
  
  statement.close();
  connection.close();
}
