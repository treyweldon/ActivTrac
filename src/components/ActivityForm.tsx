import React, { useState } from 'react';
import { Activity, ActivityType } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { WholeWord as GolfHole, Waves, Bike } from 'lucide-react';
import { getWeatherData } from '../lib/weatherApi';
import toast from 'react-hot-toast';

interface ActivityFormProps {
  onAddActivity: (activity: Activity) => void;
  userId: string;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onAddActivity, userId }) => {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [activityType, setActivityType] = useState<ActivityType>('Golf');
  const [loading, setLoading] = useState(false);
  
  // Golf specific fields
  const [courseName, setCourseName] = useState<string>('');
  const [score, setScore] = useState<string>('');
  
  // Surfing specific fields
  const [surfDuration, setSurfDuration] = useState<string>('');
  const [beachName, setBeachName] = useState<string>('');
  
  // Mountain Biking specific fields
  const [bikeDuration, setBikeDuration] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [trailSystem, setTrailSystem] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get weather data
      const weatherData = await getWeatherData(city, state, date);
      
      let newActivity: any = {
        id: uuidv4(),
        date,
        city,
        state,
        type: activityType,
        user_id: userId,
        weather: weatherData || undefined
      };
      
      switch (activityType) {
        case 'Golf':
          newActivity = {
            ...newActivity,
            coursename: courseName,
            score: parseInt(score, 10)
          };
          break;
        case 'Surfing':
          newActivity = {
            ...newActivity,
            duration: parseFloat(surfDuration),
            beachname: beachName
          };
          break;
        case 'Mountain Biking':
          newActivity = {
            ...newActivity,
            duration: parseFloat(bikeDuration),
            distance: parseFloat(distance),
            trailsystem: trailSystem
          };
          break;
        default:
          setLoading(false);
          return;
      }
      
      await onAddActivity(newActivity);
      toast.success('Activity saved successfully!');
      
      // Reset form
      setDate(new Date().toISOString().split('T')[0]);
      setCity('');
      setState('');
      setCourseName('');
      setScore('');
      setSurfDuration('');
      setBeachName('');
      setBikeDuration('');
      setDistance('');
      setTrailSystem('');
    } catch (error) {
      console.error('Error saving activity:', error);
      toast.error('Failed to save activity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setActivityType('Golf')}
                className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-md ${
                  activityType === 'Golf'
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <GolfHole className="h-5 w-5 mr-1" />
                Golf
              </button>
              
              <button
                type="button"
                onClick={() => setActivityType('Surfing')}
                className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-md ${
                  activityType === 'Surfing'
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Waves className="h-5 w-5 mr-1" />
                Surfing
              </button>
              
              <button
                type="button"
                onClick={() => setActivityType('Mountain Biking')}
                className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-md ${
                  activityType === 'Mountain Biking'
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Bike className="h-5 w-5 mr-1" />
                Biking
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter city"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter state"
              required
            />
          </div>
        </div>
        
        {/* Dynamic fields based on activity type */}
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Activity Details</h3>
          
          {activityType === 'Golf' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter course name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter score"
                  required
                />
              </div>
            </div>
          )}
          
          {activityType === 'Surfing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                <input
                  type="number"
                  step="0.5"
                  value={surfDuration}
                  onChange={(e) => setSurfDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter duration"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beach Name</label>
                <input
                  type="text"
                  value={beachName}
                  onChange={(e) => setBeachName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter beach name"
                  required
                />
              </div>
            </div>
          )}
          
          {activityType === 'Mountain Biking' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                <input
                  type="number"
                  step="0.5"
                  value={bikeDuration}
                  onChange={(e) => setBikeDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter duration"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distance (miles)</label>
                <input
                  type="number"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter distance"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Trail System</label>
                <input
                  type="text"
                  value={trailSystem}
                  onChange={(e) => setTrailSystem(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter trail system"
                  required
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Activity'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;