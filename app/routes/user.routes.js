module.exports = (app) => {
     const users = require("../controllers/user.controller.js");

     //Add a new user
     app.post('/user',users.addNewUser);

     //Get all users
     app.get('/user',users.findAllUsers);

     //Get a specific user
     app.get('/user/:userId',users.findUser);

     //Modify user details
     app.put('user/:userId',users.updateUser);

     //Delete a user
     app.delete('user/:userId',users.deleteUser)
}