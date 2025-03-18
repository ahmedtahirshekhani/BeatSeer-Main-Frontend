import { useEffect, useState } from "react";

const DateComponent = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const formatDate = () => {
      const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
      return new Date().toLocaleDateString("en-US", options);
    };
    setDate(formatDate());
  }, []);

  return <h2 className="text-xs md:text-base">Week of {date}</h2>;
};

export default DateComponent;