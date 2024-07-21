import { Colors } from "@/constants/Colors";
import { PADDING } from "@/constants/styles";
import usePriceChangeColor from "@/hooks/usePriceChangeColor";
import usePriceFormat from "@/hooks/usePriceFormat";
import useWebSocketUpdates from "@/hooks/useWebSocketUpdates";
import { router } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

interface HeaderProps {
    name: string;
    symbol: string;
    icon: string;
}

const Header: React.FC<HeaderProps> = ({ name, symbol, icon }) => {
    const theme = useColorScheme() ?? "light";

    const { price, previousPrice, change24h, priceChangeAmount } =
        useWebSocketUpdates(symbol);
    const { priceChangeColor } = usePriceChangeColor({ price, previousPrice });
    const priceChangeSign = priceChangeAmount >= 0 ? "+" : "";

    const safeChange24h = isNaN(change24h) ? 0 : change24h;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? "rgb(210, 230, 255)"
                                : "#FFFFFF",
                            padding: 10,
                            borderRadius: 18,
                            justifyContent: "center",
                            alignItems: "center",
                        },
                    ]}
                >
                    <Image
                        source={require("../../assets/images/back.png")}
                        style={styles.backIcon}
                    />
                </Pressable>
                <Image source={{ uri: icon }} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>({symbol})</Text>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text
                    style={[
                        styles.price,
                        {
                            color:
                                priceChangeColor ||
                                (theme === "light" ? Colors.light.text : Colors.dark.text),
                        },
                    ]}
                >
                    {usePriceFormat(price)}
                </Text>
                <Text
                    style={[
                        styles.change,
                        change24h >= 0 ? styles.increase : styles.decrease,
                    ]}
                >
                    {priceChangeSign}
                    {usePriceFormat(priceChangeAmount, false)} {safeChange24h.toFixed(2)}%
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: PADDING,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    backIcon: {
        marginRight: 5,
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 3,
    },
    title: {
        fontFamily: "Inter",
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "600",
    },
    subtitle: {
        fontFamily: "Inter",
        fontSize: 10,
        lineHeight: 12,
        fontWeight: "600",
        color: Colors.light.textGray,
        top: 2,
    },
    price: {
        fontFamily: "Inter",
        fontSize: 24,
        lineHeight: 29,
        fontWeight: "500",
    },
    change: {
        fontFamily: "Inter",
        fontSize: 14,
        lineHeight: 15,
        fontWeight: "600",
        top: 3,
    },
    increase: {
        color: "green",
    },
    decrease: {
        color: "red",
    },
});

export default Header;
