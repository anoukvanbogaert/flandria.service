import React, {useState} from 'react';
import './OverviewItem.scss';

import ServiceList from './ServiceList';

const OverviewItem = ({serviceItem, services}) => {
  console.log('services', services);

  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-title">
            <div>{serviceItem}</div>
            <div>Last service: TEST</div>
            <div onClick={() => setIsActive(!isActive)}>
              {isActive ? 'Hide history -' : 'Show history +'}
            </div>
          </div>
          {isActive && <div className="accordion-content">
          </div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OverviewItem;