import { magicAdmin } from "../../lib/magic-admin";
import jwt from 'jsonwebtoken';
import { createNewUser, isNewUser } from "../../lib/hasura_db";
import { setTokenCookie, removeTokenCookie } from "../../lib/cookies";



export default async function login(req, res) {
    if(req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            const didToken = auth.split(' ')[1]; 
            const metadata = await magicAdmin.users.getMetadataByToken(didToken);

            const sign = jwt.sign({
                ...metadata,
                iat: Math.floor(Date.now()/1000),
                exp: Math.floor(Date.now()/ 1000 + 7 * 24 * 60 * 60),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["user", "admin"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id":  `${metadata.issuer}`
                }
            },process.env.HASURA_JWT_SECRET);

            const isNewUserCheck = await isNewUser(metadata.issuer, sign); 
            if(isNewUserCheck) await createNewUser(sign, metadata);

            setTokenCookie(sign, res);

            res.send({done: true, isNewUser: isNewUserCheck});
        } catch (error) {
            console.log(error);
            res.status(500).send({done: "false1"});
        }
    } else {
        res.status(500).send({done: "false2"});
    }
} 