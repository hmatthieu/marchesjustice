import * as React from "react";
import { useCallback, useRef } from "react";
import { Field, Form } from "react-final-form";
import { canSubmit, processError, validate } from "../../technical/form";
import styled from "styled-components";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import * as Input from "../../components/input";
import { Checkbox } from "../../components/input/Checkbox";
import { useContent } from "../../technical/contentful/content";
import { TextKey } from "../../technical/contentful/text";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const Container = styled.div`
  max-width: 1024px;
  margin: auto;
`;

const HTMLForm = styled.form`
  display: flex;
  flex-direction: column;
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

interface Values {
  EMAIL: string;
  OPT_IN: boolean;
  postal: string;
}

export const EventForm = () => {
  const { texts } = useContent();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback((values: Values) => {
    const formData = new FormData(formRef.current);
    formData.set("OPT_IN", values.OPT_IN ? "1" : "");
    return fetch(process.env.SEND_IN_BLUE_FORM, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });
  }, []);

  return (
    <Container>
      <Card>
        <Form
          id="sib-form"
          onSubmit={handleSubmit}
          validate={validate({
            EMAIL: {
              email: true,
            },
            postal: {
              format: /^(?:(?:(?:0[1-9]|[1-8]\d|9[0-4])(?:\d{3})?)|97[1-8]|98[4-9]|‌​‌​2[abAB])$/,
            },
          })}
        >
          {formProps => (
            <HTMLForm ref={formRef} onSubmit={formProps.handleSubmit}>
              <InputContainer>
                <Field id="EMAIL" name="EMAIL" type="text">
                  {({ input, meta }) => {
                    const error = processError(meta);

                    return (
                      <Input.Errored error={error}>
                        <Input.Text
                          {...input}
                          disabled={formProps.submitting}
                          error={!!error}
                          placeholder={documentToPlainTextString(
                            texts[TextKey.MAP_FORM_EMAIL]
                          )}
                        />
                      </Input.Errored>
                    );
                  }}
                </Field>
              </InputContainer>
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
                            texts[TextKey.MAP_FORM_POSTAL]
                          )}
                        />
                      </Input.Errored>
                    );
                  }}
                </Field>
              </InputContainer>

              <Field id="OPT_IN" name="OPT_IN" type="checkbox">
                {({ input, meta }) => {
                  const error = processError(meta);

                  return (
                    <Input.Errored error={error}>
                      <InputContainer>
                        <Checkbox
                          {...input}
                          disabled={formProps.submitting}
                          id="OPT_IN"
                        />
                        <Label htmlFor="OPT_IN">
                          {documentToPlainTextString(
                            texts[TextKey.MAP_FORM_OTIN]
                          )}
                        </Label>
                      </InputContainer>
                    </Input.Errored>
                  );
                }}
              </Field>
              <input
                type="text"
                name="email_address_check"
                value=""
                className="input--hidden"
              />
              <HiddenInput type="hidden" name="locale" value="fr" />
              <HiddenInput type="hidden" name="html_type" value="simple" />
              <Button
                disabled={!canSubmit(formProps)}
                loading={formProps.submitting}
              >
                {documentToPlainTextString(texts[TextKey.MAP_FORM_CTA])}
              </Button>
            </HTMLForm>
          )}
        </Form>
      </Card>
    </Container>
  );
};
