export default function selectAllRecord () {
    let connection;
    let statement;
    let results;
    try{
        connection = connectDb();
        const sql = `SELECT *
                     FROM web_book_nishinoa`;
        statement = createSql(connection);
        results = statement.executeQuery(sql);

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
