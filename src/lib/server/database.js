import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 12592, 
  ssl: {
    rejectUnauthorized: false 
  },
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const pool = mysql.createPool(dbConfig);

export async function testConnection() {
  let connection;
  try {
    console.log('🔌 Testing database connection...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Database:', process.env.DB_NAME);
    console.log('User:', process.env.DB_USER);
    
    connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Test query executed successfully');
    
    connection.release();
    return true;
    
  } catch (error) {
    console.error('Database connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (connection) {
      connection.release();
    }
    
    return false;
  }
}

testConnection();