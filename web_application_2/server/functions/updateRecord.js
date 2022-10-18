export default function updateRecord (dialogBook) {
    let connection;
    let statement;
    try{
        connection = connectDb();
        const sql = `UPDATE web_book_nishinoa
                 SET review_content=?
                 WHERE title=? and category=? and purchase_date=? and buyer=?`;
        statement = prepareSql(connection,sql);
        statement.setString(1, dialogBook.review_content);
        statement.setString(2, dialogBook.title);
        statement.setString(3, dialogBook.category);
        statement.setString(4, dialogBook.purchase_date);
        statement.setString(5, dialogBook.buyer);
        const result = statement.executeUpdate();
    
        statement.close();
        connection.close();
        return result;  
    }catch (e) {
        statement.close();
        connection.close();
    }
}
