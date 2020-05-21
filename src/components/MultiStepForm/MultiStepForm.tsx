import React, { PropsWithChildren, ReactNode, ReactNodeArray } from 'react';
import { Formik, Form } from 'formik';

const Step = (props: PropsWithChildren<ReactNode>) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

interface Props<T> {
  children: ReactNodeArray;
  step?: number;
  initialValues: T;
  onChange?: (values: T) => void;
  onSubmit?: (values: T) => void;
}

function MultiStepForm<T>(props: Props<T>) {
  const [step, setStep] = React.useState(0);
  const {onSubmit} = props;

  const steps = React.Children.toArray(props.children);
  const totalSteps = steps.length;

  const isFirstStep = (s: number) => s === 0;
  const isLastStep = (s: number) => s === totalSteps - 1;

  const handleNext = React.useCallback((e) => {
    e.preventDefault();
    setStep(Math.min(step + 1, totalSteps));
  }, [step, totalSteps]);

  const handlePrevious = React.useCallback((e) => {
    e.preventDefault();
    setStep(Math.max(step - 1, 0));
  }, [step]);

  const handleSubmit = React.useCallback((values: T) => {
    if (onSubmit) {
      onSubmit(values);
    }
  }, [onSubmit]);

  return (
    <Formik initialValues={props.initialValues} onSubmit={handleSubmit}>
      <Form>
        <header>
          Multistep form. Current step: {step + 1} of {totalSteps}
        </header>

        <Step>
          {props.children[step]}
        </Step>

        <footer>
          <button type="button" disabled={isFirstStep(step)} onClick={handlePrevious}>Previous step</button>
          {isLastStep(step)
            ? <button type="submit">Submit</button>
            : <button type="button" onClick={handleNext}>Next step</button>
          }
        </footer>
      </Form>
    </Formik>
  );
}

MultiStepForm.defaultProps = {
  step: 0
};

export default MultiStepForm;