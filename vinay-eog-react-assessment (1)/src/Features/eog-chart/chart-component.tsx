import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
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
query ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
      __typename
    }
    __typename
  }
  __typename
}
`

const getchartData = (state: IState) => {
  return state
};  

export default () => {
  return (
    <Provider value={client}>
      <DisplayComponent />
    </Provider>
  );
};

const DisplayComponent = () => {


  const dispatch = useDispatch();
  const metrics = useSelector(getchartData);
  const [result] = useQuery({
    query,
    "variables":{"input": [{"metricName": "waterTemp"}]}
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.chartInfoApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getchartData } = data;
    console.log("data",data)
    dispatch(actions.chartInfoBasedOnMetricRecevied(getchartData));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  return <Container >
    <Grid item xs={12} sm={4} md={4}>
    <div>
        EOG
        {JSON.stringify(data)}
    </div>
    </Grid>
    
  </Container>

};
