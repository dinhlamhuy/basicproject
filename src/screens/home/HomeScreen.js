import React from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  const navigateToDetail = (link) => {
    navigate(link); // Navigate to the "/detail" route
  };

  return (
    <>
      <div>Trang home</div>
      <button onClick={() => {navigateToDetail('/detail')}}>Detail</button>
      <button onClick={() => {navigateToDetail('/about')}}>About</button>
      <button onClick={() => {navigateToDetail('/login')}}>Login</button>
    </>
  );
};

export default HomeScreen;
