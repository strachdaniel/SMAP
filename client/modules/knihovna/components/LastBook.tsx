export default function LastBook({ book }: any) {
  return (
    <div className="mt-5">
      <p className=" my-2 text-sm font-thin w-full text-left">Poslední přidaná kniha</p>
        <div className="flex flex-col w-full h-full p-2 bg-white rounded-md shadow-custom">
          <div className="flex justify-between">
            <p>ISBN</p>
            <p>{book.isbn}</p>
          </div>
          <div className="flex justify-between">
            <p>NÁZEV</p>
            <p>{book.title}</p>
          </div>
          <div className="flex justify-between">
            <p>AUTOR</p>
            <p>{book.author}</p>
          </div>
          <div className="flex justify-between">
            <p>NAPOSLEDY PŮJČENO</p>
            <p>{book.last}</p>
          </div>
          <div className="flex justify-between">
            <p>CELKEM PŮJČENO</p>
            <p>{book.count}</p>
          </div>
        </div>
    </div>
  );
}
