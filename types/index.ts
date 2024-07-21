export interface Coin {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: number;
  change24h: number;
  sparklineData: number[];
  sortOrder: string;
  openHourPrice: number;
  volume: string;
  marketCap: string;
  circulatingSupply: string;
}

export interface CryptoCompareCoinData {
  Id: string;
  CoinName: string;
  Symbol: string;
  ImageUrl: string;
  IsTrading: boolean;
  SortOrder: string;
}

export interface CryptoComparePriceData {
  PRICE: string;
  CHANGEPCT24HOUR: string;
  OPENHOUR: string;
  CIRCULATINGSUPPLY: string;
  MKTCAP: string;
  TOTALVOLUME24HTO: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
}

export interface CryptoComparePriceResponse {
  DISPLAY: Record<string, Record<string, CryptoComparePriceData>>;
}

export interface CryptoCompareMarketData {
  Data: {
    Data: {
      close: number;
    }[];
  };
}

export type Interval = "1h" | "1d" | "1w" | "1M" | "1m";
