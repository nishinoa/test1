// export default function updateRecord (dialogBook) {
//    const book = dialogBook;
//    const connection = connectDb();
//    const sql = `UPDATE web_book_nishinoa
//                 SET review_content=?
//                 WHERE title=? and category=? and purchase_date=? and buyer=?`;
//    const statement = executeSql(connection,sql);
//    statement.setString(1, book.title);
//    statement.setString(2, book.category);
//    statement.setString(3, book.purchase_date);
//    statement.setString(4, book.buyer);
//    statement.setString(5, book.review_content);
//    statement.executeUpdate();
    
//    statement.close();
//    connection.close();  
// }
