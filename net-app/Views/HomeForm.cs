using System;
using System.Windows.Forms;
using net_app.Services;

namespace net_app.Views
{
    public partial class HomeForm : Form
    {
        private ApiService apiService;
        private string token;

        public HomeForm(string token)
        {
            InitializeComponent();
            apiService = new ApiService();
            this.token = token;
        }

        private async void HomeForm_Load(object sender, EventArgs e)
        {
            try
            {
                var user = await apiService.GetProfile(token);

                nombreLabel.Text = $"Nombre: {user.Nombre}";
                apellidosLabel.Text = $"Apellidos: {user.PrimerApellido} {user.SegundoApellido}";
                dniLabel.Text = $"DNI: {user.Dni}";
                loginLabel.Text = $"Login: {user.Login}";
                departamentoLabel.Text = $"Departamento: {user.Departamento}";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al cargar el perfil del usuario.\nMessage: {ex.Message}");
            }
        }
    }
}
