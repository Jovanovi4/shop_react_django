import { useState } from 'react';

const InfoBlockSlider = ({ articles }) => {
    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

    // Функция для перехода к следующей статье
    const nextArticle = () => {
        setCurrentArticleIndex(
            (prevIndex) => (prevIndex + 1) % articles.length
        );
    };

    // Функция для перехода к предыдущей статье
    const prevArticle = () => {
        setCurrentArticleIndex(
            (prevIndex) => (prevIndex - 1 + articles.length) % articles.length
        );
    };

    // Открытие статьи по клику
    const openArticle = (url) => {
        window.open(url, '_blank');
    };

    // Центрирование текущего блока
    const centerBlock = (index) => {
        const container = document.querySelector('.slider-container');
        const blocks = container.querySelectorAll('.slider-block');
        blocks[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center', // Центрирует блок
            inline: 'center',
        });
    };

    return (
        <div className="relative w-full">
            {/* Белая подложка с отступами */}
            <div className="relative bg-white rounded-lg shadow-sm px-4 py-6 mx-3 z-2 h-[220px] my-[-30px]">
                <h2 className="text-xl font-bold mb-4">Полезная информация</h2>
            </div>

            {/* Слайдер, который "вылазит" за пределы подложки */}
            <div
                className="absolute left-0 right-0 px-[38px] mt-[-120px] z-10 flex overflow-x-auto space-x-4 pb-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="slider-block flex-shrink-0 w-[150px] cursor-pointer"
                        onClick={() => openArticle(article.url)}
                    >
                        <div className="relative rounded-lg overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <h3 className="absolute top-2 left-2 text-xs font-bold text-white bg-black px-2 py-1 rounded-md opacity-70">
                                {article.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const UsefulInfo = () => {
    // Пример статей с Telegra.ph
    const articles = [
        {
            title: 'Доставка',
            image: '/img/delivery.jpg',
            url: 'https://telegra.ph/your-article-link-1',
        },
        {
            title: 'Гарантия',
            image: '/img/shield.jpg',
            url: 'https://telegra.ph/your-article-link-2',
        },
        {
            title: 'Что мы продаем?',
            image: '/img/baggreen.jpg',
            url: 'https://telegra.ph/your-article-link-3',
        },
        {
            title: 'Друзья +500Р',
            image: '/img/face.jpg',
            url: 'https://telegra.ph/your-article-link-4',
        },
        {
            title: 'Скидки',
            image: '/img/sale.jpg',
            url: 'https://telegra.ph/your-article-link-5',
        },
    ];

    return (
        <div className="py-6">
            <InfoBlockSlider articles={articles} />
        </div>
    );
};

export default UsefulInfo;
