import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import FormPage from "./components/FormPage.jsx";
import EditPage from "./components/EditForm.jsx";
import { Provider } from "react-redux";
import store from "./store/AppStore.js";
import ApiDemo from "./apiDemo/ApiDemo.jsx";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="formPage" element={<FormPage />} />
      <Route path="edit/:id" element={<EditPage />} />
      <Route path="/apiDemo"  element={<ApiDemo/>}/>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </StrictMode>
 
);
