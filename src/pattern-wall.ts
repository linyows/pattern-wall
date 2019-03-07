export interface IPosition {
  x: number,
  y: number
}

export interface IImage {
  name: string,
  position: IPosition
}

export interface IOptions {
  width?: number,
  height?: number,
  size?: number,
  ratio?: number,
}

export default class PatternWall {
  private static random(max: number): number {
    /* tslint:disable-next-line */
    return Math.floor(Math.random() * max)
  }

  private static width(): number {
    if (typeof document !== 'undefined' && document.body !== undefined && document.body.clientWidth !== undefined) {
      return document.body.clientWidth
    }

    return 0
  }

  private static height(): number {
    if (typeof document !== 'undefined' && document.body !== undefined && document.body.clientHeight !== undefined) {
      return document.body.clientHeight
    }

    return 0
  }

  private readonly size: number
  private readonly ratio: number
  private readonly names: string[]
  private readonly width: number
  private readonly height: number
  private images: IImage[]

  public constructor(names: string[], opts?: IOptions) {
    const defaultSize = 200
    const defaultRatio = 0.3
    this.names = names
    this.width = (opts === undefined || opts.width === undefined) ? PatternWall.width() : opts.width
    this.height = (opts === undefined || opts.height === undefined) ? PatternWall.height() : opts.height
    this.size = (opts === undefined || opts.size === undefined) ? defaultSize : opts.size
    this.ratio = (opts === undefined || opts.ratio === undefined) ? defaultRatio : opts.ratio
    this.images = []
  }

  public isOverlay(x: number, y: number): boolean {
    for (const i of this.images) {
      const tx = i.position.x
      const ty = i.position.y
      const txe = i.position.x + this.size
      const tye = i.position.y + this.size

      const xe = x + this.size
      const ye = y + this.size

      const isOverX = (tx <= x && x <= txe) || (tx <= xe && xe <= txe)
      const isOverY = (ty <= y && y <= tye) || (ty <= ye && ye <= tye)

      if (isOverX && isOverY) {
        return true
      }
    }

    return false
  }

  public findNameUniformly(): string {
    let name = this.names[PatternWall.random(this.names.length)]
    const counter = []

    for (const n of this.names) {
      counter.push({ name: n, num: 0 })
    }

    for (const n of this.images) {
      const i = counter.findIndex((o) => {
        return o.name === n.name
      })
      counter[i].num = counter[i].num + 1
    }

    counter.sort((a, b) => {
      if (a.num === b.num) {
        return 0
      }

      return a.num > b.num ? -1 : 1
    })

    const first = counter[0]
    const last = counter[counter.length - 1]
    if (first.num > 0 && (first.name === name || first.num - last.num > 0)) {
      name = last.name
    }

    return name
  }

  public position() {
    let x = PatternWall.random(this.width)
    let y = PatternWall.random(this.height)

    const limit = 1000
    let count = 0

    while (count < limit) {
      if (!this.isOverlay(x, y)) {
        break
      }
      x = PatternWall.random(this.width)
      y = PatternWall.random(this.height)
      count = count + 1
    }

    return { x, y }
  }

  public generate(): IImage[] {
    const w = this.width - this.size
    const h = this.height - this.size
    const area = w * h
    const baseArea = this.size * this.size
    const num = Math.floor(area / baseArea * this.ratio)

    while (this.images.length < num) {
      const po = this.position()
      const x = po.x
      const y = po.y

      this.images.push({
        name: this.findNameUniformly(),
        position: { x, y },
      })
    }

    return this.images
  }
}
