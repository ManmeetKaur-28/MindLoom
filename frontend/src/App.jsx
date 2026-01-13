import { useState } from "react";
import bgImage from "../public/assets/background.png";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <main
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
        className=" bg-cover bg-center min-h-screen opacity-98  p-8 "
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
