import test from 'ava'
import PatternWall from './pattern-wall'

test('.constructor returns instance of PatternWall', async (t) => {
  const names = ['foo','bar', 'baz']
  const p = new PatternWall(names)
  t.true(p instanceof PatternWall)
})

test('.constructor receives options as an arg', async (t) => {
  const width = 1000
  const height = 1000
  const names = ['foo','bar', 'baz']
  const p = new PatternWall(names, { width, height })
  t.true(p instanceof PatternWall)
})

test('.generate returns image number correctly', async (t) => {
  const table = [
    { w: 1000, h: 1000, s: 200, r: 0.3, l: 4 },
    { w: 2000, h: 2000, s: 200, r: 0.3, l: 24 },
    { w: 1000, h: 1000, s: 100, r: 0.3, l: 24 },
    { w: 1000, h: 1000, s: 100, r: 0.5, l: 40 }
  ]
  const names = ['foo', 'bar', 'baz']

  for (const row of table) {
    const p = new PatternWall(names, {
      width: row.w,
      height: row.h,
      size: row.s,
      ratio: row.r
    })
    const r = p.generate()
    t.is(r.length, row.l)
  }
})

test('.generate returns names uniformly', async (t) => {
  const format = {
    width: 1000,
    height: 1000,
    size: 200,
    ratio: 0.3
  }
  let data = []

  const p1 = new PatternWall(['foo', 'bar'], format)
  const r1 = p1.generate()
  for (const rr1 of r1) {
    const found = data.find((v) => {
      return v === rr1.name
    })
    if (typeof found === 'undefined') {
      data.push(rr1.name)
    }
  }
  t.is(data.length, 2)

  const p2 = new PatternWall(['foo', 'bar', 'baz', 'qux'], format)
  const r2 = p2.generate()
  data = []
  for (const rr2 of r2) {
    const found = data.find((v) => {
      return v === rr2.name
    })
    if (typeof found === 'undefined') {
      data.push(rr2.name)
    }
  }
  t.is(data.length, 4)
})

test('.generate returns names uniformly on many pattern', async (t) => {
  const format = {
    width: 2000,
    height: 2000,
    size: 10,
    ratio: 0.3
  }
  const names = ['foo', 'bar', 'baz', 'qux']

  const p1 = new PatternWall(names, format)
  const r1 = p1.generate()
  const counter = []
  for (const n of names) {
    counter.push({ name: n, num: 0 })
  }
  for (const n of r1) {
    const i = counter.findIndex((o) => {
      return o.name === n.name
    })
    counter[i].num = counter[i].num + 1
  }

  for (const n of counter) {
    t.is(n.num, 2970)
  }
})
