import { useState } from 'react';

const CatalogHeader = ({
    products,
    brands,
    onFilterChange,
    setFilteredProducts,
}) => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-2 py-6">
            <div className="flex items-center justify-between mb-3">
                {/* Заголовок */}
                <h1 className="text-2xl sm:text-3xl font-bold">Каталог</h1>

                {/* Иконки для фильтров и поиска */}
                <div className="flex space-x-4">
                    <button onClick={() => setShowFilters(!showFilters)}>
                        <FilterIcon />{' '}
                        {
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
                        }
                    </button>
                    <button onClick={() => setShowSearch(!showSearch)}>
                        <SearchIcon />{' '}
                        {
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
                        }
                    </button>
                </div>
            </div>

            {/* Фильтры */}
            {showFilters && (
                <div className="p-4 border border-gray-200 rounded-md shadow-sm mb-4">
                    <FilterBar
                        onFilterChange={onFilterChange}
                        brands={brands}
                    />
                </div>
            )}

            {/* Поиск */}
            {showSearch && (
                <div className="p-4 border border-gray-200 rounded-md shadow-sm mb-4">
                    <SearchBar
                        products={products}
                        onResults={setFilteredProducts}
                    />
                </div>
            )}
        </div>
    );
};

export default CatalogHeader;
