import { useState, useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';

const Dot = ({ active, onClick }) => (
    <button
        onClick={onClick}
        aria-label="Переключить изображение"
        className={`rounded-full transition-all duration-200 ${
            active ? 'w-1 h-1 bg-black' : 'w-1 h-1 bg-black opacity-30'
        }`}
    />
);

const ProductImageCarousel = ({ product, variant = 'catalog' }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const images = useMemo(() => {
        if (!product) return [];
        return [
            product.main_image,
            ...(Array.isArray(product.images)
                ? product.images.map((img) => img.image)
                : []),
        ];
    }, [product]);

    const isProductView = variant === 'product';

    const nextImage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % images.length
            );
            setFade(false);
        }, 150);
    };

    const prevImage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex - 1 + images.length) % images.length
            );
            setFade(false);
        }, 150);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: nextImage,
        onSwipedRight: prevImage,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    if (!product || !product.main_image || images.length === 0 || !images[0]) {
        return <div className="h-48 w-full bg-gray-100 rounded-lg" />;
    }

    return (
        <div
            className={`relative ${isProductView ? '' : 'h-48'} w-full`}
            {...swipeHandlers}
        >
            <div
                className={`relative ${isProductView ? 'h-[500px]' : 'h-48'} rounded-lg overflow-hidden`}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={product.name}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                            currentImageIndex === index
                                ? 'opacity-100 z-10'
                                : 'opacity-0 z-0'
                        } ${isProductView ? 'object-cover' : 'object-contain'}`}
                    />
                ))}

                {isProductView && images.length > 1 && (
                    <div className="absolute bottom-2 right-2 z-20 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            ></path>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                        </svg>
                        {images.length} фото
                    </div>
                )}
            </div>

            {images.length > 1 && (
                <>
                    {isProductView ? (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            {images.length} фото
                        </div>
                    ) : (
                        <div className="absolute top-3 left-3 flex space-x-1.5 z-10">
                            {images.map((_, index) => (
                                <Dot
                                    key={index}
                                    active={index === currentImageIndex}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductImageCarousel;
