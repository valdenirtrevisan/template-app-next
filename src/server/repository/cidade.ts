import { prisma } from '@/server/utils';
import { CidadeCreate, CidadeUpdate } from '@/server/types';

async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const totalCount = await prisma.cidade.count();
  const totalPages = Math.ceil(totalCount / limit);

  const result = await prisma.cidade.findMany({
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
  return await prisma.cidade.findUnique({ where: { id } });
}

async function create(entity: CidadeCreate) {
  await prisma.cidade.create({ data: entity });
}

async function update(id: string, entity: CidadeUpdate) {
  await prisma.cidade.update({ data: entity, where: { id } });
}

async function remove(id: string) {
  await prisma.cidade.delete({ where: { id } });
}

export const cidadeRepository = {
  findAll,
  findById,
  create,
  update,
  remove,
};
