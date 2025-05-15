import { useState } from 'react';

const Characteristics = ({ product }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="mx-4 my-4">
            <button
                onClick={() => setShowDetails((prev) => !prev)}
                className="text-sm text-[#229ED9] font-medium underline underline-offset-4"
            >
                {showDetails ? 'Скрыть характеристики' : 'Все характеристики'}
            </button>

            {showDetails && (
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700 mt-3 bg-white p-1">
                    <div>
                        <span className="font-medium">Артикул:</span>{' '}
                        {product.article}
                    </div>
                    <div>
                        <span className="font-medium">Материал:</span>{' '}
                        {product.material}
                    </div>
                    <div>
                        <span className="font-medium">Размер:</span>{' '}
                        {product.size}
                    </div>
                    <div>
                        <span className="font-medium">Тип:</span>{' '}
                        {product.bag_type}
                    </div>
                    <div className="col-span-2">
                        <span className="font-medium">Цвет:</span>{' '}
                        {product.color.map((c) => c.name).join(', ')}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Characteristics;
