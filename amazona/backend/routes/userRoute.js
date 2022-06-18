const express = require('express');
const {getToken} = require('../util')
const User = require('../models/userModel');
const res = require('express/lib/response');

const router = express.Router();

router.post("/signin",async(req,res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(signinUser){
        res.send({
          _id: signinUser.id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
          token:getToken(signinUser)
        })


    }else{
        res.status(403).send({message:"Invalid email orac pasword!"})
    }
})

router.post("/createAdmin", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/get",async(req, res) => {
//   try {
//     let users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// })

router.get("/",async(req,res)=>{
  res.send("From user route")
  try {
    let users = await User.find();
    res.status(200).json(users);

  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router
