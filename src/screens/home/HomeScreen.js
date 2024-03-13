import React from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate("/detail"); // Navigate to the "/detail" route
  };

  return (
    <>
      <div>Trang home</div>
      <button onClick={navigateToDetail}>Detail</button>
    </>
  );
};

export default HomeScreen;
