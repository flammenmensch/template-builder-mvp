import React from 'react';
import ReactDOM from 'react-dom';
import { useFormikContext } from 'formik';
import * as serviceWorker from './serviceWorker';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import TemplateBuilder  from './components/TemplateBuilder/TemplateBuilder';
import { Template } from './components/TemplateBuilder/types';

interface Data {
  template: Template;
}

const initialData: Data = {
  template: {
    id: '1',
    levels: [
      { id: '1', label: 'Level', levels: [
          { id: '3', label: 'Sublevel', levels: [], components: [] }
        ], components: [] },
      { id: '2', label: 'Level', levels: [], components: [] },
    ]
  }
}

const TemplateBuilderFormItem = () => {
  const ctx = useFormikContext<Data>();

  const handleChange = React.useCallback((template) => {
    console.log('CHANGED', template);
    ctx.setFieldValue('template', template);
  }, [ctx]);

  return (
    <TemplateBuilder
      template={ctx.values.template}
      onChange={handleChange}
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <h1>Template Builder Component</h1>
    <MultiStepForm initialValues={initialData} onSubmit={console.log}>
      <div>Abc</div>
      <div>
        <TemplateBuilderFormItem />
      </div>
      <div>Efg</div>
    </MultiStepForm>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
