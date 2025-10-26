import mysql from "mysql2/promise";
import "dotenv/config";

let conn;

export async function getConn() {
  if (!conn) {
    try {
      conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT || 3306,
      });
      console.log(`Sql Connected Sucessfull`.bgGreen);
    } catch (error) {
      console.log(error);

      console.log(`Sql Connected UnSucessfull`.bgRed);
    }
  }
  return conn;
}
