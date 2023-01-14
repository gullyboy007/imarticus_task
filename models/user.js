import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: String, // googleId or facebookId
  username: String,
  picture: String
  
});

const User = mongoose.model('User', UserSchema);

export {User};