import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/tours/getAll`);
    console.log(response.data.data.tourPackages);
    setCars(response.data.data.tourPackages);
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/cars`);
      getCars();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-success">
          Add New
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>City</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.packageName}</td>
                <td>{user.destination}</td>
                <td>{user.price}</td>
                <img src={user.image}></img>
                <td>
                  <Link
                    to={`edit/${user.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCar(user.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarList;
