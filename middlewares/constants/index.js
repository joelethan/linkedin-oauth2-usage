import { config } from 'dotenv';
config()

export const authUrl = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&redirect_uri=${process.env.linkedinRedirect}&client_id=${process.env.LINKEDIN_KEY}&client_secret=${process.env.LINKEDIN_SECRET}&code=`;
export const emailUrl = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))'
export const profileUrl = 'https://api.linkedin.com/v2/me'
export const tokenError404 = 'Access_token not found'
export const requestError400 = 'Invalid access_token'
