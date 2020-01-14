import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import {chartActions} from '../eog-chart/reducer'
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { IState } from '../../store';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {getMetrics  __typename}
`

const getMetrics = (state: IState) => {
  return state
};

export default () => {
  return (
    <Provider value={client}>
      <EogMultiSelect />
    </Provider>
  );
};

const EogMultiSelect = () => {


  const dispatch = useDispatch();
  const metrics = useSelector(getMetrics);
  const [result] = useQuery({
    query,
    variables: {},
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getmetrics } = data;
    dispatch(actions.metricsDataRecevied(getmetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  const onChangeMetrics = (evt: any, selectedMetric: any) => {
    dispatch(chartActions.chartInfoBasedOnMetricRecevied());  
  }
  return <Container >
    <Grid item xs={12} sm={4} md={4}>
      <Typography>
        <Autocomplete
          onChange={onChangeMetrics}
          multiple
          id="size-small-standard-multi"
          options={data.getMetrics}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              placeholder="Select"
              fullWidth
            />
          )}
        />
      </Typography>

    </Grid>
    
  </Container>

};
