import { useContext } from 'react';
import { ThemeContext } from '../src/App';

function EventsLanding() {
  const { theme } = useContext(ThemeContext);
  const bgColor = theme === 'dark' ? 'bg-[#224415]' : 'bg-[#FEF3BB]';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  return (
        <div className={`min-h-screen ${bgColor} ${textColor} font-mono`}>
            <div className="mb-8">
            </div>
        <div className="max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">events</h1>
        <div className="mb-8 space-y-6">
        <p>I like attending hackathons, conferences, and all types of meetups. This will mostly be an archive of pictures and notes from those events.</p>
        </div>
      </div>
      </div>
  );
}

export default EventsLanding;
