import { Shell, Module, viewport } from 'common';

import datarc from '../datarc.examples';
import icon from '../assets/icon.svg';

import EditForm from './form';

export default class ExamplesModule extends Module {
  icon = icon;
  datarc = datarc;

  emptyViewport = viewport.placeholderFor(this);
  viewportRenderer = viewport.empty();

  editForm = EditForm;

  constructor(shell: Shell, name: string) {
    super(shell, name);

    this.viewConfig.pages = false;
    this.viewConfig.stylesVersion = 'v3';
    this.viewConfig.gridVersion = 'v3';
  }
}
