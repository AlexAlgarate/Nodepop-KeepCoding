import { compare, hash } from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
});

userSchema.statics.hashPassword = (clearPassword) => {
  return hash(clearPassword, 10);
};

userSchema.methods.comparePassword = function (plainPassword) {
  return compare(plainPassword, this.password);
};

export const User = model('User', userSchema);
