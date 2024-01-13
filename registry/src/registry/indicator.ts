export class Indicator {
  private _group: string
  private _worker: string

  constructor(_protocol: string, _kind: string) {
    this._group = _protocol
    this._worker = _kind
  }

  get protocol() {
    return this._group
  }

  get kind() {
    return this._worker
  }

  get() {
    return { protocol: this.protocol, kind: this.kind }
  }

  static parse(_params: string) {
    const [ group, worker ] = _params.split(':')
    return new Indicator(group, worker)
  }

  toString() {
    return `${this._group}:${this._worker}`
  }
}