using RemunerationAPI.Data.Models;

namespace RemunerationAPI.Data.Seeds
{
    public class DevelopmentDataSeeder
    {
        public static void Seed(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();

                dataContext.Database.EnsureCreated();

                InsertData(dataContext);
            }
        }

        private static void InsertData(DataContext dataContext)
        {
            var year = DateTime.Now.Year;
            var month = DateTime.Now.Month;

            if (!dataContext.Salespersons.Any())
            {
                for (var i = 1; i <= 5; i++)
                {
                    dataContext.Salespersons.Add(new Salesperson
                    {
                        Name = $"Vanzatorul {i}"
                    });
                }
            }

            if (!dataContext.Products.Any())
            {
                for (var i = 1; i <= 5; i++)
                {
                    dataContext.Products.Add(new Product
                    {
                        Name = $"Produsul {i}"
                    });
                }
            }

            dataContext.SaveChanges();

            var salespersons = dataContext.Salespersons.ToList();
            var products = dataContext.Products.ToList();

            if (!dataContext.Remunerations.Any())
            {
                for (var m = 1; m >= 0; m--)
                {
                    for (var i = 1; i <= 5; i++)
                    {
                        dataContext.Remunerations.Add(new Remuneration
                        {
                            Year = year,
                            Month = month - m,
                            Product = products[i - 1],
                            Amount = (i * 10 + i * 3) * (m + 1),
                        });
                    }
                }
            }

            if (!dataContext.Sales.Any())
            {
                for (var m = 1; m >= 0; m--)
                {
                    for (var i = 1; i <= 5; i++)
                    {
                        for (var j = 1; j <= 5; j++)
                        {
                            if (m == 1 && i == 1)
                            {
                                // Skip sales for salesperson 1 in the previous month
                                continue;
                            }

                            dataContext.Sales.Add(new Sale
                            {
                                Year = year,
                                Month = month - m,
                                Salesperson = salespersons[i - 1],
                                Product = products[j - 1],
                                Quantity = (i * 100 + j * 16) * (m + 1),
                            });
                        }
                    }
                }
            }

            dataContext.SaveChanges();
        }
    }
}
