import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { scannerValidationSchema } from 'validationSchema/scanners';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.scanner
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getScannerById();
    case 'PUT':
      return updateScannerById();
    case 'DELETE':
      return deleteScannerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getScannerById() {
    const data = await prisma.scanner.findFirst(convertQueryToPrismaUtil(req.query, 'scanner'));
    return res.status(200).json(data);
  }

  async function updateScannerById() {
    await scannerValidationSchema.validate(req.body);
    const data = await prisma.scanner.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteScannerById() {
    const data = await prisma.scanner.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
