const axios = require('axios');

exports.getImageFromFileId = async (file_id, bot) => {
    try {
        const fileInfo = await bot.telegram.getFile(file_id);
        
        const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${fileInfo.file_path}`;
        
        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        return null;
    }
}