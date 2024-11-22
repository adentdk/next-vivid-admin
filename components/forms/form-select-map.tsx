import { forwardRef } from "react";

import withFormItemWrapper from "../hocs/with-form-item-wrapper";
import { FormControl } from "../ui/form";
import {
  renderSelectMapItems,
  Select,
  SelectContent,
  SelectMapProps,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormSelectMap = withFormItemWrapper(
  forwardRef<HTMLDivElement, SelectMapProps>(
    ({ items, placeholder, className, ...props }, ref) => {
      return (
        <Select {...props}>
          <FormControl>
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>{renderSelectMapItems(items)}</SelectContent>
        </Select>
      );
    },
  ),
);

FormSelectMap.displayName = "FormSelectMap";

export { FormSelectMap };
