export default function prepareSql (connection,sql) {
    
    return connection.prepareStatement(sql); 
}
