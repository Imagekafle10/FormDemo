import mysql from "mysql2/promise"
import 'dotenv/config';

let conn;



export async function getConn() {
    if (!conn) {
        try {
            conn = await mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,

            })
            console.log(`Sql Connected Sucessfull`.bgGreen);

        } catch (error) {
            console.log(`Sql Connected UnSucessfull`.bgRed);

        }

    }
    return conn;
}