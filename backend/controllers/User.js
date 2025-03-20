const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req,res)=>{
   try {
     const {name , email , password , role} = req.body;

     //ensure all fields fulfilled

     if(!name || !email || !password) {
        res.status(400).json({
            success:false,
            message:"Fill all the fields"
        })
     }

     //check if user already exists
     let user = await User.findOne({email});
     if(user)  return res.status(400).json({ msg: "User already exists" });

     // hash password
     const hashPassword = await bcrypt.hash(password , 10); 
     
     //save new user
     user = new User({
        name , email , password:hashPassword , role
     })

     await user.save()

     res.status(200).json({
        success:true,
        user:user,
        message:"user registered succesfully"
     })

   } catch (error) {
     console.log(error);
     res.status(500).json({
        success:false,
        message:error.message
     })
   }
}

exports.login = async (req , res)=>{
   try {
      const {email,password} = req.body;

      const user = await User.findOne({email});

      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      const token = jwt.sign({id:user._id , role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"2h"})

       res.status(200).json({
        token , 
        user:{
            id:user._id , 
            name: user.name , 
            email:user.email,
            role:user.role,
        }
        });

   } catch (error) {
        console.log(error);
        res.status(500).json({
        success:false,
        message:"Server Error"
        })
   }
}