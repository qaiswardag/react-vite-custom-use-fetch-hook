import { useState } from "react";
import "./App.css";
import ListContent from "./components/ListContent";

function App() {
  // show or hide lists
  const [show, setShow] = useState(true);

  return (
    <div className="App bg-gray-100 pt-10 min-h-screen">
      <button
        onClick={() => setShow(show ? false : true)}
        className="bg-emerald-500 text-white py-2 px-6 mb-2 mx-auto block rounded"
      >
        Show or hide lists
      </button>

      {show && <ListContent></ListContent>}
    </div>
  );
}

export default App;
