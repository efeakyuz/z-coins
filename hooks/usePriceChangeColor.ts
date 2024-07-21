import { useEffect, useState } from "react";

interface usePriceChangeColorProps {
    price: number;
    previousPrice: number;
}

const usePriceChangeColor = ({ price, previousPrice }: usePriceChangeColorProps) => {
    const [priceChangeColor, setPriceChangeColor] = useState<string | null>(null);

    useEffect(() => {
        if (price > previousPrice) {
            setPriceChangeColor('#21BF73');
        } else if (price < previousPrice) {
            setPriceChangeColor('#D90429');
        }

        const timer = setTimeout(() => {
            setPriceChangeColor(null);
        }, 1000);

        return () => clearTimeout(timer);
    }, [price]);

    return { priceChangeColor };
};

export default usePriceChangeColor;