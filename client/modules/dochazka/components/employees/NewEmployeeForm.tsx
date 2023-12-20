import TextInput from '@/global/Inputs/TextInput';

const NewEmployeeForm = () => {
  return (
    <div>
      <div className="flex">
        <div className="flex-col">
          <TextInput label="Jmeno" name="name" />
          <TextInput label="Kategorie" name="category_id" />
          <TextInput label="Typ úvazku" name="uvayel" />
          <TextInput label="Platnost od" name="from" />
          <TextInput label="% Úvazku" name="percentage" />
        </div>
        <div className="flex-col">
          <TextInput label="Příjmení" name="last_name" />
          <TextInput label="E-mail" name="email" />
          <TextInput label="Odměna" name="value" />
          <TextInput label="Platnost do" name="to" />
        </div>
      </div>
    </div>
  );
};

export default NewEmployeeForm;
