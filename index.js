const express = require('express');
const { userContext } = require('./db');
const { body, validationResult, check } = require('express-validator');
const { userRouter } = require('./routers');

const app = express();
const port = 8080;
function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

app.use('/userRouter', userRouter);
app.use(express.json());

app.get('/users/user/email/:emailAddress/', async (req, res) => {
    const { emailAddress } = req.params;
    const user = await userContext.getUserByEmailAddress(emailAddress);
    if(isEmptyObject(user)){
        return res.status(404).json({ errors: "404 Email address not found!" });
    }
    res.send(user);
})

app.get('/user/:userName/', async (req, res) => {
    const { userName } = req.params;
    const user = await userContext.getUserByUsername(userName);
    if(isEmptyObject(user)){
        return res.status(404).json({ errors: "404 Username not found!" });
    }
    res.send(user);
})

app.get('/users/', async (req, res) => {
    const user = await userContext.getAllUser();
    res.send(user);
})

app.put('/users/user/:userName', async (req, res) => {
    const { userName } = req.params;
    const user = await userContext.getUserByUsername(userName);
    if(isEmptyObject(user)){
        return res.status(400).json({ errors: "Username cannot be found" });
    }
     await userContext.updateUserByUsername(userName, req.body);
     res.send(200);
});

app.post('/users/',check('emailAddress').isEmail(), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      res.end();
    }
    const user = await userContext.getUserByUsername(req.body.userName);
    if(!isEmptyObject(user)){
        return res.status(409).json({ errors: "username already exist" });
        res.end();
    }
     await userContext.addUser(req.body);
     res.sendStatus(200);
})

app.delete('/users/user/:userName', async (req, res) => {
    const { userName } = req.params;
    await userContext.deleteByUserName(userName);
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Started server at port: ${port}`);
})