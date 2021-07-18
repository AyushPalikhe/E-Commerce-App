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
const { fakeDB } = require('./fakeDB.js');
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

 server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// 1. Register a user
server.post('/register', async (req, res) => {
  const { email, password} = req.body;

   
    // 1. Check if the user exist
   
    axios.get('http://localhost:1100/admins')
    .then((response)=>{
        for(let admins of response.data){

          try {
           if(response.data.find(user => user.email === email)){
                console.log('user already exist')
                 
              }
           

          
     const role="admin"
     const data={email,password,role}
    axios.post('http://localhost:1100/admins',data).then(response=>{
      console.log(response.data)
    }).catch(console.error)

    
     res.send({ message: 'User Created' });
     
     {/*const sendData=async()=>{
       await axios.post('http://localhost:1100/admins',data) 
      res.send({ message: 'User Created' });
     }
    sendData()*/}
  

           

} catch (err) {
  res.send({
    error: `${err.message}`,
  });
}          

}
}).catch(console.error)
    
   
});

// 2. Login a user
server.post('/login', async (req, res) => {
   
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

       else if(admins.role !== "admin"){
        console.log('You are not admin')
         
          
   }

        

          

      else{
            const accesstoken = createAccessToken(admins.id);
            const refreshtoken = createRefreshToken(admins.id);
            admins.refreshtoken = refreshtoken;
            console.log(admins)
            axios.put(`http://localhost:1100/admins/${admins.id}`,{
            email:email,
            password:password,
            role:"admin",
            refreshtoken:refreshtoken})
            .then(res=>console.log(res.data)) 
            sendRefreshToken(res, refreshtoken);     
             sendAccessToken(res, req, accesstoken);
    
           }
          
        }

        
    }).catch(console.error)
  
});

// 3. Logout a user
server.post('/logout', (_req, res) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });

  
  // Logic here for also remove refreshtoken from db
 {/* axios.get('http://localhost:1100/admins')
  .then((response)=>{
      for(let admins of response.data){
        const refreshtoken = createRefreshToken(admins.id)
  axios.delete(`http://localhost:1100/admins/${admins.id}`,{
            refreshtoken:refreshtoken})
            .then(res=>console.log(res.data)) 
          }

        
        }).catch(console.error)*/}

  return res.send({
    message: 'Logged out',
  });
})



// 4. Protected route
server.post('/protected', async (req, res) => {
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
  
  // We have a token, then verify
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }



  //////token is valid, check for user exist


  axios.get('http://localhost:1100/admins')
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

   
  // token is valid, check if user exist
  
  {/*const user = fakeDB.find(user => user.id === payload.userId);
  if (!user) return res.send({ accesstoken: '' });
  
  // user exist, check if refreshtoken exist on user
  if (user.refreshtoken !== token)
    return res.send({ accesstoken: '' });
  
    // token exist, create new Refresh- and accesstoken
  const accesstoken = createAccessToken(user.id);
  const refreshtoken = createRefreshToken(user.id);
  
  // update refreshtoken on user in db
  // Could have different versions instead!
  user.refreshtoken = refreshtoken;
  
  // All good to go, send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
;*/}

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`),
);