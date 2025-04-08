import { PrismaClient, ProductCategory, Region, Season, PeriodType } from "@prisma/client";

// Create a new PrismaClient instance
const prisma = new PrismaClient();

// Function to generate random sales data
async function generateSalesData(productId: string, organizationId: string, totalSold: number) {
  // Generate sales over the past 6 months
  const sales = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  // Get the product to access its price
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });
  
  if (!product) return [];
  
  // Calculate how many sales to create based on totalSold
  const numberOfSales = Math.max(5, Math.floor(totalSold / 10));
  
  // Distribute sales over the past 6 months
  for (let i = 0; i < numberOfSales; i++) {
    // Random date between sixMonthsAgo and now
    const saleDate = new Date(sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime()));
    
    // Random quantity between 1 and 10, or remaining totalSold if less
    const remainingSold = totalSold - sales.reduce((sum, sale) => sum + sale.quantity, 0);
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
      saleDate
    });
  }
  
  return sales;
}

// Function to generate sales aggregates
async function generateSalesAggregates(productId: string, organizationId: string) {
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
      averagePrice
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
      averagePrice
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
      averagePrice
    });
  }
  
  return aggregates;
}

async function main() {
  console.log("Starting seeding...");

  // Use the specific organization ID provided
  const orgId = "cm988a43z0002k8bjzudn0auf";

  // Verify that the organization exists
  const organization = await prisma.organization.findUnique({
    where: { id: orgId },
  });

  if (!organization) {
    console.error(`Organization with ID ${orgId} not found. Aborting seed.`);
    return;
  }

  console.log(`Found organization: ${organization.name}`);

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
      isFeatured: true,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 150,
    },
    {
      name: "Organic Coffee Beans",
      description: "Premium organic coffee beans from sustainable farms",
      category: ProductCategory.Beverages,
      subCategory: "Coffee",
      season: Season.Summer,
      region: Region.South,
      warehouseId: 2,
      leadtime: 3,
      supplierReliability: 0.85,
      transportCost: 8.0,
      promotion: 5.0,
      brand: "GreenBean",
      stock: 200,
      reorderPoint: 50,
      supplierAddress: "456 Coffee Ave, City, Country",
      supplierName: "Coffee Suppliers Ltd",
      supplierContact: "+1-555-987-6543",
      sellingPrice: 24.99,
      costPrice: 15.00,
      taxRate: 8.0,
      weight: 500.0,
      dimensions: "10x10x5",
      isActive: true,
      isFeatured: false,
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 300,
    },
    {
      name: "Smart Watch",
      description: "Feature-rich smartwatch with health monitoring",
      category: ProductCategory.Electronics,
      subCategory: "Wearables",
      season: Season.Monsoon,
      region: Region.East,
      warehouseId: 1,
      leadtime: 7,
      supplierReliability: 0.95,
      transportCost: 12.0,
      promotion: 15.0,
      brand: "SmartTech",
      stock: 75,
      reorderPoint: 15,
      supplierAddress: "789 Tech Blvd, City, Country",
      supplierName: "TechGadgets Inc",
      supplierContact: "+1-555-456-7890",
      sellingPrice: 299.99,
      costPrice: 180.00,
      taxRate: 12.0,
      weight: 50.0,
      dimensions: "5x5x1",
      isActive: true,
      isFeatured: true,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 200,
    },
    {
      name: "Organic Rice",
      description: "Premium organic rice from sustainable farms",
      category: ProductCategory.Grocery,
      subCategory: "Grains",
      season: Season.Monsoon,
      region: Region.West,
      warehouseId: 3,
      leadtime: 4,
      supplierReliability: 0.8,
      transportCost: 10.0,
      promotion: 0.0,
      brand: "GreenHarvest",
      stock: 500,
      reorderPoint: 100,
      supplierAddress: "321 Farm Rd, City, Country",
      supplierName: "Organic Farms Co",
      supplierContact: "+1-555-789-0123",
      sellingPrice: 19.99,
      costPrice: 12.00,
      taxRate: 5.0,
      weight: 2000.0,
      dimensions: "30x20x10",
      isActive: true,
      isFeatured: false,
      image:
        "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 450,
    },
    {
      name: "Raw Cotton",
      description: "High-quality raw cotton for textile manufacturing",
      category: ProductCategory.RawMaterials,
      subCategory: "Textiles",
      season: Season.Summer,
      region: Region.South,
      warehouseId: 4,
      leadtime: 10,
      supplierReliability: 0.75,
      transportCost: 25.0,
      promotion: 0.0,
      brand: "CottonFields",
      stock: 1000,
      reorderPoint: 200,
      supplierAddress: "654 Cotton Ln, City, Country",
      supplierName: "Textile Materials Ltd",
      supplierContact: "+1-555-234-5678",
      sellingPrice: 5.99,
      costPrice: 3.50,
      taxRate: 7.0,
      weight: 5000.0,
      dimensions: "50x30x20",
      isActive: true,
      isFeatured: false,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 800,
    },
    // 5 additional products
    {
      name: "Laptop Pro",
      description: "High-performance laptop for professionals",
      category: ProductCategory.Electronics,
      subCategory: "Computers",
      season: Season.Winter,
      region: Region.North,
      warehouseId: 1,
      leadtime: 8,
      supplierReliability: 0.92,
      transportCost: 20.0,
      promotion: 5.0,
      brand: "TechPro",
      stock: 50,
      reorderPoint: 10,
      supplierAddress: "789 Tech Park, City, Country",
      supplierName: "TechDistributors Inc",
      supplierContact: "+1-555-345-6789",
      sellingPrice: 1299.99,
      costPrice: 900.00,
      taxRate: 10.0,
      weight: 2000.0,
      dimensions: "35x25x2",
      isActive: true,
      isFeatured: true,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 80,
    },
    {
      name: "Green Tea",
      description: "Premium Japanese green tea",
      category: ProductCategory.Beverages,
      subCategory: "Tea",
      season: Season.Summer,
      region: Region.East,
      warehouseId: 2,
      leadtime: 4,
      supplierReliability: 0.88,
      transportCost: 7.0,
      promotion: 0.0,
      brand: "TeaLeaf",
      stock: 300,
      reorderPoint: 60,
      supplierAddress: "123 Tea Garden, City, Country",
      supplierName: "Tea Importers Co",
      supplierContact: "+1-555-567-8901",
      sellingPrice: 14.99,
      costPrice: 8.00,
      taxRate: 5.0,
      weight: 100.0,
      dimensions: "15x10x5",
      isActive: true,
      isFeatured: false,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 250,
    },
    {
      name: "Steel Pipes",
      description: "High-quality steel pipes for construction",
      category: ProductCategory.RawMaterials,
      subCategory: "Construction",
      season: Season.Monsoon,
      region: Region.West,
      warehouseId: 4,
      leadtime: 12,
      supplierReliability: 0.78,
      transportCost: 30.0,
      promotion: 0.0,
      brand: "SteelWorks",
      stock: 800,
      reorderPoint: 150,
      supplierAddress: "456 Industrial Park, City, Country",
      supplierName: "Steel Manufacturers Ltd",
      supplierContact: "+1-555-678-9012",
      sellingPrice: 45.99,
      costPrice: 30.00,
      taxRate: 8.0,
      weight: 5000.0,
      dimensions: "100x10x10",
      isActive: true,
      isFeatured: false,
      image:
        "https://images.unsplash.com/photo-1581092921461-39b21c5c7c1e?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 600,
    },
    {
      name: "Smartphone",
      description: "Latest smartphone with advanced features",
      category: ProductCategory.Electronics,
      subCategory: "Mobile",
      season: Season.Winter,
      region: Region.North,
      warehouseId: 1,
      leadtime: 6,
      supplierReliability: 0.94,
      transportCost: 18.0,
      promotion: 12.0,
      brand: "PhoneTech",
      stock: 120,
      reorderPoint: 25,
      supplierAddress: "789 Mobile Ave, City, Country",
      supplierName: "Mobile Distributors Inc",
      supplierContact: "+1-555-901-2345",
      sellingPrice: 899.99,
      costPrice: 600.00,
      taxRate: 10.0,
      weight: 180.0,
      dimensions: "15x7x1",
      isActive: true,
      isFeatured: true,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 180,
    },
    {
      name: "Organic Honey",
      description: "Pure organic honey from local beekeepers",
      category: ProductCategory.Grocery,
      subCategory: "Sweeteners",
      season: Season.Summer,
      region: Region.South,
      warehouseId: 3,
      leadtime: 3,
      supplierReliability: 0.82,
      transportCost: 9.0,
      promotion: 0.0,
      brand: "BeeSweet",
      stock: 150,
      reorderPoint: 30,
      supplierAddress: "321 Honey Farm, City, Country",
      supplierName: "Local Beekeepers Co",
      supplierContact: "+1-555-345-6789",
      sellingPrice: 12.99,
      costPrice: 7.00,
      taxRate: 5.0,
      weight: 500.0,
      dimensions: "10x10x10",
      isActive: true,
      isFeatured: false,
      image:
        "https://images.unsplash.com/photo-1587049352846-4a723e95658a?auto=format&fit=crop&w=800&q=80",
      organizationId: orgId,
      totalSold: 220,
    },
  ];

  // Create products
  console.log("Creating products...");
  const createdProducts = [];
  
  for (const productData of products) {
    const product = await prisma.product.create({
      data: productData,
    });
    createdProducts.push(product);
    console.log(`Created product: ${product.name}`);
  }

  // Generate sales data for each product
  console.log("Generating sales data...");
  for (const product of createdProducts) {
    // Generate sales records
    const salesData = await generateSalesData(product.id, orgId, product.totalSold);
    
    // Create sales records
    for (const saleData of salesData) {
      await prisma.sale.create({
        data: saleData,
      });
    }
    
    // Generate sales aggregates
    const aggregatesData = await generateSalesAggregates(product.id, orgId);
    
    // Create sales aggregates
    for (const aggregateData of aggregatesData) {
      await prisma.salesAggregate.create({
        data: aggregateData,
      });
    }
    
    console.log(`Generated sales data for: ${product.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
