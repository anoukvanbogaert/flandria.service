import React from 'react';
import ServiceItem from './ServiceItem';
import './ServiceList.scss';

const ServiceList = ({services}) => {

  const serviceTable = services.map(service => {


    return (
      <ServiceItem
        key={service.id}
        date={service.date}
        service={service.service_name}
        remark={service.remark}
      />
    );
  });
  return (
    <table className="table__latitude">
      <caption>Service Overview for Diddlina</caption>
      <thead>
        <th>Date</th>
        <th>Service</th>
        <th>Remark</th>
      </thead>
      <tbody>
        {serviceTable}
      </tbody>

    </table>


  );
};

export default ServiceList;