const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },  // <-- Added indexing here
  password: { type: String, required: true },
  // any other fields you want to include
}, { timestamps: true });

// Method to hash the password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare the provided password with the stored hashed password
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};  // <-- Added this method here

const User = mongoose.model('User', UserSchema);
module.exports = User;
