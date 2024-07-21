import { Colors } from "@/constants/Colors";
import { PADDING } from "@/constants/styles";
import { formatLargeNumbers } from "@/utils/formatters";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface MarketStatsProps {
  marketCap: string;
  volume: string;
  circulatingSupply: string;
  popularity: string;
}

const MarketStats: React.FC<MarketStatsProps> = ({
  marketCap,
  volume,
  circulatingSupply,
  popularity,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Market Stats</Text>
      <View style={{ gap: 17 }}>
        <View style={styles.stat}>
          <Image
            source={require("../../assets/images/marketCap.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Market Cap</Text>
          <Text style={styles.value}>{formatLargeNumbers(marketCap)}</Text>
        </View>
        <View style={styles.stat}>
          <Image
            source={require("../../assets/images/volume.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Volume</Text>
          <Text style={styles.value}>{formatLargeNumbers(volume)}</Text>
        </View>
        <View style={styles.stat}>
          <Image
            source={require("../../assets/images/supply.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Circulating Supply</Text>
          <Text style={styles.value}>{formatLargeNumbers(circulatingSupply, false)}</Text>
        </View>
        <View style={styles.stat}>
          <Image
            source={require("../../assets/images/popularity.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Popularity</Text>
          <Text style={styles.value}>#{popularity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: PADDING,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "500",
    paddingBottom: 20,
  },
  stat: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 5,
  },
  label: {
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "600",
    color: Colors.light.textGray,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  icon: {
    marginRight: 10,
  },
});

export default MarketStats;
