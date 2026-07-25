import { useEffect, useState } from "react";
import CategoryService from "../../service/CategoryService";

export default function ManageCategory() {

  const [categories, setCategories] = useState([]);

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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Categories</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}