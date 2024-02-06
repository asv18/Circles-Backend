import { Application } from "https://deno.land/x/oak@v12.2.0/mod.ts";
import { router } from "./modules/routes/index.ts";

const port = 3000;

const app = new Application();

app.use((ctx) => {
    ctx.response.body = "All Operational!";
})
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`%cApplication on %chttp://localhost:${port}`, "color: white", "color: green; text-decoration: underline");

await app.listen({ port: port });