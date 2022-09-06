export default function updateRecord (beforeDialogBook, dialogBook) {
    beforeBook = beforeDialogBook
    book = dialogBook;
    const connection = connectDb();
    let sql = "";
    sql += "UPDATE ";
    sql += "web_book_nishinoa ";
    sql += "SET title=?, category=?, purchase_date=?, buyer=?, review_content=? ";
    sql += "WHERE title=? and category=? and purchase_date=? and buyer=? ";
    const statement = executeSql(connection,sql);
    statement.setString(1, book.title);
    statement.setString(2, book.category);
    statement.setString(3, book.purchase_date);
    statement.setString(4, book.buyer);
    statement.setString(5, book.review_content);
    statement.setString(6, beforeBook.title);
    statement.setString(7, beforeBook.category);
    statement.setString(8, beforeBook.purchase_date);
    statement.setString(9, beforeBook.buyer);
    statement.executeUpdate();
    
    statement.close();
    connection.close();  
}
