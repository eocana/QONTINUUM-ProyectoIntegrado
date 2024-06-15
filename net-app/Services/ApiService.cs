using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using net_app.Models;
using System.Linq;

namespace net_app.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "http://localhost:3000/api";

        public ApiService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<string> Login(string login, string password)
        {
            var loginData = new { login = login, contrasenya = password };
            var content = new StringContent(JsonConvert.SerializeObject(loginData), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_baseUrl}/login", content);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<dynamic>(responseContent);
            return result.token;
        }

        public async Task<User> GetProfile(string token)
        {
            // Decodificar el token para obtener el DNI
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var dni = jwtToken.Claims.First(claim => claim.Type == "dni").Value;

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync($"{_baseUrl}/users/{dni}");
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<User>(responseContent);
        }
    }
}
