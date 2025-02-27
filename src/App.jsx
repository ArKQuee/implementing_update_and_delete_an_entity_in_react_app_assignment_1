import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`;

function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(API_URI)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error("Error fetching item:", err));
  }, []);

  return (
    <div>
      <h1>Update Door</h1>
      {item ? <UpdateItem item={item} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
