package com.example.android_app.activities;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.android_app.R;
import com.example.android_app.controllers.UserController;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.emitter.Emitter;

public class HomeActivity extends AppCompatActivity {

    private TextView dniTextView;
    private TextView nombreTextView;
    private TextView primerApellidoTextView;
    private TextView segundoApellidoTextView;
    private TextView loginTextView;
    private TextView departamentoTextView;

    private UserController userController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        dniTextView = findViewById(R.id.dniTextView);
        nombreTextView = findViewById(R.id.nombreTextView);
        primerApellidoTextView = findViewById(R.id.primerApellidoTextView);
        segundoApellidoTextView = findViewById(R.id.segundoApellidoTextView);
        loginTextView = findViewById(R.id.loginTextView);
        departamentoTextView = findViewById(R.id.departamentoTextView);

        userController = new UserController();
        userController.connect();

        String token = getIntent().getStringExtra("token");
        if (token != null) {
            userController.getProfile(token, onProfileResponse);
        } else {
            Toast.makeText(this, "Token no encontrado", Toast.LENGTH_SHORT).show();
        }
    }

    private Emitter.Listener onProfileResponse = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            runOnUiThread(() -> {
                JSONObject data = (JSONObject) args[0];
                try {
                    if (data.has("profile")) {
                        JSONObject profile = data.getJSONObject("profile");
                        dniTextView.setText(profile.getString("dni"));
                        nombreTextView.setText(profile.getString("nombre"));
                        primerApellidoTextView.setText(profile.getString("primerApellido"));
                        segundoApellidoTextView.setText(profile.getString("segundoApellido"));
                        loginTextView.setText(profile.getString("login"));
                        departamentoTextView.setText(profile.getString("departamento"));
                    } else {
                        String message = data.getString("message");
                        Toast.makeText(HomeActivity.this, message, Toast.LENGTH_SHORT).show();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(HomeActivity.this, "Error al procesar la respuesta del servidor", Toast.LENGTH_SHORT).show();
                }
            });
        }
    };

    @Override
    protected void onDestroy() {
        super.onDestroy();
        userController.disconnect();
    }
}
