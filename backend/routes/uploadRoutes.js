import express from 'express';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', handleSingleUpload('interior_uploads'), (req, res) => {
    if (!req.body.image) {
        return res.status(400).json({ message: 'No image file provided or upload failed.' });
    }
    res.send({
        image: req.body.image.url,
        public_id: req.body.image.public_id,
    });
});

export default router;
