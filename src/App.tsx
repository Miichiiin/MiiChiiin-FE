// import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routex";


function App() {
   

    return (
        <>
          <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;
