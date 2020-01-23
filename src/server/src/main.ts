import * as Koa from "koa";
import * as Router from "koa-router";
import { prerender } from "./prerender";
import * as koaStatic from "koa-static";
import * as path from "path";

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

  server.listen(3000);
}

main().catch(e => console.error(e));
