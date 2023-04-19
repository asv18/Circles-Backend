import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.15.0/mod.ts";

interface Dinosaur {
    name: string;
    diet: string;
    link: string;
}

const config = "postgresql://AarnavAdmin:Z1LjZdFUXsbcbEN0E1conQ@crdb-deno-7927.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=require";

const client = new Client(config);
await client.connect();
const result = await client.queryObject<Dinosaur>("SELECT name, diet, link from dinosaurs");
const dinosaurs = result.rows;

console.log(result.rows); // [{name: 'triceratops', diet: 'herbivore', link: 'https://www.nhm.ac.uk/discover/dino-directory/triceratops.html'}, {...},]

const port = 8080;
const handler = (): Response => {
    // Get first dino from the query results
    const firstDino = dinosaurs[0]; 

    // String concat the fields(columns) to be human readable
    const body = firstDino.name + ": " + firstDino.diet + ", " + firstDino.link;
    return new Response(body, { status: 200 });
};
console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });

