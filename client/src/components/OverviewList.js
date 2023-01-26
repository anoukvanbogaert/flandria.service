import React from 'react';
import OverviewItem from './OverviewItem';

const OverviewList = ({overview, services}) => {
  const overviewTable = overview.map(overviewItem => {

    return (
      <OverviewItem
        key={overviewItem.id}
        overviewItem={overviewItem.service_name}
        overviewId={overviewItem.id}
        services={services}
      />
    );
  });
  return (
    <>
      <h1>Service overview for [Boat Name]</h1>
      <div>
        {overviewTable}
      </div>

    </>
  );
};

export default OverviewList;