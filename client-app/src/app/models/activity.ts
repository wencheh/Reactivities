// Why not class? Because its a blueprint of what an object should look like, and then implement it
// Interface is a structure solely for type checking
export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  venue: string;
}
