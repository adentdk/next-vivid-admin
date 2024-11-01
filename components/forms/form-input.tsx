import { forwardRef } from "react";

import withFormItemWrapper from "../hocs/with-form-item-wrapper";
import { FormControl } from "../ui/form";
import { Input, InputProps } from "../ui/input";

const FormInput = withFormItemWrapper(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
      <FormControl>
        <Input ref={ref} {...props} />
      </FormControl>
    );
  }),
);

FormInput.displayName = "FormInput";

export { FormInput };
