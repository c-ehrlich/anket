import prisma from '../utils/prisma';
import { CreateProductInput } from './product.schema';

export async function createProduct(data: CreateProductInput) {
  const product = await prisma.product.create({ data });
  return product;
}

export async function getAllProducts() {
  const products = await prisma.product.findMany({});
  return products;
}

export async function getProductsByUser({ userId }: { userId: string }) {
  const products = await prisma.product.findMany({
    where: {
      creatorId: userId,
    },
  });
  return products;
}
