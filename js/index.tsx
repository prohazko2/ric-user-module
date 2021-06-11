import React from "react";
import ReactDom from "react-dom";

import { Shell, Module, viewport } from "common";

import "../assets/styles.global.css";
import icon from "../assets/icon.svg";

import EditForm from "./edit";

import MainView from "../10-main";
import TopView from "../20-top";
import GrpcView from "../30-grpc";

export default class ExamplesModule extends Module {
  icon = icon;

  editForm = EditForm;
  emptyViewport = viewport.placeholderFor(this);
  autoItemSelect = true;

  constructor(shell: Shell, name: string) {
    super(shell, name);

    this.viewConfig.pages = false;
    this.viewConfig.stylesVersion = "v3";
    this.viewConfig.gridVersion = "v3";
  }

  addExampleApp(name: string, component: any) {
    const view = this.view.addEmptyViewport(name);
    return ReactDom.render(component, view.getNode());
  }

  async mount() {
    super.mount();

    this.addExampleApp("10-main", <MainView module={this} />);
    this.addExampleApp("20-top ", <TopView module={this} />);
    this.addExampleApp("30-grpc", <GrpcView module={this} />);
  }
}
