import React from "react";

import GridLayout from "react-grid-layout";

import { i18n, autobind, only } from "util";
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
    if (item?.layout?.length) {
      layout = item.layout;
    }
    this.setState({ selected: item, layout });
  }

  async onLayoutChange(layout) {
    const item = this.state.selected;
    if (item?._fresh) {
      return;
    }
    
    layout = (layout || []).map((item) => only(item, Object.keys(defaultLayout()[0])));

    if (item) {
      this.props.module.save(item, { layout });
    }
    this.setState({ layout });
  }

  createElement(el) {
    const i = el.i;
    return (
      <div key={i} className={styles.card}>
        <span>{i}</span>
        <Button className={styles.close} onClick={() => this.removeItem(el)}>
          <Icon name="closethin" />
        </Button>
      </div>
    );
  }

  addItem() {
    let maxId = Math.max(...this.state.layout.map((x) => parseInt(x.i)));
    if (!isFinite(maxId)) {
      maxId = 0;
    }
    const layout = [
      ...this.state.layout,
      {
        i: (maxId + 1).toString(),
        x: this.state.layout.length % 10,
        y: Infinity,
        w: 1,
        h: 1,
      },
    ];
    this.setState({ layout });
  }

  removeItem(el) {
    this.setState({
      layout: [...this.state.layout.filter((x) => x.i !== el.i)],
    });
  }

  render() {
    if (!this.state.selected) {
      return <Spinner/>
    }
    return (
      <div>
        <Toolbar>
          <Button
            onClick={this.addItem}
            icon={<Icon name="add" />}
            labelText={i18n.msg("item")}
            title={`${i18n.msg("item")}`}
          />
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
