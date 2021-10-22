import { FunctionComponent, ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './infiniteScroll.module.css';

export type InfiniteScrollProps = {
  isLoading: boolean;
  hasMoreItems?: boolean;
  callback(): void;
  loadingComponent?: ReactElement;
  noMoreItemsComponent?: ReactElement;
};

const InfiniteScroll: FunctionComponent<InfiniteScrollProps> = ({
  isLoading,
  hasMoreItems = true,
  callback,
  loadingComponent = 'Loading',
  noMoreItemsComponent = 'End of the list',
}) => {
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && !isLoading && hasMoreItems) {
      callback();
    }
  }, [inView, isLoading, hasMoreItems, callback]);

  return (
    <>
      {isLoading && loadingComponent}
      {!isLoading && (
        <div className={styles.container} ref={ref}>
          {inView && !hasMoreItems && noMoreItemsComponent}
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
