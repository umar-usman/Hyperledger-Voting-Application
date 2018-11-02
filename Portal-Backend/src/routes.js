const Router = require('koa-router');
const handler = require('./handler');
const router = new Router();
const request = require("request-promise-native");
const Constants = require('./constants');

//Login (Candidate and ECP)
router.post('/login', handler.login);       // working for both


router.get('/test',async (ctx, next) => {

    const url = Constants.Base_URL + "/Candidate";
    await  request.get(url).then(candidates => {
        ctx.body = JSON.parse(candidates);
    });
    await next();
    
  })
//For Candidate and ECP
router.get('/candidate/:candidateId', handler.getCandidateInfo); 
//For ECP
router.get('/constituencies', handler.getConstituencies);
//For ECP Only
router.post('/candidate', handler.addCandidate);
//For ECP Only
router.get('/', handler.getAllCandidates);
//For ECP Only
router.delete('/candidate/:candidateId', handler.removeCandidate);

module.exports = router.routes();
