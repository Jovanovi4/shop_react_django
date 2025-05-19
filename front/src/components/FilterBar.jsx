import React, { useState } from 'react';

const FilterBar = ({ onFilterChange, brands }) => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [price, setPrice] = useState(500000);

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    };

    const handlePriceChange = (e) => {
        const newPrice = Number(e.target.value);
        setPrice(newPrice);
    };

    const applyFilters = () => {
        onFilterChange(selectedBrand, [0, price]);
    };

    const resetFilters = () => {
        setSelectedBrand('');
        setPrice(500000);
        onFilterChange('', [0, 500000]);
    };

    return (
        <div className="px-2">
            <div className="p-4 w-full border border-gray-200 rounded-md border border-gray-300">
                <div>
                    <label className="block font-semibold mb-1">Бренд</label>
                    <select
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    >
                        <option value="">Все бренды</option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-2">
                        Макс. цена: {price.toLocaleString('ru-RU')} ₽
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="500000"
                        step="100"
                        value={price}
                        onChange={handlePriceChange}
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black touch-none select-none mb-4"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={applyFilters}
                        className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                    >
                        Применить
                    </button>
                    <button
                        onClick={resetFilters}
                        className="w-full py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition"
                    >
                        Сбросить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
