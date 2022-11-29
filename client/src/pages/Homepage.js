import React from "react";
import chronicDisease from "../Assets/images/chronic.png";
import grief from "../Assets/images/grief.jpeg";
import addiction from '../Assets/images/addiction-pic.jpg';
import ptsd from '../Assets/images/ptsd.jpeg';
import physicalDisability from '../Assets/images/physical-disability.jpeg';
import mentalIllness from '../Assets/images/mental-illness.jpg';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
    <div id="homepage-cards">
    <Link to={`/chronic`}>
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={chronicDisease}
          alt="Card image cap"
        />
        <div className="card-body">
          <p className="card-text">Chronic Diseases</p>
        </div>
      </div>
      </Link>
      <Link to={`/grief`}>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={grief} alt="Card image cap" />
        <div className="card-body">
          <p className="card-text">Grief</p>
        </div>
      </div>
      </Link>
      <Link to={`/addiction`}>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={addiction} alt="Card image cap" />
        <div className="card-body">
          <p className="card-text">Addiction</p>
        </div>
      </div>
      </Link>
      <Link to={`/ptsd`}>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={ptsd} alt="Card image cap" />
        <div className="card-body">
          <p className="card-text">PTSD</p>
        </div>
      </div>
      </Link>
      <Link to={`/physicaldisorder`}>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={physicalDisability} alt="Card image cap" />
        <div className="card-body">
          <p className="card-text">Phyiscal Disorders</p>
        </div>
      </div>
      </Link>
      <Link to={`/mentalillness`}>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={mentalIllness} alt="Card image cap" />
        <div className="card-body">
          <p className="card-text">Mental Illness</p>
        </div>
      </div>
      </Link>
    </div>
    </>
  );
};

export default Homepage;
