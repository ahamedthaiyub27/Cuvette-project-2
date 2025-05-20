import React from 'react';
import style from './Main.module.css';
import mainImage from '../../Assets/image-removebg-preview 1.png';
import { CiLock } from "react-icons/ci";
import { Link } from 'react-router-dom';


const Main = () => {
  return (
    <>
     <div className={style.maincontainer}>
      <div className={style.maincontent}>
        <img src={mainImage} alt="Pocket Notes" className={style.mainimage} />
      <h1>
 <Link to="/" style={{ cursor: 'pointer', color: 'black' }}>
  Pocket Notes
</Link>
</h1>
        <p>
          Send and receive messages without keeping your phone online.<br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
          <div className={style.encryptionnotice}>
          <CiLock />
          <span>end-to-end encrypted</span>
        </div>
        
      </div>
      
     
    </div>
   
    </>
   
  );
};

export default Main;