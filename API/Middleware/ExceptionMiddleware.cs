using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, 
        ILogger<ExceptionMiddleware> logger, 
        IWebHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context){
            try
            {
                await _next(context); 
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                string json = "";
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase}; 
                if( _env.IsDevelopment()) 
                    json = JsonSerializer.Serialize(new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString()), options);
                else
                    json = JsonSerializer.Serialize(new ApiResponse((int)HttpStatusCode.InternalServerError), options);

                await context.Response.WriteAsync(json);  
            } 
        }
    }
}