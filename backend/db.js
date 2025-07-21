// db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Testar conexão no início
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Conectado ao banco de dados MySQL!");
    conn.release();
  } catch (err) {
    console.error("❌ Erro ao conectar no banco:", err.message);
  }
})();

module.exports = pool;
