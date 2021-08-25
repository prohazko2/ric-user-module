import React from "react";
import ReactDom from "react-dom";

import { Shell, Module, viewport } from "common";

import "../assets/styles.global.css";
import icon from "../assets/icon.svg";

import EditForm from "./edit";

import MainView from "../10-main";
import TopView from "../20-top";
import ApiView from "../30-api";

import InjectPage from "../40-inject/page";
import InjectView from "../40-inject/view";

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

  addExampleApp(name: string, component: JSX.Element) {
    const view = this.view.addEmptyViewport(name);
    return ReactDom.render(component, view.getNode());
  }

  async mount() {
    super.mount();

    this.addExampleApp("10-main", <MainView module={this} />);
    this.addExampleApp("20-top ", <TopView module={this} />);
    this.addExampleApp("30-api ", <ApiView />);

    /* select main as default module viewport */
    this.viewport = this.view.viewports.find(({ name }) => name === "10-main");

    /* 40-inject */
    const dep = await this.shell.waitFor("objects");
    if (dep) {
      /* 40-inject: add custom service page to objects module */
      dep.addService("examples", InjectPage);
      /* 40-inject: add custom viewport to objects module */
      dep.view.addViewport(new InjectView(this));
    }
  }
}
