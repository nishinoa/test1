export default function deleteRecord (dialogBook) {
    let connection;
    let statement;
    try{
        connection = connectDb();
        const sql = `DELETE FROM web_book_nishinoa
                     WHERE title=? and category=? and purchase_date=? and buyer=?`;
        statement = prepareSql(connection,sql);
        statement.setString(1, dialogBook.title);
        statement.setString(2, dialogBook.category);
        statement.setString(3, dialogBook.purchase_date);
        statement.setString(4, dialogBook.buyer);
        const result = statement.executeUpdate();
    
        statement.close();
        connection.close();
        return result;  
    }catch (e) {
        statement.close();
        connection.close();
    }
}
