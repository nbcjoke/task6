import React, { FC, useState } from "react";

import {
  Button,
  TextField,
  TextareaAutosize,
  Autocomplete,
} from "@mui/material";
import { User } from "../models/user";

interface Props {
  sendMessage: (text: string, theme: string, user: string) => {};
  users: User[];
}

export const Message: FC<Props> = ({ sendMessage, users }) => {
  const [userValue, setUserValue] = useState("");
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 15,
        flexDirection: "column",
        marginTop: "25vh",
      }}
    >
      <Autocomplete
        disablePortal
        options={users}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="User" />}
        getOptionLabel={(obj) => obj.name}
        onChange={(e, user) => setUserValue(user?._id || "")}
      />
      <TextField
        label="Theme"
        variant="outlined"
        style={{ width: 250 }}
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      />
      <TextareaAutosize
        minRows={5}
        placeholder="Message..."
        style={{ width: 350 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => sendMessage(text, theme, userValue)}
      >
        Send Message
      </Button>
    </div>
  );
};
