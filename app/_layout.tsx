import { Stack } from "expo-router";

if (__DEV__) {
  require("../ReactotronConfig");
}

export default function RootLayout() {
  return (
    <Stack initialRouteName="index" >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="(page)" options={{ headerShown: false }} />
    </Stack>
  );
}
