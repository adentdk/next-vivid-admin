import { forwardRef } from "react";

import withFormItemWrapper from "../hocs/with-form-item-wrapper";
import { FormControl } from "../ui/form";
import { Textarea } from "../ui/textarea";

const FormTextArea = withFormItemWrapper(
  forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
    (props, ref) => {
      return (
        <FormControl>
          <Textarea ref={ref} {...props} />
        </FormControl>
      );
    },
  ),
);

FormTextArea.displayName = "FormTextArea";

export { FormTextArea };
