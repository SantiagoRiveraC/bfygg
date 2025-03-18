import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;