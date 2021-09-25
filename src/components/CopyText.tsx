import { ReactText, useState } from "react";

interface ICopyTextProps {
  data?: String;
  children?: ReactText;
}

const CopyText = ({ data, children }: ICopyTextProps) => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleClick = async () => {
    await navigator.clipboard.writeText((data ?? children ?? "").toString());
    setMessage("Copied...");
    setInterval(() => setMessage(undefined), 1000);
  };

  return (
    <span onClick={handleClick} style={{ cursor: "pointer" }}>
      {children?.toString().toLowerCase() !== "" && (
        <span>{message !== undefined ? message : children}</span>
      )}
    </span>
  );
};

export default CopyText;
