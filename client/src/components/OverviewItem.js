import React, {useState, useEffect} from 'react';
import './OverviewItem.scss';

import ServiceList from './ServiceList';

const OverviewItem = ({overviewItem, overviewId, services}) => {

  const [isActive, setIsActive] = useState(false);
  const [lastService, setLastService] = useState('');

  const serviceName = overviewItem[0].toUpperCase() + overviewItem.substring(1);

  const theseServices = services.filter(function(ele) {
    return ele.overview_id === overviewId;
  });

  useEffect(() => {
    if (theseServices.length > 0) {
      setLastService(theseServices[0].date.slice(0, 10));
    }
  }, []);


  return (
    <React.Fragment>
      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-title">
            <div className="accordion-left">{serviceName}</div>
            {lastService && <div className="accordion-right">Last service: {lastService}</div>}
            <div className="accordion-middle" onClick={() => setIsActive(!isActive)}>
              {isActive ? 'Hide history -' : 'Show history +'}
            </div>
          </div>
          {isActive && <div className="home__table">
            <ServiceList
              services={theseServices}
            />
          </div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OverviewItem;