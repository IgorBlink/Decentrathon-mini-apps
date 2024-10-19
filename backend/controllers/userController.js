const User = require('../models/userSchema');
const bot = require('../bot');
const { getImageFromFileId } = require('../utils/getImage');
const Vacancy = require('../models/vacancySchema');

exports.login = async (req,res) => {
    try {
        const { telegramID } = req.body;

        const user = await User.findOne({_id: telegramID});

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
        const { telegramID, userType, skills, grades, title, content } = req.body;

        const user = await User.findOne({_id: telegramID});

        if (user) {
            return res.status(200).json({
                success: true,
                data: user
            });
        }
        if (userType !== 'employer' && userType !== 'talent') {
            return res.status(400).json({ success: false, message: 'Incorrect userType' });
        }        

        const userData = await bot.telegram.getChat(telegramID);
        let photo;
        try {
            photo = await getImageFromFileId(userData.photo.big_file_id, bot);
        } catch (error) {
            photo = '';
        }

        const newUser = new User({
            _id: telegramID,
            username: userData.username,
            name: `${userData.first_name ? userData.first_name : ""}${userData.last_name ? ` ${userData.last_name}` : ""}`,
            photo: photo,
            userType: userType
        });

        const newVacancy = new Vacancy({
            title: title,
            content: content,
            photo: photo,
            skills: skills,
            grades: grades,
            userId: telegramID
        });

        await newUser.save();
        await newVacancy.save();

        return res.status(200).json({
            success: true,
            data: {
                newUser, 
                newVacancy
            }
        });
    } catch(error) {
        console.log('Ошибка при созданий пользователя и его резюме: ' + error);
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

        const user = await User.findOne({_id: telegramId});

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

        const user = await User.findOne({_id: telegramId});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const vacancy = await Vacancy.findOne({userId: telegramId});

        vacancy.skills = vacancy.skills === skills ? vacancy.skills : skills;

        await vacancy.save();

        return res.status(200).json({success: true, data: vacancy});
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

exports.editBio = async (req, res) => {
    try {
        const {telegramId, bio } = req.body;

        const user = await User.findOne({_id: telegramId});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.bio = user.bio === bio ? user.bio : bio;

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