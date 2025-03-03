import React from 'react';
import { Activity } from '../types';
import { formatDate } from '../utils/dateUtils';
import { WholeWord as GolfHole, Waves, Bike, MapPin, Calendar, Thermometer, Wind } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'Golf':
        return <GolfHole className="h-6 w-6 text-green-600" />;
      case 'Surfing':
        return <Waves className="h-6 w-6 text-blue-600" />;
      case 'Mountain Biking':
        return <Bike className="h-6 w-6 text-orange-600" />;
      default:
        return null;
    }
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case 'Golf':
        return 'bg-green-100 border-green-200';
      case 'Surfing':
        return 'bg-blue-100 border-blue-200';
      case 'Mountain Biking':
        return 'bg-orange-100 border-orange-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const renderActivityDetails = () => {
    switch (activity.type) {
      case 'Golf':
        return (
          <>
            <p className="text-gray-700"><span className="font-medium">Course:</span> {activity.coursename || activity.courseName}</p>
            <p className="text-gray-700"><span className="font-medium">Score:</span> {activity.score}</p>
          </>
        );
      case 'Surfing':
        return (
          <>
            <p className="text-gray-700"><span className="font-medium">Beach:</span> {activity.beachname || activity.beachName}</p>
            <p className="text-gray-700"><span className="font-medium">Duration:</span> {activity.duration} hours</p>
          </>
        );
      case 'Mountain Biking':
        return (
          <>
            <p className="text-gray-700"><span className="font-medium">Trail:</span> {activity.trailsystem || activity.trailSystem}</p>
            <p className="text-gray-700"><span className="font-medium">Distance:</span> {activity.distance} miles</p>
            <p className="text-gray-700"><span className="font-medium">Duration:</span> {activity.duration} hours</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`rounded-lg shadow-md border p-5 ${getActivityColor()}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          {getActivityIcon()}
          <h3 className="text-lg font-semibold ml-2">{activity.type}</h3>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center text-gray-600 mb-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(activity.date)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{activity.city}, {activity.state}</span>
        </div>
      </div>
      
      <div className="border-t pt-3">
        {renderActivityDetails()}
      </div>
      
      {activity.weather && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Weather Conditions</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Thermometer className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm">{Math.round(activity.weather.temperature)}°F</span>
            </div>
            <div className="flex items-center">
              <Wind className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm">{activity.weather.windSpeed} mph</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            {activity.weather.icon && (
              <img 
                src={`https://openweathermap.org/img/wn/${activity.weather.icon}.png`} 
                alt="Weather icon" 
                className="h-8 w-8 mr-1"
              />
            )}
            <span className="text-sm capitalize">{activity.weather.conditions}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;