import AutoComplete from '@/Components/AutoComplete';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  option: z.object({ id: z.number(), label: z.string() }),
});

type FormSchemaData = z.infer<typeof formSchema>;

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaData>({
    resolver: zodResolver(formSchema),
  });
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  function submit(data: FormSchemaData) {
    setResultado(JSON.stringify(data, null, 2));
  }

  return (
    <main className="h-screen flex flex-col gap-6 items-center justify-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <label>Descrição</label>
        <Controller
          name="option"
          control={control}
          render={({ field: { onChange } }) => (
            <AutoComplete onChange={onChange} />
          )}
        />

        <button
          type="submit"
          className="bg-gray-400 text-gray-100 px-2 py-4 rounded-md mt-4"
        >
          Salva
        </button>
      </form>

      {resultado && (
        <pre className="text-sm text-gray-700 p-6">{resultado}</pre>
      )}
    </main>
  );
};

export default Page;
