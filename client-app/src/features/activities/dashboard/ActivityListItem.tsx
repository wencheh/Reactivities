import React from 'react';
import { Item, Button, SegmentGroup, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <SegmentGroup>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {activity.date}
        <Icon name='marker' /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </SegmentGroup>
  );
};

export default ActivityListItem;

/*
    <Button
        // Make each button unique
        name={activity.id}

        // This loading flag is only going to be activated when we are deleting an activity, and the button name matches the activity.id
        // This loading indicator will not be activated when we are editing an event/activity
        loading={target === activity.id && submitting}
        
        // Pass React mouse event as an additional parameter to deleteActivity, then from there we are able to extract the name of the button we are clicking, then set as the target button we want to activate when it is loading
        onClick={e => deleteActivity(e, activity.id)}
        floated='right'
        content='Delete'
        color='red'
    />
*/
