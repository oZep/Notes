import { useContext } from 'react';
import { ThemeContext } from '../src/App';

function NotesLanding() {
  const { theme } = useContext(ThemeContext);
  const bgColor = theme === 'dark' ? 'bg-[#224415]' : 'bg-[#FEF3BB]';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  return (
    <div className={`min-h-screen ${bgColor} ${textColor} font-mono py-12`}>
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">#notes</h1>
        <div className="text-center mb-8">
         Landing page Content coming soon...
        </div>
      </div>
    </div>
  );
}

export default NotesLanding;
