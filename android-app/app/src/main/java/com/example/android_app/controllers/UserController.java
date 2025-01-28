package com.example.android_app.controllers;

import android.util.Log;

import com.example.android_app.services.SocketService;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.emitter.Emitter;

public class UserController {
    private final SocketService socketService;

    public UserController() {
        socketService = new SocketService();
    }

    public void connect() {
        socketService.connect();
    }

    public void login(String login, String password, Emitter.Listener listener) {
        try {
            JSONObject loginData = new JSONObject();
            loginData.put("login", login);
            loginData.put("contrasenya", password);
            socketService.emit("login", loginData);
            socketService.on("loginResponse", listener);
        } catch (JSONException e) {
            Log.e("Socket", "Error al crear JSON para login", e);
        }
    }

    public void getProfile(String token, Emitter.Listener listener) {
        try {
            JSONObject tokenData = new JSONObject();
            tokenData.put("token", token);
            socketService.emit("getProfile", tokenData);
            socketService.on("profileResponse", listener);
        } catch (JSONException e) {
            Log.e("Socket", "Error al crear JSON para obtener el perfil", e);
        }
    }

    public void disconnect() {
        socketService.disconnect();
    }
}
