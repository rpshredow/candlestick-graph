const yGridEl = document.querySelector(".y-grid");
const xGridEl = document.querySelector(".x-grid");

let pricedata = fetch(
  "https://api.tdameritrade.com/v1/marketdata/TSLA/pricehistory?apikey=WBQGUZ4CQPRMK7HF2MXHGHUE5BNMW4P9&periodType=day&period=1&frequencyType=minute&frequency=5"
);

let candles = [];

pricedata.then((res) => res.json()).then((d) => (candles = d));

console.log(candles);

// const data = {
//   candles: [
//     {
//       open: 171.9,
//       high: 171.9,
//       low: 171.82,
//       close: 171.84,
//       volume: 4195,
//       datetime: 1675212960000,
//     },
//     {
//       open: 171.84,
//       high: 171.84,
//       low: 171.75,
//       close: 171.77,
//       volume: 4689,
//       datetime: 1675213020000,
//     },
//     {
//       open: 171.71,
//       high: 171.85,
//       low: 171.71,
//       close: 171.77,
//       volume: 17618,
//       datetime: 1675213080000,
//     },
//     {
//       open: 171.77,
//       high: 171.85,
//       low: 171.75,
//       close: 171.8205,
//       volume: 10788,
//       datetime: 1675213140000,
//     },
//   ],
//   symbol: "TSLA",
//   empty: false,
// };

let lowestPrice = Number.MAX_SAFE_INTEGER;
let highestPrice = 0;

getLowestPrice();
getHighestPrice();
createGridY();
createGridX();

function getLowestPrice() {
  candles.forEach((candle) => {
    let low = Number.MAX_SAFE_INTEGER;

    if (candle.open < candle.close) {
      low = candle.open;
    } else {
      low = candle.close;
    }

    if (low < lowestPrice) {
      lowestPrice = low;
    }
  });
}

function getHighestPrice() {
  candles.forEach((candle) => {
    let high = 0;

    if (candle.open < candle.close) {
      high = candle.close;
    } else {
      high = candle.open;
    }

    if (high > highestPrice) {
      highestPrice = high;
    }
  });
}

function createGridY() {
  const highest = Math.ceil(highestPrice * 10) / 10;
  const lowest = Math.floor(lowestPrice * 10) / 10;
  const step = (highest - lowest) / 4;
  let top = highest;

  for (let i = 0; i < 5; i++) {
    const yLabelDiv = document.createElement("div");
    yLabelDiv.classList.add("y-label");
    const yLineDiv = document.createElement("div");
    yLineDiv.classList.add("y-line");
    yLabelDiv.innerText = "$" + top.toFixed(2);

    yLineDiv.appendChild(yLabelDiv);
    yGridEl.appendChild(yLineDiv);
    top -= step;
  }
}

function createGridX() {
  const lastDatetime = candles[candles.length - 1].datetime;
  const firstDatetime = candles[0].datetime;
  const step = (lastDatetime - firstDatetime) / 9;

  let start = firstDatetime;
  let curTime;

  for (let i = 0; i < 10; i++) {
    const xLineDiv = document.createElement("div");
    xLineDiv.classList.add("x-line");
    const xLabelDiv = document.createElement("div");
    xLabelDiv.classList.add("x-label");
    curTime = new Date(start);
    xLabelDiv.innerText = curTime.getHours() + ":" + curTime.getMinutes();

    xLineDiv.appendChild(xLabelDiv);
    xGridEl.appendChild(xLineDiv);
    start += step;
  }
}
