import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../features/allJobs/allJobsSlice';

function PageBtnContainer() {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  // console.log(page, pages);
  const nextPage = () => {
    dispatch(changePage(page + 1));
  };
  const prevPage = () => {
    dispatch(changePage(page - 1));
  };

  return (
    <Wrapper>
      {page > 1 && (
        <button className="prev-btn" onClick={prevPage}>
          <HiChevronDoubleLeft /> prev
        </button>
      )}
      <div className="btn-container">
        {pages.map((pageNum) => {
          return (
            <button
              type="button"
              className={pageNum === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNum}
              onClick={() => dispatch(changePage(pageNum))}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      {page <= pages.length - 1 && (
        <button className="next-btn" onClick={nextPage}>
          next <HiChevronDoubleRight />
        </button>
      )}
    </Wrapper>
  );
}
export default PageBtnContainer;
