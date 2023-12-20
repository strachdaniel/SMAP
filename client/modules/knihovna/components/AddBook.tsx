import React, { useEffect, useState } from 'react';
import Input from '@/components/Generic/Input';
import axios from 'axios';
import api from '@/utils/api';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import Select from '@/components/Generic/Select';

export default function AddBook() {
  const [book, setBook]: any = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api(process.env.LIB_URL)
      .get('/categories')
      .then((response) => {
        setCategories(categoriesToOptions(response.data));
      });
  }, []);

  const categoriesToOptions = (categories: any) => {
    return categories.map((category: any) => {
      return {
        value: category.categoryId,
        label: category.name,
      };
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = async () => {
    const response = await api(process.env.LIB_URL).post('/books', book);
    console.log(response);
  };

  const getInfoFromIsbn = async (isbn: string) => {
    try {
      const response = await api(process.env.LIB_URL).get('/books/google/' + isbn);
      console.log(response);
      return response.data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsbnInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      getInfoFromIsbn(value)
        .then((data) => {
          setBook({
            ...book,
            title: data.title,
            author: data.author,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  return (
    <div className="flex flex-col">
      <Input
        name="isbn"
        title="ISBN"
        placeholder="Vlož ISBN"
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleIsbnInput(e)}
        value={book?.isbn}
      ></Input>
      <Input
        name="title"
        title="Název"
        placeholder="Vlož název knihy"
        onChange={(e) => handleChange(e)}
        value={book?.title}
      ></Input>
      <Input
        name="author"
        title="Autor"
        placeholder="Vlož ajméno autora"
        onChange={(e) => handleChange(e)}
        value={book?.author}
      ></Input>
      <select name="category">
        {categories.map((category: any) => {
          return <option value={category.category_id}>{category.name}</option>;
        })}
      </select>
      <PrimaryButton onClick={saveBook}>
        <span>Uložit</span>
      </PrimaryButton>
    </div>
  );
}
