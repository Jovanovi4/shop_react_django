import React, { useEffect, useState } from 'react';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe.user;

        if (user) {
            fetch('/api/telegram-user/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telegram_id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    photo_url: user.photo_url,
                }),
            })
                .then((res) => res.json())
                .then((data) => setUserData(data));
        }
    }, []);

    return userData ? (
        <div className="p-4">
            <img
                src={userData.photo_url}
                alt="Avatar"
                className="w-16 h-16 rounded-full mb-2"
            />
            <h2 className="text-lg font-semibold">
                {userData.first_name} @{userData.username}
            </h2>
            <p className="text-sm text-gray-600">Баллы: {userData.points}</p>
        </div>
    ) : (
        <p className="p-4 text-center">Загрузка профиля...</p>
    );
};

export default UserDashboard;
