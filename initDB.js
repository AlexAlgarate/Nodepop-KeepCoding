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
    { name: 'mobile phone', owner: user1._id, price: 250, productTags: ['mobile'] },
    {
      name: 'running shoes',
      owner: user1._id,
      price: 350,
      productTags: ['lifestyle', 'work'],
    },
    { name: 'bicycle', owner: user2._id, price: 2500, productTags: ['lifestyle'] },
    {
      name: 'laptop',
      owner: admin._id,
      price: 250,
      productTags: ['work', 'lifestyle'],
    },
  ];

  await insertCollection(Product, PRODUCTS, 'Products');
}
