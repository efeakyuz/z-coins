// Coin tipi CryptoCompare API'den çekilen verilere göre güncellenmiştir
export interface Coin {
  id: string;
  name: string; // Coin ismi
  symbol: string; // Coin sembolü
  iconUrl: string; // Coin ikonunun URL adresi
  price: number; // Güncel fiyat, USD cinsinden
  change24h: number; // Son 24 saat içindeki fiyat değişikliği yüzdesi
  sparklineData: number[]; // Son 24 saat için fiyat değişikliklerini içeren dizi
  sortOrder: string; // Sıralama için kullanılacak alan
  openHourPrice: number; // Sıralama için kullanılacak alan
  volume: string; // Günlük işlem hacmi
  marketCap: string; // Piyasa değeri
  circulatingSupply: string; // Dolaşımdaki arz
}

// CryptoCompare'dan gelen coin listesi verileri için tip
export interface CryptoCompareCoinData {
  Id: string;
  CoinName: string;
  Symbol: string;
  ImageUrl: string;
  IsTrading: boolean;
  SortOrder: string;
}

// CryptoCompare'dan gelen fiyat verileri için tip
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

// CryptoCompare'dan gelen fiyat detayları için tip
export interface CryptoComparePriceResponse {
  DISPLAY: Record<string, Record<string, CryptoComparePriceData>>;
}

// CryptoCompare'dan gelen market veri tipleri
export interface CryptoCompareMarketData {
  Data: {
      Data: {
          close: number;
      }[];
  };
}

export type Interval = '1h' | '1d' | '1w' | '1M' | '1m';