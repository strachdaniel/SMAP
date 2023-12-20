import Input from '@/components/Generic/Input';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import BookItem from './BookItem';
import LastBook from './LastBook';
import SecondaryButton from '@/components/UI/Buttons/SecondaryButton';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { log } from 'console';

const book = {
  title: 'Rzvila kagka',
  author: 'Hell kokot',
  isbn: '258789',
  reader: 'Karel',
  last: '2021-01-01',
  count: 5,
};

interface Props {
  book?: JSON;
  setModalIsOpen: (value: boolean) => void;
}

export default function Borrow({ setModalIsOpen }: Props) {
  //state for book and reader query
  const [bookQuery, setBookQuery] = useState('');
  const [readerQuery, setReaderQuery] = useState('');

  //state for selected book and reader
  const [book, setBook] = useState({
    title: 'Rzvila kagka',
    author: 'Hell kokot',
    isbn: '258789',
    reader: 'Karel',
    last: '2021-01-01',
    count: 5,
  });
  const [reader, setReader] = useState(null);

  //fetch books by name or ISBN
  const { books, errorBooks }: any = useSWR(
    bookQuery ? `/api/books?query=${bookQuery}` : null,
    async (url) => {
      const response = await axios.get(url);
      return response.data;
    }
  );

  //fetch readers by name
  const { readers, errorReaders }: any = useSWR(
    bookQuery ? `/api/books?query=${bookQuery}` : null,
    async (url) => {
      const response = await axios.get(url);
      return response.data;
    }
  );

  const handleIsbnEntry = (e: any) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      //if either PrimaryButton is pressed or enter is pressed
      console.log('enter');
    } else {
      //continue typing}
    }
  };

  return (
    <>
      <div className="flex space-x-10">
        <div className="flex-col flex-1">
          <Input
            name="reader"
            height={50}
            width={400}
            title="Vypůjčitel"
            placeholder="Jméno čtenáře..."
            type="text"
            onChange={(e) => {}}
          />
          <Input
            name="book"
            height={50}
            width={400}
            title="ISBN nebo název knihy"
            placeholder="Naskenuj nebo vlož ISBN kód, název knihy..."
            type="text"
            onKeyDown={(e) => {
              handleIsbnEntry(e);
            }}
          />
          <div>
            <PrimaryButton
              onClick={(e) => {
                handleIsbnEntry(e);
              }}
              isFullWidth={true}
            >
              <p>ZADAT</p>
            </PrimaryButton>
          </div>
          <LastBook book={book}></LastBook>
        </div>
        <div className="flex-col flex-1">
          <p>Vybrané knihy</p>
          <BookItem book={book}></BookItem>
        </div>
      </div>
      <div className="h-15 flex justify-center mt-5 w-full">
        <PrimaryButton onClick={() => {}} className="mr-4 font-light w-[200px]">
          <p>PŮJČIT</p>
        </PrimaryButton>

        <SecondaryButton onClick={() => setModalIsOpen(false)} className="font-light w-[200px]">
          <p>ZRUŠIT</p>
        </SecondaryButton>
      </div>
    </>
  );
}
