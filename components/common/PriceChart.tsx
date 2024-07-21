import { Interval } from "@/types";
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

const { width } = Dimensions.get("window");

interface PriceChartProps {
  data: { value: number; date: string }[];
  onPeriodChange: (period: Interval) => void;
  selectedInterval: string;
}

interface ChartItem {
  value: number;
  label: string;
  fullDate: string;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}`;
};

const formatDateFull = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

const PriceChart: React.FC<PriceChartProps> = ({ data, onPeriodChange, selectedInterval }) => {

  const intervals: { label: string; value: Interval }[] = [
    { label: '1H', value: '1h' },
    { label: '24H', value: '1d' },
    { label: '1W', value: '1w' },
    { label: '1M', value: '1M' },
  ];

  const handleIntervalChange = (interval: Interval) => {
    onPeriodChange(interval);
  };

  const chartData = useMemo(() => {
    const formattedData = data.map((item) => ({
      value: item.value,
      label: formatDate(item.date),
      fullDate: formatDateFull(item.date),
    }));

    // Belirli bir sayıda etiketi atlamak için kullanılan logic
    const maxLabels = 10;
    const step = Math.ceil(formattedData.length / maxLabels);
    return formattedData.filter((_, index) => index % step === 0);
  }, [data, selectedInterval]);

  return (
    <View>
      <LineChart
        data={chartData}
        width={width}
        height={220}
        initialSpacing={8}
        spacing={width / 9.5}
        color="#4caf50"
        thickness={2}
        hideDataPoints
        hideAxesAndRules
        yAxisThickness={0}
        hideYAxisText
        yAxisTextStyle={{ color: "#000" }}
        xAxisLabelTextStyle={{
          fontFamily: "Inter",
          fontSize: 10,
          fontWeight: "900",
          color: "#6C757D",
        }}
        pointerConfig={{
          pointerColor: "black",
          pointerLabelWidth: 120,
          pointerLabelHeight: 50,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items: ChartItem[]) => {
            return (
              <View style={styles.pointerLabel}>
                <Text
                  style={styles.pointerLabelText}
                >{`Price: ${items[0].value}`}</Text>
                <Text
                  style={styles.pointerLabelText}
                >{`Date: ${items[0].fullDate}`}</Text>
              </View>
            );
          },
        }}
      />
      <View style={styles.buttonContainer}>
        {intervals.map((interval) => (
          <TouchableOpacity
            key={interval.value}
            onPress={() => handleIntervalChange(interval.value)}
            style={[
              styles.button,
              selectedInterval === interval.value && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedInterval === interval.value &&
                styles.selectedButtonText,
              ]}
            >
              {interval.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#F8F9FA",
    borderColor: "#DFE2E4",
    borderWidth: 0.5
  },
  selectedButton: {
    backgroundColor: "#ECF4FF",
    borderColor: "#0063F5",
    borderWidth: 0.5
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: "600",
    color: "#6C757D",
  },
  selectedButtonText: {
    color: "#0063F5",
  },
  pointerLabel: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  pointerLabelText: {
    fontSize: 12,
  },
});

export default PriceChart;
