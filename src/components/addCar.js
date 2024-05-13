import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils";

const AddCar = () => {
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    console.log("ini handle file", event.target.files)
    setImage(event.target.files[0]);
  };
  const saveCar = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('model', model);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('image', image);

      console.log(formData);
      console.log("model: " + model, type, price, image);
      await axios.post(`${baseUrl}/api/v1/cars/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveCar} encType="multipart/form-data">
          <div className="field">
            <label className="label">Model</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Type</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div class="field">
            <label class="block text-gray-700 text-sm font-bold mb-2">Car Image</label>
            <div class="flex items-center">
              <label class="w-14 flex justify-center items-center bg-gray-200 text-gray-700 rounded-md py-2 px-4 cursor-pointer">

                <span>Upload</span>
                <input type="file" name="image" id="image" class="hidden" onChange={handleFileChange} />
              </label>
              <img src={image} />

            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success" >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
