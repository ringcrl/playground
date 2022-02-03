const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
app.use(serve('./static'));
app.use(bodyParser());

(async () => {
  const db = await open({
    filename: '/Users/ringcrl/Documents/saga/chenng/local.db',
    driver: sqlite3.Database,
  });

  router
    .get('/get', async (ctx) => {
      const result = await db.all('SELECT * FROM NOTES');
      ctx.body = result;
    })
    .post('/add', async (ctx) => {
      const { content } = ctx.request.body;
      await db.run(`INSERT INTO NOTES VALUES (NULL, '${content}')`);
      ctx.body = { status: 'ok' };
    })
    .post('/del', async (ctx) => {
      const { id } = ctx.request.body;
      await db.run('DELETE FROM NOTES WHERE id = ?', id);
      ctx.body = { status: 'ok' };
    });

  console.log('http://127.0.0.1:3000');
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);
})();
