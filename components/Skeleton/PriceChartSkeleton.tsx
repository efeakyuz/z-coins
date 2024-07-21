import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Placeholder, PlaceholderLine, ShineOverlay } from "rn-placeholder";

const PriceChartSkeleton = () => {
  const { width } = useWindowDimensions();
  return (
    <Placeholder Animation={ShineOverlay}>
      <View style={styles.container}>
        <PlaceholderLine
          width={width / 4.3}
          height={200}
          style={styles.chart}
        />
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    borderRadius: 10,
    marginBottom: 0,
  },
});

export default PriceChartSkeleton;
