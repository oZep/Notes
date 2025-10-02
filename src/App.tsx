import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import sidebarDataImport from './sidebarData.json';
// @ts-ignore
import { marked } from 'marked';
const sidebarData: any = sidebarDataImport;

function Home() {
  const linkColor = 'text-black';
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">#/joeyissa.is-a.dev</h1>
        <div className={`border-2 border-black p-4 mb-4 bg-gray-200 text-center text-gray-500`}>
          <div className="h-48 flex items-center justify-center">[capybara image]</div>
        </div>
        <p className="text-sm text-center">capybara</p>
      </div>
      <div className="space-y-6">
        <h2 className="text-xl font-bold">#Hi</h2>
        <p>info about me</p>
        <p>info about site</p>
        <p>Thanks for stopping by.</p>
        <div className={`border-2 border-black p-4 space-y-4`}>
          <p> important info </p>
        </div>
      </div>
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
}

function App() {
  const [isPlain, setIsPlain] = useState(false);
  const bgColor = isPlain ? 'bg-white' : 'bg-[#d4c4b0]';
  const textColor = isPlain ? 'text-black' : 'text-black';
  const linkColor = isPlain ? 'text-blue-600' : 'text-black';
  const borderColor = isPlain ? 'border-gray-300' : 'border-black';
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} font-mono py-12`}>
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-8">
          <pre className="text-sm">+--------------+</pre>
        </div>
        <div className="flex gap-12">
          <nav className="text-right space-y-1 pt-8 flex-shrink-0">
            <div>
              <Link to="/" className={`${linkColor} underline hover:no-underline cursor-pointer`}>about</Link>
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
  );
}

// BookPage, EventPage, NotePage components
function BookPage() {
  const { bookId } = useParams();
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
  return <div className="prose prose-neutral max-w-none" style={{ background: '#cac7c7ff', padding: '1.5rem', borderRadius: '0.5rem' }} dangerouslySetInnerHTML={{ __html: markdownHtml }} />;
}
function EventPage() {
  const { eventId } = useParams();
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
  return <div className="prose prose-neutral max-w-none" style={{ background: '#cac7c7ff', padding: '1.5rem', borderRadius: '0.5rem' }} dangerouslySetInnerHTML={{ __html: markdownHtml }} />;
}
function NotePage() {
  const { noteId } = useParams();
  // For PDFs, just link to the file
  return <iframe src={`/notes/${noteId}.pdf`} title={noteId} className="w-full h-[80vh] border-2 border-gray-300 bg-white" />;
}

// Import landing pages
import BooksLanding from '../landings/books';
import EventsLanding from '../landings/events';
import NotesLanding from '../landings/notes';
import ProjectsLanding from '../landings/projects';

export default App;
