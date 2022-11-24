import React, { FC } from "react";

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { User } from "../models/user";
import { MessageModel } from "../models/messageModel";

interface Props {
  users: User[];
  messages: MessageModel[];
}

export const Chat: FC<Props> = ({ users, messages }) => {
  return (
    <div style={{ display: "flex", minWidth: 500, gap: 15, marginTop: 20 }}>
      <div style={{ padding: 20 }}>
        <Typography variant="h4" component="h2" style={{ textAlign: "center" }}>
          Users
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {users.map((user) => {
            return <div key={user._id}>{user.name}</div>;
          })}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          padding: 20,
          height: "600px",
          border: "1px solid black",
          borderRadius: 4,
          overflow: "auto",
        }}
      >
        <Typography variant="h4" component="h2" style={{ textAlign: "center" }}>
          Messages
        </Typography>
        {messages.map((message) =>
          message.to._id === localStorage.getItem("id") ? (
            <Accordion key={message._id}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
              >
                <Typography>{message.message.theme}</Typography>
                <Typography style={{ marginLeft: 15 }}>
                  {message.from.name}
                </Typography>
                <Typography style={{ marginLeft: 15 }}>
                  {message.time}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{message.message.text}</Typography>
              </AccordionDetails>
            </Accordion>
          ) : null
        )}
      </div>
    </div>
  );
};
