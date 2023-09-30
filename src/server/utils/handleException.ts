import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const erros: {
  codigo: number;
  mensagem: string;
}[] = [
  {
    codigo: 1,
    mensagem:
      'O servidor encontrou um erro interno. Por favor, tente novamente mais tarde.',
  },
  {
    codigo: 2,
    mensagem: 'O objeto enviado é inválido',
  },
];

export const handleException = (err: unknown) => {
  if (err instanceof ZodError) {
    return montaResponse(2, 400);
  }
  if (err instanceof Error) {
    console.error(err.stack);
    return montaResponse(1);
  }
};

const montaResponse = (codigo: number, status = 500) => {
  return NextResponse.json(
    {
      error: erros.filter((erro) => erro.codigo === codigo),
    },
    { status: status },
  );
};
