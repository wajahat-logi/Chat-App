using chat_app.api.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockApp.Trade.Core.Persistance.Context
{
    public interface IApplicationDBContext
    {
        DbSet<GroupConnection> connections { get; set; }
        Task<int> SaveChangesAsync();
    }
}
