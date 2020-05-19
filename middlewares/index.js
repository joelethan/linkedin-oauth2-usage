import fetch from "node-fetch";
import { authUrl, emailUrl,
  profileUrl, tokenError404,
  requestError400 } from "./constants";

export const linkedInMiddleware = (req, res, next) => {
  let access_token = req.query.access_token;
  if (!access_token) {
    console.log(tokenError404);
    return next()
  }
  fetch(profileUrl, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
    .then(resp => resp.json())
    .then(user => {
      if (!user.id) {
        res.status(400).json({ Error: requestError400 });
        return next();
      }
      fetch(
        emailUrl,
        {
          headers: { Authorization: `Bearer ${access_token}` }
        }
      )
        .then(resp => resp.json())
        .then(data => {
          req.query.profile = {
            id: user.id,
            email: JSON.stringify(data.elements[0]).split('"')[5],
            firstName: user.firstName.localized.en_US,
            lastName: user.lastName.localized.en_US,
          };
          return next();
        });
    });
};

export const callbackMiddleware = (req, res) => {
  fetch(`${authUrl}${req.query.code}`)
    .then(resp => resp.json())
    .then(data =>{
        if (data.access_token) {
            res.json(data);
        }
        else {
          res.status(400).json({
            Error: requestError400,
            Description: data.error_description
          });
        }
    })
}
