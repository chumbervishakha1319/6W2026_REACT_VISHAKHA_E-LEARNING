import { useState, useEffect } from "react";
import CategoryService from "../../service/CategoryService";

export default function Category() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await CategoryService.getAllCategories();

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCategories(list);
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await CategoryService.updateCategory(editId, {
          name,
          description,
        });

        alert("Category Updated Successfully");

        setIsEditing(false);
        setEditId(null);
      } else {
        await CategoryService.addCategory({
          name,
          description,
        });

        alert("Category Added Successfully");
      }

      setName("");
      setDescription("");
      getCategories();

    } catch (error) {
      alert(error.message);
    }
  };

  const editCategory = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditId(item.id);
    setIsEditing(true);
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await CategoryService.deleteCategory(id);
        alert("Category Deleted Successfully");
        getCategories();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          {isEditing ? "Update Category" : "Add Category"}
        </h2>

        <form onSubmit={saveCategory}>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Category Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isEditing ? "Update Category" : "Save Category"}
          </button>

        </form>

        <hr />

        <h3 className="mt-4 mb-3">All Categories</h3>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => editCategory(item)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCategory(item.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}