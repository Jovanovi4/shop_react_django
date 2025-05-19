import { useState } from 'react';

const BuyButton = ({ onClick }) => {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-3">
            <button
                onClick={onClick}
                className="w-full bg-[#229ED9] text-white text-lg font-semibold py-3 rounded-lg shadow-lg hover:bg-[#1c8ec5] transition duration-200"
            >
                Купить
            </button>
        </div>
    );
};

export default BuyButton;
