import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL is missing in .env file");
}

const sql = neon(databaseUrl);

export default sql;
