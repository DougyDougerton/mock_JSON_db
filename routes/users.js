const express = require('express');
const userController = require('../controllers/userController');
const { readData } = require('../utils/file');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));


router.use(async (req, res, next) =>{
  try{
    const data = await readData();
    res.locals.userData = JSON.stringify(data);
  }catch(error){
    res.status(500).send("Internal Server Error");
  }
  next();
});


router.get('/', (req, res) => {
    const data = res.locals.userData;
    res.render('home', {data});
});

router.post("/users", userController.createUser);
router.post("/users/:id/update", userController.updateUser);
router.post("/users/:id/delete", userController.deleteUser);
module.exports = router;