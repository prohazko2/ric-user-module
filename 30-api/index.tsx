import React from "react";

import { i18n, store, user, autobind, api, nanoid, format } from "util";
import { Text, Dot, Button, Spinner } from "ui";

import styles from "./styles.css";

type LogLine = {
  ts: Date;
  id: string;
  ok: Boolean;
  message: string;
};

function LogLine(line: LogLine) {
  const status = line.ok ? <Dot green /> : <Dot red />;

  return (
    <div id={line.id} className={styles.line}>
      <div>{status}</div>
      <div>{format.time(line.ts)}</div>
      <div>{line.message}</div>
    </div>
  );
}

@autobind
export default class extends React.Component {
  state = {
    sending: false,
    name: user?.session?.name ?? "username",
    logs: [] as LogLine[],
  };

  onKeyDown(event) {
    if (event.key === "Enter") {
      this.onSend();
    }
  }

  onNameChange(name) {
    this.setState({ name });
  }

  lineFromResp(text: string) {
    return { ts: new Date(), ok: true, id: nanoid(10), message: text };
  }

  async onSend() {
    const { name, logs } = this.state;
    this.setState({ sending: true });

    try {
      const { text } = await api.get(`examples/hello/${name}`);
      this.setState({
        sending: false,
        logs: [...logs, this.lineFromResp(text)],
        name: "",
      });
    } catch (err) {
      err._handled = true;
      const line = { ...this.lineFromResp(err.message), ok: false };
      this.setState({
        sending: false,
        logs: [...logs, line],
      });
    }
  }

  render() {
    const { name, logs, sending } = this.state;

    return (
      <div className={styles.viewport}>
        <Text
          placeholder="Type here ..."
          value={name}
          onKeyDown={this.onKeyDown}
          onChange={this.onNameChange}
        />

        {sending ? (
          <Spinner text="Send ..." />
        ) : (
          <Button of="primary" onClick={this.onSend}>
            {i18n.msg("Send")}
          </Button>
        )}

        <div className={styles.logs}>
          {logs.map((line) => (
            <LogLine {...line} />
          ))}
        </div>
      </div>
    );
  }
}
