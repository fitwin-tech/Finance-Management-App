const Domain = process.env.REACT_APP_DOMAIN
const requests = {

  //Headers
  key : process.env.REACT_APP_API_KEY,
  authantication : process.env.REACT_APP_AUTHANTICATION,

  //API Urls
  Domain : process.env.REACT_APP_DOMAIN,
  login : `${Domain}/auth/login`,
  signup : `${Domain}/auth/signup`,
  balance : `${Domain}/auth/balance/view`,
  userdetails : `${Domain}/auth/userdetails`
};

export default requests;