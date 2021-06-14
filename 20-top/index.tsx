import React from "react";
import { observer } from "mobx-react";

import { i18n, socket } from "util";
import { Table } from "ui";

import { Counter } from "./store";

const counter = new Counter();

export default observer(
  class extends React.Component {
    componentDidMount() {
      socket.on("object-packet", counter.mark);
    }

    getColumns() {
      return {
        name: { width: 170 },
        total: { width: 60 },
        last: { width: 220, title: i18n.msg("Last message") },
      };
    }

    render() {
      return (
        <Table 
          indexColumn 
          columns={this.getColumns()} 
          rows={counter.top20}
        />
      );
    }
  }
);
