import mongoose from 'mongoose';

const contactSettingsSchema = mongoose.Schema(
    {
        // Contact Hero Section
        heroImage: {
            url: {
                type: String,
                default: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
            },
            public_id: { type: String, default: '' },
        },
        heroTagline: { type: String, default: 'Get In Touch' },
        heroTitle: { type: String, default: 'Contact Us' },
        heroSubtitle: { type: String, default: 'Ready to transform your space? Let\'s start the conversation.' },

        // Company Contact Info
        phone: { type: String, default: '+977 9851336903' },
        email: { type: String, default: 'contact@thespacestylers.com' },
        address: { type: String, default: 'Shankhamul, New Baneshwor, Kathmandu' },

        // Business Hours
        businessHours: { type: String, default: 'Mon - Fri: 9:00 AM - 6:00 PM' },

        // Social Media Links
        socialLinks: {
            facebook: { type: String, default: 'https://facebook.com' },
            instagram: { type: String, default: 'https://instagram.com' },
            linkedin: { type: String, default: 'https://linkedin.com' },
            twitter: { type: String, default: '' },
            youtube: { type: String, default: '' },
        },

        // Footer Settings
        footerTagline: {
            type: String,
            default: 'Creating personalized, functional, and stylish interiors that reflect your unique vision and transform spaces into experiences.',
        },
        copyrightText: {
            type: String,
            default: 'The Space Stylers',
        },
        developerName: { type: String, default: 'Marici Technology' },
        developerUrl: { type: String, default: 'https://maricitechnology.com' },
    },
    {
        timestamps: true,
    }
);

const ContactSettings = mongoose.model('ContactSettings', contactSettingsSchema);

export default ContactSettings;
