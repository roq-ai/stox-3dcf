import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { equityStockValidationSchema } from 'validationSchema/equity-stocks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.equity_stock
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEquityStockById();
    case 'PUT':
      return updateEquityStockById();
    case 'DELETE':
      return deleteEquityStockById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEquityStockById() {
    const data = await prisma.equity_stock.findFirst(convertQueryToPrismaUtil(req.query, 'equity_stock'));
    return res.status(200).json(data);
  }

  async function updateEquityStockById() {
    await equityStockValidationSchema.validate(req.body);
    const data = await prisma.equity_stock.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEquityStockById() {
    const data = await prisma.equity_stock.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
