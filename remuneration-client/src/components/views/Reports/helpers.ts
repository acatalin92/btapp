import RemunerationMonthlyReport from '../../../models/RemunerationMonthlyReport';

export const getParsedMonthlyReportData = (data: RemunerationMonthlyReport[]) => {
  if (!data || !data.length) {
    return null;
  }

  const salespersonsMap: {
    [key: number]: {
      id: number;
      name: string;
    };
  } = {};

  const productsMap: {
    [key: number]: {
      id: number;
      name: string;
      salespersonIdToAmount: { [key: number]: number };
    };
  } = {};
  
  data.forEach(report => {
    const salespersonId = report.salesperson.id;
    const productId = report.product.id;

    if (!salespersonsMap[salespersonId]) {
      salespersonsMap[salespersonId] = {
        id: salespersonId,
        name: report.salesperson.name,
      };
    }
    
    if (!productsMap[productId]) {
      productsMap[productId] = {
        id: productId,
        name: report.product.name,
        salespersonIdToAmount: {},
      };
    }

    productsMap[productId].salespersonIdToAmount[salespersonId] = report.amount;
  });

  return {
    salespersons: Object.values(salespersonsMap),
    products: Object.values(productsMap),
  };
};