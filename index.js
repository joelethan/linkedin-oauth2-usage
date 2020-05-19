import express from "express";
import { linkedInMiddleware, callbackMiddleware } from "@joelethan/linkedin-oauth2";
const app = express()
const port = 5002
app.get('/linkedin', linkedInMiddleware, (req, res) =>{
    const profile = req.query.profile;
    res.json({profile})
})

app.get('/api/user/', callbackMiddleware)

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
