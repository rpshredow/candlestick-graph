data = {
  candles: [
    {
      open: 171.9,
      high: 171.9,
      low: 171.82,
      close: 171.84,
      volume: 4195,
      datetime: 1675212960000,
    },
    {
      open: 171.84,
      high: 171.84,
      low: 171.75,
      close: 171.77,
      volume: 4689,
      datetime: 1675213020000,
    },
    {
      open: 171.71,
      high: 171.85,
      low: 171.71,
      close: 171.77,
      volume: 17618,
      datetime: 1675213080000,
    },
    {
      open: 171.77,
      high: 171.85,
      low: 171.75,
      //   close: 171.8205,
      close: 171.5,
      volume: 10788,
      datetime: 1675213140000,
    },
  ],
  symbol: "TSLA",
  empty: false,
};

console.log(data.candles);
console.log(data.candles.length);

data.candles.forEach((candle) => {
  utcSeconds = candle.datetime;
  const d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  console.log(d);
});

let lowOpen = Number.MAX_SAFE_INTEGER;

data.candles.forEach((candle) => {
  let low = Number.MAX_SAFE_INTEGER;

  if (candle.open < candle.close) {
    low = candle.open;
  } else {
    low = candle.close;
  }

  if (low < lowOpen) {
    lowOpen = low;
  }
});

console.log(lowOpen);
