import { compare, hash } from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.hashPassword = (clearPassword, salt) => {
  return hash(clearPassword, salt);
};

userSchema.methods.comparePassword = function (plainPassword) {
  return compare(plainPassword, this.password);
};

export const User = model('UserProduct', userSchema);
