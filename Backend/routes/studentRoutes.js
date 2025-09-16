const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Temporary placeholder routes - we'll implement these later
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Student routes are working!',
    data: []
  });
});

router.get('/profile', protect, authorize('student'), (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Student profile route',
    data: { userId: req.user.id }
  });
});

module.exports = router;
