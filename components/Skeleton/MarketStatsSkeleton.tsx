import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Placeholder, PlaceholderLine, ShineOverlay } from "rn-placeholder";
import { PADDING } from "@/constants/styles";

const MarketStatsSkeleton = () => {
    const { width } = useWindowDimensions();
    const statWidth = width / 4.3;
  return (
    <Placeholder Animation={ShineOverlay}>
      <View style={styles.container}>
        <PlaceholderLine width={statWidth} height={20} style={styles.stat} />
        <PlaceholderLine width={statWidth} height={20} style={styles.stat} />
        <PlaceholderLine width={statWidth} height={20} style={styles.stat} />
        <PlaceholderLine width={statWidth} height={20} style={styles.stat} />
        <PlaceholderLine width={statWidth} height={20} style={styles.stat} />
        <PlaceholderLine width={statWidth} height={20} style={styles.stat} />
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  stat: {
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default MarketStatsSkeleton;
