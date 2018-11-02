const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const Boom = require('boom');
const routes = require('./routes');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors())
app.use(async function validationMiddleware(ctx, next) {
    try {
        await next();
    } catch (err) {
        let status;
        let name;
        let message;
        if (Boom.isBoom(err)) {
            status = err.output.statusCode;
            name = err.output.payload.error;
            message = err.output.payload.message;
        } else if (err.isJoi) {
            ctx.response.status = 400;
            name = err.name;
            message = err.details[0].message;
        }
        ctx.body = {
            "meta": {
                "status code": status,
                "error": name,
                "message": message
            }
        }
    }
});

app.use(bodyParser());
app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.path);
    await next();
});
app.use(routes);

app.listen(4002, () => {
    console.log('Server started.');
});