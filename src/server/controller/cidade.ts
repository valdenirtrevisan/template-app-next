import { NextResponse } from 'next/server';
import { handleException } from '@/server/utils';
import { cidadeRepository } from '@/server/repository';
import { cidadeSchema } from '@/server/schemas';

async function findAll(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = {
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    };
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const output = await cidadeRepository.findAll(page, limit);

    return NextResponse.json(output);
  } catch (error) {
    return handleException(error);
  }
}

async function findById(id: string) {
  try {
    const output = await cidadeRepository.findById(id);

    return NextResponse.json(output);
  } catch (error) {
    return handleException(error);
  }
}

async function create(req: Request) {
  try {
    const bodyParsed = await cidadeSchema.create.parse(await req.json());
    await cidadeRepository.create(bodyParsed);

    return NextResponse.json({});
  } catch (error) {
    return handleException(error);
  }
}

async function update(req: Request, id: string) {
  try {
    const bodyParsed = await cidadeSchema.update.parse(await req.json());
    await cidadeRepository.update(id, bodyParsed);

    return NextResponse.json({});
  } catch (error) {
    return handleException(error);
  }
}

async function remove(id: string) {
  try {
    await cidadeRepository.remove(id);

    return NextResponse.json({});
  } catch (error) {
    return handleException(error);
  }
}

export const cidadeController = {
  findAll,
  findById,
  create,
  update,
  remove,
};
