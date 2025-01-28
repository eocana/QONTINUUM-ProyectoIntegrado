package com.example.android_app.activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.android_app.R;
import com.example.android_app.controllers.UserController;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.emitter.Emitter;

public class MainActivity extends AppCompatActivity {

    private EditText loginEditText;
    private EditText passwordEditText;
    private Button loginButton;
    private UserController userController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        loginEditText = findViewById(R.id.loginEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        loginButton = findViewById(R.id.loginButton);

        userController = new UserController();
        userController.connect();

        loginButton.setOnClickListener(view -> {
            String login = loginEditText.getText().toString();
            String password = passwordEditText.getText().toString();
            if (!login.isEmpty() && !password.isEmpty()) {
                Log.d("Socket", "Emitiendo mensaje: " + login + " " + password);
                userController.login(login, password, onLoginResponse);
            } else {
                Toast.makeText(MainActivity.this, "Por favor, ingresa login y contraseña", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private Emitter.Listener onLoginResponse = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            runOnUiThread(() -> {
                JSONObject data = (JSONObject) args[0];
                try {
                    String message = data.getString("message");
                    if (message.equals("Login exitoso")) {
                        String token = data.getString("token");
                        Log.d("Socket", "Login exitoso: " + token);
                        Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                        intent.putExtra("token", token);
                        startActivity(intent);
                        finish();
                    } else {
                        Log.d("Socket", "Login fallido: " + message);
                        Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(MainActivity.this, "Error al procesar la respuesta del servidor", Toast.LENGTH_SHORT).show();
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
