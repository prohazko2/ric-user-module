import React from "react";
import { observer } from "mobx-react";

import { i18n, socket, format, user, safe, since } from "util";
import { Table, Button, Icon } from "ui";

import { Counter } from "./store";
import styles from "./styles.css";

const counter = new Counter();

const gotoItem = (id: string) => {
  const target = safe.module("objects");
  target.shell.activate(target);
  target.selectItem(id);
};

export default observer(
  class extends React.Component {
    componentDidMount() {
      socket.on("object-packet", counter.mark);
    }

    getColumns() {
      return {
        name: { width: 170 },
        total: { width: 60 },
        last: { width: 220, title: i18n.msg("Last message") }
      };
    }

    getRows() {
      return counter.top20.map((row) => ({
        ...row,
        last: `${format.dateTime(row.last)}: ${since(row.last, user.langShort)}`,
        name: (
          <div>
            <Button onClick={() => gotoItem(row._oid)} className={styles.link}>
              <Icon name="link" />
            </Button>
            <span className={styles.linkValue}>{row.name}</span>
          </div>
        )
      }));
    }

    render() {
      return (
        <Table
          indexColumn
          onRowSelect={(row) => console.log(row)}
          columns={this.getColumns()}
          rows={this.getRows()}
        />
      );
    }
  }
);
