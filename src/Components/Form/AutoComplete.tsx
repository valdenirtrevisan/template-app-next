import { Controller, useFormContext } from 'react-hook-form';
import { Combobox, Option } from '../Combobox';

type AutoCompleteProps = {
  name: string;
  getOptions: (filter: string) => Promise<Option[]>;
};

export const AutoComplete = ({ name, getOptions }: AutoCompleteProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Combobox getOptions={getOptions} onSelect={onChange} />
      )}
    />
  );
};
