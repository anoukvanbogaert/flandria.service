import React from 'react';
import ServiceItem from './ServiceItem';

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
    <tbody>
      <tr>
        <th>Date</th>
        <th>Service</th>
        <th>Remark</th>
      </tr>
      {serviceTable}

    </tbody>


  );
};

export default ServiceList;