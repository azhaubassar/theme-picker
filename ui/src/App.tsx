import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./features/Header";
import { Button } from "./features/Button";
import { TypeaheadWidget } from "./features/Typeahead";
import store from "./store";
import { observer } from "mobx-react";
import { ActiveTab } from "./shared/types";
import colorsJson from "./mock_data/colors.json";

type ColorsMapType = {
  [key: string]: string;
};

const App = observer(() => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(0);
  const tabs = [
    { title: "Main Screen", tabId: 0 },
    { title: "Set color #1", tabId: 1 },
    { title: "Set color #2", tabId: 2 },
  ];

  useEffect(() => {
    const colors: ColorsMapType = colorsJson;
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams);
    let value: string | null = queryParams.get("theme");
    value = `#${value}`;
    if (value && colors[value]) {
      store.color2 = colors[value];
    }
  }, []);

  return (
    <div className="App">
      <div className="themeContainer" style={{ backgroundColor: store.color2 }}>
        <Header />
        {tabs.map((button, _id) => (
          <Button
            key={_id}
            activeTab={activeTab}
            {...button}
            handleClick={() => setActiveTab(button.tabId)}
          />
        ))}
        {activeTab === 0 ? (
          <h1 style={{ textAlign: "center" }}>
            Welcome to the theme picker application
          </h1>
        ) : (
          <TypeaheadWidget activeTab={activeTab} />
        )}
      </div>
    </div>
  );
});

export default App;
