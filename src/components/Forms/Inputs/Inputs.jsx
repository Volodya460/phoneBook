import { forwardRef } from "react";

const Input = forwardRef(({ ...rest }, ref) => <input {...rest} ref={ref} />);

Input.displayName = "Input";

export default Input;
