using System;
using System.Windows.Forms;
using net_app.Views;

namespace net_app.Controllers
{
    public static class AuthController
    {
        public static void ShowLoginForm()
        {
            Application.Run(new Login());
        }

        public static void ShowHomeForm(string token)
        {
            var homeForm = new HomeForm(token);
            homeForm.Show();
        }
    }
}
