import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />

      {/* Offset for fixed navbar */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
