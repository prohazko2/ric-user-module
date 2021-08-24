import React from "react";

import GridLayout from "react-grid-layout";

import { Base } from "@rightech/api";

import { only, i18n, autobind } from "util";
import { Icon, Toolbar, Button } from "ui";

import styles from "./styles.css";

export type LayoutElement = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Layout = LayoutElement[];

export const defaultLayout = () =>
  [
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 1, y: 0, w: 1, h: 1 },
  ] as Layout;

export type EditorProps = {
  item: Base & { layout: Layout };
  onChange: (layout: Layout) => void;
};

export type EditorState = {
  itemId: string;
  layout: Layout;
};

@autobind
export class Editor extends React.Component<EditorProps, EditorState> {
  state = {
    itemId: this.props.item?._id ?? "",
    layout: this.props.item?.layout ?? defaultLayout(),
  };

  static getDerivedStateFromProps(
    nextProps: EditorProps,
    prevState: EditorState
  ) {
    if (nextProps.item._id !== prevState.itemId) {
      return {
        itemId: nextProps.item._id,
        layout: nextProps.item.layout ?? defaultLayout(),
      };
    }
    return null;
  }

  onLayoutChange(layout: Layout) {
    const layoutKeys = Object.keys(defaultLayout()[0]);

    layout = (layout || []).map((item) => only(item, layoutKeys));

    if (this.props.onChange) {
      this.props.onChange(layout);
    }

    this.setState({ layout });
  }

  createElement(el: LayoutElement) {
    const i = el.i;
    return (
      <div key={i} className={styles.card}>
        <span>{i}</span>
        <Button className={styles.close} onClick={() => this.removeElement(el)}>
          <Icon name="closethin" />
        </Button>
      </div>
    );
  }

  addElement() {
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

  removeElement(el: LayoutElement) {
    this.setState({
      layout: [...this.state.layout.filter((x) => x.i !== el.i)],
    });
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar>
          <Button
            onClick={this.addElement}
            icon={<Icon name="add" />}
            labelText={i18n.msg("item")}
            title={i18n.msg("item")}
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
      </React.Fragment>
    );
  }
}
