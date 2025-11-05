import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  price: {
    type: Number,
    min: 0,
    index: true,
  },
  productTag: {
    type: [String],
    index: true,
  },
});

export const Product = model('Product', productSchema);
