import $ from "jquery";
import { Viewport } from "common";

import template from "../templates/client-view.jade";

export default class extends Viewport {
  name = "examples";

  constructor(module) {
    super(module.shell.e.viewport, template);
    this.module = module;

    this.init();
  }

  init() {
    const span = $(this.container).find("#ric-examples-counter");
    let counter = 0;

    $(this.container)
      .find("#ric-examples-click")
      .on("click", () => {
        span.text(++counter);
      });
  }
}
