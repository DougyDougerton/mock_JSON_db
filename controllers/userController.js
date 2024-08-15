const fs = require('fs').promises;
const filePath = './database.json';
const { readData, writeData } = require('../utils/file');



//route handler controller function
async function createUser(req, res){
    try{
        const data = await readData();
        const lastUser = data.users[data.users.length - 1];
        const nextId = lastUser ? lastUser.id  + 1 : 1;

        const newUser = {
            id: nextId,
            username: req.body.username,
            first_name: req.body.first_name,
            email: req.body.email,
        }  

        data.users.push(newUser);
        await writeData(data);

      res.json("아싸!! User added successfully! 잘했어!");

     }catch(error){
      
        res.status(500).json("Internal Server Error");
        console.log(error);
    }
}

//function for updating user
async function updateUser(req, res) {
    try{
        const data = await readData();
        const user = data.users.find(user => user.id === parseInt(req.params.id));

        if(user){
            user.username = req.body.new_username || user.username;
            user.first_name = req.body.new_first_name || user.first_name;
            user.email = req.body.new_email || user.email;
        } else {
            res.status(404).send("User not found");
        }

    } catch(error) {
        res.status(500).json("Internal Server Error");
    }
}

async function deleteUser(req, res) {
    try{
        const data = await readData();
        const userIndex = data.users.findIndex(user => user.id === parseInt(req.params.id));

        if(userIndex !== -1){
            data.users.splice(userIndex, 1);
            await writeData(data);
            res.redirect('/');
        } else {
            res.status(404).send("User not found");
        }

    } catch(error) {
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
}