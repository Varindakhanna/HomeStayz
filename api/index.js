const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');
const User =require('./models/User');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config()


const app=express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const imageDownloader=require('image-downloader');
const Place = require('./models/Place');


app.use(express.json())
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

console.log(process.env.MONGO_URL);
const db='mongodb+srv://booking:varinda2002@cluster0.ahzzuf1.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db);

app.get('/test',(req,res) => {

    res.json("test ok");
     
});

app.post('/register',async (req,res)=>
{
    const {name,email,password}=req.body;
   
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {

        res.status(422).json(e);
        
    }
});

app.post('/login', async (req,res) => {
    
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk=bcrypt.compareSync(password,userDoc.password)
        if(passOk){
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
                },
                jwtSecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userDoc);

            });
           
        }else{
            res.status(422).json('pass not ok');
        }
    } else{
        res.json('not found'); 
    }
});

app.get('/profile', (req,res) => {
    
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
       const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else { 
      res.json(null);
    }
  });

  app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
  });
  //console.log({__dirname});

  app.post('/upload-by-link',async(req,res)=>{
   const {link}=req.body;
   const newName= 'photo'+Date.now()+'.jpg';
   await imageDownloader.image({
    url:link,
    dest:__dirname + '/uploads/'+newName,
   })
   res.json(newName);
  });

  app.post('/places', async(req,res) => {
   // mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {
      title,address,addedPhotos,description,price,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner:userData.id,price,
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,
      });
      res.json(placeDoc);
    });
  });

  app.get('/placesGet', (req,res) => {
    console.log("someone called me hieh!?");
    //mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    console.log(token);
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const {id} = userData;
      res.json( await Place.find({owner:id}) );
    });
  });


app.listen(4000);