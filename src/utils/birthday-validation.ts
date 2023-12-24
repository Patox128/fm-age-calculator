import * as yup from "yup";

export const schema = yup.object({
  day: yup
    .number()
    .typeError("This field is required")
    .min(1, "Must be a valid day")
    .max(31, "Must be a valid day")
    .when("month", ([month], schema) => {
      if (month === 4)
        return schema
          .min(1, "Must be a valid day")
          .max(30, "Must be a valid day");
      return schema;
    }),
  month: yup.lazy((value) =>
    value === ""
      ? yup.string().required("This field is required")
      : yup
          .number()
          .min(1, "Must be a valid month")
          .max(12, "Must be a valid month")
  ),
  year: yup.lazy((value) =>
    value === ""
      ? yup.string().required("This field is required")
      : yup.number().max(new Date().getFullYear(), "Must be in the past")
  ),
});
