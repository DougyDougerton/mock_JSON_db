// const fs = require('fs').promises;
// const filePath = require('../database.json');
// //util functions
// async function readData(){
//     try{
//         const data = await fs.readFile(filePath, 'utf-8');
//         return JSON.parse(data);
//     }catch(err) {
//         throw new Error('Internal Server Error', err);
//     }
//     async function writeData(){
//         try{
//             const data = await fs.writeFile(filePath, JSON.stringify(data, null, 2));
//             return JSON.parse(data);
//         }catch(err) {
//             throw new Error('Internal Server Error', err);
//         }
//     }
// }
// //route handler controller function
// async function createUser(req, res){
//     try{
//         const data = await readData();
//         const lastUser = data.users[data.users.length - 1];
//         const nextId = lastUser ? lastUser.id + 1 : 1;

//         const newUser = {
//             id: nextId,
//             username: req.body.username,
//             first_name: req.body.first_name,
//             email: req.body.email,
//         }


//         data.users.push(newUser);
//         await writeData(data);

//         res.send("User added successfully!");

//     }catch(err){

//         res.status(500).send("Internal Server Error:", err);

//     }

// }

// module.exports = {
//     createUser
// }


const fs = require('fs').promises;
const filePath = './database.json'; // Adjust the path according to your file structure

// Util functions
async function readData() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Internal Server Error', err);
    }
}

async function writeData(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2)); // No need to parse here
    } catch (err) {
        throw new Error('Internal Server Error', err);
    }
}

// Route handler controller function
async function createUser(req, res) {
    try {
        const data = await readData();
        const lastUser = data.users[data.users.length - 1];
        const nextId = lastUser ? lastUser.id + 1 : 1;

        const newUser = {
            id: nextId,
            username: req.body.username,
            first_name: req.body.first_name,
            email: req.body.email,
        };

        data.users.push(newUser);
        await writeData(data);

        res.send("User added successfully!");

    } catch (err) {
        res.status(500).send("Internal Server Error:", err);
    }
}

module.exports = {
    createUser,
};
