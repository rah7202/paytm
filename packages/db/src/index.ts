import { PrismaClient } from '../generated/prisma/index.js';

declare global {
    var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// export * from '../generated/prisma/index.js';

export { PrismaClient };

export type { User, Merchant, Balance, onRampTransaction } from '../generated/prisma/index.js';

export { AuthType, onRampStatus } from '../generated/prisma/index.js';