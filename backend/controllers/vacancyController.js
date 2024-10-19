const Vacancy = require('../models/vacancySchema');
const User = require('../models/userSchema');
const Match = require('../models/matchSchema');
const getOppositeId = require('../utils/getOppositeId');
const bot = require('../bot');

// exports.getVacancyBySearch = async (req, res) => {
//     try {
//         const { telegramID, skills } = req.body;

//         const user = await User.findOne({_id: telegramID});

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }
//         if (!skills || !skills.length) {
//             return res.status(400).json({
//                 success: false,
//                 data: {
//                     error: 'Skills array is required'
//                 }
//             });
//         }

//         const vacancies = await Vacancy.find({
//             skills: { $elemMatch: { $in: skills } },
//             isEmployer: !user.isEmployer
//         });

//         if (!vacancies.length) {
//             return res.status(404).json({
//                 success: false,
//                 data: {
//                     message: 'No vacancies found matching the skills'
//                 }
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: {
//                 vacancies
//             }
//         });

//     } catch (error) {
//         console.log('Ошибка при получений вакансий через пойск: ' + error);
//         return res.status(500).json({
//             success: false,
//             data: {
//                 error: 'Internal server error'
//             }
//         });
//     }
// }

exports.getVacancy = async (req, res) => {
    try {
        const { telegramID } = req.body;

        const user = await User.findOne({ _id: telegramID });
        const vacancy = await Vacancy.findOne({ userId: telegramID });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (!vacancy.skills || !vacancy.skills.length) {
            return res.status(400).json({
                success: false,
                message: 'User has no skills',
            });
        }

        const oppositeUserIds = await getOppositeId.getOppositeUserIds(telegramID);

        const matchingVacancies = await Vacancy.find({
            skills: { $in: vacancy.skills },
            grades: { $in: vacancy.grades },
            userId: { $in: oppositeUserIds }
        });

        console.log(matchingVacancies);

        if (!matchingVacancies.length) {
            return res.status(404).json({
                success: false,
                message: 'No matching vacancies found',
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                matchingVacancies,
            },
        });

    } catch (error) {
        console.log('Ошибка при поиске подходящих вакансий: ' + error);
        return res.status(500).json({
            success: false,
            data: {
                error: 'Internal server error',
            },
        });
    }
}

exports.getMyVacancy = async (req, res) => {
    try {
        const { telegramID } = req.body;

        const user = await User.findOne({_id: telegramID});

        if (!user) {
            return res.status(404).json({sucess: false, message: 'User not found'});
        }

        const vacancy = await Vacancy.findOne({userId: telegramID});

        if (!vacancy) {
            return res.status(404).json({success: false, message: 'Vacancu not found'});
        }

        return res.status(200).json({success: true, data: vacancy});
    } catch (error) {
        console.log('Ошибка при получении своих скиллов: ' + error);
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
        const { telegramID, vacancyID } = req.body;

        const user = await User.findOne({_id: telegramID});
        const vacancy = await Vacancy.findOne({_id: vacancyID});

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

        const userSecond = await User.findOne({id: vacancy.userId});

        user.likedIt.push(userSecond.username);

        if (user.likedIt.includes(userSecond.username) && userSecond.likedIt.includes(user.username)) {
            const newMatch = new Match({
                firstUsername: user.username,
                secondUsername: userSecond.username
            });

            await newMatch.save();
            
            await bot.telegram.sendMessage(vacancy.userId, `
                🚀 You’ve received a <b>match</b> with ${userSecond.username}! 
                `);
            await bot.telegram.sendMessage(telegramID, `
                🚀 You’ve received a <b>match</b> with ${user.username}! 
                `);

            return res.status(200).json({success: true, data: newMatch});
        }

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