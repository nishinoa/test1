export default function executeSql (connection,sql) {
    const statement = connection.prepareStatement(sql);
    
    return statement;  
}
