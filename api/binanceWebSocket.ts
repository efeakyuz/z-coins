import { Coin } from "../types";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws";
let ws: WebSocket | null = null;
const subscriptions: { [key: string]: (coin: Coin) => void } = {};
let pendingSubscriptions: string[] = [];
let isProcessing = false;

const createWebSocketConnection = () => {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket(BINANCE_WS_URL);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      processPendingSubscriptions();
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === "24hrTicker" && subscriptions[data.s.toLowerCase()]) {
        const updatedCoin: Coin = {
          id: data.s,
          name: data.s,
          symbol: data.s.replace("USDT", ""),
          iconUrl: "",
          price: parseFloat(data.c),
          change24h: parseFloat(data.P),
          sparklineData: [],
          sortOrder: "",
          openHourPrice: parseFloat(data.o),
          circulatingSupply: '',
          marketCap: '',
          volume: '',
        };
        // Abone olunan coin için güncelleme fonksiyonunu çağır
        subscriptions[data.s.toLowerCase()](updatedCoin);
      }
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed", event);
      // Reset subscriptions
      for (const key in subscriptions) {
        delete subscriptions[key];
      }
      // Belirli bir süre sonra tekrar bağlanmayı dene
      setTimeout(createWebSocketConnection, 5000);
    };
  }
};

const processPendingSubscriptions = () => {
  if (isProcessing || !ws || ws.readyState !== WebSocket.OPEN) {
    return;
  }

  isProcessing = true;

  const subscribeNext = () => {
    if (pendingSubscriptions.length === 0) {
      isProcessing = false;
      return;
    }

    const symbol = pendingSubscriptions.shift();
    if (symbol && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${symbol}@ticker`],
          id: 1,
        })
      );
    }

    // Abonelik isteğini 100ms gecikme ile gönder
    setTimeout(subscribeNext, 100);
  };

  subscribeNext();
};

export const subscribeToCoinUpdates = (
  symbol: string,
  onMessage: (coin: Coin) => void
) => {
  const lowerSymbol = `${symbol.toLowerCase()}usdt`;

  if (!ws || ws.readyState === WebSocket.CLOSED) {
    createWebSocketConnection();
  }

  if (ws?.readyState === WebSocket.OPEN) {
    pendingSubscriptions.push(lowerSymbol);
    processPendingSubscriptions();
  } else {
    ws?.addEventListener(
      "open",
      () => {
        pendingSubscriptions.push(lowerSymbol);
        processPendingSubscriptions();
      },
      { once: true }
    );
  }

  subscriptions[lowerSymbol] = onMessage;
};

export const unsubscribeFromCoinUpdates = (symbol: string) => {
  const lowerSymbol = `${symbol.toLowerCase()}usdt`;
  if (subscriptions[lowerSymbol] && ws?.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        method: "UNSUBSCRIBE",
        params: [`${lowerSymbol}@ticker`],
        id: 1,
      })
    );
    delete subscriptions[lowerSymbol];
  }
};
