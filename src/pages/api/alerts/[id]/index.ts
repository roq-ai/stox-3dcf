import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { alertValidationSchema } from 'validationSchema/alerts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.alert
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAlertById();
    case 'PUT':
      return updateAlertById();
    case 'DELETE':
      return deleteAlertById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAlertById() {
    const data = await prisma.alert.findFirst(convertQueryToPrismaUtil(req.query, 'alert'));
    return res.status(200).json(data);
  }

  async function updateAlertById() {
    await alertValidationSchema.validate(req.body);
    const data = await prisma.alert.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAlertById() {
    const data = await prisma.alert.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
