import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createJobThunk, editJobThunk, deleteJobThunk } from './jobThunk';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clear: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Created');
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success('Job Edited Successfully...');
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { setEditJob, handleChange, clear } = jobSlice.actions;
export default jobSlice.reducer;
