import arrow from "./assets/icon-arrow.svg";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFullAge } from "./hooks/useFullAge";
import { Birthday } from "./types";
import { schema } from "./utils/birthday-validation";

interface Form {
  inputValues: Birthday;
}

function App() {
  const { age, calculateFullAge } = useFullAge();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form["inputValues"]>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Birthday> = (data) => {
    calculateFullAge(data);
    reset();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <main
        className="mx-auto w-11/12 max-w-3xl space-y-16 rounded-2xl rounded-br-[100px] 
        bg-white px-4 py-14 shadow sm:rounded-br-[150px] md:px-16 lg:rounded-br-[200px]"
      >
        <form className="flex gap-4 lg:gap-8">
          <div>
            <label
              className={`block font-bold text-gray-500 ${
                errors.day && "text-red-400"
              }`}
            >
              DAY
            </label>
            <input
              className={`${
                errors.day && "border-red-600 focus:border-red-600"
              }`}
              {...register("day")}
              type="number"
              placeholder="DD"
              min={1}
              max={31}
            />
            <p className="italic text-red-600">{errors.day?.message}</p>
          </div>
          <div>
            <label
              className={`block font-bold text-gray-500 ${
                errors.month && "text-red-400"
              }`}
            >
              MONTH
            </label>
            <input
              className={`${
                errors.month && "border-red-600 focus:border-red-600"
              }`}
              {...register("month")}
              type="number"
              placeholder="MM"
              min={1}
              max={12}
            />
            <p className="italic text-red-600">{errors.month?.message}</p>
          </div>
          <div>
            <label
              className={`block font-bold text-gray-500 ${
                errors.year && "text-red-400"
              }`}
            >
              YEAR
            </label>
            <input
              className={`${
                errors.year && "border-red-600 focus:border-red-600"
              }`}
              {...register("year")}
              type="number"
              placeholder="YYYY"
              min={1900}
              max={new Date().getFullYear()}
            />
            <p className="italic text-red-600">{errors.year?.message}</p>
          </div>
        </form>
        <div className="relative">
          <div className="border border-gray-200 "></div>
          <button
            className="absolute right-1/2 top-1/2 -translate-y-1/2 
            translate-x-1/2 lg:right-0 lg:translate-x-0"
            onClick={handleSubmit(onSubmit)}
          >
            <img
              src={arrow}
              alt="Arrow Icon"
              className="rounded-full bg-violet-600 p-3"
            />
          </button>
        </div>
        <div>
          <h1 className="text-5xl font-bold italic sm:text-6xl lg:text-8xl">
            <span className="pr-5 text-violet-600">
              {age.year !== 0 ? age.year : "--"}
            </span>
            years
          </h1>
          <h1 className="text-5xl font-bold italic sm:text-6xl lg:text-8xl">
            <span className="pr-5 text-violet-600">
              {age.month !== 0 ? age.month : "--"}
            </span>
            months
          </h1>
          <h1 className="text-5xl font-bold italic sm:text-6xl lg:text-8xl">
            <span className=" pr-5 text-violet-600">
              {age.day !== 0 ? age.day : "--"}
            </span>
            days
          </h1>
        </div>
      </main>
    </div>
  );
}

export default App;
