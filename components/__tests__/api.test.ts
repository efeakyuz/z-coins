import { fetchCoins } from '@/api/cryptocompare';
import { Coin } from '@/types';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchCoins', () => {
  it('fetches coins successfully', async () => {
    const mockCoins: Coin[] = [
      {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          iconUrl: 'https://cryptoicons.org/api/icon/btc/200',
          price: 50000,
          change24h: 5,
          sparklineData: [],
          sortOrder: '',
          openHourPrice: 0,
          volume: '',
          marketCap: '',
          circulatingSupply: ''
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockCoins });

    const coins = await fetchCoins(1, 10);
    expect(coins).toEqual(mockCoins);
  });

  it('handles empty response', async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    const coins = await fetchCoins(1, 10);
    expect(coins).toEqual([]);
  });
});
