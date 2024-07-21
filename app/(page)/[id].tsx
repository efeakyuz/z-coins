import { fetchHistoricalData } from "@/api/binance";
import { fetchCoinDetails, fetchSparklineData } from "@/api/cryptocompare";
import Header from "@/components/common/Header";
import MarketStats from "@/components/common/MarketStats";
import PriceChart from "@/components/common/PriceChart";
import Screen from "@/components/common/Screen";
import MarketStatsSkeleton from "@/components/Skeleton/MarketStatsSkeleton";
import PriceChartSkeleton from "@/components/Skeleton/PriceChartSkeleton";
import { Colors } from "@/constants/Colors";
import { PADDING } from "@/constants/styles";
import { Coin, Interval } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const AssetsDetail = () => {
    const {
        id,
        name = "",
        symbol = "",
        icon = "",
    } = useLocalSearchParams<{
        id: string;
        name: string;
        symbol: string;
        icon: string;
    }>();
    const [coin, setCoin] = useState<Coin | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingChart, setLoadingChart] = useState(true);
    const [historicalData, setHistoricalData] = useState<{ value: number; date: string }[]>([]);
    const [selectedInterval, setSelectedInterval] = useState<Interval>('1h');


    const loadHistoricalData = async (interval: Interval) => {
        setLoadingChart(true);
        const data = await fetchHistoricalData(`${symbol}USDT`, interval);
        setHistoricalData(data);
        setLoadingChart(false);
    };

    useEffect(() => {
        const loadCoinDetails = async () => {
            setLoading(true);
            const coinDetails = await fetchCoinDetails(id as string);
            setCoin(coinDetails);
            setLoading(false);
            await loadHistoricalData('1d');
        };

        loadCoinDetails();
    }, [id]);

    const handlePeriodChange = async (period: Interval) => {
        setSelectedInterval(period);
        await loadHistoricalData(period);
      };
    
    

    return (
        <Screen style={styles.container}>
            <Header name={name} symbol={symbol} icon={icon} />
            {loadingChart ? <PriceChartSkeleton /> : <PriceChart data={historicalData} onPeriodChange={handlePeriodChange} selectedInterval={selectedInterval} />}
            {loading ? (
                <MarketStatsSkeleton />
            ) : (
                <MarketStats
                    marketCap={coin?.marketCap ?? ''}
                    volume={coin?.volume ?? ''}
                    circulatingSupply={coin?.circulatingSupply ?? ''}
                    popularity={coin?.sortOrder ?? ""}
                />
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        gap: PADDING,
    },
});

export default AssetsDetail;
