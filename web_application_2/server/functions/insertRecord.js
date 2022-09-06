export default function insertRecord (dialogBook) {
    book = dialogBook;
    const connection = connectDb();
    let sql = "";
    sql += "INSERT INTO ";
    sql += "web_book_nishinoa ";
    sql += "(title, category, purchase_date, buyer, review_content) ";
    sql += "values (?, ?, ?, ?, ?) ";
    const statement = executeSql(connection,sql);
    statement.setString(1, book.title);
    statement.setString(2, book.category);
    statement.setString(3, book.purchase_date);
    statement.setString(4, book.buyer);
    statement.setString(5, book.review_content);
    statement.executeUpdate();
    
    statement.close();
    connection.close();  
}
