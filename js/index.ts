import { Shell, Module, viewport } from 'common';

export default class ExamplesModule extends Module {
  //icon = icon;
  emptyViewport = viewport.placeholderFor(this);
  viewportRenderer = viewport.empty();

  constructor(shell: Shell, name: string) {
    super(shell, name);

    this.viewConfig.pages = false;

    this.viewConfig.stylesVersion = 'v3';
    this.viewConfig.gridVersion = 'v3';
  }
}
