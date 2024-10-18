const Vacancy = require('../models/vacancySchema');
const User = require('../models/userSchema');
const bot = require('../bot');

exports.getVacancyBySearch = async (req, res) => {
    try {
        const { telegramId, skills } = req.body;

        const user = await User.findOne({telegramId});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if (!skills || !skills.length) {
            return res.status(400).json({
                success: false,
                data: {
                    error: 'Skills array is required'
                }
            });
        }

        const vacancies = await Vacancy.find({
            skills: { $elemMatch: { $in: skills } },
            isEmployer: !user.isEmployer
        });

        if (!vacancies.length) {
            return res.status(404).json({
                success: false,
                data: {
                    message: 'No vacancies found matching the skills'
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                vacancies
            }
        });

    } catch (error) {
        console.log('Ошибка при получений вакансий через пойск: ' + error);
        return res.status(500).json({
            success: false,
            data: {
                error: 'Internal server error'
            }
        });
    }
}

exports.getVacancy = async (req, res) => {
    try {
        const { telegramId } = req.body;

        const user = await User.findOne({ uid: telegramId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.skills || !user.skills.length) {
            return res.status(400).json({
                success: false,
                message: 'User has no skills'
            });
        }

        const candidates = await User.find({
            is_employer: !user.isEmployer,
            skills: { $in: user.skills }
        });

        if (!candidates.length) {
            return res.status(404).json({
                success: false,
                message: 'No matching candidates found'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                candidates
            }
        });

    } catch (error) {
        console.log('Ошибка при получении пользователей с совпадающими скиллами: ' + error);
        return res.status(500).json({
            success: false,
            data: {
                error: 'Internal server error'
            }
        });
    }
}

exports.setLikeVacancy = async (req, res) => {
    try {
        const { telegramId, vacancyId } = req.body;

        const user = await User.findOne({id: telegramId});
        const vacancy = await Vacancy.findOne({id: vacancyId});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if (!vacancy) {
            return res.status(404).json({
                success: false,
                message: 'Vacancy not found'
            });
        }

        console.log(vacancy);

        return res.status(200).json({success: true, data: vacancy});
    } catch (error) {
        console.log('Ошибка при получении пользователей с совпадающими скиллами: ' + error);
        return res.status(500).json({
            success: false,
            data: {
                error: 'Internal server error'
            }
        });
    }
}