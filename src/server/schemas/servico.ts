import { z } from 'zod';

const full = z.object({ id: z.string(), nome: z.string() });
const create = full.omit({ id: true });
const update = full.omit({ id: true });

export const servicoSchema = {
  full,
  create,
  update,
};
