const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf("6251019697:AAF3bkN8cEn7fSXuxDf9CMiGz3JV566jKWU");

bot.start((ctx) => ctx.reply('Welcome'));
bot.on('message', async (ctx)=>{
    if(ctx.message){
        console.log(ctx.message)
        const url = `http://api.weatherapi.com/v1/current.json?key=ff9de80c46c546df8e9213858232102&q=${ctx.message.text}&aqi=yes`;
        const response = await axios.get(url);
        console.log(response.data.current.air_quality);
        ctx.reply(`${response.data.location.name}: ${response.data.current.temp_c}C
        Скорость ветра: ${response.data.current.vis_km}км/ч
        Воздух:
        Оксид углерода: ${response.data.current.air_quality.co}
        Озон: ${response.data.current.air_quality.o3}
        Диоксид азота: ${response.data.current.air_quality.no2}
        Диоксид серы: ${response.data.current.air_quality.so2}
        `)
    }   
})
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));