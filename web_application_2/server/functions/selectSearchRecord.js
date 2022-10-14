export default function selectSearchRecord (searchTitle, searchCategory) {
    let connection;
    let statement;
    let results;
    try{
        connection = connectDb();
        let sql = `SELECT * FROM web_book_nishinoa `;
        if (!searchTitle && !searchCategory) {
          connection.close();
          return selectAllRecord();
        } else if (searchTitle) {
          sql += `WHERE title LIKE ?`;
          statement = prepareSql(connection,sql);
          statement.setString(1, '%' + searchTitle + '%');
          if (searchCategory) {
            sql += ` and category=?`;
            statement = prepareSql(connection,sql);
            statement.setString(1, '%' + searchTitle + '%');
            statement.setString(2, searchCategory);
          }
        } else if (searchCategory) {
          sql += `WHERE category=?`;
          statement = prepareSql(connection,sql);
          statement.setString(1, searchCategory); 
        }
        results = statement.executeQuery();

        let bookList = [];
        while (results.next()) {
          const book = { title: '', category: '', purchase_date: '', buyer: '', review_content: '' };
          book.title = results.getString('title');
          book.category = results.getString('category');
          book.purchase_date = results.getString('purchase_date');
          book.buyer = results.getString('buyer');
          book.review_content = results.getString('review_content');
          
          bookList.push(book);
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
