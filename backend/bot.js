require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
    ctx.replyWithHTML(`
🎉 <b>Welcome, ${ctx.from.first_name}!</b> 👋

We're excited to have you in <b>BlinkHunter</b> — the ultimate HR platform for the IT sector, right here in <b>Telegram</b>! 🌐💼

🚀 Here you can:
• Find top talent in the IT industry 🧑‍💻
• Connect with potential employers 🔍
• Manage your career with ease 📈

Click the button below to explore the platform and take your first step into the world of opportunities! 💼

`, 
    Markup.inlineKeyboard([
        Markup.button.url('🚀 Open Web App', process.env.WEB_URL)
    ]));
});

module.exports = bot;
