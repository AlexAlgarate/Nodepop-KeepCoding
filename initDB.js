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

async function seedUsers() {
  const USERS = [
    { email: 'user_one@example.com', password: await User.hashPassword('1234') },
    { email: 'user_two@example.com', password: await User.hashPassword('1234') },
    { email: 'admin@example.com', password: await User.hashPassword('1234') },
  ];

  const deletedResult = await User.deleteMany();
  console.log(`Deleted ${deletedResult.deletedCount} Users`);

  const insertResult = await User.insertMany(USERS);
  console.log(`Inserted ${insertResult.length} Users`);
}

async function seedProducts() {
  const deletedResult = await Product.deleteMany();
  console.log(`Deleted ${deletedResult.deletedCount} Products`);

  const [user1, user2, admin] = await Promise.all([
    User.findOne({ email: 'user_one@example.com' }),
    User.findOne({ email: 'user_two@example.com' }),
    User.findOne({ email: 'admin@example.com' }),
  ]);

  const PRODUCTS = [
    { name: 'mobile phone', owner: user1._id, price: 250, productTags: ['mobile,'] },
    { name: 'bicycle', owner: user2._id, price: 2500, productTags: ['lifestyle,'] },
    {
      name: 'laptop',
      owner: admin._id,
      price: 250,
      productTags: ['work', 'lifestyle'],
    },
  ];

  const insertResult = await Product.insertMany(PRODUCTS);
  console.log(`Inserted ${insertResult.length} Products`);
}
