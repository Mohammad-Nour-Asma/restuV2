import * as yup from "yup";

export const ingredientValidation = yup.object({
  name: yup.string().required("name field is required"),
  name_ar: yup.string().required("name_ar field is required"),
});
