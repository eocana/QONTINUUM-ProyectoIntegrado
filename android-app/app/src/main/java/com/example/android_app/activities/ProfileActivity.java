package com.example.android_app.activities;

import androidx.appcompat.app.AppCompatActivity;

public class ProfileActivity extends AppCompatActivity {
/*
    private TextView profileTextView;
    private ApiService apiService;
    private String dni;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        profileTextView = findViewById(R.id.profileTextView);
        apiService = new ApiService();

        // Obtener el DNI del intent
        dni = getIntent().getStringExtra("dni");

        // Obtener el perfil del usuario
        apiService.getProfile(dni, new ApiService.ApiCallback() {
            @Override
            public void onSuccess(String response) {
                try {
                    JSONObject profile = new JSONObject(response);
                    String profileInfo = "DNI: " + profile.getString("dni") + "\n"
                            + "Nombre: " + profile.getString("nombre") + "\n"
                            + "Apellido: " + profile.getString("primerApellido") + " " + profile.getString("segundoApellido") + "\n"
                            + "Login: " + profile.getString("login") + "\n"
                            + "Fotografía: " + profile.getString("fotografia") + "\n"
                            + "Departamento: " + profile.getString("departamento");
                    profileTextView.setText(profileInfo);
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(ProfileActivity.this, "Error parsing profile data", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(String message) {
                Toast.makeText(ProfileActivity.this, message, Toast.LENGTH_SHORT).show();
            }
        });
    }*/
}