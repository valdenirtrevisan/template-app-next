import { servicoController } from '@/server/controller';

export async function GET(request: Request) {
  return await servicoController.findAll(request);
}

export async function POST(request: Request) {
  return await servicoController.create(request);
}
