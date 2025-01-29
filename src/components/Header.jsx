import "../styles/Header.css";

import chef from "../assets/Chef Claude Icon.png";
const Header = () => {
  return (
    <nav>
      <img src={chef} alt="logo"></img>
      <h1>Chef Claude</h1>
    </nav>
  );
};

export default Header;
