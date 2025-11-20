import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['theft', 'violence', 'vandalism', 'suspicious_activity', 'hotspot', 'other'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'under_review', 'resolved', 'escalated'],
    default: 'pending'
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  evidence: [{
    type: String // URLs to uploaded files
  }],
  policeReport: {
    referenceNumber: String,
    status: String,
    dateReported: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Report', reportSchema);