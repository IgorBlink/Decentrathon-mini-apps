const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const vacancyRouter = require('./vacancyRouter');

router.use('/users', userRouter);
router.use('/vanancy', vacancyRouter);

module.exports = router;