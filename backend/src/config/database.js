const mysql = require("mysql2/promise");
const { env } = require("./env");

const pool = mysql.createPool({
  host: env.dbHost,
  port: env.dbPort,
  database: env.dbName,
  user: env.dbUser,
  password: env.dbPassword,
  waitForConnections: true,
  connectionLimit: env.dbConnectionLimit,
  queueLimit: 0,
  multipleStatements: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: env.dbSsl
    ? {
        minVersion: "TLSv1.2",
        rejectUnauthorized: false,
      }
    : undefined,
});

pool.on("connection", (connection) => {
  connection.on("error", (err) => {
    console.error("MySQL connection error (auto-recovering):", err.code);
  });
});

async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = { pool, query };
