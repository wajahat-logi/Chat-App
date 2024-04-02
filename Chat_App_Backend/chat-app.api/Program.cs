using chat_app.api.Entities;
using chat_app.api.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using StockApp.Trade.Core.Persistance.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Some API v1", Version = "v1" });
    options.AddSignalRSwaggerGen();
});

builder.Services.AddSignalR(options =>
{
    options.MaximumReceiveMessageSize = 32768; // Adjust buffer size as needed
    options.EnableDetailedErrors = true; // Enable detailed errors for debugging
});


builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());
builder.Services.AddSingleton<IDictionary<string, GroupConnection>>(opts => new Dictionary<string, GroupConnection>());
builder.Services.AddScoped<IChatHub, ChatHub>();

builder.Services.AddDbContext<ApplicationDBContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IApplicationDBContext, ApplicationDBContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseRouting();
app.UseCors();

app.MapHub<ChatHub>("/chat");
app.MapControllers();

app.Run();
