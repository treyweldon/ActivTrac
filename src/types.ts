export type ActivityType = 'Golf' | 'Surfing' | 'Mountain Biking';

export interface BaseActivity {
  id: string;
  date: string;
  city: string;
  state: string;
  type: ActivityType;
  user_id?: string;
  created_at?: string;
  weather?: WeatherData;
}

export interface GolfActivity extends BaseActivity {
  type: 'Golf';
  courseName?: string;
  coursename?: string;
  score: number;
}

export interface SurfingActivity extends BaseActivity {
  type: 'Surfing';
  duration: number;
  beachName?: string;
  beachname?: string;
}

export interface MountainBikingActivity extends BaseActivity {
  type: 'Mountain Biking';
  duration: number;
  distance: number;
  trailSystem?: string;
  trailsystem?: string;
}

export type Activity = GolfActivity | SurfingActivity | MountainBikingActivity;

export interface WeatherData {
  temperature: number;
  conditions: string;
  windSpeed: number;
  icon?: string;
}

export interface User {
  id: string;
  email: string;
}