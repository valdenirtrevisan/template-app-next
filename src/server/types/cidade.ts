import { z } from 'zod';
import { cidadeSchema } from '@/server/schemas';

export type CidadeCreate = z.infer<typeof cidadeSchema.create>;
export type CidadeUpdate = z.infer<typeof cidadeSchema.update>;
