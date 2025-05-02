import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';


const token = '7301479607:AAEnf4EoEviYPS1pvtVQsI95Z1sTrV3ej1s';


const bot = new TelegramBot(token, { polling: true });


const groupChatId = -1002247764203;
const dailyThreadId = 17; 

const dailyMessage = "🌞 Good morning! Please provide your daily update @teddzz @natty_awoke @Panther_a : \n 1. what are you working on today? \n 2. Any blockers?" 



cron.schedule('30 8 * * *', () => {
  sendDailyMessage();
  console.log('Daily message sent at 2:30');
});


function sendDailyMessage() {
  bot.sendMessage(
    groupChatId,
    dailyMessage,
    {
      message_thread_id: dailyThreadId
     
    }
  )
    .then(() => {
      console.log('Message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
}



bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});