import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductImageCarousel from './ProductImageCarousel';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import UserDashboard from './UserDashboard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [brands, setBrands] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/products/api/products/')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
                setFilteredProducts(response.data); // Устанавливаем все товары сраз
                // Пример добавления категорий и брендов
                const uniqueBrands = [
                    ...new Set(response.data.map((p) => p.brand)),
                ];

                setBrands(uniqueBrands);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    const handleFilterChange = (brand, priceRange) => {
        const filtered = products.filter((product) => {
            const [minPrice, maxPrice] = priceRange;
            return (
                (!brand || product.brand === brand) &&
                product.price >= minPrice &&
                product.price <= maxPrice
            );
        });
        setFilteredProducts(filtered);
    };

    if (loading) {
        return <div className="text-center mt-5">Загрузка...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-2 py-6">
            <UserDashboard />
            {/* Заголовок + иконки */}
            <div className="px-2 flex items-center justify-between mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Каталог</h1>
                <div className="flex space-x-4">
                    <button onClick={() => setShowSearch((prev) => !prev)}>
                        {/* Иконка поиска */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                            />
                        </svg>
                    </button>
                    <button onClick={() => setShowFilters((prev) => !prev)}>
                        {/* Иконка фильтра */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h10M4 18h4"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Поиск — ниже */}
            {showSearch && (
                <div className="mb-4">
                    <SearchBar
                        products={products}
                        onResults={setFilteredProducts}
                    />
                </div>
            )}

            {/* Фильтры — ниже */}
            {showFilters && (
                <div className="mb-4">
                    <FilterBar
                        onFilterChange={handleFilterChange}
                        brands={brands}
                    />
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="relative group">
                        {/* Сердечко */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(product.id);
                            }}
                            className="absolute top-2 right-2 z-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={
                                    favorites.includes(product.id)
                                        ? '#f87171'
                                        : 'white'
                                }
                                stroke={
                                    favorites.includes(product.id)
                                        ? '#f87171'
                                        : 'black'
                                }
                                strokeWidth={1}
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </button>

                        {/* Вся карточка как ссылка */}
                        <Link
                            to={`/product/${product.id}`}
                            className="block bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <ProductImageCarousel product={product} />
                            <div className="p-4 flex flex-col h-full">
                                <div className="mt-auto">
                                    {product.sale_price ? (
                                        <div className="text-md">
                                            <span className="line-through text-gray-400 mr-2">
                                                {Number(
                                                    product.price
                                                ).toLocaleString('ru-RU')}{' '}
                                                ₽
                                            </span>
                                            <span className="text-red-500 font-bold">
                                                {Number(
                                                    product.sale_price
                                                ).toLocaleString('ru-RU')}{' '}
                                                ₽
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="text-md font-semibold">
                                            {Number(
                                                product.price
                                            ).toLocaleString('ru-RU')}{' '}
                                            ₽
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-sm font-thin mb-1">
                                    {product.brand}
                                </h3>
                                <h2 className="text-sm font-semibold mb-1">
                                    {product.name}
                                </h2>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
