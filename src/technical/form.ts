import { FORM_ERROR } from "final-form";
import { FieldRenderProps, FormRenderProps } from "react-final-form";
import { validate as validateJS } from "validate.js";

export function processError(
  meta: FieldRenderProps<HTMLElement>["meta"]
): string | false {
  const error =
    (meta.touched && meta.error) ||
    (!meta.dirtySinceLastSubmit && meta.submitFailed && meta.submitError);

  return error && error.length > 0 ? error[0] : false;
}

export function canSubmit(
  formProps: Pick<
    FormRenderProps,
    "errors" | "touched" | "dirtySinceLastSubmit" | "hasSubmitErrors"
  >
): boolean {
  const erroredFields = Object.keys(formProps.errors);
  const touched = formProps.touched || {};

  return (
    !formProps.errors[FORM_ERROR] &&
    erroredFields.every(erroredField => !touched[erroredField]) &&
    (formProps.dirtySinceLastSubmit || !formProps.hasSubmitErrors)
  );
}

export const validate = (constraints: object) => (values: object) =>
  validateJS(values, constraints);
