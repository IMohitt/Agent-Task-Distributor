const Agent = require('../models/agent')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createAgent = async (req,res)=>{
   try {
     const {name , email , mobile,  password } = req.body;

     //ensure all fields fulfilled

     if(!name || !email || !mobile || !password) {
        res.status(400).json({
            success:false,
            message:"Fill all the fields"
        })
     }

     //check if user already exists
     let agent = await Agent.findOne({email});
     if(agent)  return res.status(400).json({ msg: "Agent already exists" });

     // hash password
     const hashPassword = await bcrypt.hash(password , 10); 
     
     //save new user
     agent = new Agent({
        name , 
        email ,
        mobile, 
        password:hashPassword,
     })

     await agent.save()
     
     res.status(200).json({
        success:true,
        agent:agent,
        message:"Agent added succesfully"
     })

   } catch (error) {
     console.log(error);
     res.status(500).json({
        success:false,
        message:error.message
     })
   }
}

exports.getAgents = async (req,res)=>{
   try {
      const agents = await Agent.find();
      res.status(200).json({
         data:agents,
         success:true,
      })
   } catch (error) {
      console.log(error);
     res.status(500).json({
        success:false,
        message:error.message
     })
   }
}


exports.updateAgent = async (req, res) => {
   try {
     const { id } = req.params;
     const { name, email, mobile, password } = req.body;
 
     const updateData = { name, email, mobile };
     if (password) updateData.password = await bcrypt.hash(password, 10);
 
     const updatedAgent = await Agent.findByIdAndUpdate(id, updateData, { new: true });
 
     if (!updatedAgent) return res.status(404).json({ message: "Agent not found" });
 
     res.status(200).json({ success: true, agent: updatedAgent, message: "Agent updated successfully" });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
 };
 
 // Delete Agent
 exports.deleteAgent = async (req, res) => {
   try {
     const { id } = req.params;
     const deletedAgent = await Agent.findByIdAndDelete(id);
     if (!deletedAgent) return res.status(404).json({ message: "Agent not found" });
     res.status(200).json({ success: true, message: "Agent deleted successfully" });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
 };