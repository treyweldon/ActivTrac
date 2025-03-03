import React from 'react';
import { Activity } from '../types';
import ActivityCard from './ActivityCard';

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No activities recorded yet. Start tracking your activities!</p>
      </div>
    );
  }

  // Sort activities by date (newest first)
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedActivities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityList;