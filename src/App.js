import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState("1");
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shouldConvert, setShouldConvert] = useState(false);

  useEffect(() => {
    if (!shouldConvert) return;

    async function convert() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${Number(
          amount
        )}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();
      setConverted(data.rates[toCur]);
      setIsLoading(false);
      setShouldConvert(false);
    }

    if (fromCur === toCur) {
      setConverted(amount);
      setIsLoading(false);
      setShouldConvert(false);
      return;
    }

    convert();
  }, [shouldConvert, amount, fromCur, toCur]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConvertClick = () => {
    setShouldConvert(true);
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <input
        type="text"
        value={amount}
        onChange={handleAmountChange}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <button onClick={handleConvertClick} disabled={isLoading}>
        Convert
      </button>
      <p>{isLoading ? "Converting..." : `${converted} ${toCur}`}</p>
    </div>
  );
}
