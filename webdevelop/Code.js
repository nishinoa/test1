function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

// スプレッドシートに値を設定する
function setSheetData(value) {
  const SHEET_ID = '16EgRD0EgamTEq21ojp9k2z5VXJNsuOmXuNH-Jt9sfq0'
  const SHEET_NAME = 'シート1'
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const range = sheet.getRange('A1');
  range.setValue(value);
}

// スプレッドシートから値を取得する
function getSheetData() {
  const SHEET_ID = '16EgRD0EgamTEq21ojp9k2z5VXJNsuOmXuNH-Jt9sfq0'
  const SHEET_NAME = 'シート1'
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const range = sheet.getRange('A1');
  return range.getValue();
}
