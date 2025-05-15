import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CollapsibleInfoBlock = ({ title, variant = 'a' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const contentMap = {
        a: 'Это текст варианта А. Здесь может быть полезная информация.',
        b: 'Это текст варианта B. Например, условия доставки или оплаты.',
        c: 'Это текст варианта C. Здесь могут быть ответы на частые вопросы.',
        d: 'Это текст варианта d. Здесь могут быть ответы на частые вопросы.',
    };

    return (
        <div className="border rounded-lg mb-2 overflow-hidden shadow-sm bg-white">
            <button
                onClick={toggleOpen}
                className="flex justify-between items-center w-full px-4 py-3 text-left"
            >
                <span className="font-medium">{title}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>

            {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-700">
                    {contentMap[variant]}
                </div>
            )}
        </div>
    );
};

export default CollapsibleInfoBlock;
