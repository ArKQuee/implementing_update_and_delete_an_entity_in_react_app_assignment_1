import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UpdateItem = ({ item }) => {
  const [formData, setFormData] = useState({ name: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (item) {
      setFormData({ name: item.name });
    }
  }, [item]);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedItem = await response.json();
      setMessage("Item updated successfully!");
      console.log("Updated Item:", updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
      setMessage("Failed to update item.");
    }
  };

  return (
    <div className="update-container">
      <h2>Update Item</h2>
      {item ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Loading item</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};
UpdateItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateItem;
