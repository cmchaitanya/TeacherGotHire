const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  bio: {
    type: String,
    maxlength: 500
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  testResults: [{
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test'
    },
    score: Number,
    percentage: Number,
    completedAt: Date
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  documents: [{
    type: String,
    url: String,
    uploadedAt: Date
  }]
}, {
  timestamps: true
});

// Calculate overall performance score
teacherSchema.methods.calculatePerformanceScore = function() {
  if (this.testResults.length === 0) return 0;
  
  const totalScore = this.testResults.reduce((sum, result) => sum + result.percentage, 0);
  return Math.round(totalScore / this.testResults.length);
};

module.exports = mongoose.model('Teacher', teacherSchema);
