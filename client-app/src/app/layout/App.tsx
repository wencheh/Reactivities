import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

/* 
    1. {} represents executable JavaScript code
    2. Using className is because class is a reserved word for JavaScript.
    3. Using class we will have access to lifecycle method, but those should end up using "React hooks"
    4. Whenever a component receives props, it causes a rerender of the component, and it updates the virtual DOM, then the virtual DOM will then updates the actual DOM
*/

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route exact path='/activities/:id' component={ActivityDetails} />

              {/* Add a key to this route, so when the props changes (creating vs managing an activity) inside this route, it creates a new instance whichever the component is loading here */}
              <Route
                key={location.key}
                path={['/createActivity', '/manage/:id']}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

/* 
    We also want to make our activity dashboard an observer and any child component that's receiving observables.
    Because if there's any changes that take place to these observables that we want to see inside a child component,
    then we also have to make these child components observers of our store.
*/
export default withRouter(observer(App));
