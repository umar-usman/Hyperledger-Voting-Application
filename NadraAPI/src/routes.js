const Router = require('koa-router');
const handler = require('./handler');
const router = new Router();

router.get('/:nic', handler.findNational);

module.exports = router.routes();
