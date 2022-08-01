import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  console.log(Object.keys(req));
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      username: req.body.username,
    });
    //   (user.name = 'Shubh'),
    //     (user.username = 'striver'),
    //     (user.email = 'shubh@gmail.com'),
    //     (user.password = 'shubh1234');
    res.send(user);
    user.save((err, data) => {
      if (err) {
        console.log('Error in insertion');
      } else {
        console.log('Data Inserted');
      }
    });
  } catch {
    console.log('post error');
  }
});

Router.post('/login', async (req, res) => {
  if (
    await User.findOne({
      username: req.body.username,
      password: req.body.password,
    })
  ) {
    console.log('Present');
  } else {
    console.log('Absent');
  }
  console.log(req.body);
  // res.json(report);
});
