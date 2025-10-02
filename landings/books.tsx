import { useState, useEffect } from 'react';
import { marked } from 'marked';
import sidebarDataImport from './sidebarData.json';

// @ts-ignore
const sidebarData: any = sidebarDataImport;

function BooksLanding() {
    const [selectedBook, setSelectedBook] = useState<any | null>(null);
    const [markdownHtml, setMarkdownHtml] = useState<string>('');
    const [isPlain, setIsPlain] = useState(false);

    const bgColor = isPlain ? 'bg-white' : 'bg-[#d4c4b0]';
    const textColor = isPlain ? 'text-black' : 'text-black';
    const linkColor = isPlain ? 'text-blue-600' : 'text-black';
    const borderColor = isPlain ? 'border-gray-300' : 'border-black';

    useEffect(() => {
        if (selectedBook && selectedBook.file) {
            fetch(`/books/${selectedBook.file}`)
                .then(res => res.text())
                .then(md => {
                    const result = marked.parse(md);
                    if (result instanceof Promise) {
                        result.then((html: string) => setMarkdownHtml(html));
                    } else {
                        setMarkdownHtml(result as string);
                    }
                });
        } else {
            setMarkdownHtml('');
        }
    }, [selectedBook]);

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
                            <a
                                className={`${linkColor} underline hover:no-underline cursor-pointer`}
                                href="/"
                            >
                                home
                            </a>
                        </div>
                        <div>
                            <span className="font-bold">books</span>
                            <ul className="pl-4 text-xs">
                                {sidebarData.books.map((book: any) => (
                                    <li key={book.file}>
                                        <span
                                            className={`${linkColor} underline hover:no-underline cursor-pointer`}
                                            onClick={() => setSelectedBook(book)}
                                        >
                                            {book.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
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
                        {!selectedBook && (
                            <div>
                                <h1 className="text-3xl font-bold mb-4">Books</h1>
                                <p className="mb-6">Welcome to the books landing page. Browse the collection and click a title to read more.</p>
                                <div className="grid gap-6">
                                    {sidebarData.books.map((book: any) => (
                                        <div
                                            key={book.file}
                                            className={`border-2 ${borderColor} rounded-lg p-4 bg-gray-100 cursor-pointer hover:bg-gray-200`}
                                            onClick={() => setSelectedBook(book)}
                                        >
                                            <h2 className="text-xl font-semibold">{book.title}</h2>
                                            {book.author && <p className="text-sm text-gray-600">by {book.author}</p>}
                                            {book.description && <p className="mt-2 text-sm">{book.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {selectedBook && (
                            <div>
                                <button
                                    className={`${linkColor} underline hover:no-underline mb-4 cursor-pointer`}
                                    onClick={() => setSelectedBook(null)}
                                >
                                    ← Back to books
                                </button>
                                <h1 className="text-2xl font-bold mb-2">{selectedBook.title}</h1>
                                {selectedBook.author && <p className="mb-2 text-gray-600">by {selectedBook.author}</p>}
                                <div
                                    className="prose prose-neutral max-w-none"
                                    style={{ background: isPlain ? 'white' : '#cac7c7ff', padding: '1.5rem', borderRadius: '0.5rem' }}
                                    dangerouslySetInnerHTML={{ __html: markdownHtml }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BooksLanding;