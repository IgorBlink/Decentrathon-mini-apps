const User = require("../models/userSchema");

exports.getOppositeUserIds = async (telegramID) => {
    try {
        const user = await User.findOne({ _id: telegramID });

        if (!user) {
            throw new Error('User not found');
        }

        const oppositeUserType = user.userType === 'employer' ? 'talent' : 'employer';

        const oppositeUsers = await User.find({ userType: oppositeUserType });

        return oppositeUsers.map(user => user._id);

    } catch (error) {
        console.error('Ошибка при поиске пользователей с противоположным userType: ' + error);
        throw new Error('Failed to get opposite userIds');
    }
};
