package com.ssafy.koala;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class SimpleSocketServer {
    public SimpleSocketServer() {
        try {
            ServerSocket serverSocket = new ServerSocket(7777);
            System.out.println("Server is running...");

            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected.");

            BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter writer = new PrintWriter(clientSocket.getOutputStream(), true);

            while(true) {
                // Read from and write to the client
                String clientMessage = reader.readLine();
                System.out.println("Received from client: " + clientMessage);

                if(clientMessage.equals("ㅋ닫ㅋ아ㅋ~ㅋ~~~~~~")) break;
            }
            // Clean up
            reader.close();
            writer.close();
            clientSocket.close();
            serverSocket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
