import { forwardRef } from "react";

import withFormItemWrapper from "../hocs/with-form-item-wrapper";
import { FormControl } from "../ui/form";
import { TagsInput } from "../ui/tags-input";

const FormTagsInput = withFormItemWrapper(
  forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof TagsInput>>(
    (props, ref) => {
      return (
        <FormControl>
          <TagsInput ref={ref} {...props} />
        </FormControl>
      );
    },
  ),
);

FormTagsInput.displayName = "FormTagsInput";

export { FormTagsInput };
