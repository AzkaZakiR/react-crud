import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils";

const EditCar = () => {
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCarById();
  }, []);

  const handleFileChange = (event) => {
    console.log("ini handle file", event.target.files)
    setImage(event.target.files[0]);
  };
  const saveTour = async (e) => {
    e.preventDefault();
    try {
      const tourData = {
        packageName: packageName,
        description: description,
        destination: destination,
        duration: duration,
        price: price,
        image: image // Assuming image is already in a format suitable for JSON
      };

      console.log(tourData);
      console.log("model: " + packageName, description, destination, duration);
      await axios.patch(`${baseUrl}/api/v1/tours/update/${id}`, tourData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getCarById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/tours/${id}`);
      console.log(response.data.data.tourPackage); // Check the response data to ensure it contains the expected car information
      const tourData = response.data.data.tourPackage; // Assuming the car data is nested under the 'data' key
      setPackageName(tourData.packageName); // Update state with the correct property names
      setDescription(tourData.description);
      setDestination(tourData.destination);
      setDuration(tourData.duration);
      setPrice(tourData.price);
      setImage(tourData.image);
      console.log("ini data", packageName, description, price, description, duration)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveTour} encType="multipart/form-data">
          <div className="field">
            <label className="label">packageName</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">description</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">destination</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">duration</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
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

export default EditCar;
