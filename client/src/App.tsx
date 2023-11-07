
import { createBrowserRouter } from 'react-router-dom';
import './App.css'

const appRouters = createBrowserRouter([
  {
    path: "/",
    element: <h1>hello</h1>,
    // children: [
    //   {
    //     path: "/",
    //     element:<BodyComponet/>
    //   },
    //   {
    //     path: "/about",
    //     element: <About />,
    //   },
    //   {
    //     path: "/contact",
    //     element: <Contact />,
    //   },
    // ],
    // errorElement: <ErrorComponent />,
  },
]);

export default appRouters
