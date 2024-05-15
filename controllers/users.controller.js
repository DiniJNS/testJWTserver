const { default: mongoose } = require("mongoose");
const User = require('../model/user_model'); 
const { compareSync } = require("bcryptjs");


exports.getAllUsers = async (req, res)=>{
    try{
        usersAll = await User.find()
        if(!usersAll){
            return res.status(400).send({message: "Failed to get all the users", usersAll})
        }

        res.status(200).send({message : "Managed to get all users", usersAll})
        
    }catch(err){
        res.status(500).send("Could not get all the users", err)
    }
}
exports.getOne = async (req, res)=>{
    try{
        const {email} = req.body

        console.log(email)
        if(!email){
            return res.status(400).send("Email cannot be empty") 
        }

        let user  = await User.findOne({email})

        if(!user){
            return res.status(400).send({message:"Cannot get user with email : ", email}) 
        }

        res.status(200).send({message: "Got user by email :", email})


    }catch(err){
        res.status(500).send({message:"Could not get the user", err})
    }
}

exports.getUsersWithLongPasswords = async (req, res) => {
    try {
        const usersWithLongPasswords = await User.find({
            $where: 'this.password.length > 10'
        });

        if (!usersWithLongPasswords || usersWithLongPasswords.length === 0) {
            return res.status(404).send("No users found with passwords longer than 10 characters.");
        }

        res.status(200).send(usersWithLongPasswords);
    } catch (err) {
        res.status(500).send("Could not retrieve users with long passwords.", err);
    }
}

exports.updateOne = async (req, res)=>{
    try{
        
        const id = req.params.id

        console.log(id)
        if(!id){
            return res.status(400).send("Email cannot be empty") 
        }

        let updatedUser  = await User.findByIdAndUpdate(id, req.body)


        if(!updatedUser){
            return res.status(404).send({message:"Cannot get user with email : ", email}) 
        }
        await updatedUser.save()

        res.status(200).send({message: "Got user by email :", updatedUser})


    }catch(err){
        res.status(500).send({message:"Could not get the user", err})
    }
}

exports.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send("User ID is required.");
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send("User not found.");
        }

        res.status(200).send("User deleted successfully.");
    } catch (err) {
        res.status(500).send("Could not delete the user.", err);
    }
};

exports.deleteAll = async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).send("All users deleted successfully.");
    } catch (err) {
        res.status(500).send("Could not delete all users.", err);
    }
};


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.user_dBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.admin_dBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };