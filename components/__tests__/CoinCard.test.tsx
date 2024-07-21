import React from 'react';
import { render } from '@testing-library/react-native';
import { Coin } from '@/types';
import CoinCard from '../Card/CoinCard';

const mockCoin: Coin = {
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
};

describe('CoinCard', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(<CoinCard coin={mockCoin} useWebSocket={false} />);
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('BTC')).toBeTruthy();
    expect(getByRole('image')).toHaveProp('source', { uri: 'https://cryptoicons.org/api/icon/btc/200' });
    expect(getByText('$50,000.00')).toBeTruthy();
    expect(getByText('5.00%')).toBeTruthy();
  });

  it('applies correct color for positive change', () => {
    const { getByText } = render(<CoinCard coin={mockCoin} useWebSocket={false} />);
    const changeText = getByText('5.00%');
    expect(changeText).toHaveStyle({ color: '#21BF73' });
  });

  it('applies correct color for negative change', () => {
    const negativeChangeCoin = { ...mockCoin, change24h: -5 };
    const { getByText } = render(<CoinCard coin={negativeChangeCoin} useWebSocket={false} />);
    const changeText = getByText('-5.00%');
    expect(changeText).toHaveStyle({ color: '#D90429' });
  });
});
