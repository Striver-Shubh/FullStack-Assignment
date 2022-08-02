import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

export const Router = express.Router();

const SignUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('Authenticate', SignUpSchema);

Router.post('/signup', async (req, res) => {
  console.log('Post started....');
  // console.log(Object.keys(req));
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      username: req.body.username,
    });
    user.save((err: any, data: any) => {
      if (err) {
        console.log('Error in insertion', err);
      } else {
        console.log('Data Inserted');
      }
      res.status(200).send(true);
    });
  } catch {
    console.log('post error');
  }
});

Router.post('/login', authenticateToken, async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  console.log(Object.keys(req.body));
  if (user !== null) {
    console.log('Logged In');
    // const accesstoken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN);
    // console.log('AccessToken: ', accesstoken);
    const HashCheck = await bcrypt.compare(req.body.password, user.password);
    console.log(req.body.password, user.password);
    console.log('HashCheck: ', HashCheck);
    if (HashCheck) {
      res.send(true);
      console.log('true');
    } else {
      res.send(false);
      console.log('false');
    }
  } else {
    console.log('Hey: ', req.body);
  }
  // res.json(report);
});

// Router.get('/profile', authenticateToken, (req, res) => {
//   console.log('profile Data: ', req.body);
//   res.send(req.body);
// });

function authenticateToken(req: any, res: any, next: any) {
  console.log('Authentication', req);
  const accesstoken = jwt.sign({ user: 'das2' }, process.env.ACCESS_TOKEN);
  const authHeader = req.headers['authorization'];
  const token = authHeader && accesstoken;
  console.log('token :: ', token);
  if (token == null) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err: any, user: any) => {
    if (err) {
      console.log('Error: ', err);
      return res.sendStatus(403);
    }
    res.user = user;
    console.log(res.user);
    next();
  });
}
