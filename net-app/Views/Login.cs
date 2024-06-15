using System;
using System.Windows.Forms;
using net_app.Controllers;
using net_app.Services;

namespace net_app.Views
{
    public partial class Login : Form
    {
        private ApiService apiService;

        public Login()
        {
            InitializeComponent();
            apiService = new ApiService();
        }

        private async void loginButton_Click(object sender, EventArgs e)
        {
            string login = loginTextBox.Text;
            string password = passwordTextBox.Text;

            try
            {
                var token = await apiService.Login(login, password);
                if (!string.IsNullOrEmpty(token))
                {
                    AuthController.ShowHomeForm(token);
                    this.Hide();
                }
                else
                {
                    MessageBox.Show("Login failed. Please check your credentials.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Exception Caught!\nMessage: {ex.Message}");
            }
        }
    }
}
