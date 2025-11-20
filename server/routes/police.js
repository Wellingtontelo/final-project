import express from 'express';
import PoliceReport from '../models/PoliceReport.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Submit police report (no auth required)
router.post('/report', [
  body('citizenName').notEmpty().withMessage('Name is required'),
  body('citizenPhone').notEmpty().withMessage('Phone number is required'),
  body('incidentType').notEmpty().withMessage('Incident type is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('location').notEmpty().withMessage('Location is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const policeReport = new PoliceReport(req.body);
    await policeReport.save();
    
    res.status(201).json({
      message: 'Police report submitted successfully',
      referenceNumber: policeReport.referenceNumber
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all police reports (for police dashboard - would add auth in production)
router.get('/reports', async (req, res) => {
  try {
    const { status, urgency } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (urgency) filter.urgency = urgency;

    const reports = await PoliceReport.find(filter).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update police report status
router.put('/reports/:id', async (req, res) => {
  try {
    const report = await PoliceReport.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.status = req.body.status || report.status;
    await report.save();
    
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;