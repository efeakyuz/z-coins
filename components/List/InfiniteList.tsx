import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import CoinCard from '../Card/CoinCard';
import { Coin } from '../../types';
import { fetchCoins } from '@/api/cryptocompare';

const InfiniteList: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadInitialCoins = async () => {
            setLoading(true);
            try {
                const newCoins = await fetchCoins(page);
                if (newCoins.length === 0) {
                    setHasMore(false);
                } else {
                    setCoins(newCoins);
                    setPage(page + 1);
                }
            } finally {
                setLoading(false);
            }
        };

        loadInitialCoins();
    }, []);

    const loadMore = async () => {
        if (!loading && hasMore) {
            setLoading(true);
            try {
                const newCoins = await fetchCoins(page);
                if (newCoins.length === 0) {
                    setHasMore(false);
                } else {
                    setCoins(prevCoins => [...prevCoins, ...newCoins]);
                    setPage(page + 1);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={coins}
                renderItem={({ item, index }) => <CoinCard coin={item} useWebSocket={index < 3} />}
                keyExtractor={item => item.id}
                onEndReached={loadMore}
                onEndReachedThreshold={0.9}
                contentContainerStyle={{ gap: 10, marginTop: 6 }}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
});

export default InfiniteList;
