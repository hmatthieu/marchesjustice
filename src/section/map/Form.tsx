import * as React from "react";
import { HTMLProps, useCallback, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { canSubmit, processError, validate } from "../../technical/form";
import styled from "styled-components";
import { Card } from "../../components/Card";
import { Button as BaseButton } from "../../components/Button";
import * as Input from "../../components/input";
import { Checkbox } from "../../components/input/Checkbox";
import { useContent } from "../../technical/contentful/content";
import { TextKey } from "../../technical/contentful/text";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { TEXT_DARK } from "../../constant/Colors";

const Container = styled.div`
  max-width: 1024px;
  margin: auto;
  color: ${TEXT_DARK};
`;

const HTMLForm = styled.form`
  display: flex;
  flex-direction: column;
  pointer-events: all;
`;

const HiddenInput = styled.input`
  display: none;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const Label = styled(Input.Label)`
  margin-left: 8px;
`;

const Button = styled(BaseButton)`
  margin-top: 24px;
`;

const SuccessMessage = styled.p<{ visible: boolean }>`
  position: absolute;
  bottom: 12px;
  transition: all 0.3s ease;
  white-space: break-spaces;

  ${({ visible }) =>
    visible
      ? `
  opacity: 1;
  transform: translateY(0);
 `
      : `
  opacity: 0;
  transform: translateY(-100%);
 `}
`;

interface Values {
  EMAIL: string;
  OPT_IN: boolean;
  postal: string;
}

interface Props {
  onSubmitPostalCode: (postal: string) => void;
  className?: HTMLProps<HTMLDivElement>["className"];
}

let instanceCount = 0;

export const EventForm = ({ onSubmitPostalCode, className }: Props) => {
  const [instanceId] = useState(instanceCount++);
  const { texts } = useContent();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    (values: Values) => {
      onSubmitPostalCode(values.postal);
      const formData = new FormData(formRef.current);
      formData.set("OPT_IN", values.OPT_IN ? "1" : "");
      return fetch(process.env.SEND_IN_BLUE_FORM, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
    },
    [onSubmitPostalCode]
  );

  return (
    <Container className={className}>
      <Card className="px-8 sm:px-12 pt-12 pb-16 sm:pb-12 relative">
        <Form
          onSubmit={handleSubmit}
          validate={validate({
            EMAIL: {
              email: {
                message: "^L'email n'est pas valide.",
              },
              presence: {
                message: "^L'email est requis.",
              },
            },
            postal: {
              length: {
                minimum: 3,
                message: "^Le code postal doit faire plus de 3 caractères.",
              },
            },
          })}
        >
          {formProps => (
            <HTMLForm ref={formRef} onSubmit={formProps.handleSubmit}>
              <Field name="EMAIL" type="text">
                {({ input, meta }) => {
                  const error = processError(meta);

                  return (
                    <Input.Errored error={error}>
                      <Input.Text
                        {...input}
                        disabled={formProps.submitting}
                        error={!!error}
                        placeholder={documentToPlainTextString(
                          texts[TextKey.MAP_FORM_EMAIL].document
                        )}
                      />
                    </Input.Errored>
                  );
                }}
              </Field>
              <InputContainer>
                <Field name="postal" type="text">
                  {({ input, meta }) => {
                    const error = processError(meta);

                    return (
                      <Input.Errored error={error}>
                        <Input.Text
                          {...input}
                          disabled={formProps.submitting}
                          error={!!error}
                          placeholder={documentToPlainTextString(
                            texts[TextKey.MAP_FORM_POSTAL].document
                          )}
                        />
                      </Input.Errored>
                    );
                  }}
                </Field>
              </InputContainer>

              <Field name="OPT_IN" type="checkbox">
                {({ input, meta }) => {
                  const error = processError(meta);

                  return (
                    <Input.Errored error={error}>
                      <InputContainer>
                        <Checkbox
                          {...input}
                          disabled={formProps.submitting}
                          id={`OPT_IN_${instanceId}`}
                        />
                        <Label htmlFor={`OPT_IN_${instanceId}`}>
                          {documentToPlainTextString(
                            texts[TextKey.MAP_FORM_OTIN].document
                          )}
                        </Label>
                      </InputContainer>
                    </Input.Errored>
                  );
                }}
              </Field>
              <HiddenInput type="text" name="email_address_check" value="" />
              <HiddenInput type="hidden" name="locale" value="fr" />
              <HiddenInput type="hidden" name="html_type" value="simple" />
              <Button
                disabled={!canSubmit(formProps)}
                loading={formProps.submitting}
                style={{ zIndex: 1 }}
              >
                {documentToPlainTextString(
                  texts[TextKey.MAP_FORM_CTA].document
                )}
              </Button>
              <SuccessMessage visible={formProps.submitSucceeded}>
                {documentToPlainTextString(
                  texts[TextKey.MAP_FORM_SUCCESS].document
                )}
              </SuccessMessage>
            </HTMLForm>
          )}
        </Form>
      </Card>
    </Container>
  );
};
