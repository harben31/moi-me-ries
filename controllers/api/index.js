const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bucketRoutes = require('./bucketRoutes');
const toDoRoutes = require('./toDoRoutes');
const doneRoutes =require('./doneRoutes');

router.use('/users', userRoutes);
router.use('/buckets', bucketRoutes);
router.use('/drops', toDoRoutes);
router.use('/splashes', doneRoutes);

module.exports = router;