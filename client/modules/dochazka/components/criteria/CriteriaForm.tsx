import SelectInput from '@/global/Inputs/SelectInput';
import TextInput from '@/global/Inputs/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';
import useSWR from 'swr';

type Inputs = {
  name: string;
  description: string;
  employee_category_id: number;
  valid_from: Date;
  valid_to: Date;
  type: string;
  hour_rate: number | null;
  value_once: number | null;
  value_min: number | null;
  value_max: number | null;
};

const sendToServer = async (data: Inputs) => {
  try {
    const response = await axios.post(`${process.env.ATTENDANCE_URL}/criteria`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const NewCriteriaForm = () => {
  const { isLoading, data, error } = useSWR(
    `${process.env.ATTENDANCE_URL}/employee-category`,
    axios
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //@ts-ignore
    data.employee_category_id = parseInt(data.employee_category_id);
    //@ts-ignore
    data.hour_rate = parseInt(data.hour_rate);
    //@ts-ignore
    data.value_once = parseInt(data.value_once);
    //@ts-ignore
    data.value_min = parseInt(data.value_min);
    //@ts-ignore
    data.value_max = parseInt(data.value_max);
    data.valid_from = new Date(data.valid_from);
    data.valid_to = new Date(data.valid_to);
    sendToServer(data);
  };

  const type = watch('type');

  let rewardInputProps = {};
  switch (type) {
    case 'hourly_rate':
      rewardInputProps = { name: 'hour_rate', label: 'Odměna' };
      break;
    case 'range':
      rewardInputProps = { name: 'value_min', label: 'Minimální odmena' };
      break;
    case 'one_time':
      rewardInputProps = { name: 'value_once', label: 'Jednorazova odmena' };
      break;
    default:
      break;
  }

  const sendToServer = (data: Inputs) => {
    axios
      .post(`${process.env.ATTENDANCE_URL}/criteria`, data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setValue('hour_rate', null);
    setValue('value_once', null);
    setValue('value_min', null);
    setValue('value_max', null);
  }, [type]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full gap-10">
        <div className="flex-col flex-1">
          <TextInput {...register('name')} name="name" label="Název kritéria" />
          <TextInput {...register('description')} name="description" label="Popis" />
          <SelectInput
            {...register('employee_category_id')}
            name="employee_category_id"
            label="Platné pro"
            selected=""
            //@ts-ignore
            options={data?.data.map((item: any) => ({
              label: item.name,
              value: item.employee_category_id,
            }))}
          />
          <TextInput
            {...register('valid_from')}
            name="valid_from"
            type="date"
            label="Platnost od"
          />
          <TextInput {...register('valid_to')} name="valid_to" type="date" label="Platnost do" />
        </div>
        <div className="flex-col flex-1">
          <SelectInput
            selected=""
            {...register('type')}
            name="type"
            label="Typ"
            options={[
              { label: 'Hodinova sazba', value: 'hourly_rate' },
              { label: 'Manualni skala', value: 'range' },
              { label: 'Jednorazove', value: 'one_time' },
            ]}
          />
          {type === 'hourly_rate' && (
            <TextInput {...register('hour_rate')} name="hour_rate" label="Odměna" type="number" />
          )}
          {type === 'one_time' && (
            <TextInput
              {...register('value_once')}
              name="value_once"
              label="Jednorazova odmena"
              type="number"
            />
          )}
          {type === 'range' && (
            <>
              <TextInput
                {...register('value_min')}
                name="value_min"
                label="Minimální odmena"
                type="number"
              />
              <TextInput
                {...register('value_max')}
                name="value_max"
                label="Maximální odmena"
                type="number"
              />
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <PrimaryButton type="submit">
          Uložit
        </PrimaryButton>
      </div>
    </form>
  );
};

export default NewCriteriaForm;
