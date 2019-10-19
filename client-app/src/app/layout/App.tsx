import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';

// {} represents executable JavaScript code
// Using className is because class is a reserved word for JavaScript
// Using class we will have access to lifecycle method -> should end up use React hooks
// Whenever a component receives props, it causes a re-render of the component, and it updates the virtual DOM
// Then the virtual DOM will then updates the actual DOM

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading activities...' />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

// We also want to see is we also want to make our activity dashboard an observer and any child component that's receiving observables.
// We also want to make an observer as well.
// Because if there's any changes that take place to these observables that we want to see inside a child component then we also have to make these child components observers of our store.
export default observer(App);
