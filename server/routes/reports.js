import express from 'express';
import { body, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import Report from '../models/Report.js';

const router = express.Router();

// Create new report (requires auth)
router.post('/', [
  auth,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').isIn(['theft', 'violence', 'vandalism', 'suspicious_activity', 'hotspot', 'other']),
  body('location').notEmpty().withMessage('Location is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const report = new Report({
      ...req.body,
      reportedBy: req.user.id
    });

    await report.save();
    await report.populate('reportedBy', 'name location');
    
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      details: 'Failed to create report' 
    });
  }
});

export default router;
