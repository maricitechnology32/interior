import asyncHandler from 'express-async-handler';
import ContactSettings from '../models/contactSettingsModel.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get contact settings
// @route   GET /api/contact-settings
// @access  Public
const getContactSettings = asyncHandler(async (req, res) => {
    let settings = await ContactSettings.findOne();

    if (!settings) {
        settings = await ContactSettings.create({});
    }

    res.json(settings);
});

// @desc    Update contact settings
// @route   PUT /api/contact-settings
// @access  Private/Admin
const updateContactSettings = asyncHandler(async (req, res) => {
    let settings = await ContactSettings.findOne();

    if (!settings) {
        settings = new ContactSettings({});
    }

    // Handle hero image upload
    if (req.body.image) {
        if (settings.heroImage?.public_id) {
            try {
                await cloudinary.uploader.destroy(settings.heroImage.public_id);
            } catch (err) {
                console.error('Failed to delete old hero image:', err);
            }
        }
        settings.heroImage = req.body.image;
    }

    const {
        heroTagline,
        heroTitle,
        heroSubtitle,
        phone,
        email,
        address,
        businessHours,
        socialLinks,
        footerTagline,
        copyrightText,
        developerName,
        developerUrl,
    } = req.body;

    if (heroTagline !== undefined) settings.heroTagline = heroTagline;
    if (heroTitle !== undefined) settings.heroTitle = heroTitle;
    if (heroSubtitle !== undefined) settings.heroSubtitle = heroSubtitle;
    if (phone !== undefined) settings.phone = phone;
    if (email !== undefined) settings.email = email;
    if (address !== undefined) settings.address = address;
    if (businessHours !== undefined) settings.businessHours = businessHours;
    if (socialLinks !== undefined) settings.socialLinks = JSON.parse(socialLinks);
    if (footerTagline !== undefined) settings.footerTagline = footerTagline;
    if (copyrightText !== undefined) settings.copyrightText = copyrightText;
    if (developerName !== undefined) settings.developerName = developerName;
    if (developerUrl !== undefined) settings.developerUrl = developerUrl;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
});

export { getContactSettings, updateContactSettings };
