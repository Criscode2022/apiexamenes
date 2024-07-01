import dotenv from "dotenv";
import mysql from "mysql2";

export const pool = mysql.createPool({
  host: dotenv.HOST,
  user: dotenv.USER,
  password: dotenv.PASSWORD,
  database: dotenv.DATABASE,
});

export default pool;
