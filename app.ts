import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from "./modules/routes/index.ts";

const port = 3000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Application on http://localhost:${port}`);

await app.listen({ port: port });