import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/serviceModel.js';

dotenv.config();

const services = [
    {
        title: 'Residential Design',
        description: 'Transform your home into a personalized sanctuary. From cozy apartments to luxurious villas, we create living spaces that reflect your lifestyle and aspirations.',
        image: { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070', public_id: 'seed_service_1' },
        icon: 'home',
        link: '/projects?category=Residential',
        order: 1,
        isActive: true,
    },
    {
        title: 'Commercial Design',
        description: 'Create inspiring workspaces that boost productivity and impress clients. Our commercial designs balance functionality with aesthetics for offices, retail, and more.',
        image: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069', public_id: 'seed_service_2' },
        icon: 'building',
        link: '/projects?category=Commercial',
        order: 2,
        isActive: true,
    },
    {
        title: 'Hospitality Design',
        description: 'Design memorable guest experiences for hotels, restaurants, and entertainment venues. We create spaces that delight visitors and build brand loyalty.',
        image: { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070', public_id: 'seed_service_3' },
        icon: 'utensils',
        link: '/projects?category=Hospitality',
        order: 3,
        isActive: true,
    },
    {
        title: 'Space Planning',
        description: 'Optimize your space for maximum efficiency and flow. Our space planning services ensure every square foot serves a purpose while maintaining aesthetic harmony.',
        image: { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070', public_id: 'seed_service_4' },
        icon: 'briefcase',
        link: '/contact',
        order: 4,
        isActive: true,
    },
    {
        title: 'Custom Furniture',
        description: 'Bespoke furniture designed exclusively for your space. From statement pieces to built-in solutions, we craft furniture that fits perfectly and lasts generations.',
        image: { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070', public_id: 'seed_service_5' },
        icon: 'lamp',
        link: '/contact',
        order: 5,
        isActive: true,
    },
    {
        title: 'Color Consultation',
        description: 'Create the perfect palette for your space. Our color experts help you select harmonious colors that evoke the right mood and complement your style.',
        image: { url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=2070', public_id: 'seed_service_6' },
        icon: 'palette',
        link: '/contact',
        order: 6,
        isActive: true,
    },
    {
        title: 'Lighting Design',
        description: 'Illuminate your spaces with expert lighting solutions. We design layered lighting schemes that enhance ambiance, functionality, and architectural features.',
        image: { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074', public_id: 'seed_service_7' },
        icon: 'lamp',
        link: '/contact',
        order: 7,
        isActive: true,
    },
    {
        title: 'Kitchen and Bath Design',
        description: 'Specialized design for the most important rooms in your home. We create kitchens and bathrooms that combine beauty with exceptional functionality.',
        image: { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053', public_id: 'seed_service_8' },
        icon: 'home',
        link: '/contact',
        order: 8,
        isActive: true,
    },
    {
        title: 'Renovation Planning',
        description: 'Complete renovation guidance from concept to completion. We help you navigate the renovation process with expert planning and project coordination.',
        image: { url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070', public_id: 'seed_service_9' },
        icon: 'building',
        link: '/contact',
        order: 9,
        isActive: true,
    },
    {
        title: 'Sustainable Design',
        description: 'Eco-friendly interiors that are good for you and the planet. We incorporate sustainable materials, energy efficiency, and biophilic design principles.',
        image: { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070', public_id: 'seed_service_10' },
        icon: 'palette',
        link: '/contact',
        order: 10,
        isActive: true,
    },
];

const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Drop the entire collection to remove any bad indexes
        try {
            await mongoose.connection.db.dropCollection('services');
            console.log('Collection dropped.');
        } catch (e) {
            console.log('No collection to drop or error:', e.message);
        }

        // Insert all services
        const result = await Service.insertMany(services);
        console.log(`${result.length} services seeded successfully!`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

seedServices();
