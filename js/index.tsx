import React from "react";
import ReactDom from "react-dom";

import { Shell, Module, viewport } from "common";

import "../assets/styles.global.css";
import icon from "../assets/icon.svg";

import EditForm from "./edit";

import MainView from "./views/main";
//import EventsView from './views/events';

export default class ExamplesModule extends Module {
  icon = icon;

  editForm = EditForm;
  autoItemSelect = true;
  emptyViewport = viewport.placeholderFor(this);

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

    this.addExampleApp("main", <MainView module={this} />);
  }
}
