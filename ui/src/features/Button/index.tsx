import { ActiveTab } from "../../shared/types";

type ButtonProps = {
  title: string;
  tabId: number;
  activeTab: ActiveTab;
  handleClick: () => void;
};

export const Button = (props: ButtonProps) => {
  const { title, tabId, activeTab, handleClick } = props;
  return (
    <button
      style={{
        textDecoration: tabId === activeTab ? "none" : "underline",
        color: tabId === activeTab ? "black" : "blue",
        fontWeight: tabId === activeTab ? "bold" : "initial",
      }}
      className="button"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
