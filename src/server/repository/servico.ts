import { prisma } from '@/server/utils';
import { ServicoCreate, ServicoUpdate } from '@/server/types';

async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const totalCount = await prisma.servico.count();
  const totalPages = Math.ceil(totalCount / limit);

  const result = await prisma.servico.findMany({
    skip,
    take: limit,
    orderBy: { nome: 'asc' },
  });

  return {
    content: result,
    totalPages: totalPages,
    totalElements: totalCount,
  };
}

async function findById(id: string) {
  return await prisma.servico.findUnique({ where: { id } });
}

async function create(entity: ServicoCreate) {
  await prisma.servico.create({ data: entity });
}

async function update(id: string, entity: ServicoUpdate) {
  await prisma.servico.update({ data: entity, where: { id } });
}

async function remove(id: string) {
  await prisma.servico.delete({ where: { id } });
}

export const servicoRepository = {
  findAll,
  findById,
  create,
  update,
  remove,
};
