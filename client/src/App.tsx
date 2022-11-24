import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { Typography } from "@mui/material";
import { AuthService } from "./services/AuthService";
import { MessageService } from "./services/MessageService";
import { UserService } from "./services/UserService";
import { Login } from "../src/components/login";
import { Message } from "./components/message";
import { Chat } from "./components/chat";
import { MessageModel } from "../src/models/messageModel";

let socket: any;

function App() {
  const [currentId, setId] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([] as MessageModel[]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      return;
    }
    setId(id);
    socket = io("ws://localhost:5000", { query: { id } });
    fetchUsers();
    getMessages();
  }, []);

  useEffect(() => {
    if (!currentId) {
      return;
    }

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("message", (messageObject: MessageModel) => {
      setMessages([messageObject, ...messages]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [currentId, messages]);

  async function loginHandler(name: string) {
    const { id } = await AuthService.auth(name);
    localStorage.setItem("id", id);
    socket = io("ws://localhost:5000", { query: { id } });
    if (!id) {
      return;
    }
    setId(id);
    return;
  }

  async function sendMessage(text: string, theme: string, user: string) {
    await MessageService.sendMessage(currentId, user, {
      text,
      theme,
    });
  }

  async function fetchUsers() {
    const response = await UserService.fetchUsers();
    setUsers(response.data);
  }

  async function getMessages() {
    const response = await MessageService.getMessages();
    setMessages(response.data);
  }

  return (
    <div>
      {!connected ? (
        <Login loginHandler={loginHandler} />
      ) : (
        <div>
          <Typography
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            User Id: {currentId}
          </Typography>
          <div style={{ display: "flex", gap: 25 }}>
            <Chat users={users} messages={messages} />
            <Message sendMessage={sendMessage} users={users} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
