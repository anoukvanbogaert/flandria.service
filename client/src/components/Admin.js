import React, {useState, useEffect, useRef} from 'react';
import './Admin.scss';
import classNames from 'classnames';

import AdminAddClient from './AdminAddClient';
import AdminAddExService from './AdminAddExService';
import AdminAddOffer from './AdminAddOffer';

const Admin = () => {
  const [oneActive, setOneActive] = useState(false);
  const [twoActive, setTwoActive] = useState(false);
  const [threeActive, setThreeActive] = useState(false);

  let afterClick = '';
  if (oneActive || twoActive || threeActive) {
    afterClick = true;
  } else if (oneActive && twoActive && threeActive) {
    afterClick = false;
  }

  const optionsClass = classNames("admin__options", {
    "admin__options--middle": !afterClick,
    "admin__options--left": afterClick
  });

  return (
    <div className="admin__container">
      <div className={optionsClass}>
        <div onClick={() => setOneActive(!oneActive)}>Add client</div>
        <div onClick={() => setTwoActive(!twoActive)}>Add executed service</div>
        <div onClick={() => setThreeActive(!threeActive)}>Add service offer</div>
      </div>
      <div className="admin__form">
        {oneActive && <AdminAddClient />}
        {twoActive && <AdminAddExService />}
        {threeActive && <AdminAddOffer />}
      </div>

    </div>
  );
};

export default Admin;