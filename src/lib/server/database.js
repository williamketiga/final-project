import mysql from 'mysql2/promise'

const dbConfig = {
    host : process.env.DB_HOST || 'localhost',
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_NAME || 'final_project_js',
    waitForConnection : true,
    connectionLimit : 10,
    queueLimit : 0
};

export const pool = mysql.createPool(dbConfig)

// Test connection
export async function testConnection(){
    try{
        const connection = await pool.getConnection()
        console.log("Database connected!");
        connection.release()
    }catch(error){
        console.error("Database connection failed", error)
        return false
    }
}