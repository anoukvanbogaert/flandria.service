import React from 'react';

const ServiceItem = ({date, service, remark}) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{service}</td>
      <td>{remark}</td>
    </tr>
  );
};

export default ServiceItem;;;;;