const Router = require('express');
const router = Router();

const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/profile', userController.profile);
router.put('/edit-skills', userController.editSkills);

module.exports = router;