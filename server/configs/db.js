import { neon } from "@neondatabase/serverless";
<<<<<<< HEAD
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL is missing in .env file");
}

const sql = neon(databaseUrl);
=======

const sql = neon(`${process.env.DATABASE_URL}`);
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de

export default sql;
