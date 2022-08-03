import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
const sendGrid = require('@sendgrid/mail');

export const Router = express.Router();

const SignUpSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

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
        res.send(false);
        return;
      } else {
        const msg = {
          to: user.email,
          from: 'tarun.agrawal@geminisolutions.com',
          subject: 'Welcome to my FullStack World',
          text: 'Congratulations! You are now a member of our Fullstack World',
        };
        sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
        sendGrid
          .send(msg)
          .then((res: any) => {
            console.log('Mail Sent Succesfully');
          })
          .catch((e: any) => {
            console.error('SendGrid Error', e);
          });
        console.log('Data Inserted');
      }
      res.send(true);
    });
  } catch {
    console.log('post error');
    res.send(false);
  }
});

Router.post('/login', authenticateToken, async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  console.log(Object.keys(req.body), user);
  if (user !== null) {
    console.log('Logged In');
    // const accesstoken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN);
    // console.log('AccessToken: ', accesstoken);
    const HashCheck = await bcrypt.compare(req.body.password, user.password);
    console.log(req.body.password, user.password);
    console.log('HashCheck: ', HashCheck, res.locals);
    if (HashCheck && res.locals.user) {
      res.send({ bool: true, user, token: res.locals.token });
      console.log('true');
    } else {
      res.send({ bool: false });
      console.log('false');
    }
  } else {
    console.log('Hey: ', req.body);
  }
  // res.json(report);
});

function authenticateToken(req: any, res: any, next: any) {
  console.log('Authentication');
  const accesstoken = jwt.sign(
    { user: req.body.username },
    process.env.ACCESS_TOKEN
  );
  if (accesstoken == null) res.sendStatus(401);
  jwt.verify(accesstoken, process.env.ACCESS_TOKEN, (err: any, user: any) => {
    if (err) {
      console.log('Error: ', err);
      return res.sendStatus(403);
    }
    const jwtdata = {
      bod: req.body,
      user,
      token: accesstoken,
    };
    console.log({ res });
    res.locals = jwtdata;
    next();
  });
}

Router.put('/profile/:id', (req, res) => {
  console.log('Update data', Object.keys(req.body));
  const user = User.findByIdAndUpdate(
    req.body._id,
    req.body,
    (err: any, data: any) => {
      if (err) {
        console.log('Error in update', err);
        res.send(false);
      } else {
        console.log('Data Update');
        res.send(true);
      }
    }
  );
});

Router.delete('/profile/:id', (req: any, res: any) => {
  console.log(req.params, req.params.id);
  User.findByIdAndDelete({ _id: req.params.id }, (err: any, data: any) => {
    if (err) {
      console.log('Error in Delete');
      res.send(false);
    } else {
      console.log('Deleted Account');
      res.send(true);
    }
  });
});
