export default function executeSql (connection,sql) {
    
    return connection.prepareStatement(sql); 
}
