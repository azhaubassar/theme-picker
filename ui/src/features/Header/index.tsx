import React from "react";
import { observer } from "mobx-react";
import store from "../../store";

export const Header = observer(() => {
  return (
    <div
      className="header"
      style={{
        backgroundColor: store.color1,
      }}
    >
      <p style={{ alignSelf: "center" }}>Theme picker</p>
    </div>
  );
});
