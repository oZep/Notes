import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import sidebarDataImport from './sidebarData.json';
// @ts-ignore
import { marked } from 'marked';

const sidebarData: any = sidebarDataImport;

// Theme context for cross-site color theme
type Theme = 'dark' | 'light';
export const ThemeContext = createContext<{theme: Theme, setTheme: (t: Theme) => void}>({theme: 'dark', setTheme: () => {}});
function useTheme() { return useContext(ThemeContext); }

function Home() {
  const { theme } = useTheme();
  const linkColor = theme === 'dark' ? 'text-white' : 'text-black';
  const borderColor = theme === 'dark' ? 'border-[#FEF3BB]' : 'border-[#224415]';
  const bgBox = theme === 'dark' ? 'bg-[#224415] text-white' : 'bg-[#FEF3BB] text-black';
  return (
    <>
      <div className="mb-8">
      </div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">#oZep</h1>
          <div className={`border-2 p-4 mb-4 text-center text-gray-500 ${borderColor} ${bgBox}`}>
          <div className="h-48 flex items-center justify-center">[image]</div>
        </div>
        <p className="text-sm text-center">image</p>
        <p>info about me</p>
        <p>info about site</p>
        <p>Thanks for stopping by.</p>
        <div className={`border-2 p-4 space-y-4 ${borderColor} ${bgBox}`}>
          <p> important info </p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <div className="space-x-4">
          <a href="#contact" className={`${linkColor} underline hover:no-underline`}>contact</a>
          <a href="#github" className={`${linkColor} underline hover:no-underline`}>github</a>
          <a href="#itch" className={`${linkColor} underline hover:no-underline`}>itch.io</a>
          <a href="#rss" className={`${linkColor} underline hover:no-underline`}>rss</a>
        </div>
      </div>
    </>
  );
}

function App() {
  // Theme state: 'dark' = #224415, 'light' = #FEF3BB
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to load from localStorage for persistence
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    return 'dark';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);
  const bgColor = theme === 'dark' ? 'bg-[#224415]' : 'bg-[#FEF3BB]';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const linkColor = theme === 'dark' ? 'text-white' : 'text-black';
  const borderColor = theme === 'dark' ? 'border-[#FEF3BB]' : 'border-[#224415]';
  const navigate = useNavigate();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen ${bgColor} ${textColor} font-mono py-12`}>
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-8">
            <pre className="text-sm">▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰</pre>
          </div>
          <div className="flex gap-12">
            <nav className="text-right space-y-1 pt-8 flex-shrink-0">
              <div>
                <Link to="/" className={`${linkColor} font-bold cursor-pointer`}>about</Link>
              </div>
              <div>
                <span className="font-bold cursor-pointer" onClick={() => navigate('/books')}>books</span>
                <ul className="pl-4 text-xs">
                  {sidebarData.books.map((book: any) => (
                    <li key={book.file}>
                      <Link
                        className={`${linkColor} underline hover:no-underline cursor-pointer`}
                        to={`/book/${encodeURIComponent(book.file.replace(/\.md$/, ''))}`}
                      >
                        {book.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold cursor-pointer" onClick={() => navigate('/events')}>events</span>
                <ul className="pl-4 text-xs">
                  {sidebarData.events.map((event: any) => (
                    <li key={event.file}>
                      <Link
                        className={`${linkColor} underline hover:no-underline cursor-pointer`}
                        to={`/event/${encodeURIComponent(event.file.replace(/\.md$/, ''))}`}
                      >
                        {event.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold cursor-pointer" onClick={() => navigate('/notes')}>notes</span>
                <ul className="pl-4 text-xs">
                  {sidebarData.notes.map((note: any) => (
                    <li key={note.file}>
                      <Link
                        className={`${linkColor} underline hover:no-underline cursor-pointer`}
                        to={`/note/${encodeURIComponent(note.file.replace(/\.pdf$/, ''))}`}
                      >
                        {note.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold cursor-pointer" onClick={() => navigate('/projects')}>projects</span>
                {/* Add project links if needed */}
              </div>
              <div>
                <a href="#mail" className={`${linkColor} font-bold cursor-pointer`}>mail list</a>
              </div>
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`${linkColor} underline hover:no-underline cursor-pointer border-2 ${borderColor} px-3 py-1 rounded`}
                  >
                    {theme === 'dark' ? 'light orange' : 'dark green'}
                  </button>
                </div>
              </div>
            </nav>
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BooksLanding />} />
                <Route path="/book/:bookId" element={<BookPage />} />
                <Route path="/events" element={<EventsLanding />} />
                <Route path="/event/:eventId" element={<EventPage />} />
                <Route path="/notes" element={<NotesLanding />} />
                <Route path="/note/:noteId" element={<NotePage />} />
                <Route path="/projects" element={<ProjectsLanding />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

// BookPage, EventPage, NotePage components
function BookPage() {
  const { bookId } = useParams();
  const { theme } = useTheme();
  const [markdownHtml, setMarkdownHtml] = useState('');
  useEffect(() => {
    if (bookId) {
      fetch(`/books/${bookId}.md`).then(res => res.text()).then(md => {
        const result = marked.parse(md);
        if (result instanceof Promise) {
          result.then((html: string) => setMarkdownHtml(html));
        } else {
          setMarkdownHtml(result as string);
        }
      });
    }
  }, [bookId]);
  const bg = theme === 'dark' ? '#224415' : '#FEF3BB';
  const color = theme === 'dark' ? 'white' : 'black';
  // Custom style for headers
  const headerColor = theme === 'dark' ? 'white' : 'black';
  return (
    <div className="prose prose-neutral max-w-none" style={{ background: bg, color, padding: '1.5rem', borderRadius: '0.5rem', position: 'relative' }}>
      <style>{`
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { color: ${headerColor} !important; }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
    </div>
  );
}
function EventPage() {
  const { eventId } = useParams();
  const { theme } = useTheme();
  const [markdownHtml, setMarkdownHtml] = useState('');
  useEffect(() => {
    if (eventId) {
      fetch(`/events/${eventId}.md`).then(res => res.text()).then(md => {
        const result = marked.parse(md);
        if (result instanceof Promise) {
          result.then((html: string) => setMarkdownHtml(html));
        } else {
          setMarkdownHtml(result as string);
        }
      });
    }
  }, [eventId]);
  const bg = theme === 'dark' ? '#224415' : '#FEF3BB';
  const color = theme === 'dark' ? 'white' : 'black';
  // Custom style for headers
  const headerColor = theme === 'dark' ? 'white' : 'black';
  return (
    <div className="prose prose-neutral max-w-none" style={{ background: bg, color, padding: '1.5rem', borderRadius: '0.5rem', position: 'relative' }}>
      <style>{`
        .prose a, .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { color: ${headerColor} !important; }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
    </div>
  );
}
function NotePage() {
  const { noteId } = useParams();
  const { theme } = useTheme();
  // For PDFs, just link to the file
  const border = theme === 'dark' ? '#224415' : '#FEF3BB';
  const bg = theme === 'dark' ? 'white' : '#FEF3BB';
  return <iframe src={`/notes/${noteId}.pdf`} title={noteId} className="w-full h-[80vh] border-2" style={{ borderColor: border, background: bg }} />;
}

// Import landing pages
import BooksLanding from '../landings/books';
import EventsLanding from '../landings/events';
import NotesLanding from '../landings/notes';
import ProjectsLanding from '../landings/projects';

export default App;
