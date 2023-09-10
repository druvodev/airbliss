import { toast } from "react-hot-toast";

const successToast = (massage) => {
  return toast.success(massage);
};

const errorToast = (massage) => {
  return toast.error(massage);
};

export { successToast, errorToast };
