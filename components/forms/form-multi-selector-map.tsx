import { forwardRef } from "react";

import withFormItemWrapper from "../hocs/with-form-item-wrapper";
import { FormControl } from "../ui/form";
import {
  MultiSelectorMap,
  MultiSelectorMapProps,
  MultiSelectRef,
} from "../ui/multi-selector";
const FormMultiSelectorMap = withFormItemWrapper(
  forwardRef<MultiSelectRef, MultiSelectorMapProps>((props, ref) => {
    return (
      <FormControl>
        <MultiSelectorMap {...props} ref={ref} />
      </FormControl>
    );
  }),
);

FormMultiSelectorMap.displayName = "FormMultiSelectorMap";

export { FormMultiSelectorMap };
