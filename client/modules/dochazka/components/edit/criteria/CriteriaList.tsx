const CriteriaList = (props: any) => {
  return (
    <div>
      {props.criteria.map((c: any) => (
        <div key={c.id} className="grid grid-cols-[repeat(3,150px)_1fr]">
          <p>{c.name}</p>
          <p>{c.value}</p>
          <p>{c.type}</p>
        </div>
      ))}
    </div>
  );
};

export default CriteriaList;
