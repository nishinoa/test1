export default function connectDb () {
    const instance  = 'esm-gcp-study:us-central1:modern-study';
    const userName  = 'esm';
    const password  = 'esm';
    const database  = 'web_book_nishinoa';
    const url = 'jdbc:google:mysql://' + instance + '/' + database;
    const connection = Jdbc.getCloudSqlConnection(url, userName, password);
    
    return connection;  
}
