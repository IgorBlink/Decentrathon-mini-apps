require('dotenv').config();
const {Telegraf, Markup} = require('telegraf');

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
    ctx.replyWithHTML(`
        Hello, <b>${ctx.from.first_name}</b>! 👋 `,
        Markup.inlineKeyboard([
            Markup.button.url('Open web app', process.env.WEB_URL)
        ]));
});

bot.launch({
    dropPendingUpdates: true
});