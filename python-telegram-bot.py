import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

TOKEN = "7829559002:AAFBinoqSJ7Plk1S_KAcwX2BZgo11xGr5yI"
WEBAPP_URL = "https://combines-qualification-kind-superb.trycloudflare.com"

# Создаем бота и хранилище для FSM (если нужно)
bot = Bot(token=TOKEN)
storage = MemoryStorage()

# Создаем диспетчер и регистрируем роутер
dp = Dispatcher(storage=storage)

@dp.message(Command("start"))
async def start(message: types.Message):
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Перейти в магазин",
                    web_app=WebAppInfo(url=WEBAPP_URL)
                )
            ]
        ]
    )
    photo_url = 'https://i.pinimg.com/originals/26/37/dd/2637dd2c46ef8b6caefac0cb4a0e2621.jpg'
    caption = ("✨ Обнови гардероб с ног до головы! Стильная одежда и обувь ждут тебя в нашем магазине. "
               "Переходи прямо сейчас и найди свой идеальный образ! 👟👗")
    await message.answer_photo(photo=photo_url, caption=caption, reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
