import React, { FunctionComponent } from "react";

interface CodeSandboxEmbedProps {
  embedId: string;
  view?: string;
  theme?: string;
}

const CodeSandboxEmbed: FunctionComponent<CodeSandboxEmbedProps> = ({
  embedId,
  view = "preview",
  theme = "light",
}) => {
  const src = `https://codesandbox.io/embed/${embedId}?view=${view}&theme=${theme}&hidenavigation=1&fontsize=12&autoresize=1`;

  return (
    <iframe
      src={src}
      style={{
        width: "100%",
        height: "300px",
        overflow: "hidden",
      }}
      title="CodeSandbox"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
};

export default CodeSandboxEmbed;
