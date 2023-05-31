const { sign, verify } = require('jsonwebtoken');
const { excuteQuery } = require('./connection');
var bcrypt = require('bcryptjs')


async function routes(fastify) {
    fastify.post("/auth/login", async (req, reply) => {
        let username = req.body.username;
        let password = req.body.password;
        console.log(username);
        console.log(password);
        let u = await excuteQuery(
            "select username,password from user where username=?",
            [username]);
        try {
            if (req.body.username && u[0].password && req.body.password== u[0].password) {
                const payload = {
                    username: username,
                };
                const token = sign(payload, 'secret', {
                    algorithm: "HS256",
                    expiresIn: '1d',
                });
                reply.status(200).send({ username: username, token: token });
            } else {
                reply.status(500).send("user doesn't exsit in db");
            }
        } catch (err) {
            reply.status(501).send("st go wrong");
            console.log(err)
        }

    });
}


async function authenticate(req, reply) {
    let { authorization } = req.headers;
    console.log("auth: ", authorization);
    if (authorization) {
        let token = authorization;
        verify(token, 'secret', (err, decoded) => {
            if (err) {
                reply.status(403).send('forbidden user');
            }
            console.log("decode:", decoded)
            req.username = decoded.username;
        })
    } else {
        reply.status(401).send("unauthorized user")
    }
}

module.exports = { routes, verify, authenticate };