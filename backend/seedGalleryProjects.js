import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gallery from './models/galleryModel.js';
import Project from './models/projectModel.js';
import User from './models/userModel.js';

dotenv.config();

const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070', caption: 'Modern minimalist living room' },
    { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070', caption: 'Elegant bedroom design' },
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074', caption: 'Contemporary kitchen interior' },
    { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053', caption: 'Luxurious bathroom spa' },
    { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070', caption: 'Cozy reading nook' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070', caption: 'Open plan dining area' },
    { url: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=2070', caption: 'Creative office workspace' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069', caption: 'Modern commercial lobby' },
    { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070', caption: 'Boutique hotel reception' },
    { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025', caption: 'Luxury restaurant interior' },
    { url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=2070', caption: 'Scandinavian living space' },
    { url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070', caption: 'Industrial loft design' },
];

const projects = [
    {
        title: 'Luxury Penthouse Renovation',
        description: 'Complete transformation of a 3,000 sq ft penthouse in the heart of the city. Features include custom millwork, smart home integration, and panoramic city views with floor-to-ceiling windows.',
        category: 'Residential',
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070',
        ],
    },
    {
        title: 'Modern Mountain Retreat',
        description: 'A contemporary mountain home designed to blend seamlessly with its natural surroundings. Featuring natural stone, timber accents, and sustainable materials throughout.',
        category: 'Residential',
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074',
        ],
    },
    {
        title: 'Urban Loft Conversion',
        description: 'Industrial warehouse converted into a stunning open-concept living space. Exposed brick, steel beams, and concrete floors paired with modern furnishings.',
        category: 'Residential',
        images: [
            'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070',
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070',
        ],
    },
    {
        title: 'Tech Startup Headquarters',
        description: 'Dynamic workspace designed to foster creativity and collaboration. Features include open workstations, private pods, a game room, and a rooftop terrace.',
        category: 'Commercial',
        images: [
            'https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=2070',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069',
        ],
    },
    {
        title: 'Law Firm Executive Offices',
        description: 'Sophisticated and professional interior design for a prestigious law firm. Rich wood paneling, leather furnishings, and custom lighting create an atmosphere of trust and expertise.',
        category: 'Commercial',
        images: [
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069',
        ],
    },
    {
        title: 'Boutique Retail Store',
        description: 'Eye-catching retail design for a luxury fashion boutique. Custom display fixtures, mood lighting, and a VIP fitting area create an exclusive shopping experience.',
        category: 'Commercial',
        images: [
            'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2074',
            'https://images.unsplash.com/photo-1567449303078-57ad995bd329?q=80&w=2074',
        ],
    },
    {
        title: 'Five-Star Hotel Lobby',
        description: 'Grand hotel lobby redesign featuring a stunning chandelier, marble floors, and comfortable seating areas. The design balances opulence with approachability.',
        category: 'Hospitality',
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
        ],
    },
    {
        title: 'Fine Dining Restaurant',
        description: 'Intimate restaurant interior with warm wood tones, soft lighting, and plush seating. Every detail designed to enhance the dining experience.',
        category: 'Hospitality',
        images: [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070',
            'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070',
        ],
    },
    {
        title: 'Wellness Spa Center',
        description: 'Tranquil spa environment designed for relaxation and rejuvenation. Natural materials, soft colors, and carefully planned lighting create a serene atmosphere.',
        category: 'Hospitality',
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
        ],
    },
    {
        title: 'Rooftop Bar & Lounge',
        description: 'Stylish rooftop venue with stunning city views. Features include custom bar design, outdoor seating with weather protection, and ambient lighting.',
        category: 'Hospitality',
        images: [
            'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069',
            'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2074',
        ],
    },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const adminUser = await User.findOne({ role: 'Admin' });
        if (!adminUser) {
            console.error('No admin user found. Please create an admin user first.');
            process.exit(1);
        }

        // Seed Gallery
        await Gallery.deleteMany({});
        console.log('Existing gallery cleared.');

        const galleryData = galleryImages.map((img, index) => ({
            caption: img.caption,
            image: { url: img.url, public_id: `seed_gallery_${index + 1}` },
            user: adminUser._id,
        }));
        await Gallery.insertMany(galleryData);
        console.log(`${galleryData.length} gallery images seeded.`);

        // Seed Projects
        await Project.deleteMany({});
        console.log('Existing projects cleared.');

        const projectData = projects.map((proj, index) => ({
            title: proj.title,
            description: proj.description,
            category: proj.category,
            imageUrls: proj.images.map((url, imgIndex) => ({
                url,
                public_id: `seed_project_${index + 1}_img_${imgIndex + 1}`,
            })),
            user: adminUser._id,
        }));
        await Project.insertMany(projectData);
        console.log(`${projectData.length} projects seeded.`);

        console.log('\n✅ All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
