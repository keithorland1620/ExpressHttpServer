const { check, validationResult } = require('express-validator'); 
const { userContext } = require('../db');
const { User } = require('../models');


const getAllUsers = async (req, res) => {
   
    const users = await userContext.getAll();
    res.send(users);
}

const getUserByUsername = async (req, res) => {
    const { userName } = req.params;
    const user = await userContext.getUserByUsername(userName);

    if(user === null) res.sendStatus(404);

    res.send(user);

    
}

const getUserByEmailAddress =  async (req, res) => {
    const { emailAddress } = req.params;
    body('emailAddress').isEmail();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const user = await userContext.getUserByEmailAddress(emailAddress);

    if(user === null) res.sendStatus(404);


    res.send(user);
}

const addUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = new User(firstName, lastName, username, email, id);
    await userContext.insert(user);

    res.sendStatus(201);  
}
const updateUserByUsername = async (req, res) => {
    const {username} = req.params;
    await userContext.updateUserByUsername(username, req.body);
    res.send(200);

}

const deleteUserByUsername = async (req, res) => {
    const { userName } = req.params;
    await userContext.deleteByUserName(userName);
    res.send(200);    
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    deleteUserByUsername,
    getUserByEmailAddress,
    updateUserByUsername,
    addUser
}