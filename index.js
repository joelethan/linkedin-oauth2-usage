import express from "express";
import fetch from "node-fetch";
const app = express()
const port = 5002
import { linkedInMiddleware, callbackMiddleware } from "./middlewares";

app.get('/', linkedInMiddleware, (req, res) =>{
    const profile = req.query.profile;
    res.json({profile})
})

app.get('/api/user/', callbackMiddleware)

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
