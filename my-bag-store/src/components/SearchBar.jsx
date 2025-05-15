import { useState } from 'react';

const SearchBar = ({ products, onResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(value)
        );

        onResults(filtered);
    };

    return (
        <div className="px-2 w-full">
            <input
                type="text"
                placeholder="Поиск..."
                value={query}
                onChange={handleSearch}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
        </div>
    );
};

export default SearchBar;
