const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Temporary placeholder routes - we'll implement these later
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Test routes are working!',
    data: []
  });
});

router.get('/available', protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Available tests route',
    data: []
  });
});

module.exports = router;
