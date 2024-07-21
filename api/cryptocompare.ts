import axios from "axios";
import {
    Coin,
    CryptoCompareCoinData,
    CryptoComparePriceResponse,
    CryptoComparePriceData,
    CryptoCompareMarketData,
} from "../types";
import { parse } from "@babel/core";

const CRYPTOCOMPARE_API_BASE_URL = "https://min-api.cryptocompare.com/data";

// Coin isimlerini ve sembollerini almak için kullanılacak endpoint
const COIN_LIST_ENDPOINT = `${CRYPTOCOMPARE_API_BASE_URL}/all/coinlist`;

// Fiyat bilgilerini almak için kullanılacak endpoint
const PRICE_MULTI_ENDPOINT = `${CRYPTOCOMPARE_API_BASE_URL}/pricemultifull`;

export const fetchAllCoins = async (): Promise<Coin[]> => {
    const { data } = await axios.get<{
        Data: Record<string, CryptoCompareCoinData>;
    }>(COIN_LIST_ENDPOINT);

    const coinList = Object.values(data.Data)
        .filter((coin: CryptoCompareCoinData) => coin.IsTrading) // IsTrading true olanları filtrele
        .map((coin: CryptoCompareCoinData) => ({
            id: coin.Id,
            name: coin.CoinName,
            symbol: coin.Symbol,
            iconUrl: `https://www.cryptocompare.com${coin.ImageUrl}`,
            price: 0,
            change24h: 0,
            sparklineData: [], // Implement sparkline data fetching and processing if needed
            sortOrder: coin.SortOrder, // SortOrder ekle
            openHourPrice: 0,
            circulatingSupply: '',
            marketCap: '',
            volume: '',
        }))
        .sort((a, b) => parseInt(a.sortOrder) - parseInt(b.sortOrder)); // SortOrder'a göre sırala

    return coinList as Coin[];
};

export const fetchCoinPrices = async (
    symbols: string[]
): Promise<Record<string, Coin>> => {
    const { data } = await axios.get<CryptoComparePriceResponse>(
        PRICE_MULTI_ENDPOINT,
        {
            params: {
                fsyms: symbols.join(","),
                tsyms: "USD",
            },
        }
    );

    const coinPrices: Record<string, Coin> = {};

    symbols.forEach((symbol) => {
        if (data.DISPLAY[symbol] && data.DISPLAY[symbol].USD) {
            const priceData = data.DISPLAY[symbol].USD as CryptoComparePriceData;
            coinPrices[symbol] = {
                id: symbol,
                name: "",
                symbol: symbol,
                iconUrl: "",
                price: parseFloat(priceData.PRICE.replace("$", "").replace(",", "")),
                change24h:
                    parseFloat(priceData.CHANGEPCT24HOUR) !== undefined
                        ? parseFloat(priceData.CHANGEPCT24HOUR)
                        : 0,
                openHourPrice: parseFloat(priceData.OPENHOUR),
                sparklineData: [], // Implement sparkline data fetching and processing if needed
                sortOrder: "",
                circulatingSupply: priceData.CIRCULATINGSUPPLY,
                marketCap: priceData.MKTCAP,
                volume: priceData.TOTALVOLUME24HTO,
            };
        }
    });

    return coinPrices;
};

// Sparkline verilerini ve fiyatları kontrol ederek sayfalandırılmış coin verilerini döndürür
export const fetchCoins = async (
    page: number,
    pageSize: number = 10
): Promise<Coin[]> => {
    const allCoins = await fetchAllCoins();
    const paginatedCoins = allCoins.slice((page - 1) * pageSize, page * pageSize);
    const symbols = paginatedCoins.map((coin) => coin.symbol);
    const coinPrices = await fetchCoinPrices(symbols);

    // Sparkline verilerini yükle ve sparkline verisi olmayanları filtrele
    const coins: Coin[] = [];
    for (const coin of paginatedCoins) {
        const sparklineData = await fetchSparklineData(coin.symbol);
        if (sparklineData.length > 0) {
            coins.push({
                ...coin,
                price: coinPrices[coin.symbol]?.price || 0,
                change24h: coinPrices[coin.symbol]?.change24h || 0,
                sparklineData,
            });
        }
    }

    return coins;
};

export const fetchSparklineData = async (symbol: string): Promise<number[]> => {
    try {
        const { data } = await axios.get<CryptoCompareMarketData>(
            `${CRYPTOCOMPARE_API_BASE_URL}/v2/histohour`,
            {
                params: {
                    fsym: symbol,
                    tsym: "USD",
                    limit: 24, // Son 24 saatlik veri
                },
            }
        );

        // Eğer data veya data.Data.Data mevcut değilse boş dizi döndür
        if (!data || !data.Data || !data.Data.Data) {
            return [];
        }

        // Fiyatları döndür (her saatlik veri için [zaman damgası, fiyat] şeklinde dizi döner)
        return data.Data.Data.map((item: any) => item.close);
    } catch (error) {
        console.error(`Error fetching sparkline data for ${symbol}:`, error);
        return [];
    }
};

// Coin detaylarını çekmek için fonksiyon
export const fetchCoinDetails = async (symbol: string): Promise<Coin> => {
    const allCoins = await fetchAllCoins();
    const coin = allCoins.find((c) => c.symbol === symbol);

    if (!coin) {
        throw new Error(`Coin with symbol ${symbol} not found`);
    }

    const coinPrices = await fetchCoinPrices([symbol]);

    const price = coinPrices[symbol]?.price || 0;
    const change24h = coinPrices[symbol]?.change24h || 0;
    const circulatingSupply = coinPrices[symbol]?.circulatingSupply || '';
    const marketCap = coinPrices[symbol]?.marketCap || '';
    const volume = coinPrices[symbol]?.volume || '';

    return {
        ...coin,
        price,
        change24h,
        circulatingSupply,
        marketCap,
        volume,
    };
};