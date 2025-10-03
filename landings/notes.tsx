import { useContext } from 'react';
import { ThemeContext } from '../src/App';

function NotesLanding() {
  const { theme } = useContext(ThemeContext);
  const bgColor = theme === 'dark' ? 'bg-[#224415]' : 'bg-[#FEF3BB]';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  return (
      <div className={`min-h-screen ${bgColor} ${textColor} font-mono`}>
            <div className="mb-8">
            </div>
        <h1 className="text-2xl font-bold mb-4">notes</h1>
        <div className="mb-8 space-y-6">
         <p>At last, I have done it.</p>
         <p>All my files in one <em>easily accessible</em> place.</p>
         <p>This has honestly been a long time coming. After switching from Macbook to PC on the daily, it's so easy to lose track of where I put things.</p>
         <p>Hopefully this will make it easier to find things later. And maybe I'll even get around to organizing them a bit.</p>
         <p>But no promises.</p>
        </div>
      </div>
  );
}

export default NotesLanding;
