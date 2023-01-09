import { observer } from "mobx-react-lite";
import React from "react";
import type { BtnVM } from "./btnVM";
import "./button.css";

interface ButtonProps {
  viewModel: BtnVM;
}

export const BtnC: React.FC<ButtonProps> = observer(
  ({ viewModel, ...other }) => {
    const mode = viewModel.primary
      ? "storybook-button--primary"
      : "storybook-button--secondary";
    const border = React.useMemo(() => {
      if (!viewModel.border) {
        return undefined;
      }
      return "2px solid red";
    }, [viewModel.border]);

    return (
      <button
        type="button"
        className={[
          "storybook-button",
          `storybook-button--${viewModel.size}`,
          mode,
        ].join(" ")}
        style={{ backgroundColor: viewModel.backgroundColor, border }}
        {...other}
      >
        {viewModel.label}
      </button>
    );
  }
);
