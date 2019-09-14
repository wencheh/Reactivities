import React from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';

// {} represents executable JavaScript code
// use className is because class is a reserved word for JavaScript
class App extends React.Component {
  // Using class we will have access to lifecycle method
  state = {
    values: []
  };

  // This is a good place to fetch our data
  // Use Axios to make http requests
  componentDidMount() {
    // axios.get() returns a promise (axios response), which means we can use .then() statement
    axios.get('http://localhost:5000/api/values').then(response => {
      this.setState({
        // data object in axios response contains what's returned from our API
        values: response.data
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
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
