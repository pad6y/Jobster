import { useEffect } from 'react';
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';

function Stats() {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);

  if (isLoading) return <Loading center />;

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
}
export default Stats;
