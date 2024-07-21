import { subscribeToCoinUpdates, unsubscribeFromCoinUpdates } from "@/api/binanceWebSocket";
import { Coin } from "@/types";
import { useEffect, useState } from "react";

const useWebSocketUpdates = (symbol: string) => {
    const [price, setPrice] = useState<number>(0);
    const [previousPrice, setPreviousPrice] = useState<number>(0);
    const [change24h, setChange24h] = useState<number>(0);
    const [priceChangeAmount, setPriceChangeAmount] = useState<number>(0);
    const [openHourPrice, setOpenHourPrice] = useState<number>(0);

    useEffect(() => {
        const handleUpdate = (updateCoin: Coin) => {
            setPreviousPrice(price);
            setPrice(updateCoin.price);
            setChange24h(updateCoin.change24h);
            setOpenHourPrice(updateCoin.openHourPrice);
            setPriceChangeAmount(updateCoin.price - updateCoin.openHourPrice);
        }

        subscribeToCoinUpdates(symbol, handleUpdate);

        return () => {
            unsubscribeFromCoinUpdates(symbol);
        };
    }, [symbol]);

    return { price, previousPrice, change24h, priceChangeAmount };
};

export default useWebSocketUpdates;