
import { createBrowserRouter } from 'react-router-dom';
import './App.css'
import { Billing } from './component/Billing';

const appRouters = createBrowserRouter([
  {
    path: "/",
    element: <Billing/>,
    
    // errorElement: <ErrorComponent />,
  },
]);

export default appRouters
