export default function insertRecord (dialogBook) {
    const connection = connectDb();
    const sql = `INSERT INTO web_book_nishinoa 
                 (title, category, purchase_date, buyer, review_content)
                 values (?, ?, ?, ?, ?)`;
    const statement = executeSql(connection,sql);
    statement.setString(1, dialogBook.title);
    statement.setString(2, dialogBook.category);
    statement.setString(3, dialogBook.purchase_date);
    statement.setString(4, dialogBook.buyer);
    statement.setString(5, dialogBook.review_content);
    try{
        const result = statement.executeUpdate();
    
        statement.close();
        connection.close();
        return result;  
    }catch (e) {
        statement.close();
        connection.close();
        return null;
    }
}
