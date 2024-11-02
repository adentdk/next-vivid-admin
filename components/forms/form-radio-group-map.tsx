import { forwardRef } from "react";

import withFormItemWrapper from "../hocs/with-form-item-wrapper";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupMapProps,
} from "../ui/radio-group";

const FormRadioGroupMap = withFormItemWrapper(
  forwardRef<React.ElementRef<typeof RadioGroup>, RadioGroupMapProps>(
    ({ items, ...props }, ref) => {
      return (
        <RadioGroup ref={ref} {...props}>
          {items.map((item) => (
            <FormItem
              key={item.value}
              className="flex items-center space-x-2 space-y-0"
            >
              <FormControl>
                <RadioGroupItem value={item.value} />
              </FormControl>
              <FormLabel className="font-normal">{item.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      );
    },
  ),
);

FormRadioGroupMap.displayName = "FormRadioGroupMap";

export { FormRadioGroupMap };
