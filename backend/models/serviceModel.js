import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            },
        },
        icon: {
            type: String,
            enum: ['home', 'building', 'utensils', 'briefcase', 'palette', 'lamp'],
            default: 'home',
        },
        link: {
            type: String,
            default: '/projects',
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
