import * as Koa from "koa";
import * as Router from "koa-router";
import { prerender } from "./prerender";
import * as koaStatic from "koa-static";
import * as path from "path";

const port = 3000;

async function main() {
  const server = new Koa();
  const router = new Router();

  server.use(koaStatic(path.dirname(require.resolve("@monoglot/client"))));

  router.get("*", async (ctx, next) => {
    ctx.body = await prerender({ location: ctx.url });
    await next();
  });

  server.use(router.routes());
  server.use(router.allowedMethods());

  server.listen(port);
  console.log(`Server running on http://localhost:${port}/`);
}

main().catch(e => console.error(e));
