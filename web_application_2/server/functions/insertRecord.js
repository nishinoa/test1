export default function insertRecord (dialogBook) {
    let book = { title: '', category: '', purchase_date: '', buyer: '', review_content: '' };
    book = dialogBook;
    const instance  = 'esm-gcp-study:us-central1:modern-study';
    const userName  = 'esm';
    const password  = 'esm';
    const database  = 'web_book_nishinoa';
    const url = 'jdbc:google:mysql://' + instance + '/' + database;
    const connection = Jdbc.getCloudSqlConnection(url, userName, password);
    let sql = "";
    sql += "INSERT INTO ";
    sql += "web_book_nishinoa ";
    sql += "(title, category, purchase_date, buyer, review_content) ";
    sql += "values (?, ?, ?, ?, ?) ";
    const statement = connection.prepareStatement(sql);
    statement.setString(1, book.title);
    statement.setString(2, book.category);
    statement.setString(3, book.purchase_date);
    statement.setString(4, book.buyer);
    statement.setString(5, book.review_content);
    statement.executeUpdate();
    
    statement.close();
    connection.close();  
}
