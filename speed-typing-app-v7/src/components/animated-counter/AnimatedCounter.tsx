import React, { useState, useEffect } from "react";
import "./AnimatedCounter.css";

const AnimatedCounter: React.FC = () => {
  const [tens, setTens] = useState<number>(9);
  const [units, setUnits] = useState<number>(9);
  const [animateTens, setAnimateTens] = useState<boolean>(false);
  const [animateUnits, setAnimateUnits] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateUnits(true);
      setUnits((prevUnits) => {
        if (prevUnits > 0) {
          return prevUnits - 1;
        } else {
          setAnimateTens(true);
          setTens((prevTens) => (prevTens > 0 ? prevTens - 1 : 0));
          return 9;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateUnits(false), 500);
    return () => clearTimeout(timeout);
  }, [units]);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateTens(false), 500);
    return () => clearTimeout(timeout);
  }, [tens]);

  return (
    <div className="counter">
      <span className={`digit ${animateTens ? "slide" : ""}`}>{tens}</span>
      <span className={`digit ${animateUnits ? "slide" : ""}`}>{units}</span>

      {/* <span className={`digit ${animateTens ? "animate" : ""}`}>{tens}</span>
      <span className={`digit ${animateUnits ? "animate" : ""}`}>{units}</span> */}
    </div>
  );
};

export default AnimatedCounter;
