import React from "react";
import AppRoute from "./routes/AppRoute.route";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false}   toastOptions={{
    duration: 5000, 
  }} />
      <AppRoute />
    </>
  );
}

export default App;
