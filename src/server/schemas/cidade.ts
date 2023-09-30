import { z } from 'zod';

const full = z.object({
  id: z.string(),
  nome: z.string(),
  sigla: z.string().length(2),
});
const create = full.omit({ id: true });
const update = full.omit({ id: true }).partial();

export const cidadeSchema = {
  full,
  create,
  update,
};
