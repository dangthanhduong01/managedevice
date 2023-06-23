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
            "select username,password,role from user where username=?",
            [username]);
        try {
            if (req.body.username && u[0].password && req.body.password== u[0].password) {
                const payload = {
                    username: username,
                };
                const token = sign(payload, 'secret', {
                    algorithm: "HS256",
                    expiresIn: "1d",
                });
                reply.status(200).send({ username: username,role: u[0].role, token: token });
            } else {
                reply.status(500).send("user doesn't exsit in db");
            }
        } catch (err) {
            reply.status(501).send("st go wrong");
            console.log(err)
        }

    });
    fastify.post("/auth/roles", async (req, reply) => {
        let name = req.body.username;
        try {
            let role = await excuteQuery("select role from user where username= ?",
            [name]);
            reply.status(200).send(role);
        }catch(err) {
            reply.status(500).send(err);
        }
    });
}


async function authenticate (req, reply, next) {
    let authorization  = req.headers['x-access-token'];; 
    // console.log("auth1: ", authorization);
    if (authorization) {
        let token = authorization;
        verify(token, 'secret', (err, decoded) => {
            if (err) {
                reply.status(403).send('forbidden user');
            }else{
                req.username = decoded.username;
                next();
            }
        })
    } else {
        reply.status(401).send("unauthorized user")
    }
}

// async function authenticate(req, reply) {
//     let authorization = req.headers['x-access-token'];
//     console.log("auth1: ", authorization);
//     if (authorization) {
//       let token = authorization;
//       try {
//         const decoded = await new Promise((resolve, reject) => {
//           verify(token, 'secret', (err, decoded) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(decoded);
//             }
//           });
//         });
//         req.username = decoded.username;
//         return true; // Xác thực thành công
//       } catch (err) {
//         reply.status(403).send('forbidden user');
//         return false; // Xác thực thất bại
//       }
//     } else {
//       reply.status(401).send("unauthorized user");
//       return false; // Xác thực thất bại
//     }
//   }

async function isReadable(req,reply, next) {
    if(req.roleId == 1){
        next();
        return;
    }
    reply.status(403).send('You have no right');
}

async function isWriteable(req,reply, next) {
    if(req.roleId == 2){
        next();
        return;
    }
    reply.status(403).send('You have no right');
}

async function isAdmin(req,reply, next) {
    if(req.roleId == 3){
        next();
        return;
    }
    reply.status(403).send('You have no right');
}

async function isAdminOrWriteable(req,reply,next) {
    if(req.roleId == 2 || req.roleId == 3) {
        next();
        return;
    }
}


module.exports = { routes, verify, authenticate,
    isReadable,isWriteable,isAdmin,isAdminOrWriteable };