import React from "react";

import { Spinner } from "ui";

import type { Base } from "@rightech/api";
import type ExamplesModule from "../js/index";

import { Editor, Layout } from "./Editor";

export type Item = Base & { layout: Layout };

export type AppProps = {
  module: ExamplesModule;
};

export type AppState = {
  selected: Item;
};

export default class extends React.Component<AppProps, AppState> {
  componentDidMount() {
    this.props.module.when(["select", "staged"], (item: Item) =>
      this.setState({ selected: item })
    );
  }

  async onLayoutChange(layout: Layout) {
    const { module } = this.props;
    const { selected } = this.state;

    if (!selected || selected?._fresh) {
      return;
    }

    await module.save(selected, { layout });
  }

  render() {
    const { selected } = this.state || {};
    if (!selected) {
      return <Spinner />;
    }

    return (
      <Editor
        item={selected}
        onChange={(layout) => this.onLayoutChange(layout)}
      />
    );
  }
}
