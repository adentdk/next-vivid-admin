import { forwardRef } from "react";

import withFormItemWrapper from "../hocs/with-form-item-wrapper";
import {
  DateTimePicker,
  DateTimePickerProps,
  DateTimePickerRef,
} from "../ui/datetime-picker";
import { FormControl } from "../ui/form";

const FormDateTimePicker = withFormItemWrapper(
  forwardRef<DateTimePickerRef, DateTimePickerProps>((props, ref) => {
    return (
      <FormControl>
        <DateTimePicker ref={ref} {...props} />
      </FormControl>
    );
  }),
);

FormDateTimePicker.displayName = "FormDateTimePicker";

export { FormDateTimePicker };
