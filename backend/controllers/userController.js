const User = require('../models/userSchema');
const bot = require('../bot');
const { getImageFromFileId } = require('../utils/getImage');

exports.login = async (req,res) => {
    try {
        const { telegramId } = req.body;

        const user = await User.findOne({id: telegramId});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }       

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch(error) {
        console.log('Ошибка при входе: ' + error);
        return res.status(500).json({
            success: false,
            data: {
                error: 'Internal server error'
            }
        });
    }
}

exports.register = async (req, res) => {
    try {
        const { telegramId, userType, skills } = req.body;

        const user = await User.findOne({id: telegramId});

        if (user) {
            return res.status(200).json({
                success: true,
                data: user
            });
        }       

        const userData = await bot.telegram.getChat(telegramId);
        const photo = await getImageFromFileId(userData.photo.big_file_id, bot);

        const newUser = new User({
            id: telegramId,
            username: userData.username,
            name: `${userData.first_name ? userData.first_name : ""}${userData.last_name ? ` ${userData.last_name}` : ""}`,
            photo: photo,
            skills: skills,
            isEmployer: userType === 'employer'
        });

        await newUser.save();

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch(error) {
        console.log('Ошибка при созданий пользователя: ' + error);
        return res.status(500).json({
            success: false,
            data: {
                error: 'Internal server error'
            }
        });
    }
}

exports.profile = async (req, res) => {
    try {
        const { telegramId } = req.body;

        const user = await User.findOne({id: telegramId});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }  

        return res.status(200).json({success: true, data: user});
    } catch (error) {
        console.log('Ошибка при получений профиля: ' + error);
        return res.status(500).json({
            success: false,
            data: {
                error: 'Internal server error'
            }
        });
    }
}

exports.editSkills = async (req, res) => {
    try {
        const {telegramId, skills } = req.body;

        const user = await User.findOne({id: telegramId});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const newSkills = user.skills === skills ? user.skills : skills;

        user.skills = newSkills

        await user.save();

        return res.status(200).json({success: true, data: user});
    } catch (error) {
        console.log('Ошибка при изменений скиллов: ' + error);
        return res.status(500).json({
            success: false,
            data: {
                error: 'Internal server error'
            }
        });
    }
}