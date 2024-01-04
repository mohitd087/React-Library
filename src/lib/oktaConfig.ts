export const oktaConfig = {
    clientId: `0oae3k8gv8su3Uon95d7`,
    issuer: 'https://dev-14858462.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid','profile','email'],
    pkce: true,
    disableHttpsCheck: true
    
}