import { safe, format, user, since } from "util";
import { makeAutoObservable } from "mobx";

export type CounterStat = {
  _oid: string;
  total: number;
  last?: number;
  name?: string;
};

export type SocketPacket = {
  _oid: string;
  _ts: number;
};

export class Counter {
  stats: Record<string, CounterStat> = {};

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get top20() {
    return Object.values(this.stats)
      .sort((a, b) => b.total - a.total)
      .map((row) => ({
        ...row,
        last: `${format.dateTime(row.last)}: ${since(
          row.last,
          user.langShort
        )}`,
      }))
      .slice(0, 20);
  }

  mark(packet: SocketPacket) {
    const object = safe.module("objects")?.get(packet._oid);
    if (!object) {
      return;
    }

    if (!this.stats[packet._oid]) {
      this.stats[packet._oid] = {
        _oid: packet._oid,
        name: object.name,
        total: 0,
      };
    }
    this.stats[packet._oid].total++;
    this.stats[packet._oid].last = packet._ts / 1000;
  }
}
