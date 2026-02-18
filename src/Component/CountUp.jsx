// CountUp.jsx
import React, { useEffect, useState } from "react";

const CountUp = ({ end, duration = 2000, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0); // reset every time trigger changes

    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [trigger]); // IMPORTANT: repeat animation when trigger updates

  return <span>{count}</span>;
};

export default CountUp;
