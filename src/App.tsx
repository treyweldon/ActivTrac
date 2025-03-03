import { useState, useEffect } from 'react';
import { Activity } from './types';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import { CalendarClock, LogOut } from 'lucide-react';
import { supabase, getActivities, addActivity } from './lib/supabase';
import { Toaster } from 'react-hot-toast';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        loadActivities(data.session.user.id);
      }
      setLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          loadActivities(session.user.id);
        } else {
          setUser(null);
          setActivities([]);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadActivities = async (userId: string) => {
    setLoading(true);
    const data = await getActivities(userId);
    setActivities(data);
    setLoading(false);
  };

  const handleAddActivity = async (activity: Activity) => {
    const savedActivity = await addActivity(activity);
    setActivities([savedActivity, ...activities]);
    return savedActivity;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setActivities([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <AuthForm onAuthSuccess={setUser} />
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <CalendarClock className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">
              {activeTab === 'form' ? 'Track Your Activity' : 'Your Activity History'}
            </h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </button>
        </div>
        
        {activeTab === 'form' ? (
          <div className="max-w-2xl mx-auto">
            <ActivityForm onAddActivity={handleAddActivity} userId={user.id} />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <ActivityList activities={activities} />
          </div>
        )}
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}

export default App;