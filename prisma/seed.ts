import {
  PeriodType,
  PrismaClient,
  ProductCategory,
  Region,
  Season,
} from "@prisma/client";

// Create a new PrismaClient instance
const prisma = new PrismaClient();

// Function to generate random sales data
async function generateSalesData(
  productId: string,
  organizationId: string,
  totalSold: number,
) {
  // Generate sales over the past 6 months
  const sales = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  // Get the product to access its price
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) return [];

  // Calculate how many sales to create based on totalSold
  const numberOfSales = Math.max(5, Math.floor(totalSold / 10));

  // Distribute sales over the past 6 months
  for (let i = 0; i < numberOfSales; i++) {
    // Random date between sixMonthsAgo and now
    const saleDate = new Date(
      sixMonthsAgo.getTime() +
      Math.random() * (now.getTime() - sixMonthsAgo.getTime()),
    );

    // Random quantity between 1 and 10, or remaining totalSold if less
    const remainingSold = totalSold -
      sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const maxQuantity = Math.min(10, remainingSold);
    const quantity = Math.max(1, Math.floor(Math.random() * maxQuantity));

    // Calculate prices and profit
    const unitPrice = product.sellingPrice;
    const taxAmount = (unitPrice * quantity * product.taxRate) / 100;
    const totalAmount = (unitPrice * quantity) + taxAmount;
    const profit = (unitPrice - product.costPrice) * quantity;

    sales.push({
      productId,
      organizationId,
      quantity,
      unitPrice,
      totalAmount,
      taxAmount,
      profit,
      saleDate,
    });
  }

  return sales;
}

// Function to generate sales aggregates
async function generateSalesAggregates(
  productId: string,
  organizationId: string,
) {
  const aggregates = [];
  const now = new Date();

  // Generate daily aggregates for the past 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Random sales data
    const totalQuantity = Math.floor(Math.random() * 20) + 1;
    const averagePrice = Math.random() * 50 + 50;
    const totalRevenue = totalQuantity * averagePrice;
    const totalProfit = totalRevenue * 0.3; // Assuming 30% profit margin

    aggregates.push({
      productId,
      organizationId,
      periodType: PeriodType.DAY,
      periodStart: new Date(date.setHours(0, 0, 0, 0)),
      periodEnd: new Date(date.setHours(23, 59, 59, 999)),
      totalQuantity,
      totalRevenue,
      totalProfit,
      averagePrice,
    });
  }

  // Generate weekly aggregates for the past 12 weeks
  for (let i = 0; i < 12; i++) {
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() - (i * 7));
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);

    // Random sales data
    const totalQuantity = Math.floor(Math.random() * 100) + 10;
    const averagePrice = Math.random() * 50 + 50;
    const totalRevenue = totalQuantity * averagePrice;
    const totalProfit = totalRevenue * 0.3;

    aggregates.push({
      productId,
      organizationId,
      periodType: PeriodType.WEEK,
      periodStart: new Date(startDate.setHours(0, 0, 0, 0)),
      periodEnd: new Date(endDate.setHours(23, 59, 59, 999)),
      totalQuantity,
      totalRevenue,
      totalProfit,
      averagePrice,
    });
  }

  // Generate monthly aggregates for the past 6 months
  for (let i = 0; i < 6; i++) {
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() - i);
    const startDate = new Date(endDate);
    startDate.setDate(1);
    endDate.setDate(0);

    // Random sales data
    const totalQuantity = Math.floor(Math.random() * 400) + 50;
    const averagePrice = Math.random() * 50 + 50;
    const totalRevenue = totalQuantity * averagePrice;
    const totalProfit = totalRevenue * 0.3;

    aggregates.push({
      productId,
      organizationId,
      periodType: PeriodType.MONTH,
      periodStart: new Date(startDate.setHours(0, 0, 0, 0)),
      periodEnd: new Date(endDate.setHours(23, 59, 59, 999)),
      totalQuantity,
      totalRevenue,
      totalProfit,
      averagePrice,
    });
  }

  return aggregates;
}

async function main() {
  console.log("Starting seeding...");

  // Create the organization first
  const organization = await prisma.organization.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo Organization",
      address: "123 Demo Street, Demo City",
      password: "demo123", // Note: In production, this should be properly hashed
      inventoryLink: "https://demo.example.com/inventory"
    }
  });

  console.log(`Created/Found organization: ${organization.name}`);

  // Sample product data
  const products = [
    {
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      category: ProductCategory.Electronics,
      subCategory: "Audio",
      season: Season.Winter,
      region: Region.North,
      warehouseId: 1,
      leadtime: 5,
      supplierReliability: 0.9,
      transportCost: 15.0,
      promotion: 10.0,
      brand: "TechAudio",
      stock: 100,
      reorderPoint: 20,
      supplierAddress: "123 Supplier St, City, Country",
      supplierName: "TechSuppliers Inc",
      supplierContact: "+1-555-123-4567",
      sellingPrice: 199.99,
      costPrice: 120.00,
      taxRate: 10.0,
      weight: 250.0,
      dimensions: "20x15x5",
      isActive: true,
      image: "https://example.com/headphones.jpg",
      organizationId: organization.id
    }
  ];

  // Create products
  for (const productData of products) {
    const product = await prisma.product.create({
      data: productData
    });
    console.log(`Created product: ${product.name}`);

    // Generate sales data
    const sales = await generateSalesData(product.id, organization.id, 50);
    await prisma.sale.createMany({
      data: sales
    });
    console.log(`Created ${sales.length} sales for ${product.name}`);

    // Generate sales aggregates
    const aggregates = await generateSalesAggregates(product.id, organization.id);
    await prisma.salesAggregate.createMany({
      data: aggregates
      });
    console.log(`Created ${aggregates.length} sales aggregates for ${product.name}`);
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
