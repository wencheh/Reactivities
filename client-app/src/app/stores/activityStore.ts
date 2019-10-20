// React component should start with capital letter
// This MobX store is not, hence lower case
import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

// 1. Get data from API
// 2. Store them to observable
// 3. What ever we do sth with these observables, we need to do it inside the action context

// This is a centuralized state
class ActivityStore {
  @observable activityRegistry = new Map();

  // Where we are going to store our activities
  // @observable activities: IActivity[] = [];

  @observable activity: IActivity | null = null;
  @observable loadingInitial = false;

  // @observable editMode = false;
  @observable submitting = false;

  // Represents the clicked button name
  @observable target = '';

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    // mutating state: valid code in mobx but not in redux
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('Loading activities', () => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          // Using "this" because activities is a class property
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('Loading activities error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = agent.Activities.details(id);
        runInAction('Getting activity', () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction('Getting activity error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('Creating activity', () => {
        this.activityRegistry.set(activity.id, activity);
        // this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('Creating activity error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('Editing activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
        // this.editMode = false;
      });
    } catch (error) {
      runInAction('Editing activity error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('Deleting activity', () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('Deleting activity error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  /* 
    We don't need those any more because we are browsing to our different component by Routes
    We no longer need to control the opening and closing via state anymore
  */
}

// Use the store in our React Component: Context api
// Now we can access our store from our component by using the useContext hook
export default createContext(new ActivityStore());
