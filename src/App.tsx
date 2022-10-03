import { FormPage } from './pages/FormPage';
import { ExceptionProvider } from './context/ExceptionContext';

import './styles/global.scss';

export const App = () => {
  return (
    <ExceptionProvider>
      <FormPage />
    </ExceptionProvider>
  );
};
