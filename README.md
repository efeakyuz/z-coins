# Welcome to Z-Coins App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


# Z-Coins React Native Application

## Introduction

Z-Coins is a React Native application that fetches and displays cryptocurrency data in a live-updating list. The app integrates with the CryptoCompare API and Binance API to provide real-time updates and offers detailed views of individual assets, including price charts and market statistics.

## Running the App

To view the app on your device, you can use the following Expo link:

[Open Z-Coins App](https://expo.dev/preview/update?message=chore%3A%20Publish%20App&updateRuntimeVersion=1.0.0&createdAt=2024-07-21T21%3A49%3A52.363Z&slug=exp&projectId=1b76e6e4-7c6d-40a4-b08d-ec2575d267d1&group=90c098d2-5cd9-456f-a9d5-2d313cc774d1)

You can scan the QR code provided in the link with the Expo Go app to run the application on your device.

## Features

- **API Integration**: Connects to the CryptoCompare API and Binance API to fetch cryptocurrency data.
- **Live Data Updates**: Implements live updates for asset data using WebSockets.
- **Price Change Highlighting**: Highlights price changes with colors (green for increases, red for decreases).
- **User Interface**:
  - Splash Screen
  - Home Screen
  - Asset Detail Screen with price chart and market stats
- **List Display**:
  - Displays asset data with icons, names, symbols, prices, and 24-hour changes.
  - Infinite scrolling for the asset list.

## Limitations

To avoid rate limits of the `Binance API`, only the first 3 cryptocurrencies listed on the homepage establish a WebSockets connection. The cryptocurrency detail pages do not have this limitation.

## Project Structure

```plaintext
project-root/
├── api/
│   ├── binance.ts
│   ├── binanceWebSocket.ts
│   ├── cryptocompare.ts
├── app/
│   ├── (page)/
│   │   ├── _layout.tsx
│   │   ├── [id].tsx
│   ├── index.tsx
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── index.tsx
├── assets/
│   ├── fonts/
│   ├── images/
├── components/
│   ├── __tests__/
│   ├── Card/
│   │   ├── CoinCard.tsx
│   ├── Charts/
│   │   ├── PriceChart.tsx
│   │   ├── Sparkline.tsx
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── MarketStats.tsx
│   │   ├── Screen.tsx
│   ├── List/
│   │   ├── InfiniteList.tsx
│   ├── Skeleton/
│   │   ├── MarketStatsSkeleton.tsx
│   │   ├── PriceChartSkeleton.tsx
├── constants/
│   ├── Colors.ts
│   ├── styles.ts
├── hooks/
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   ├── usePriceChangeColor.ts
│   ├── usePriceFormat.ts
│   ├── useThemeColor.ts
│   ├── useWebSocketUpdates.ts
├── types/
│   ├── index.ts
├── utils/
│   ├── formatters.ts
├── .expo/
├── node_modules/
├── scripts/
│   ├── reset-project.js
├── .gitignore
├── app.json
├── babel.config.js
├── expo-env.d.ts
├── package.json
├── ReactotronConfig.js
├── README.md
├── setupTests.js
├── tsconfig.json
├── yarn-error.log
├── yarn.lock
```

## API Integration

### CryptoCompare API

The application uses the CryptoCompare API to fetch cryptocurrency data.

### Binance API

The application uses the Binance API to fetch cryptocurrency data for line charts and handle WebSocket connections for real-time updates.

### Fetching Coin Data

`fetchCoins` fetches paginated coin data from the CryptoCompare API.

### WebSocket Integration

WebSocket connections are used for live updates of coin prices.

## Component Documentation

### CoinCard Component

Displays individual coin information in a card format.

### InfiniteList Component

Displays an infinite scrolling list of coins.

### Header Component

Displays the header information for the asset detail screen.

### PriceChart Component

Displays the price chart for a coin with selectable time intervals.

### MarketStats Component

Displays market statistics for a coin.

## Hooks

### useWebSocketUpdates

Handles WebSocket connections and updates for coin prices.

### usePriceChangeColor

Returns the color for price changes (green for increases, red for decreases).

### usePriceFormat

Formats the price for display.

## Testing

### Running Tests

To run tests, use the following command:

```bash
yarn test
```

### Example Test: CoinCard Component

```typescript
import React from 'react';
import { render } from '@testing-library/react-native';
import CoinCard from '../components/Card/CoinCard';
import { Coin } from '../types';

const mockCoin: Coin = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  iconUrl: 'https://cryptoicons.org/api/icon/btc/200',
  price: 50000,
  change24h: 5,
  sparklineData: [],
};

describe('CoinCard', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(<CoinCard coin={mockCoin} />);
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('BTC')).toBeTruthy();
    expect(getByRole('image')).toHaveProp('source', { uri: 'https://cryptoicons.org/api/icon/btc/200' });
    expect(getByText('$50,000.00')).toBeTruthy();
    expect(getByText('5.00%')).toBeTruthy();
  });
});
```

## Conclusion

Z-Coins is a comprehensive React Native application for tracking and displaying cryptocurrency data. It uses modern development practices, including TypeScript, SOLID principles, and thorough testing. The application provides a robust and interactive user experience with real-time updates and detailed asset views.