import React from "react";
import store from "../../store";
import { Color } from "../../shared/types";
import { observer } from "mobx-react";

type SuggectionsListProps = {
  suggestions: Color[];
  inputFocused: Boolean;
  suggestionSelected: (color: string) => void;
  cursor: number;
};

const SuggestionsList = observer(
  ({
    suggestions,
    inputFocused,
    suggestionSelected,
    cursor,
  }: SuggectionsListProps) => {
    if (suggestions.length === 0 && !inputFocused) return null;

    if (suggestions.length === 0 && inputFocused) {
      return (
        <ul>
          <p style={{ textAlign: "center" }}>
            Start typing to see available options...
          </p>
        </ul>
      );
    }

    return (
      <ul>
        {suggestions.map((color, _i) => (
          <li
            key={color.name}
            onClick={(e) => suggestionSelected(color.name)}
            style={{
              backgroundColor: cursor === _i ? store.color1 : "transparent",
            }}
          >
            {color.name}
          </li>
        ))}
      </ul>
    );
  }
);
export default SuggestionsList;
