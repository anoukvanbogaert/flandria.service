import React from 'react';

const ServiceItem = ({date, remark}) => {

  const styledDate = date.slice(0, 10);
  const styledRemark = remark[0].toUpperCase() + remark.substring(1);

  return (
    <tr>
      <td className="date__column">{styledDate}</td>
      <td>{styledRemark}</td>
    </tr>
  );
};

export default ServiceItem;;;;;