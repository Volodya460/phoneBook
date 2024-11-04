import { ComponentPropsWithoutRef, forwardRef } from "react";
interface InputProps extends ComponentPropsWithoutRef<"input"> {
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, ...rest }, ref) => (
    <input {...rest} ref={ref} placeholder={placeholder} />
  )
);

export default Input;
