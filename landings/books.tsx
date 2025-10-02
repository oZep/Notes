import { useState, useEffect } from 'react';
import { marked } from 'marked';
import sidebarDataImport from '../src/sidebarData.json';

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
                <table align="center">
                    <th>Currently Reading</th><th>&nbsp;</th>
                <tr>
                    <td><a href="https://beej.us/guide/bgnet/"><img width="162" height="200" alt="bgnetcover" src="https://github.com/user-attachments/assets/ff3d3b44-5e40-4bdc-ac23-354e27c53a0b" /></a></td>
                    <td><a href="https://beej.us/guide/bgnet/">Beej's Guide to Network Programming in C</a></td>
                </tr>
                <tr>
                    <td><a href="https://datatracker.ietf.org/doc/html/rfc793"><img width="162" height="200" alt="rfc793cover" src="https://github.com/user-attachments/assets/a2d2569c-5e66-4e33-97d8-1e3cd0ee67f4" /></a></td>
                    <td><a href="https://datatracker.ietf.org/doc/html/rfc793">RFC 793</a></td>
                </tr>
                </table>
                </div>
            </div>
        </div>
    );
}

export default BooksLanding;