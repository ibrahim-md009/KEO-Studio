import { useEffect, useState, useRef } from "react";

const Count = ({ target, prefix, suffix }) => {
  const [counter, setCounter] = useState(0);
  const [started, setStarted] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const DURATION = 2000;
  const INTERVAL = 40;

  useEffect(() => {
    if (!started) return;

    const step = Math.max(1, Math.ceil(target / (DURATION / INTERVAL)));

    const timer = setInterval(() => {
      setCounter((prev) => {
        const next = prev + step;

        if (next >= target) {
          clearInterval(timer);
          return target;
        }

        return next;
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [target, started]);

  return (
    <b ref={ref}>
      {prefix}
      {counter}
      {suffix}
    </b>
  );
};
export default Count;
