import asyncHandler from 'express-async-handler';
import AboutContent from '../models/aboutContentModel.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get about page content
// @route   GET /api/about
// @access  Public
const getAboutContent = asyncHandler(async (req, res) => {
    let content = await AboutContent.findOne();

    if (!content) {
        content = await AboutContent.create({
            stats: [
                { value: '500+', label: 'Projects Completed' },
                { value: '15+', label: 'Years Experience' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '50+', label: 'Design Awards' },
            ],
            aboutParagraphs: [
                'At The Space Stylers, we believe that every space has a story to tell. Our passion is bringing that story to life through thoughtful, personalized design.',
                'Founded on principles of creativity, quality, and exceptional service, we are a team of designers and craftsmen dedicated to making your vision a reality.',
            ],
            team: [
                { name: 'Karan Bohara', role: 'Senior Architect', image: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', public_id: '' } },
                { name: 'Pratik Bhusal', role: 'Project Manager', image: { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', public_id: '' } },
                { name: 'Pawan Bhusal', role: 'Creative Director', image: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', public_id: '' } },
                { name: 'Sita Sharma', role: 'Interior Designer', image: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', public_id: '' } },
            ],
        });
    }

    res.json(content);
});

// @desc    Update about page content
// @route   PUT /api/about
// @access  Private/Admin
const updateAboutContent = asyncHandler(async (req, res) => {
    let content = await AboutContent.findOne();

    if (!content) {
        content = new AboutContent({});
    }

    const {
        heroTagline,
        heroTitle,
        heroSubtitle,
        stats,
        aboutTagline,
        aboutTitle,
        aboutParagraphs,
        mission,
        vision,
        team,
    } = req.body;

    // Handle hero image upload
    if (req.body.heroImage) {
        if (content.heroImage?.public_id) {
            try {
                await cloudinary.uploader.destroy(content.heroImage.public_id);
            } catch (err) {
                console.error('Failed to delete old hero image:', err);
            }
        }
        content.heroImage = req.body.heroImage;
    }

    // Handle about section image upload
    if (req.body.aboutImage) {
        if (content.aboutImage?.public_id) {
            try {
                await cloudinary.uploader.destroy(content.aboutImage.public_id);
            } catch (err) {
                console.error('Failed to delete old about image:', err);
            }
        }
        content.aboutImage = req.body.aboutImage;
    }

    // Update text fields
    if (heroTagline !== undefined) content.heroTagline = heroTagline;
    if (heroTitle !== undefined) content.heroTitle = heroTitle;
    if (heroSubtitle !== undefined) content.heroSubtitle = heroSubtitle;
    if (stats !== undefined) content.stats = JSON.parse(stats);
    if (aboutTagline !== undefined) content.aboutTagline = aboutTagline;
    if (aboutTitle !== undefined) content.aboutTitle = aboutTitle;
    if (aboutParagraphs !== undefined) content.aboutParagraphs = JSON.parse(aboutParagraphs);
    if (mission !== undefined) content.mission = mission;
    if (vision !== undefined) content.vision = vision;
    if (team !== undefined) content.team = JSON.parse(team);

    const updatedContent = await content.save();
    res.json(updatedContent);
});

// @desc    Upload team member image
// @route   POST /api/about/team-image
// @access  Private/Admin
const uploadTeamMemberImage = asyncHandler(async (req, res) => {
    if (!req.body.image) {
        res.status(400);
        throw new Error('No image uploaded');
    }

    res.json({
        url: req.body.image.url,
        public_id: req.body.image.public_id,
    });
});

export { getAboutContent, updateAboutContent, uploadTeamMemberImage };
