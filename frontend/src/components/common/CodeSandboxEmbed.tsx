import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDarkMode } from "../../providers/DarkModeProvider";

interface CodeSandboxEmbedProps {
  embedId: string;
  view?: string;
  height?: string;
}

const CodeSandboxEmbed: FunctionComponent<CodeSandboxEmbedProps> = ({
  embedId,
  view = "preview",
  height = "240px",
}) => {
  const { darkMode } = useDarkMode();

  const src = `https://codesandbox.io/embed/${embedId}?view=${view}&theme=${
    darkMode ? "dark" : "light"
  }&hidenavigation=1&fontsize=12&autoresize=1`;

  useEffect(() => {
    null;
  }, []);

  return (
    <iframe
      src={src}
      style={{
        position: "relative",
        width: "100%",
        height: height,
        overflow: "hidden",
      }}
      title="CodeSandbox"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
};

export default CodeSandboxEmbed;
