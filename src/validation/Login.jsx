import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().max(10).required(),
  password: yup.string().min(4).required(),
});
