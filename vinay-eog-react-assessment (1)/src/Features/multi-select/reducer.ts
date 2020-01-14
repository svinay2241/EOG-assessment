import { createSlice, PayloadAction } from 'redux-starter-kit';

export type metrics = []

export type ApiErrorAction = {
  error: string;
};

const initialState:any ={}



const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<metrics>) => {
      state.metrics = action.payload;
     
    },
    chartInfoBasedOnMetricRecevied: (state, action: PayloadAction<any>) => {
      state.chartInfo = action.payload;
     
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const metrics = slice.reducer;
export const actions = slice.actions;
