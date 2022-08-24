import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleChange,
  clear,
  createJob,
  editJob,
} from '../../features/job/jobSlice';

import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddJob() {
  const {
    // isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, [dispatch, isEditing, user.location]);

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all required fields');
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      navigate('/all-jobs');
      return;
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }));
    navigate('/all-jobs');
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clear())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleJobSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
export default AddJob;
