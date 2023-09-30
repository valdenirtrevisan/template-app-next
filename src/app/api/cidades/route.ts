import { cidadeController } from '@/server/controller';

export async function GET(request: Request) {
  return await cidadeController.findAll(request);
}

export async function POST(request: Request) {
  return await cidadeController.create(request);
}
