import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/blogModel.js';
import User from './models/userModel.js';

dotenv.config();

const sampleBlogs = [
    {
        title: 'Top Interior Design Trends for Commercial Spaces in 2024',
        image: {
            url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
            public_id: 'seed_blog_1_cover',
        },
        sections: [
            {
                type: 'text',
                content: 'The commercial interior design landscape is evolving rapidly, with businesses recognizing the profound impact that well-designed spaces have on employee productivity, client impressions, and brand identity. In 2024, we are seeing a remarkable shift towards designs that prioritize both functionality and aesthetic appeal.',
            },
            {
                type: 'image',
                image: {
                    url: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=2070&auto=format&fit=crop',
                    public_id: 'seed_blog_1_img1',
                },
                caption: 'Open floor plans with flexible workspaces are becoming the norm in modern offices.',
            },
            {
                type: 'text',
                content: 'Biophilic design continues to dominate, with companies incorporating natural elements like living walls, indoor plants, and natural materials to create healthier, more inspiring work environments. Studies show that exposure to natural elements can increase productivity by up to 15%.',
            },
            {
                type: 'image',
                image: {
                    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop',
                    public_id: 'seed_blog_1_img2',
                },
                caption: 'Biophilic design elements bring nature indoors, improving employee wellbeing.',
            },
            {
                type: 'text',
                content: 'Sustainable materials and energy-efficient designs are no longer optional but essential. Clients are increasingly asking for LEED-certified designs and eco-friendly material choices. This shift reflects a broader societal move towards environmental responsibility.',
            },
        ],
    },
    {
        title: 'Creating Luxurious Living Rooms: A Complete Design Guide',
        image: {
            url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop',
            public_id: 'seed_blog_2_cover',
        },
        sections: [
            {
                type: 'text',
                content: 'The living room is the heart of any home – a space where families gather, guests are entertained, and memories are made. Creating a luxurious living room does not necessarily mean spending extravagantly; it is about thoughtful design choices that elevate the space.',
            },
            {
                type: 'image',
                image: {
                    url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop',
                    public_id: 'seed_blog_2_img1',
                },
                caption: 'Layered lighting creates depth and ambiance in living spaces.',
            },
            {
                type: 'text',
                content: 'Start with a cohesive color palette. Neutral tones like warm tans, creamy whites, and charcoal grays create a sophisticated backdrop. Add pops of color through accessories like throw pillows, artwork, and decorative objects to bring personality to the space.',
            },
            {
                type: 'image',
                image: {
                    url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=2070&auto=format&fit=crop',
                    public_id: 'seed_blog_2_img2',
                },
                caption: 'A neutral color palette with thoughtful accent pieces creates timeless elegance.',
            },
            {
                type: 'text',
                content: 'Invest in quality statement furniture pieces. A luxurious sofa with premium upholstery, an elegant coffee table, and carefully selected accent chairs can transform an ordinary room into an extraordinary space. Remember, it is better to have fewer high-quality pieces than many mediocre ones.',
            },
        ],
    },
    {
        title: 'Hotel Interior Design: Creating Memorable Guest Experiences',
        image: {
            url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
            public_id: 'seed_blog_3_cover',
        },
        sections: [
            {
                type: 'text',
                content: 'In the hospitality industry, interior design plays a crucial role in defining the guest experience. From the moment visitors step into the lobby, every design element contributes to their perception of the brand and their overall satisfaction.',
            },
            {
                type: 'image',
                image: {
                    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop',
                    public_id: 'seed_blog_3_img1',
                },
                caption: 'Grand hotel lobbies create powerful first impressions for guests.',
            },
            {
                type: 'text',
                content: 'Lobby design should balance grandeur with comfort. Large-scale artwork, dramatic lighting fixtures, and premium materials like marble and brass set the tone. Comfortable seating areas invite guests to linger, while clever space planning ensures smooth flow during busy check-in times.',
            },
            {
                type: 'image',
                image: {
                    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop',
                    public_id: 'seed_blog_3_img2',
                },
                caption: 'Boutique hotel rooms combine luxury with personalized touches.',
            },
            {
                type: 'text',
                content: 'Guest rooms should feel like a home away from home while offering something special that guests cannot replicate. High-quality bedding, thoughtful amenities, intuitive lighting controls, and Instagram-worthy design moments all contribute to memorable stays that generate repeat visits and positive reviews.',
            },
        ],
    },
];

const seedBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Find an admin user to associate with blogs
        const adminUser = await User.findOne({ role: 'Admin' });
        if (!adminUser) {
            console.error('No admin user found. Please create an admin user first.');
            process.exit(1);
        }

        // Clear existing blogs
        await Blog.deleteMany({});
        console.log('Existing blogs cleared.');

        // Add user reference to each blog
        const blogsWithUser = sampleBlogs.map((blog) => ({
            ...blog,
            user: adminUser._id,
        }));

        // Insert sample blogs
        await Blog.insertMany(blogsWithUser);
        console.log(`${sampleBlogs.length} sample blogs seeded successfully!`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding blogs:', error);
        process.exit(1);
    }
};

seedBlogs();
