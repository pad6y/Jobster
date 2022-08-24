import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
// import authHeader from '../../utils/authHeader';
import { clear } from './jobSlice';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post('/jobs', job);
    thunkAPI.dispatch(clear());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clear());
    thunkAPI.dispatch(getAllJobs());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return response.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
