import { cidadeController } from '@/server/controller';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  return cidadeController.update(request, params.id);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return cidadeController.findById(params.id);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  return cidadeController.remove(params.id);
}
