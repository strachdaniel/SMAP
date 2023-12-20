import React, { useState, useEffect } from 'react';
import SearchItemRow from './SearchItemRow';

export default function SearchItemBox(props: any) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          setSelectedItemIndex((prev) => Math.max(prev - 1, -1));
          break;
        case 'ArrowDown':
          setSelectedItemIndex((prev) => Math.min(prev + 1, props.books.length - 1));
          break;
        case 'Enter':
          if (selectedItemIndex !== -1) {
            console.log(props.books[selectedItemIndex]);
          }
        default:
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.books]);

  return (
    <div className="bg-white shadow-md w-full h-96 absolute">
      <div className="relative w-full overflow-scroll h-full">
        {props.books.map((book: any, index: number) => (
          <SearchItemRow
            key={book.id}
            title={book.title}
            selected={selectedItemIndex === index}
            onHover={() => setSelectedItemIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
