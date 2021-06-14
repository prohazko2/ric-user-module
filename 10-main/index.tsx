import React from "react";

import GridLayout from "react-grid-layout";

import { i18n, autobind, store } from "util";
import { Form, Field, Icon, Toolbar, Button, Spinner } from "ui";

import type ExamplesModule from "../js/index";

import styles from "./styles.css";

const defaultLayout = () => [
  { i: "0", x: 0, y: 0, w: 1, h: 1 },
  { i: "1", x: 1, y: 0, w: 1, h: 1 },
];

@autobind
export default class extends React.Component<{ module: ExamplesModule }> {
  state = {
    selected: null,
    layout: defaultLayout(),
  };

  componentDidMount() {
    this.props.module.when("select", this.onItemSelect);
    this.props.module.when("staged", this.onItemSelect);
  }

  onItemSelect(item) {
    let layout = defaultLayout();
    if (item.layout && item.layout.length) {
      layout = item.layout;
    }
    this.setState({ selected: item, layout });
  }

  async onLayoutChange(layout) {
    const item = this.state.selected;
    if (item) {
      this.props.module.save(item, { layout });
    }
  }

  createElement(el) {
    const i = el.i;
    return (
      <div key={i} className={styles.card}>
        <span>{i}</span>
      </div>
    );
  }

  addItem() {
    console.log("addItem");
  }

  render() {
    return (
      <div>
        <Toolbar>
          <Button
            onClick={this.addItem}
            // disabled={loading}
            icon={<Icon name="add" />}
            labelText={i18n.msg("item")}
            title={`${i18n.msg("item")}`}
          />
          {/* {loading && <Spinner text={statusText} />} */}
        </Toolbar>
        <GridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          cols={10}
          rowHeight={90}
          width={10 * 100}
        >
          {this.state.layout.map(this.createElement)}
        </GridLayout>
      </div>
    );
  }
}
