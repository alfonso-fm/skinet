using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            switch(statusCode){
                case 400 : return "A bad Request, you have made";
                case 401 : return "Authorized, you are not";
                case 404 : return "Resources found, it was not";
                case 500 : return "Error are the path to the dark. Error lead to anger, Anger lead...";
                default : return "Generic Error";
            }
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}