import { ReactText, useState } from "react";

interface ICopyTextProps {
  data?: String;
  children?: ReactText;
}

const CopyText = ({ data, children }: ICopyTextProps) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  let finalData = (data ?? children ?? "").toString();

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(finalData);
      setMessage("Copied...");
      setInterval(() => setMessage(undefined), 1000);
    } catch (err) {
      console.error(err);
      prompt("Could not copy to clipboard. Copy this text:", finalData);
    }
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
