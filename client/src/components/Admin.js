import React, {useState} from 'react';
import './Admin.scss';
import classNames from 'classnames';

import AdminAddClient from './AdminAddClient';
import AdminAddExService from './AdminAddExService';
import AdminAddOffer from './AdminAddOffer';

const Admin = () => {

  const [activeComponent, setActiveComponent] = useState();

  const handleClick = (component) => {
    activeComponent === component ? setActiveComponent('') :
      setActiveComponent(component);
  };


  let afterClick = '';
  if (activeComponent) {
    afterClick = true;
  } else {
    afterClick = false;
  }

  const formClass = classNames("admin__form", {
    "admin__form--open": afterClick,
    "admin__form--close": !afterClick
  });

  const optionsClass = classNames("admin__options", {
    "admin__options--middle": !afterClick,
    "admin__options--left": afterClick
  });

  return (
    <div className="admin__container">
      <div className={optionsClass}>
        <div onClick={() => handleClick(1)}>Add client</div>
        <div onClick={() => handleClick(2)}>Add executed service</div>
        <div onClick={() => handleClick(3)}>Add service offer</div>
      </div>
      <div className={formClass}>
        {activeComponent === 1 && <AdminAddClient />}
        {activeComponent === 2 && <AdminAddExService
          open={afterClick} />}
        {activeComponent === 3 && <AdminAddOffer />}
      </div>

    </div>
  );
};

export default Admin;