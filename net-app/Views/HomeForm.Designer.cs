namespace net_app.Views
{
    partial class HomeForm
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        private void InitializeComponent()
        {
            this.nombreLabel = new System.Windows.Forms.Label();
            this.apellidosLabel = new System.Windows.Forms.Label();
            this.dniLabel = new System.Windows.Forms.Label();
            this.loginLabel = new System.Windows.Forms.Label();
            this.departamentoLabel = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // nombreLabel
            // 
            this.nombreLabel.AutoSize = true;
            this.nombreLabel.Location = new System.Drawing.Point(12, 9);
            this.nombreLabel.Name = "nombreLabel";
            this.nombreLabel.Size = new System.Drawing.Size(44, 13);
            this.nombreLabel.TabIndex = 0;
            this.nombreLabel.Text = "Nombre:";
            // 
            // apellidosLabel
            // 
            this.apellidosLabel.AutoSize = true;
            this.apellidosLabel.Location = new System.Drawing.Point(12, 32);
            this.apellidosLabel.Name = "apellidosLabel";
            this.apellidosLabel.Size = new System.Drawing.Size(49, 13);
            this.apellidosLabel.TabIndex = 1;
            this.apellidosLabel.Text = "Apellidos:";
            // 
            // dniLabel
            // 
            this.dniLabel.AutoSize = true;
            this.dniLabel.Location = new System.Drawing.Point(12, 55);
            this.dniLabel.Name = "dniLabel";
            this.dniLabel.Size = new System.Drawing.Size(29, 13);
            this.dniLabel.TabIndex = 2;
            this.dniLabel.Text = "DNI:";
            // 
            // loginLabel
            // 
            this.loginLabel.AutoSize = true;
            this.loginLabel.Location = new System.Drawing.Point(12, 78);
            this.loginLabel.Name = "loginLabel";
            this.loginLabel.Size = new System.Drawing.Size(36, 13);
            this.loginLabel.TabIndex = 3;
            this.loginLabel.Text = "Login:";
            // 
            // departamentoLabel
            // 
            this.departamentoLabel.AutoSize = true;
            this.departamentoLabel.Location = new System.Drawing.Point(12, 101);
            this.departamentoLabel.Name = "departamentoLabel";
            this.departamentoLabel.Size = new System.Drawing.Size(77, 13);
            this.departamentoLabel.TabIndex = 4;
            this.departamentoLabel.Text = "Departamento:";
            // 
            // HomeForm
            // 
            this.ClientSize = new System.Drawing.Size(800, 800);
            this.Controls.Add(this.departamentoLabel);
            this.Controls.Add(this.loginLabel);
            this.Controls.Add(this.dniLabel);
            this.Controls.Add(this.apellidosLabel);
            this.Controls.Add(this.nombreLabel);
            this.Name = "HomeForm";
            this.Text = "Home";
            this.Load += new System.EventHandler(this.HomeForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();
        }

        #endregion

        private System.Windows.Forms.Label nombreLabel;
        private System.Windows.Forms.Label apellidosLabel;
        private System.Windows.Forms.Label dniLabel;
        private System.Windows.Forms.Label loginLabel;
        private System.Windows.Forms.Label departamentoLabel;
    }
}
