import React from 'react';
import OverviewItem from './OverviewItem';

const OverviewList = ({overview, services}) => {
  const overviewTable = overview.map(serviceItem => {

    return (
      <OverviewItem
        key={serviceItem.id}
        serviceItem={serviceItem.service_name}
        services={services}
      />
    );
  });
  return (
    // <table className="table__latitude">
    //   <caption>Service Overview for Diddlina</caption>
    //   {/* <thead>
    //     <th>Date</th>
    //     <th>Service</th>
    //     <th>Remark</th>
    //   </thead> */}
    //   <tbody>
    //     {overviewTable}
    //   </tbody>

    // </table>
    <div>
      {overviewTable}
    </div>
  );
};

export default OverviewList;