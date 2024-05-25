import { dbConfig } from "@/config/db.config";
import mysql from "mysql2/promise";

export const connection = mysql.createPool(dbConfig);
