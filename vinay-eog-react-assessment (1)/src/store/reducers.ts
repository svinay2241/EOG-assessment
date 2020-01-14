import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { metrics as metricsReducer } from '../Features/multi-select/reducer';

export default {
  weather: weatherReducer,
  metrics:metricsReducer
};
