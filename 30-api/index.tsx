import React from "react";

import { i18n, store, user, yaml, autobind, api, nanoid, format } from "util";
import { Text, Dot, Button, Spinner } from "ui";

import styles from "./styles.css";

type LogLine = {
  ts: Date;
  id: string;
  ok?: boolean;
  message: string;
};

function LogLine(line: LogLine) {
  const title = yaml.stringify(JSON.parse(line.message || "{}"));
  const status = line.ok === null 
    ? <Dot blue /> 
    : line.ok 
      ? <Dot green /> 
      : <Dot red />;

  return (
    <div id={line.id} className={styles.line} title={title}>
      <div>{status}</div>
      <div>{format.time(line.ts)}</div>
      <div>{line.message}</div>
    </div>
  );
}

function emptyLine(): LogLine {
  return { ts: new Date(), ok: null, id: nanoid(10), message: "" };
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

  async onSend() {
    const { name, logs, sending } = this.state;
    if (sending) {
      return;
    }

    const line = emptyLine();
    this.setState({ sending: true, logs: [...logs, line] });

    try {
      const resp = await api.get(`examples/hello/${name}`);
      line.message = JSON.stringify(resp);
      line.ok = true;
    } catch (err) {
      err._handled = true;
      line.message = JSON.stringify(err);
      line.ok = false;
    }

    this.setState({
      sending: false,
      logs: [...logs, line],
    });
  }

  render() {
    const { name, logs, sending } = this.state;

    return (
      <div className={styles.viewport}>
        <div className={styles.input}>
          <span className={styles.verb}>GET</span>
          <span className={styles.path}>/examples/hello/</span>
          <Text
            placeholder="Type here ..."
            value={name}
            onKeyDown={this.onKeyDown}
            onChange={this.onNameChange}
          />
        </div>

        {sending ? (
          <Spinner text="Send ..." />
        ) : (
          <Button of="primary" onClick={this.onSend}>
            {i18n.msg("Send")}
          </Button>
        )}

        <div className={styles.logs}>
          {!logs.length && <div>Press "Send" for API call</div>}

          {logs.map((line) => (
            <LogLine {...line} />
          ))}
        </div>
      </div>
    );
  }
}
