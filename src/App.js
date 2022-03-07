import logo from "./logo.svg";
import "./App.css";
import contentTypes from "./api/contentTypes";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [ganBase64, setGanBase64] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [contentLabel, setContentLabel] = useState(null);
  const [contentAPI, setContentAPI] = useState(null);

  const getImage = async () => {
    if (!contentAPI) {
      return;
    }
    try {
      const resp = await axios.post(
        `${contentAPI.api_address}${contentAPI.route_path}`
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setContentLabel(e.label);
    console.log("Image Type selected: ", e.label);
    setContentAPI(e.value);
    console.log("Image API selected: ", e.value);
  };

  const displayContent = showImage && (
    <img alt="uploaded" src={`data:image/png;base64,${ganBase64}`} />
  );

  return (
    <div className="App">
      <Select
        placeholder="Select Option"
        value={contentTypes.find((obj) => obj.value === contentLabel)} // set selected value
        options={contentTypes} // set list of the data
        onChange={handleChange} // assign onChange function
      />
      <button
        onClick={async () => {
          const result = await getImage();
          if (result) {
            const ganImage = Object.entries(result)[0];
            alert(ganImage[1]);
            setGanBase64(ganImage[1]);
            setShowImage(true);
          } else {
            alert("nothing generated");
          }
        }}
      >
        Get Image
      </button>
      {/*displayContent*/}
      {contentLabel && displayContent}
    </div>
  );
}

export default App;
