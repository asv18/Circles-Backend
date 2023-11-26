import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const database = new Client({
    user: config().USER,
    database: config().DATABASE,
    hostname: config().HOST,
    password: config().PASSWORD,
    port: config().PORT
    // user: Deno.env.get("USER"),
    // database: Deno.env.get("DATABASE"),
    // hostname: Deno.env.get("HOST"),
    // password: Deno.env.get("PASSWORD"),
    // port: Deno.env.get("PORT")
});

await database.connect();

export default database;