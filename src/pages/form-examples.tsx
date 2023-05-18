import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/Components/Form';
import { useState } from 'react';
import { Option } from '@/Components/Combobox';

const formSchema = z
  .object({
    nome: z.string().nonempty('O nome é obrigatório'),
    idade: z.coerce.number(),
    cidade: z.object(
      {
        id: z.string(),
        label: z.string(),
      },
      { required_error: 'A cidade é obrigatória' },
    ),
  })
  .transform((form) => ({
    nome: form.nome,
    idade: form.idade,
    idCidade: form.cidade.id,
  }));

type FormSchemaData = z.infer<typeof formSchema>;

const FormExample = () => {
  const [resultado, setResultado] = useState<string | undefined>(undefined);
  const createForm = useForm<FormSchemaData>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data: FormSchemaData) => {
    setResultado(JSON.stringify(data, null, 2));

    await fetch('http://localhost:3004/pessoa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const getOptions = async (filter: string) => {
    const response: Option[] = await fetch('http://localhost:3004/cidade').then(
      (res) => res.json(),
    );

    return response.filter((o) => o.label.toLowerCase().startsWith(filter));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col items-center p-4">
        <h1>Form Example</h1>

        <FormProvider {...createForm}>
          <form
            onSubmit={createForm.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 w-full max-w-xs"
          >
            <Form.Field>
              <Form.Label>Nome</Form.Label>
              <Form.Input name="nome" placeholder="John Doe" />
              <Form.ErrorMessage field="nome" />
            </Form.Field>

            <Form.Field>
              <Form.Label>Idade</Form.Label>
              <Form.Input name="idade" type="number" placeholder="0" />
              <Form.ErrorMessage field="idade" />
            </Form.Field>

            <Form.Field>
              <Form.Label>Cidade</Form.Label>
              <Form.AutoComplete name="cidade" getOptions={getOptions} />
              <Form.ErrorMessage field="cidade" />
            </Form.Field>

            <button
              type="submit"
              className="bg-blue-500 text-gray-100 px-2 py-4 rounded-md mt-4 disabled:bg-blue-300"
              disabled={createForm.formState.isSubmitting}
            >
              Enviar
            </button>
          </form>
        </FormProvider>
      </div>
      <pre className="text-sm p-6">{resultado && resultado}</pre>
    </div>
  );
};

export default FormExample;
