import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";


const runtimeConfig = useRuntimeConfig()
const connection = mysql.createConnection(runtimeConfig.databaseUrl);

export const db = drizzle(connection);