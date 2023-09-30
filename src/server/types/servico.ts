import { z } from 'zod';
import { servicoSchema } from '@/server/schemas';

export type ServicoCreate = z.infer<typeof servicoSchema.create>;
export type ServicoUpdate = z.infer<typeof servicoSchema.update>;
