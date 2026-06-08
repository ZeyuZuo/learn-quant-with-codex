export const priceData = [
  { date: "01-02", close: 100, adjClose: 100, open: 99, high: 101, low: 98, volume: 120 },
  { date: "01-03", close: 102, adjClose: 102, open: 100, high: 103, low: 99, volume: 135 },
  { date: "01-04", close: 101, adjClose: 101, open: 102, high: 104, low: 100, volume: 98 },
  { date: "01-05", close: 105, adjClose: 105, open: 101, high: 106, low: 101, volume: 156 },
  { date: "01-08", close: 53, adjClose: 106, open: 105, high: 106, low: 52, volume: 310 },
  { date: "01-09", close: 54, adjClose: 108, open: 53, high: 55, low: 53, volume: 165 },
  { date: "01-10", close: 53.5, adjClose: 107, open: 54, high: 55, low: 53, volume: 142 },
  { date: "01-11", close: 55, adjClose: 110, open: 53.5, high: 55.5, low: 53, volume: 188 },
];

export const returnsData = [
  { date: "01-02", price: 100, dailyReturn: 0, equity: 1 },
  { date: "01-03", price: 102, dailyReturn: 0.02, equity: 1.02 },
  { date: "01-04", price: 101, dailyReturn: -0.0098, equity: 1.01 },
  { date: "01-05", price: 105, dailyReturn: 0.0396, equity: 1.05 },
  { date: "01-08", price: 106, dailyReturn: 0.0095, equity: 1.06 },
  { date: "01-09", price: 108, dailyReturn: 0.0189, equity: 1.08 },
  { date: "01-10", price: 107, dailyReturn: -0.0093, equity: 1.07 },
  { date: "01-11", price: 110, dailyReturn: 0.028, equity: 1.1 },
];

export const drawdownData = [
  { date: "01-02", equity: 1, drawdown: 0 },
  { date: "01-03", equity: 1.08, drawdown: 0 },
  { date: "01-04", equity: 1.04, drawdown: -0.037 },
  { date: "01-05", equity: 1.14, drawdown: 0 },
  { date: "01-08", equity: 1.09, drawdown: -0.044 },
  { date: "01-09", equity: 1.02, drawdown: -0.123 },
  { date: "01-10", equity: 1.12, drawdown: -0.018 },
  { date: "01-11", equity: 1.18, drawdown: 0 },
];

export const positionData = [
  { date: "01-02", price: 100, signal: 0, position: 0 },
  { date: "01-03", price: 102, signal: 1, position: 0 },
  { date: "01-04", price: 101, signal: 1, position: 1 },
  { date: "01-05", price: 105, signal: 0, position: 1 },
  { date: "01-08", price: 106, signal: 1, position: 0 },
  { date: "01-09", price: 108, signal: 1, position: 1 },
  { date: "01-10", price: 107, signal: 0, position: 1 },
  { date: "01-11", price: 110, signal: 0, position: 0 },
];

export const costData = [
  { date: "01-02", noCost: 1, withCost: 1, wrongShift: 1 },
  { date: "01-03", noCost: 1.02, withCost: 1.019, wrongShift: 1.035 },
  { date: "01-04", noCost: 1.01, withCost: 1.008, wrongShift: 1.047 },
  { date: "01-05", noCost: 1.07, withCost: 1.066, wrongShift: 1.09 },
  { date: "01-08", noCost: 1.09, withCost: 1.084, wrongShift: 1.14 },
  { date: "01-09", noCost: 1.06, withCost: 1.052, wrongShift: 1.16 },
  { date: "01-10", noCost: 1.12, withCost: 1.109, wrongShift: 1.2 },
  { date: "01-11", noCost: 1.16, withCost: 1.146, wrongShift: 1.23 },
];

export const movingAverageData = [
  { date: "01-02", price: 100, fast: 100, slow: 100, signal: 0 },
  { date: "01-03", price: 102, fast: 101, slow: 101, signal: 0 },
  { date: "01-04", price: 101, fast: 101.5, slow: 101, signal: 1 },
  { date: "01-05", price: 105, fast: 103, slow: 102, signal: 1 },
  { date: "01-08", price: 106, fast: 105.5, slow: 103.5, signal: 1 },
  { date: "01-09", price: 108, fast: 107, slow: 105, signal: 1 },
  { date: "01-10", price: 104, fast: 106, slow: 106, signal: 0 },
  { date: "01-11", price: 103, fast: 103.5, slow: 105.25, signal: 0 },
];

export const strategyData = [
  { date: "01-02", buyHold: 1, ma: 1, momentum: 1, meanReversion: 1 },
  { date: "01-03", buyHold: 1.02, ma: 1, momentum: 1, meanReversion: 1.01 },
  { date: "01-04", buyHold: 1.01, ma: 0.99, momentum: 1.01, meanReversion: 1.02 },
  { date: "01-05", buyHold: 1.05, ma: 1.03, momentum: 1.05, meanReversion: 1.01 },
  { date: "01-08", buyHold: 1.06, ma: 1.04, momentum: 1.07, meanReversion: 1.03 },
  { date: "01-09", buyHold: 1.08, ma: 1.06, momentum: 1.09, meanReversion: 1.02 },
  { date: "01-10", buyHold: 1.07, ma: 1.05, momentum: 1.06, meanReversion: 1.04 },
  { date: "01-11", buyHold: 1.1, ma: 1.08, momentum: 1.09, meanReversion: 1.05 },
];

export const parameterData = [
  { fast: 5, slow: 20, sharpe: 0.72, inSample: 1.22, outSample: 1.03 },
  { fast: 5, slow: 50, sharpe: 0.81, inSample: 1.26, outSample: 1.01 },
  { fast: 10, slow: 20, sharpe: 0.55, inSample: 1.18, outSample: 1.08 },
  { fast: 10, slow: 50, sharpe: 0.64, inSample: 1.2, outSample: 1.07 },
  { fast: 20, slow: 50, sharpe: 0.91, inSample: 1.32, outSample: 0.98 },
  { fast: 20, slow: 100, sharpe: 0.48, inSample: 1.11, outSample: 1.06 },
];

export const portfolioData = [
  { date: "01-02", aapl: 1, msft: 1, spy: 1, equalWeight: 1 },
  { date: "01-03", aapl: 1.03, msft: 1.01, spy: 1.01, equalWeight: 1.02 },
  { date: "01-04", aapl: 1.01, msft: 1.03, spy: 1, equalWeight: 1.02 },
  { date: "01-05", aapl: 1.06, msft: 1.04, spy: 1.03, equalWeight: 1.05 },
  { date: "01-08", aapl: 1.02, msft: 1.07, spy: 1.04, equalWeight: 1.045 },
  { date: "01-09", aapl: 1.07, msft: 1.09, spy: 1.06, equalWeight: 1.08 },
  { date: "01-10", aapl: 1.04, msft: 1.08, spy: 1.05, equalWeight: 1.06 },
  { date: "01-11", aapl: 1.1, msft: 1.11, spy: 1.08, equalWeight: 1.105 },
];

export const strategySimulatorData = [
  { date: "01-02", assetReturn: 0, signal: 0 },
  { date: "01-03", assetReturn: 0.02, signal: 1 },
  { date: "01-04", assetReturn: -0.0098, signal: 1 },
  { date: "01-05", assetReturn: 0.0396, signal: 0 },
  { date: "01-08", assetReturn: 0.0095, signal: 1 },
  { date: "01-09", assetReturn: 0.0189, signal: 1 },
  { date: "01-10", assetReturn: -0.0093, signal: 0 },
  { date: "01-11", assetReturn: 0.028, signal: 0 },
];
