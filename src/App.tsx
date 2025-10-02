import { useState } from 'react';
import sidebarDataImport from './sidebarData.json';
const sidebarData: any = sidebarDataImport;

import { useEffect } from 'react';
// @ts-ignore
import { marked } from 'marked';

function App() {
  const [isPlain, setIsPlain] = useState(false);
  const [selectedMarkdown, setSelectedMarkdown] = useState<string | null>(null);
  const [markdownHtml, setMarkdownHtml] = useState<string>('');

  const bgColor = isPlain ? 'bg-white' : 'bg-[#d4c4b0]';
  const textColor = isPlain ? 'text-black' : 'text-black';
  const linkColor = isPlain ? 'text-blue-600' : 'text-black';
  const borderColor = isPlain ? 'border-gray-300' : 'border-black';

  useEffect(() => {
    if (selectedMarkdown) {
      fetch(selectedMarkdown)
        .then(res => res.text())
        .then(md => {
          const result = marked.parse(md);
          if (result instanceof Promise) {
            result.then((html: string) => setMarkdownHtml(html));
          } else {
            setMarkdownHtml(result as string);
          }
        });
    }
  }, [selectedMarkdown]);

  // Helper to render the main content
  const renderMainContent = () => {
    if (selectedMarkdown) {
      return (
        <div className="prose prose-neutral max-w-none" style={{ background: isPlain ? 'white' : '#cac7c7ff', padding: '1.5rem', borderRadius: '0.5rem' }} dangerouslySetInnerHTML={{ __html: markdownHtml }} />
      );
    }
    return (
      <>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">#/joeyissa.is-a.dev</h1>
          {/* Image placeholder */}
          <div className={`border-2 ${borderColor} p-4 mb-4 bg-gray-200 text-center text-gray-500`}>
            <div className="h-48 flex items-center justify-center">
              [hi]
            </div>
          </div>
          <p className="text-sm text-center">capybara</p>
        </div>
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">#Hi</h2>
          <p>info about me</p>
          <p>info about site</p>
          <p>Thanks for stopping by.</p>
          {/* Highlighted box */}
          <div className={`border-2 ${borderColor} p-4 space-y-4`}>
            <p> important info </p>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-12 text-center">
          <pre className="text-sm mb-4">+--------------+</pre>
          <div className="space-x-4">
            <a href="#contact" className={`${linkColor} underline hover:no-underline`}>contact</a>
            <a href="#github" className={`${linkColor} underline hover:no-underline`}>github</a>
            <a href="#itch" className={`${linkColor} underline hover:no-underline`}>itch.io</a>
            <a href="#rss" className={`${linkColor} underline hover:no-underline`}>rss</a>
          </div>
        </div>
      </>
    );
  };

  // Helper to get the markdown file path from sidebarData
  const getMarkdownPath = (item: any) => {
    if (item && item.file && item.file.endsWith('.md')) {
      // books, events: /books/filename.md or /events/filename.md
      if (sidebarData.books.some((b: any) => b.file === item.file)) return `/books/${item.file}`;
      if (sidebarData.events.some((e: any) => e.file === item.file)) return `/events/${item.file}`;
    }
    return null;
  };

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} font-mono py-12`}>
      <div className="max-w-4xl mx-auto px-8">
        {/* ASCII art border top */}
        <div className="text-center mb-8">
          <pre className="text-sm">+--------------+</pre>
        </div>
        <div className="flex gap-12">
          {/* Left Navigation */}
          <nav className="text-right space-y-1 pt-8 flex-shrink-0">
            <div>
              <span className={`${linkColor} underline hover:no-underline cursor-pointer`} onClick={() => setSelectedMarkdown(null)}>about</span>
            </div>
            <div>
              <Link to="/books">span className="font-bold">books</span></Link><
              <ul className="pl-4 text-xs">
                {sidebarData.books.map((book: any) => (
                  <li key={book.file}>
                    <span
                      className={`${linkColor} underline hover:no-underline cursor-pointer`}
                      onClick={() => setSelectedMarkdown(getMarkdownPath(book))}
                    >
                      {book.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold">events</span>
              <ul className="pl-4 text-xs">
                {sidebarData.events.map((event: any) => (
                  <li key={event.file}>
                    <span
                      className={`${linkColor} underline hover:no-underline cursor-pointer`}
                      onClick={() => setSelectedMarkdown(getMarkdownPath(event))}
                    >
                      {event.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold">notes</span>
              <ul className="pl-4 text-xs">
                {sidebarData.notes.map((note: any) => (
                  <li key={note.file}>
                    <a
                      className={`${linkColor} underline hover:no-underline cursor-pointer`}
                      href={`/${note.html}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {note.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold">projects</span>
              <ul className="pl-4 text-xs">
                {sidebarData.projects && sidebarData.projects.map((project: any) => (
                  <li key={project.file}>
                    <span
                      className={`${linkColor} underline hover:no-underline cursor-pointer`}
                      // You can add project click logic here
                    >
                      {project.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <a href="#mail" className={`${linkColor} underline hover:no-underline`}>mail list</a>
            </div>
            <div>
              <button
                onClick={() => setIsPlain(!isPlain)}
                className={`${linkColor} underline hover:no-underline cursor-pointer`}
              >
                plain
              </button>
            </div>
          </nav>
          {/* Main Content */}
          <div className="flex-1">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
