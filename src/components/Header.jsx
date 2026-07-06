import "../App.css";
import applogo from "/image/AcadFlow-icon.png";

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={applogo} alt="Application Logo" width="150" />
      </div>
    </>
  );
};

export default Header;
