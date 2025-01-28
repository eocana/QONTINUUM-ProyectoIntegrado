package com.example.android_app.services;

import android.util.Log;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

public class ApiService {
    private static final String SOCKET_URL = "http://10.0.2.2:3000";
    private Socket socket;

    public ApiService() {
        try {
            IO.Options options = new IO.Options();
            options.forceNew = true;
            options.reconnection = true;
            socket = IO.socket(SOCKET_URL, options);
            socket.connect();

            socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Log.d("Socket", "Connected");
                }
            });

            socket.on(Socket.EVENT_CONNECT_ERROR, new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Log.e("Socket", "Connection Error: " + args[0]);
                }
            });

            socket.on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Log.d("Socket", "Disconnected");
                }
            });

        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    public void login(String login, String password) {
        try {
            JSONObject data = new JSONObject();
            data.put("login", login);
            data.put("contrasenya", password);
            socket.emit("login", data);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void getProfile(String dni) {
        try {
            JSONObject data = new JSONObject();
            data.put("dni", dni);
            socket.emit("getProfile", data);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public Socket getSocket() {
        return socket;
    }
}
