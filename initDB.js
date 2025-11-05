import { askTerminal } from './utils/cliUtils.js';
import { connectMongoose } from './lib/connectMongoose.js';
import { Product } from './models/Product.js';
import { User } from './models/User.js';

const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

const answer = await askTerminal(
  '¿Estás seguro que deseas eliminar toda la información de la base de datos? [y/N]'
);

if (answer.toLowerCase() !== 'y') {
  console.log('Script abortado');
  process.exit(0);
}

await seedUsers();
await seedProducts();

await connection.close();
process.exit(0);

async function deleteCollection(Model, modelName) {
  const deletedCollection = await Model.deleteMany();
  console.log(`Deleted ${deletedCollection.deletedCount} ${modelName}`);
}

async function insertCollection(Model, items, modelName) {
  const insertedCollection = await Model.insertMany(items);
  console.log(`Inserted ${insertedCollection.length} ${modelName}`);
}

async function seedUsers() {
  const USERS = [
    { email: 'user_one@example.com' },
    { email: 'user_two@example.com' },
    { email: 'admin@example.com' },
  ];

  for (const user of USERS) {
    user.password = await User.hashPassword('1234');
  }

  await deleteCollection(User, 'Users');
  await insertCollection(User, USERS, 'Users');
}

async function seedProducts() {
  await deleteCollection(Product, 'Products');

  const [user1, user2, admin] = await Promise.all([
    User.findOne({ email: 'user_one@example.com' }),
    User.findOne({ email: 'user_two@example.com' }),
    User.findOne({ email: 'admin@example.com' }),
  ]);

  const PRODUCTS = [
    // admin (solo 2)
    { name: 'laptop', owner: admin._id, price: 1200, productTags: ['work', 'mobile'] },
    {
      name: 'electric scooter',
      owner: admin._id,
      price: 450,
      productTags: ['motor', 'lifestyle'],
    },

    // user1
    { name: 'mobile phone', owner: user1._id, price: 250, productTags: ['mobile'] },
    {
      name: 'running shoes',
      owner: user1._id,
      price: 350,
      productTags: ['lifestyle', 'work'],
    },
    { name: 'car', owner: user1._id, price: 15000, productTags: ['motor'] },
    { name: 'tablet', owner: user1._id, price: 399, productTags: ['mobile', 'work'] },
    { name: 'gaming phone', owner: user1._id, price: 899, productTags: ['mobile'] },
    {
      name: 'camera',
      owner: user1._id,
      price: 599,
      productTags: ['mobile', 'lifestyle'],
    },
    { name: 'headphones', owner: user1._id, price: 199, productTags: ['mobile'] },
    { name: 'monitor', owner: user1._id, price: 299, productTags: ['work'] },
    { name: 'keyboard', owner: user1._id, price: 89, productTags: ['work'] },
    { name: 'mouse', owner: user1._id, price: 49, productTags: ['work'] },
    { name: 'printer', owner: user1._id, price: 199, productTags: ['work'] },
    { name: 'speaker', owner: user1._id, price: 149, productTags: ['lifestyle'] },
    { name: 'coffee maker', owner: user1._id, price: 79, productTags: ['lifestyle'] },
    { name: 'microwave', owner: user1._id, price: 129, productTags: ['lifestyle'] },
    {
      name: 'vacuum cleaner',
      owner: user1._id,
      price: 199,
      productTags: ['lifestyle'],
    },
    {
      name: 'air purifier',
      owner: user1._id,
      price: 179,
      productTags: ['lifestyle', 'work'],
    },
    { name: 'blender', owner: user1._id, price: 69, productTags: ['lifestyle'] },
    { name: 'toaster', owner: user1._id, price: 39, productTags: ['lifestyle'] },
    { name: 'fan', owner: user1._id, price: 59, productTags: ['lifestyle'] },
    {
      name: 'power drill',
      owner: user1._id,
      price: 149,
      productTags: ['work', 'motor'],
    },
    { name: 'desktop pc', owner: user1._id, price: 899, productTags: ['work'] },

    // user2
    {
      name: 'bicycle',
      owner: user2._id,
      price: 2500,
      productTags: ['lifestyle', 'motor'],
    },
    {
      name: 'motorcycle',
      owner: user2._id,
      price: 5000,
      productTags: ['motor', 'lifestyle'],
    },
    {
      name: 'smartwatch',
      owner: user2._id,
      price: 199,
      productTags: ['mobile', 'lifestyle'],
    },
    { name: 'desk chair', owner: user2._id, price: 150, productTags: ['work'] },
    { name: 'office desk', owner: user2._id, price: 250, productTags: ['work'] },
    { name: 'tennis racket', owner: user2._id, price: 159, productTags: ['lifestyle'] },
    { name: 'golf clubs', owner: user2._id, price: 499, productTags: ['lifestyle'] },
    {
      name: 'skateboard',
      owner: user2._id,
      price: 89,
      productTags: ['lifestyle', 'motor'],
    },
    { name: 'camping tent', owner: user2._id, price: 199, productTags: ['lifestyle'] },
    {
      name: 'hiking boots',
      owner: user2._id,
      price: 129,
      productTags: ['lifestyle', 'work'],
    },
    { name: 'fishing rod', owner: user2._id, price: 79, productTags: ['lifestyle'] },
    { name: 'snowboard', owner: user2._id, price: 399, productTags: ['lifestyle'] },
    { name: 'kayak', owner: user2._id, price: 599, productTags: ['lifestyle'] },
    { name: 'yoga mat', owner: user2._id, price: 29, productTags: ['lifestyle'] },
    { name: 'dumbbells', owner: user2._id, price: 89, productTags: ['lifestyle'] },
    { name: 'basketball', owner: user2._id, price: 29, productTags: ['lifestyle'] },
    { name: 'soccer ball', owner: user2._id, price: 25, productTags: ['lifestyle'] },
    { name: 'volleyball', owner: user2._id, price: 25, productTags: ['lifestyle'] },
    {
      name: 'ping pong table',
      owner: user2._id,
      price: 299,
      productTags: ['lifestyle'],
    },
    { name: 'boxing gloves', owner: user2._id, price: 49, productTags: ['lifestyle'] },
    { name: 'helmet', owner: user2._id, price: 89, productTags: ['motor', 'work'] },
    { name: 'car jack', owner: user2._id, price: 59, productTags: ['motor'] },
  ];

  await insertCollection(Product, PRODUCTS, 'Products');
}
