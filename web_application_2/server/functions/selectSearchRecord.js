export default function selectSearchRecord (searchTitle, searchCategory) {
    let connection;
    let statement;
    let results;
    try{
        connection = connectDb();
        let sql = `SELECT * FROM web_book_nishinoa `;
        if (searchTitle && searchCategory) {
          sql += `WHERE title LIKE ? and category=?`;
          statement = prepareSql(connection,sql);
          statement.setString(1, '%' + searchTitle + '%');
          statement.setString(2, searchCategory);
        } else if (searchTitle && !searchCategory) {
          sql += `WHERE title LIKE ?`;
          statement = prepareSql(connection,sql);
          statement.setString(1, '%' + searchTitle + '%');
        } else if (!searchTitle && searchCategory) {
          sql += `WHERE category=?`;
          statement = prepareSql(connection,sql);
          statement.setString(1, searchCategory); 
        } else {
          connection.close();
          return selectAllRecord();
        }
        results = statement.executeQuery();

        let bookList = [];
        let book = { title: '', category: '', purchase_date: '', buyer: '', review_content: '' };
        while (results.next()) {
          book.title = results.getString('title');
          book.category = results.getString('category');
          book.purchase_date = results.getString('purchase_date');
          book.buyer = results.getString('buyer');
          book.review_content = results.getString('review_content');
          
          bookList.push(JSON.parse(JSON.stringify(book)));
        }

        results.close();
        statement.close();
        connection.close();
        return bookList;  
    }catch (e) {
        results.close();
        statement.close();
        connection.close();
    }
}
