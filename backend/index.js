require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
    ctx.replyWithHTML(`
Hello, <b>${ctx.from.first_name}</b>! 👋

Welcome to <b>TravelService</b> - your personal assistant in the world of travel! 🌍✈️

Here you can:
    - Find the best deals on tours and hotels 🏨
    - Find out information about attractions 🏰
    - Get recommendations for places to visit 🗺️

Ready to start your journey? 🚀`, 
    Markup.inlineKeyboard([
        Markup.button.url('Open web app', 'https://t.me/travelservicebot/travelservice')
    ]));
});

bot.launch({
    dropPendingUpdates: true
});