export const CraftBody = {
  schema: {
    type: 'object',
    required: ['name', 'description', 'price', 'stock', 'image'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      stock: { type: 'number' },
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const LoginResponse = {
  schema: {
    type: 'object',
    properties: {
      access_token: { type: 'string' },
    },
  },
};

export const OrderAnalyticsResponse = {
  schema: {
    type: 'object',
    properties: {
      totalSales: { type: 'number' },
      totalOrders: { type: 'number' },
      totalCraftsSold: { type: 'number' },
      craftsSoldCount: { type: 'number' },
      topFiveCraftsSold: { type: 'number' },
    },
  },
};
