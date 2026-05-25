import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Book } from '../types/book';
import { clearAllBook } from '../store/slice';

function Flyout() {
  const dispatch = useDispatch();
  const items = useSelector((state: { selected: { items: Book[] } }) => state.selected.items);

  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [filename, setFilename] = useState('');

  const download = () => {
    const name_column = 'id,name,description,url\r\n';
    const rows = items
      .map((book, i) => {
        const name = book.title ?? '';
        const description = book.subtitle ?? '';
        const url = `https://openlibrary.org${book.key}`;
        return `${i + 1},"${name}","${description}","${url}"`;
      })
      .join('\r\n');
    const csv = name_column + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    setDownloadUrl(url);
    setFilename(`${items.length}_items.csv`);

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setDownloadUrl('');
      }
    }, 0);
  };

  return (
    <div className={`Flyout ${items.length ? 'visible' : ''}`}>
      <p>Selected Books: {items.length}</p>
      <button onClick={() => dispatch(clearAllBook())}>Clear All Selected</button>
      <button onClick={download}>Download</button>
      <a ref={downloadRef} href={downloadUrl} download={filename} style={{ display: 'none' }} />
    </div>
  );
}

export default Flyout;
