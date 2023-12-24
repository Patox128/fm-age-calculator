import { useState } from "react";
import { intervalToDuration } from "date-fns";
import { Birthday } from "../types";

export const useFullAge = () => {
  const [age, setAge] = useState<Birthday>({
    day: 0,
    month: 0,
    year: 0,
  });

  const calculateFullAge = (birthday: Birthday) => {
    const { days, years, months } = intervalToDuration({
      start: new Date(birthday.year, birthday.month - 1, birthday.day),
      end: new Date(),
    });

    setAge({
      day: Number(days),
      month: Number(months),
      year: Number(years),
    });
  };

  return { age, calculateFullAge };
};
