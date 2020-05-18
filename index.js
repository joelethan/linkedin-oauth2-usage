import express from "express";
import fetch from "node-fetch";
const app = express()
const port = 5002
import { config } from "dotenv";
config()
import { linkedInMiddleware } from "./middlewares/linkedin";

app.get('/', linkedInMiddleware, (req, res) =>{
    const profile = req.query.profile || {};
    res.json({profile})
})

app.get('/api/user/', (req, res) => {
    const url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&redirect_uri=${process.env.linkedinRedirect}&client_id=${process.env.linkedin_key}&client_secret=${process.env.linkedin_secret}&code=${req.query.code}`
    fetch(url)
        .then(resp => resp.json())
        .then(data =>{
            console.log(data);
            if (data.access_token) {
                return res.send('LinkedIn token sent');
            }
            return res.send('Invalid Request');
        })
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
