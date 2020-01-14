import { createSlice, PayloadAction } from 'redux-starter-kit';

export type chartInfo = {}

export type ApiErrorAction = {
  error: string;
};

const initialState:any ={}



const slice = createSlice({
  name: 'chartInfo',
  initialState,
  reducers: {
  
    chartInfoBasedOnMetricRecevied: (state, action: PayloadAction<any>) => {
      state.chartInfo = action.payload;
     
    },
    chartInfoApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const chartInfo = slice.reducer;
export const actions = slice.actions;
export const chartActions = slice.actions;
