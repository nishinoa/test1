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
        }

        if (searchTitle) {
          sql += `WHERE title LIKE ?`;
        }
        if (searchTitle && searchCategory) {
          sql += ` and category=?`;
        } else if (!searchTitle && searchCategory) {
          sql += `WHERE category=?`;
        }

        statement = prepareSql(connection,sql);

        if (searchTitle) {
          statement.setString(1, '%' + searchTitle + '%');
        }
        if (searchTitle && searchCategory) {
          statement.setString(2, searchCategory);
        } else if (!searchTitle && searchCategory) {
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
