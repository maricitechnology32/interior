import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'Admin',
    },
    {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password123',
        role: 'User',
    },
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Clear existing users
        await User.deleteMany({});
        console.log('Existing users cleared.');

        // Users are automatically hashed by the pre-save middleware in userModel
        await User.create(users);
        console.log('Users seeded successfully!');

        console.log('-----------------------------------');
        console.log('Admin Login: admin@example.com / password123');
        console.log('User Login:  user@example.com  / password123');
        console.log('-----------------------------------');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
