import React, { useState, useEffect, useCallback, useMemo } from "react";
import store from "../../store";
import { ActiveTab, Color } from "../../shared/types";
import { observer } from "mobx-react";
import { SuggestionsList } from "./SuggestionsList";
import { debounce } from "../../shared/debounce";

export type TypeaheadWidgetProps = {
  activeTab: ActiveTab;
};
type SuggestionsType = Color[];

export const TypeaheadWidgetComponent = ({
  activeTab,
}: TypeaheadWidgetProps) => {
  const [suggestions, setSuggestions] = useState<SuggestionsType>([]);
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setText(activeTab === 1 ? store.color1 : store.color2);
  }, [activeTab]);

  const sendRequest = useCallback(async (value: string) => {
    console.log(value);

    const response = await fetch(`http://localhost:8080/colors?q=${value}`);
    if (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseJson = await response.json();
      const { items } = responseJson;
      setSuggestions(items);
    }
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      debouncedSendRequest(value);
    }
    setText(value);
  };

  const suggestionSelected = (value: string) => {
    setSuggestions([]);
    setText(value);
    if (activeTab === 1) {
      store.color1 = value;
    } else if (activeTab === 2) {
      store.color2 = value;
    }
    setFocused(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor((prev) => prev - 1);
    } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
      setCursor((prev) => prev + 1);
    } else if (e.keyCode === 13) {
      suggestionSelected(suggestions[cursor].name);
      setCursor(0);
    } else if (e.keyCode === 27) {
      setSuggestions([]);
      setText("");
      setFocused(false);
    }
  };

  return (
    <div className="typeahead-container">
      <input
        onChange={onTextChange}
        placeholder={"place"}
        value={text}
        type="text"
        onKeyDown={handleKey}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <SuggestionsList
        suggestions={suggestions}
        suggestionSelected={suggestionSelected}
        inputFocused={focused}
        cursor={cursor}
      />
    </div>
  );
};

export const TypeaheadWidget = observer(TypeaheadWidgetComponent);
export default TypeaheadWidgetComponent;
