const Router = require('express');
const router = Router();

const vacancyController = require('../controllers/vacancyController');

router.get('/get-vacancy-by-search', vacancyController.getVacancyBySearch);
router.get('/get-vacancy', vacancyController.getVacancy);
router.post('/set-like', vacancyController.setLikeVacancy);

module.exports = router;