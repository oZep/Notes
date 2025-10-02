import React from 'react';

function NotesLanding() {
  return (
    <div className="min-h-screen bg-[#d4c4b0] text-black font-mono py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-8">
          <pre className="text-sm">+--------------+</pre>
        </div>
        <div className="flex gap-12">
          <nav className="text-right space-y-1 pt-8 flex-shrink-0">
            <div>
              <a className="text-black underline hover:no-underline cursor-pointer" href="/">home</a>
            </div>
            <div>
              <span className="font-bold">notes</span>
            </div>
          </nav>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">Notes</h1>
            <p className="mb-6">Welcome to the notes landing page. Browse the collection and click a title to read more.</p>
            {/* Add notes list here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesLanding;
