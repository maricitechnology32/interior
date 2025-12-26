import mongoose from 'mongoose';

const aboutContentSchema = mongoose.Schema(
    {
        // Hero Section
        heroImage: {
            url: {
                type: String,
                default: 'https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=2000&auto=format&fit=crop',
            },
            public_id: { type: String, default: '' },
        },
        heroTagline: { type: String, default: 'Our Story' },
        heroTitle: { type: String, default: 'About Us' },
        heroSubtitle: { type: String, default: 'Designing with heart, crafting with soul' },

        // Stats
        stats: [
            {
                value: { type: String, required: true },
                label: { type: String, required: true },
            },
        ],

        // Who We Are Section
        aboutImage: {
            url: {
                type: String,
                default: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
            },
            public_id: { type: String, default: '' },
        },
        aboutTagline: { type: String, default: 'Who We Are' },
        aboutTitle: { type: String, default: 'Transforming Spaces Since 2009' },
        aboutParagraphs: [{ type: String }],

        // Mission & Vision
        mission: { type: String, default: 'To create unique, functional, and beautiful spaces that enhance our clients\' lives and work.' },
        vision: { type: String, default: 'To be a leading name in the interior design industry, known for innovation, quality, and client satisfaction.' },

        // Team Members
        team: [
            {
                name: { type: String, required: true },
                role: { type: String, required: true },
                image: {
                    url: { type: String },
                    public_id: { type: String },
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const AboutContent = mongoose.model('AboutContent', aboutContentSchema);

export default AboutContent;
