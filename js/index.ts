import { Shell, Module } from 'common';

export default class LabelsModule extends Module {
  //icon = icon;

  constructor(shell: Shell, name: string) {
    super(shell, name);

    this.viewConfig.stylesVersion = 'v3';
    this.viewConfig.gridVersion = 'v3';
  }
}
