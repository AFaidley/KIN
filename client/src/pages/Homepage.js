import React from 'react';
import chronicDisease from '../Assets/images/chronic.png';
import grief from '../Assets/images/grief.jpeg';
import addiction from '../Assets/images/addiction-pic.jpg';
import ptsd from '../Assets/images/ptsd.jpeg';
import physicalDisability from '../Assets/images/physical-disability.jpeg';
import mentalIllness from '../Assets/images/mental-illness.jpg';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
      <div className='homepage-cards row'>
          <div className='card m-5 col-lg-3 justify-content-center text-center p-0 card-main'>
        <Link to={`/chronic`}>
            <img
              className='card-img-top p-1'
              src={chronicDisease}
              alt='Card cap'
            />
            <div className='card-body'>
              <p className='card-text'>Chronic Diseases</p>
            </div>
        </Link>
          </div>
          <div className='card m-5 col-lg-3 justify-content-center text-center p-0 card-main'>
        <Link to={`/grief`}>
            <img className='card-img-top p-1' src={grief} alt='Card cap' />
            <div className='card-body'>
              <p className='card-text'>Grief</p>
            </div>
        </Link>
          </div>
          <div className='card m-5 col-lg-3 justify-content-center text-center p-0 card-main'>
        <Link to={`/addiction`}>
            <img
              className='card-img-top p-1'
              src={addiction}
              alt='Card cap'
            />
            <div className='card-body'>
              <p className='card-text'>Addiction</p>
            </div>
        </Link>
          </div>
          
          <div className='card m-5 col-lg-3 justify-content-center text-center p-0 card-main'>
        <Link to={`/ptsd`}>
            <img className='card-img-top p-1' src={ptsd} alt='Card cap' />
            <div className='card-body'>
              <p className='card-text'>PTSD</p>
            </div>
        </Link>
          </div>
          <div className='card m-5 col-lg-3 justify-content-center text-center p-0 card-main'>
        <Link to={`/physical`}>
            <img
              className='card-img-top p-1'
              src={physicalDisability}
              alt='Card cap'
            />
            <div className='card-body'>
              <p className='card-text'>Phyiscal Disorders</p>
            </div>
        </Link>
          </div>
          <div className='card m-5 col-lg-3 justify-content-center text-center p-0 card-main'>
        <Link to={`/mental`}>
            <img
              className='card-img-top p-1'
              src={mentalIllness}
              alt='Card cap'
            />
            <div className='card-body'>
              <p className='card-text'>Mental Illness</p>
            </div>
        </Link>
          </div>
      </div>
    </>
  );
};

export default Homepage;
