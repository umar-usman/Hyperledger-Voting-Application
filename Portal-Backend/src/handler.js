const request = require("request-promise-native");
const Boom = require('boom');
const Constants = require('./constants');

async function getCandidateInfo(ctx) {
    const url = Constants.Base_URL + "/Candidate/" + ctx.params.candidateId;
    const result = request.get(url, (error, response, body) => {
        if (error) {
            throw Boom.notFound(error);
        }
        return JSON.parse(body);
    });
    ctx.body = result;
}

async function addCandidate(ctx) {
    const url = Constants.Base_URL + "/Candidate";
    const args = {
        url: url,
        form: {
            $class: "org.acme.votenetwork.Candidate",
            candidateId: '' + ctx.request.body.candidateId,
            name: ctx.request.body.name,
            constituency: ctx.request.body.constituency,
            symbol: ctx.request.body.symbol,
            password: ctx.request.body.password
        },
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };
    let result = request.post(args, (error, response, body) => {
        if (error) {
            throw Boom.notFound(error);
        }
        return JSON.parse(body);
    });
    ctx.body = result;
}

async function getAllCandidates(ctx) {
    let url;
    if (ctx.query.constituency) {
        filter = 'filter={"where":{"constituency": "' + ctx.query.constituency + '"}}';
        url = Constants.Base_URL + "/Candidate/?" + filter;
    } else {
        url = Constants.Base_URL + "/Candidate/";
    }
    const result = request.get(url, (error, response, body) => {
        if (error) {
            throw Boom.notFound(error);
        }
        return JSON.parse(body);
    })
    ctx.body = result;
}

async function removeCandidate(ctx) {
    const url = Constants.Base_URL + "/Candidate/" + ctx.params.candidateId;
    const res = await delWrapper(url);
    ctx.body = res;
}

async function login(ctx) {
    let result;
    if (ctx.request.body.userName === Constants.admin.userName &&
        ctx.request.body.password === Constants.admin.password) {
        result = {
            id: Constants.admin.userName,
            is_admin: true,
        }
    } else {
        const url = Constants.Base_URL + "/Candidate/" + ctx.request.body.userName;
        const response = await getWrapper(url);
        if (response.candidateId === ctx.request.body.userName &&
            response.password === ctx.request.body.password) {
            if (!response.error) {
                result = {
                    id: response.candidateId,
                    name: response.name,
                    is_admin: false,
                    constituency: response.constituency
                }
            }
            else {
                throw Boom.notFound('User does not exist');
            }
        }
    }
    if (!result) {
        throw Boom.badRequest("Authentication Failed: User not found.")
    }
    result = JSON.parse(JSON.stringify(result));
    ctx.body = result;
}

async function getConstituencies(ctx, next) {
    await next();
    const constituencies = [];
    const url = Constants.Base_URL + "/Candidate";
    let candidates = await request.get(url);
    candidates = JSON.parse(candidates);
    if (candidates && candidates.length > 0) {
        candidates.forEach(candidates => {
            constituencies.push(candidates.constituency);
        });
    }
    const uniqueConstituencies = constituencies.filter(function (elem, pos) {
        return constituencies.indexOf(elem) == pos;
    })
    const result = JSON.parse(JSON.stringify(uniqueConstituencies));
    ctx.body = result;
}

const getWrapper = (url) => {
    return new Promise((resolve, reject) => {
        return request.get(url, (error, response, body) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(JSON.parse(body))
            }
        })
    })
}

const delWrapper = (url) => {
    return new Promise((resolve, reject) => {
        return request.del(url, (error, response, body) => {
            if (body) {
                return resolve(JSON.parse(body))
            } else {
                return resolve({ message: 'Candidate Deleted' })
            }
        })
    })
}

module.exports = {
    login,
    getCandidateInfo,
    addCandidate,
    getAllCandidates,
    removeCandidate,
    getConstituencies
};