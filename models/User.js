const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  password: { 
    type: String, 
    required: true,
    validate: [ 
      function(value) {
        return value.length >= 8; 
      }, 
      'Password should be at least 8 characters long.'
    ]
  },
  // any other fields you want to include
}, { timestamps: true });

// Method to hash the password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch(err) {
      next(err); // Forward the error to mongoose
    }
  } else {
    next();
  }
});

// Method to compare the provided password with the stored hashed password
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
