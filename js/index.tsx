import React from "react";
import ReactDom from "react-dom";

import { Shell, Module, viewport } from "common";

import "../assets/styles.global.css";

import datarc from "../datarc.examples";
import icon from "../assets/icon.svg";

import EditForm from "./edit";

import MainView from "./views/main";
//import EventsView from './views/events';

export default class ExamplesModule extends Module {
  icon = icon;
  datarc = datarc;

  autoItemSelect = true;

  emptyViewport = viewport.placeholderFor(this);
  viewportRenderer = MainView;
  editForm = EditForm;

  constructor(shell: Shell, name: string) {
    super(shell, name);

    this.viewConfig.pages = false;
    this.viewConfig.stylesVersion = "v3";
    this.viewConfig.gridVersion = "v3";
  }

  async mount() {
    super.mount();

    const x0 = this.view.addEmptyViewport('events');
    const x1 = ReactDom.render(<EventsView module={this} />, x0.getNode());
  }
}
