import React from 'react';
import ServiceItem from './ServiceItem';
import './ServiceList.scss';

const ServiceList = ({services}) => {

  const serviceTable = services.map(service => {


    return (
      <ServiceItem
        key={service.id}
        date={service.date}
        remark={service.remark}
      />
    );
  });
  return (
    <>
      {(services.length === 0) ? (
        <p>This service hasn't been performed yet</p>
      ) : (
        <table className="table__latitude">
          <thead>
            <th className="date__column">Date</th>
            <th>Remark</th>
          </thead>
          <tbody>
            {serviceTable}
          </tbody>

        </table>
      )}
    </>


  );
};

export default ServiceList;