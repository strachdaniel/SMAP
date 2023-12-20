export default function BookItem({ book }: any) {
  return (
    <div className="flex flex-col items-center w-full h-20 bg-white rounded-md shadow-custom">
      <div className="flex flex-col w-full h-full p-2">
        <p className="text-md font-medium text-left w-full">{book.reader}</p>

        <div className="flex justify-between">
          <p>{book.isbn}</p>
          <p>{book.title}</p>
          <p>{book.author}</p>
          <div>X</div>
        </div>
      </div>
    </div>
  );
}
