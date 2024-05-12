import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';

const CardList = ({ data }) => {
  const initialItemCount = 40;
  const additionalItemCount = 10;

  const [visibleItems, setVisibleItems] = useState(data.slice(0, initialItemCount));
  const [hasMoreItems, setHasMoreItems] = useState(data.length > initialItemCount);

  useEffect(() => {
    // Reset visible items when data changes
    setVisibleItems(data.slice(0, initialItemCount));
    setHasMoreItems(data.length > initialItemCount);
  }, [data]); // Dependency on data ensures this runs whenever the filter updates

  const fetchMoreData = () => {
    if (visibleItems.length >= data.length) {
      setHasMoreItems(false);
      return;
    }
    setTimeout(() => {
      setVisibleItems(visibleItems.concat(data.slice(visibleItems.length, visibleItems.length + additionalItemCount)));
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={visibleItems.length}
      next={fetchMoreData}
      hasMore={hasMoreItems}
    >
      <div className="card-list">
        {visibleItems.map((profile, index) => (
          <Card key={index} profile={profile} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default CardList;
