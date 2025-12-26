import mongoose from 'mongoose';

const siteSettingsSchema = mongoose.Schema(
    {
        // Hero Section
        heroImage: {
            url: {
                type: String,
                default: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000',
            },
            public_id: {
                type: String,
                default: '',
            },
        },
        heroTagline: {
            type: String,
            default: 'Interior Design Studio',
        },
        heroHeading: {
            type: String,
            default: 'The Space Stylers',
        },
        heroSubheading: {
            type: String,
            default: 'We create personalized, functional, and stylish interiors that reflect your unique vision.',
        },
        heroCta1Text: {
            type: String,
            default: 'Get Free Consultation',
        },
        heroCta2Text: {
            type: String,
            default: 'View Our Work',
        },
        heroStats: [
            {
                value: { type: String, required: true },
                label: { type: String, required: true },
            },
        ],

        // Site-Wide Settings
        siteName: {
            type: String,
            default: 'The Space Stylers',
        },
        logoUrl: {
            type: String,
            default: '',
        },
        metaDescription: {
            type: String,
            default: 'Professional interior design services for residential and commercial spaces.',
        },
    },
    {
        timestamps: true,
    }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;
