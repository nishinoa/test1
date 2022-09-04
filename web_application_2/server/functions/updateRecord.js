export default function updateRecord (beforeDialogBook, dialogBook) {
    let beforeBook = { title: '', category: '', purchase_date: '', buyer: '', review_content: '' };
    let book = { title: '', category: '', purchase_date: '', buyer: '', review_content: '' };
    beforeBook = beforeDialogBook
    book = dialogBook;
    const instance  = 'esm-gcp-study:us-central1:modern-study';
    const userName  = 'esm';
    const password  = 'esm';
    const database  = 'web_book_nishinoa';
    const url = 'jdbc:google:mysql://' + instance + '/' + database;
    const connection = Jdbc.getCloudSqlConnection(url, userName, password);
    let sql = "";
    sql += "UPDATE ";
    sql += "web_book_nishinoa ";
    sql += "SET title=?, category=?, purchase_date=?, buyer=?, review_content=? ";
    sql += "WHERE title=? and category=? and purchase_date=? and buyer=? ";
    const statement = connection.prepareStatement(sql);
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
