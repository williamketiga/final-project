import mysql from 'mysql2/promise';

const connectionString = process.env.DATABASE_URL || 
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?ssl={"rejectUnauthorized":false}`;

const dbConfig = {
  uri: connectionString,
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

export const pool = mysql.createPool(connectionString);

export async function testConnection() {
  try {
    console.log('🔄 Testing Aiven database connection...');
    
    const connection = await pool.getConnection();
    console.log('✅ Connected to Aiven MySQL!');
    
    // Check database
    const [databases] = await connection.execute('SHOW DATABASES');
    console.log('📊 Available databases:', databases.map(db => db.Database));
    
    // Check current database tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Current database tables:', tables.map(table => Object.values(table)[0]));
    
    connection.release();
    return true;
    
  } catch (error) {
    console.error('❌ Aiven connection failed:');
    
    if (error.code === 'ETIMEDOUT') {
      console.error('💡 Solution: Check your network connection and Aiven service status');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('💡 Solution: Check DB_USER and DB_PASSWORD');
    } else if (error.code === 'ENOTFOUND') {
      console.error('💡 Solution: Check DB_HOST - cannot resolve hostname');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('💡 Solution: Check DB_PORT and Aiven service status');
    }
    
    console.error('Full error:', error.message);
    return false;
  }
}

// Test on import
testConnection().then(success => {
  if (success) {
    console.log('🎉 Database module ready!');
  } else {
    console.log('⚠️ Database connection issues - check configuration');
  }
});