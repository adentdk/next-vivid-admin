import { forwardRef } from "react";

import withFormItemWrapper from "../hocs/with-form-item-wrapper";
import { FormControl } from "../ui/form";
import { PasswordInput, PasswordInputProps } from "../ui/password-input";

const FormPasswordInput = withFormItemWrapper(
  forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
    return (
      <FormControl>
        <PasswordInput ref={ref} {...props} />
      </FormControl>
    );
  }),
);

FormPasswordInput.displayName = "FormPasswordInput";

export { FormPasswordInput };
