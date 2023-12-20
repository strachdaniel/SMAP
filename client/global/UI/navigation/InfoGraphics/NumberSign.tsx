const NumberSign = ({
  number,
  title,
  width,
  height,
}: {
  number: number | string;
  title: string;
  width: number;
  height: number;
}) => {

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`shadow-md flex flex-col bg-white rounded-xl flex-shrink-0 items-center justify-center`}
    >
      <p className="text-[20px] text-center">{number}</p>
      <p className="text-[14px] text-center font-thin">{title}</p>
    </div>
  );
};

export default NumberSign;
