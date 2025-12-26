import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Testimonial from './models/testimonialModel.js';
import User from './models/userModel.js';

dotenv.config();

const testimonials = [
    {
        name: 'Priya Sharma',
        title: 'Homeowner, Kathmandu',
        quote: 'The Space Stylers completely transformed our home. Their attention to detail and understanding of our lifestyle was incredible. Every room now feels both beautiful and functional. I could not be happier with the results!',
        rating: 5,
        image: {
            url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
            public_id: 'seed_testimonial_1',
        },
    },
    {
        name: 'Rajesh Thapa',
        title: 'CEO, TechVenture Nepal',
        quote: 'Our new office space has completely changed how our team works. The design perfectly balances open collaboration areas with private spaces. Our employees love coming to work now, and clients are always impressed.',
        rating: 5,
        image: {
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
            public_id: 'seed_testimonial_2',
        },
    },
    {
        name: 'Sunita Gurung',
        title: 'Hotel Owner, Pokhara',
        quote: 'Working with The Space Stylers on our boutique hotel was a wonderful experience. They understood our vision for blending traditional Nepali elements with modern luxury. Guest feedback has been overwhelmingly positive!',
        rating: 5,
        image: {
            url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
            public_id: 'seed_testimonial_3',
        },
    },
    {
        name: 'Arjun Basnet',
        title: 'Restaurant Owner, Lalitpur',
        quote: 'The restaurant design exceeded all our expectations. The ambiance perfectly complements our menu and has become a talking point among our customers. Revenue has increased by 30% since the redesign!',
        rating: 5,
        image: {
            url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
            public_id: 'seed_testimonial_4',
        },
    },
];

const seedTestimonials = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const adminUser = await User.findOne({ role: 'Admin' });
        if (!adminUser) {
            console.error('No admin user found. Please create an admin user first.');
            process.exit(1);
        }

        // Drop collection to avoid index issues
        try {
            await mongoose.connection.db.dropCollection('testimonials');
            console.log('Collection dropped.');
        } catch (e) {
            console.log('No collection to drop.');
        }

        const testimonialsWithUser = testimonials.map((t) => ({
            ...t,
            user: adminUser._id,
        }));

        await Testimonial.insertMany(testimonialsWithUser);
        console.log(`${testimonials.length} testimonials seeded successfully!`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

seedTestimonials();
