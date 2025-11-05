import { Schema, model } from 'mongoose';
import { User } from './User.js';

const productSchema = new Schema({
  name: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  productTag: {
    type: [String],
    index: true,
  },
});

export const Product = model('Product', productSchema);
