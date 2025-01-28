package com.example.android_app.services;

import android.util.Log;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import java.net.URISyntaxException;

public class SocketService {

    private Socket mSocket;
    private static final String BASE_URL = "http://10.0.2.2:3000";

    public SocketService() {
        try {
            mSocket = IO.socket(BASE_URL);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    public void connect() {
        mSocket.on(Socket.EVENT_CONNECT, args -> Log.d("Socket", "Conectado"));
        mSocket.connect();
    }

    public void disconnect() {
        mSocket.disconnect();
    }

    public void on(String event, Emitter.Listener listener) {
        mSocket.on(event, listener);
    }

    public void emit(String event, Object... args) {
        mSocket.emit(event, args);
    }

    public void off(String event, Emitter.Listener listener) {
        mSocket.off(event, listener);
    }
}
