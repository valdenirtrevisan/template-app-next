import { servicoController } from '@/server/controller';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  return servicoController.update(request, params.id);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return servicoController.findById(params.id);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  return servicoController.remove(params.id);
}
