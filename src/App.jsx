import { useState } from "react";
import AllContent from "./components/AllContent.jsx";
import "./App.css";

function App() {
  // show or hide lists
  const [show, setShow] = useState(true);

  return (
    <div className="App bg-gray-100 pt-10 min-h-screen">
      <button
        onClick={() => setShow(!show)}
        className="bg-emerald-500 text-white py-2 px-6 mb-2 mx-auto block rounded"
      >
        Show or hide lists
      </button>
      {show && <AllContent></AllContent>}
    </div>
  );
}

export default App;
