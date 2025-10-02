import React from 'react';

interface ComingSoonProps {
  section: string;
  onBack: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ section, onBack }) => (
  <div className="flex flex-col items-center justify-center h-full py-24">
    <h2 className="text-2xl font-bold mb-4">{section} — Coming Soon</h2>
    <button
      onClick={onBack}
      className="mt-4 px-4 py-2 border border-black rounded bg-white hover:bg-gray-100 text-black"
    >
      Back to Home
    </button>
  </div>
);

export default ComingSoon;
