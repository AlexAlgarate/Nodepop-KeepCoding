import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'UserProduct',
  },
  price: {
    type: Number,
    min: 0,
    index: true,
  },
  productTags: {
    type: [String],
    index: true,
  },
});

export const Product = model('Product', productSchema);
