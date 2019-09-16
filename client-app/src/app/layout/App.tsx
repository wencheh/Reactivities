import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// {} represents executable JavaScript code
// Using className is because class is a reserved word for JavaScript
// Using class we will have access to lifecycle method
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  // In order to get our data back from the API, we have to use useEffect hook
  useEffect(() => {
    // Use Axios to make http requests
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  // Component should always has render function
  // Have to use this because we are referencing a class property "state"
  // In JSX we only can return one element, but that element can contain a bunch of children
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
