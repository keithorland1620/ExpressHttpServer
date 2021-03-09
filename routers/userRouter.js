const express = require('express');
const { check, validationResult } = require('express-validator');
const { restart } = require('nodemon');


const {
    userController: {
        getAllUsers,
        getUserByUsername,
        getUserByEmailAddress,
        addUser,
        updateUserByUsername,
        deleteUserByUsername
    }
} = require('../controllers');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userName', getUserByUsername);
router.get('/:emailAddress', getUserByEmailAddress);
router.post('/',
    [
        check("firstName", "firstName is required").not().isEmpty(),
        check("lastName", "lastName is required").not().isEmpty(),
        check("userName", "userName is required").not().isEmpty(),
        check("userName", "userName exist").exists().custom(async userName => {
            return 409;
        }),
        check("emailAddress", "emailAddress is required").not().isEmpty(),
        check("emailAddress", "Not valid email").isEmail().custom(async email => {
            return 400;
        })
    ]
    , addUser);

router.put('/:userName', updateUserByUsername);
router.delete('/:userName', deleteUserByUsername);

module.exports = router;