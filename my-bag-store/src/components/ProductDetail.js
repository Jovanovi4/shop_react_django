import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Для получения ID из URL
import ProductImageCarousel from './ProductImageCarousel';
import Characteristics from './Characteristics';
import InfoBlock from './InfoBlock';
import CollapsibleInfoBlock from './CollapsibleInfoBlock';
import BuyButton from './BuyButton';

const ProductDetail = () => {
    const { id } = useParams(); // Получаем ID из URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const handleBuy = () => {
        alert('Переход к оплате');
    };

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/products/${id}/`)
            .then((response) => {
                setProduct(response.data); // Устанавливаем данные о товаре
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [id]); // useEffect будет запускаться при изменении ID

    if (loading) {
        return <div>Loading product...</div>;
    }

    return (
        <div className="space-y-6 mb-4">
            <div className="space-y-6 mx-3 ">
                <div className="shadow-sm bg-white rounded-lg overflow-hidden">
                    <ProductImageCarousel product={product} variant="product" />
                </div>
            </div>
            <div className="space-y-4 ">
                <h1 className="text-4xl font-bold mx-5">{product.name}</h1>
                <h3 className="font-semibold text-lg text-gray-600 mx-5">
                    {product.brand}
                </h3>

                <div className="bg-white rounded-lg p-2 mx-3 shadow-sm">
                    <div className="flex bg-white rounded-lg p-2">
                        <p className="text-4xl font-black text-black mx-3">
                            {Number(product.price).toLocaleString('ru-RU')} ₽
                        </p>
                    </div>
                    <hr className="border-t my-2 mx-4 bg-white" />
                    <p className="text-gray-700 mx-4 mb-2 text-align: justify ">
                        {product.description}
                    </p>
                    <hr className="border-t my-3 mx-4 bg-white" />
                    {product && <Characteristics product={product} />}
                </div>
            </div>
            <div className="">
                <InfoBlock />
            </div>
            <div className="px-3">
                <CollapsibleInfoBlock title="О доставке" variant="a" />
                <CollapsibleInfoBlock title="Оплата и возврат" variant="b" />
                <CollapsibleInfoBlock title="FAQ" variant="c" />
                <CollapsibleInfoBlock title="Отзывы" variant="d" />
            </div>
            <div className="pb-10">
                {' '}
                {/* Оставь место под фиксированную кнопку */}
                {/* Основной контент страницы */}
                <BuyButton onClick={handleBuy} />
            </div>
        </div>
    );
};

export default ProductDetail;
