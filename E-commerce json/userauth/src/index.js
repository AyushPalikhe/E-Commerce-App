require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
 const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('./tokens.js');
 
const { isAuth } = require('./isAuth.js');
const fetch =require('node-fetch')

const axios =require('axios');
const { response } = require('express');




 

const server = express();


server.use(cookieParser());

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

 
server.use(express.json());  
server.use(express.urlencoded({ extended: true }));  

// 1. Register a user
server.post('/userregister', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the user exist
   
    axios.get('http://localhost:1100/admins')
    .then((response)=>{
        for(let admins of response.data){
           
           if(response.data.find(user => user.email === email)){
                console.log('user already exist')
                 
              }
           

          else{
    const role="user"        
    const data={email,password,role}

     axios.post('http://localhost:1100/admins',data)
   
    res.send({ message: 'User Created' });

  }

           

           

}
}).catch(console.error)
    
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 2. Login a user
server.post('/userlogin', async (req, res) => {
   
  const { email, password} = req.body;

 
    // 1. Find user in array. If not exist send error
    
    axios.get('http://localhost:1100/admins')
    .then((response)=>{
        for(let admins of response.data){
          
          
        if(admins.email !== email){
                console.log('user doesnt exist')
                console.log(admins.password)
                  
           }

           else if(admins.password !== password){
            console.log('user doesnt exist')
            console.log(admins.password)
              
       }

       else if(admins.role !== "user"){
        console.log('You are not a user')
        
          
   }

          

      else{
        
            const accesstoken = createAccessToken(admins.id);
            const refreshtoken = createRefreshToken(admins.id);
            admins.refreshtoken = refreshtoken;
            sendRefreshToken(res, refreshtoken);     
             sendAccessToken(res, req, accesstoken);
    
           }
          
        }

        
    }).catch(console.error)
  
});

// 3. Logout a user
server.post('/userlogout', (_req, res) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });
  return res.send({
    message: 'Logged out',
  });
});

// 4. Protected route
server.post('/userprotected', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({
        data: 'This is protected data.',
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 5. Get a new access token with a refresh token
server.post('/refresh_token', (req, res) => {
  const token = req.cookies.refreshtoken;

  // If we don't have a token in our request
  if (!token) return res.send({ accesstoken: '' });
  
  // We have a token then verify it!
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }



  //////token is valid, check for user exist


  axios.get('http://localhost:2200/users')
    .then((response)=>{
        for(let admins of response.data){
           if(admins.id !== payload.userId){
            res.send({ accesstoken: '' })
            
            if(admins.refreshtoken !== token){
            res.send({ accesstoken: '' })
            const accesstoken = createAccessToken(admins.id);
            const refreshtoken = createRefreshToken(admins.id);
            admins.refreshtoken = refreshtoken;
  
  //  send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
          }
           }

           
           

        }
    }).catch(console.error)

  })

   
  

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`),
);