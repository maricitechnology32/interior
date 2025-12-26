import mongoose from 'mongoose';

const transformationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    beforeImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    afterImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    isActive: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

// Ensure only one transformation is active at a time (optional logic handled in controller)
const Transformation = mongoose.model('Transformation', transformationSchema);

export default Transformation;
