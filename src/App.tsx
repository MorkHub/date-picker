import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import CopyText from "./components/CopyText";
import "./App.css";

const locale = window.navigator.language.toLocaleLowerCase();
import (`moment/locale/${locale}`);
moment.locale(locale);

function App() {
  const [date, setDatetime] = useState(moment());
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    if (autoUpdate) {
        const timer = setInterval(() => {
          setDatetime(moment());
        }, 1000);

        return () => {
          clearInterval(timer);
        };
    }

  }, [autoUpdate]);

  let timestamp = date.format("X");

  const formats = [
    [date.format("L"),`<t:${timestamp}:d>`],
    [date.format("LL"),`<t:${timestamp}:D>`],
    [date.format("LLL"),`<t:${timestamp}:f>`],
    [date.format("LLLL"),`<t:${timestamp}:F>`],
    [date.fromNow(),`<t:${timestamp}:R>`],
    [date.format("LTS"),`<t:${timestamp}:T>`],
    [date.format("LT"),`<t:${timestamp}:t>`],
  ];

  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== undefined) {
          setAutoUpdate(false);
          setDateInput(event.target.value);
          setDatetime(moment(event.target.value));
      }
  }

  const handleReset = () => {
    setDateInput("");
    setAutoUpdate(true);
    setDatetime(moment());
  }

  let id = 0;

  return (
    <div className="App">
      <header className="App-header">

        <input type="datetime-local" onChange={handleChange} value={dateInput}/>
        <button type="reset" onClick={handleReset}>x</button>

        {formats.map(([formatted, discordString]) => (
          <time dateTime={date.format()} key={id++}><CopyText data={discordString}>{formatted}</CopyText></time>
        ))}
      </header>
    </div>
  );
}

export default App;
