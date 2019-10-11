const User = require('../models/user.model.js');

//create and save a new user
exports.addNewUser = (req,res) => {

    //validate the request
    if(!req.body.firstName){

        return res.status(400).send({
            message:"First name of the user cannot be empty"
        });

    }else if (!req.body.lastName){

        return res.status(400).send({
            message:"Last name of the user cannot be empty"
        });

    }else if (!req.body.birthday){

        return res.status(400).send({
            message:"Birthday of the user cannot be empty"
        });

    }else {

        //create the new user
        const user = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            birthday:req.body.birthday
        });

        //add the new user to the db
        user.save().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:err.message || "Error has occured while saving the new user"
            });
        });


    }

};

//Retrieve all the users
exports.findAllUsers = (req,res) => {

    User.find().then((users) => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Error has occured while retrieving the data"
        });
    });

};

//Retrieve a specific user
exports.findUser = (req,res) => {

    User.findById(req.params.userId).then((user) => {

        if(!user){
            return res.status(404).send({
                message:"There is no user for given user id"
            });
        }
        res.send(user);

    }).catch(err => {

        res.status(500).send({
            message:err.message || "Error has occured while retrieving the data"
        });

    });

}


//Modify user details
exports.updateUser = (req,res) => {

    //validate the request
    if(!req.body.firstName){

        return res.status(400).send({
            message:"First name of the user cannot be empty"
        });

    }else if (!req.body.lastName){

        return res.status(400).send({
            message:"Last name of the user cannot be empty"
        });

    }else if (!req.body.birthday){

        return res.status(400).send({
            message:"Birthday of the user cannot be empty"
        });

    }else {

        //find the user and update the user
        User.findByIdAndUpdate(req.params.userId,{

            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            birthday:req.body,birthday

        },{new:true}).then(user => {

            if(!user){
                return res.status(404).send({
                    message:"There is no user for given user id"
                });
            }

            res.send(user);
        }).catch(err => {

            return res.status(500).send({
                message: "Error updating note with id " + req.params.userId
            });

        });
    }

};


//delete a user
exports.deleteUser = (req,res) => {

    User.findOneAndRemove(req.params.userId).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User was deleted successfully!"});
    }).catch(err => {
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });

};