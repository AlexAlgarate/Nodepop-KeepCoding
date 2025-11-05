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
    { name: 'laptop', owner: admin._id, price: 1200, productTag: ['work', 'mobile'] },
    {
      name: 'electric scooter',
      owner: admin._id,
      price: 450,
      productTag: ['motor', 'lifestyle'],
    },

    // user1
    { name: 'mobile phone', owner: user1._id, price: 250, productTag: ['mobile'] },
    {
      name: 'running shoes',
      owner: user1._id,
      price: 350,
      productTag: ['lifestyle', 'work'],
    },
    { name: 'car', owner: user1._id, price: 15000, productTag: ['motor'] },
    { name: 'tablet', owner: user1._id, price: 399, productTag: ['mobile', 'work'] },
    { name: 'gaming phone', owner: user1._id, price: 899, productTag: ['mobile'] },
    {
      name: 'camera',
      owner: user1._id,
      price: 599,
      productTag: ['mobile', 'lifestyle'],
    },
    { name: 'headphones', owner: user1._id, price: 199, productTag: ['mobile'] },
    { name: 'monitor', owner: user1._id, price: 299, productTag: ['work'] },
    { name: 'keyboard', owner: user1._id, price: 89, productTag: ['work'] },
    { name: 'mouse', owner: user1._id, price: 49, productTag: ['work'] },
    { name: 'printer', owner: user1._id, price: 199, productTag: ['work'] },
    { name: 'speaker', owner: user1._id, price: 149, productTag: ['lifestyle'] },
    { name: 'coffee maker', owner: user1._id, price: 79, productTag: ['lifestyle'] },
    { name: 'microwave', owner: user1._id, price: 129, productTag: ['lifestyle'] },
    {
      name: 'vacuum cleaner',
      owner: user1._id,
      price: 199,
      productTag: ['lifestyle'],
    },
    {
      name: 'air purifier',
      owner: user1._id,
      price: 179,
      productTag: ['lifestyle', 'work'],
    },
    { name: 'blender', owner: user1._id, price: 69, productTag: ['lifestyle'] },
    { name: 'toaster', owner: user1._id, price: 39, productTag: ['lifestyle'] },
    { name: 'fan', owner: user1._id, price: 59, productTag: ['lifestyle'] },
    {
      name: 'power drill',
      owner: user1._id,
      price: 149,
      productTag: ['work', 'motor'],
    },
    { name: 'desktop pc', owner: user1._id, price: 899, productTag: ['work'] },

    // user2
    {
      name: 'bicycle',
      owner: user2._id,
      price: 2500,
      productTag: ['lifestyle', 'motor'],
    },
    {
      name: 'motorcycle',
      owner: user2._id,
      price: 5000,
      productTag: ['motor', 'lifestyle'],
    },
    {
      name: 'smartwatch',
      owner: user2._id,
      price: 199,
      productTag: ['mobile', 'lifestyle'],
    },
    { name: 'desk chair', owner: user2._id, price: 150, productTag: ['work'] },
    { name: 'office desk', owner: user2._id, price: 250, productTag: ['work'] },
    { name: 'tennis racket', owner: user2._id, price: 159, productTag: ['lifestyle'] },
    { name: 'golf clubs', owner: user2._id, price: 499, productTag: ['lifestyle'] },
    {
      name: 'skateboard',
      owner: user2._id,
      price: 89,
      productTag: ['lifestyle', 'motor'],
    },
    { name: 'camping tent', owner: user2._id, price: 199, productTag: ['lifestyle'] },
    {
      name: 'hiking boots',
      owner: user2._id,
      price: 129,
      productTag: ['lifestyle', 'work'],
    },
    { name: 'fishing rod', owner: user2._id, price: 79, productTag: ['lifestyle'] },
    { name: 'snowboard', owner: user2._id, price: 399, productTag: ['lifestyle'] },
    { name: 'kayak', owner: user2._id, price: 599, productTag: ['lifestyle'] },
    { name: 'yoga mat', owner: user2._id, price: 29, productTag: ['lifestyle'] },
    { name: 'dumbbells', owner: user2._id, price: 89, productTag: ['lifestyle'] },
    { name: 'basketball', owner: user2._id, price: 29, productTag: ['lifestyle'] },
    { name: 'soccer ball', owner: user2._id, price: 25, productTag: ['lifestyle'] },
    { name: 'volleyball', owner: user2._id, price: 25, productTag: ['lifestyle'] },
    {
      name: 'ping pong table',
      owner: user2._id,
      price: 299,
      productTag: ['lifestyle'],
    },
    { name: 'boxing gloves', owner: user2._id, price: 49, productTag: ['lifestyle'] },
    { name: 'helmet', owner: user2._id, price: 89, productTag: ['motor', 'work'] },
    { name: 'car jack', owner: user2._id, price: 59, productTag: ['motor'] },
  ];

  await insertCollection(Product, PRODUCTS, 'Products');
}
