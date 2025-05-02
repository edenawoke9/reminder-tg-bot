import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';
import { config } from 'dotenv';

// Load environment variables
config();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
console.log('Environment variables:', {
  BOT_TOKEN: process.env.BOT_TOKEN,
  GROUP_CHAT_ID: process.env.GROUP_CHAT_ID,
  THREAD_ID: process.env.THREAD_ID
});

const dailyMessage = "🌞 Good morning! Please provide your daily update @teddzz @natty_awoke @Panther_a : \n 1. what are you working on today? \n 2. Any blockers?" 



cron.schedule('30 8 * * *', () => {
  sendDailyMessage();
  console.log('Daily message sent at 2:30');
});


function sendDailyMessage() {
  bot.sendMessage(
    process.env.GROUP_CHAT_ID,
    dailyMessage,
    {
      message_thread_id: process.env.THREAD_ID
     
    }
  )
    .then(() => {
      console.log('Message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
}
console.log('Bot is running...');



bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});