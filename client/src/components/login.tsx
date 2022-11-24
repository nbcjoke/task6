import React, { FC, useState } from "react";

import { TextField, Button } from "@mui/material";

interface Props {
  loginHandler: (name: string) => {};
}

export const Login: FC<Props> = ({ loginHandler }) => {
  const [name, setName] = useState("");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 15,
        marginTop: "40vh",
      }}
    >
      <TextField
        label="Enter your name..."
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" onClick={() => loginHandler(name)}>
        Enter
      </Button>
    </div>
  );
};
