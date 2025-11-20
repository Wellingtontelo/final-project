import mongoose from 'mongoose';

const policeReportSchema = new mongoose.Schema({
  citizenName: {
    type: String,
    required: true
  },
  citizenPhone: {
    type: String,
    required: true
  },
  incidentType: {
    type: String,
    required: true
  },
  description: {
    type: String,
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
    enum: ['received', 'under_investigation', 'resolved'],
    default: 'received'
  },
  referenceNumber: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Generate reference number before saving
policeReportSchema.pre('save', async function(next) {
  if (!this.referenceNumber) {
    const count = await mongoose.model('PoliceReport').countDocuments();
    this.referenceNumber = `PR${Date.now()}${count + 1}`;
  }
  next();
});

export default mongoose.model('PoliceReport', policeReportSchema);