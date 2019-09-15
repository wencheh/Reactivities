import React from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';

interface IState {
  activities: IActivity[];
}

// {} represents executable JavaScript code
// Using className is because class is a reserved word for JavaScript
// Using class we will have access to lifecycle method
class App extends React.Component<{}, IState> {
  readonly state: IState = {
    activities: []
  };

  // This is a good place to fetch our data. Use Axios to make http requests
  componentDidMount() {
    // axios.get() returns a promise (axios response), which means we can use .then() statement
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        this.setState({
          // data object in axios response contains what's returned from our API
          activities: response.data
        });
      });
  }

  // Component should always has render function
  // Have to use this because we are referencing a class property "state"
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.activities.map(activity => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
