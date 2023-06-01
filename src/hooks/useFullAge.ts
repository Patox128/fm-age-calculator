import { useState } from "react";
import { intervalToDuration } from "date-fns";
import { Birthday } from "../types";

export const useFullAge = () => {
  const [age, setAge] = useState<Birthday>({
    day: null,
    month: null,
    year: null,
  });

  const calculateFullAge = (birthday: Birthday) => {
    const { days, years, months } = intervalToDuration({
      start: new Date(
        Number(birthday.year),
        Number(birthday.month),
        Number(birthday.day)
      ),
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
