import axios from 'axios';

const BINANCE_API_BASE_URL = 'https://api.binance.com';

export const fetchHistoricalData = async (symbol: string, interval: '1m' | '1h' | '1d' | '1w' | '1M'): Promise<{ value: number; date: string }[]> => {
    const { data } = await axios.get(`${BINANCE_API_BASE_URL}/api/v3/klines`, {
        params: {
            symbol: symbol.toUpperCase(),
            interval,
            limit: 100
        }
    });

    return data.map((item: any) => ({
        value: parseFloat(item[4]),
        date: new Date(item[0]).toISOString()
    }));
};
