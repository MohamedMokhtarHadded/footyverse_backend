import logging
from typing import Final
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, filters, MessageHandler
from telegram import Update
# Commands 
TOKEN:  Final='6848441798:AAEXJ6wv1p8gU7_Fnqm-rxaqVK84Ru_-d9g'
BOT_USERNAME :Final= '@FootyV_Bot'


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f'Hello!  Welcome to the Footyverse Community. Thank you for choosing to chat with me. How can I assist you today?" {update.effective_user.first_name}!')

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f'Hello! Footyverse Community! Please type something so I can respond!" {update.effective_user.first_name}!')

async def custom_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f'This is a custom command!" {update.effective_user.first_name}!')

async def handle_responses(text: str) -> str:
    processed = text.lower()

    if 'hello' in processed:
        return 'Hey there!'

    if 'how are you' in processed:
        return 'Hey there! I am doing well, thank you for asking.'
    
    if 'mira' in processed:
        return 'Hey there! yoyo.'

    return 'I do not understand what you wrote...'

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message_type = update.message.chat.type
    text = update.message.text

    print(f'User({update.message.chat.id}) in {message_type}: "{text}"')

    if message_type == 'group':
        if BOT_USERNAME in text:
            new_text = text.replace(BOT_USERNAME, '').strip()
            response = handle_responses(new_text)
        else:
            return
    else:
        response = handle_responses(text)

    print('Bot:', response)
    await update.message.reply_text(response)

async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}')

# Define your custom filter class
class MyFilter:
    def check(self, message):
        # Implement your custom logic to check the message
        # Return True if the message passes the filter, False otherwise
        return True

if __name__ == '__main__':
    print('Starting bot...')
    app = ApplicationBuilder().token(TOKEN).build()

    # Commands
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('custom', custom_command))

    # Create an instance of your custom filter

    # Create a message handler with the filter

    # Add the message handler to the application
    app.add_handler(MessageHandler(filters.TEXT, handle_message))

    # Errors
    app.add_error_handler(error)

    # Poll the bot
    print('Polling...')
    app.run_polling(poll_interval=3)




    
