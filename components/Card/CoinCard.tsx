import { fetchSparklineData } from '@/api/cryptocompare';
import { Colors } from '@/constants/Colors';
import { PADDING } from '@/constants/styles';
import usePriceChangeColor from '@/hooks/usePriceChangeColor';
import usePriceFormat from '@/hooks/usePriceFormat';
import useWebSocketUpdates from '@/hooks/useWebSocketUpdates';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Coin } from '../../types';
import Sparkline from '../Charts/Sparkline';

interface CoinCardProps {
  coin: Coin;
  useWebSocket: boolean;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, useWebSocket }) => {
  const theme = useColorScheme() ?? 'light';
  const { name, symbol, iconUrl } = coin;
  const { price, previousPrice, change24h } = useWebSocket ? useWebSocketUpdates(symbol) : { price: coin.price, previousPrice: coin.price, change24h: coin.change24h };
  const { priceChangeColor } = usePriceChangeColor({ price, previousPrice });
  const [sparklineData, setSparklineData] = useState<number[]>([]);

  useEffect(() => {
    const loadSparklineData = async () => {
      const data = await fetchSparklineData(symbol);
      setSparklineData(data);
    };

    loadSparklineData();
  }, [symbol]);

  const safeChange24h = isNaN(change24h) ? 0 : change24h;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
      </View>
      <View style={styles.info}>
        <Text onPress={() => router.push({ pathname: `/(page)/${symbol}`, params: { name: name, symbol: symbol, icon: iconUrl } })} style={[styles.name, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>{name}</Text>
        <Text style={[styles.symbol, { color: theme === 'light' ? Colors.light.textGray : Colors.dark.textGray }]}>{symbol}</Text>
      </View>
      <View style={styles.line}>
        <Sparkline data={sparklineData} positive={safeChange24h >= 0} />
      </View>
      <View style={styles.priceMeta}>
        <Text style={[styles.price, { color: priceChangeColor || (theme === 'light' ? Colors.light.text : Colors.dark.text) }]}>
          {usePriceFormat(price)}
        </Text>
        <Text style={[styles.change, safeChange24h >= 0 ? { color: Colors.light.increase } : { color: Colors.light.decrease }]}>
          {safeChange24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: PADDING,
    paddingHorizontal: PADDING,
    paddingVertical: 5,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },
  line: {
    flex: 1,
    marginVertical: PADDING,
    justifyContent: 'center',
  },
  priceMeta: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    gap: 5,
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'bold',
  },
  symbol: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600'
  },
  price: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '600'
  },
  change: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '500'
  },
});

export default CoinCard;
