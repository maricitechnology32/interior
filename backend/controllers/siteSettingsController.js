import asyncHandler from 'express-async-handler';
import SiteSettings from '../models/siteSettingsModel.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSiteSettings = asyncHandler(async (req, res) => {
    // There should only be one settings document
    let settings = await SiteSettings.findOne();

    // If no settings exist, create default settings
    if (!settings) {
        settings = await SiteSettings.create({
            heroStats: [
                { value: '500+', label: 'Projects Completed' },
                { value: '15+', label: 'Years Experience' },
                { value: '50+', label: 'Design Awards' },
            ],
        });
    }

    res.json(settings);
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSiteSettings = asyncHandler(async (req, res) => {
    let settings = await SiteSettings.findOne();

    if (!settings) {
        settings = new SiteSettings({});
    }

    // Handle image upload - if image was uploaded via middleware
    if (req.body.image) {
        // Delete old image from Cloudinary if it exists
        if (settings.heroImage?.public_id) {
            try {
                await cloudinary.uploader.destroy(settings.heroImage.public_id);
            } catch (err) {
                console.error('Failed to delete old hero image:', err);
            }
        }
        settings.heroImage = req.body.image;
    }

    // Update text fields
    const {
        heroTagline,
        heroHeading,
        heroSubheading,
        heroCta1Text,
        heroCta2Text,
        heroStats,
        siteName,
        logoUrl,
        metaDescription,
    } = req.body;

    if (heroTagline !== undefined) settings.heroTagline = heroTagline;
    if (heroHeading !== undefined) settings.heroHeading = heroHeading;
    if (heroSubheading !== undefined) settings.heroSubheading = heroSubheading;
    if (heroCta1Text !== undefined) settings.heroCta1Text = heroCta1Text;
    if (heroCta2Text !== undefined) settings.heroCta2Text = heroCta2Text;
    if (heroStats !== undefined) settings.heroStats = JSON.parse(heroStats);
    if (siteName !== undefined) settings.siteName = siteName;
    if (logoUrl !== undefined) settings.logoUrl = logoUrl;
    if (metaDescription !== undefined) settings.metaDescription = metaDescription;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
});

export { getSiteSettings, updateSiteSettings };
