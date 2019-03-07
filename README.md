pattern-wall
==

Generate positions for pattern in an area.


<a href="https://www.npmjs.com/package/pattern-wall" title="npm"><img src="http://img.shields.io/npm/v/pattern-wall.svg?style=for-the-badge"></a>
<a href="https://travis-ci.org/linyows/pattern-wall" title="travis"><img src="https://img.shields.io/travis/linyows/pattern-wall.svg?style=for-the-badge"></a>
<a href="https://codecov.io/gh/linyows/pattern-wall" title="codecov.io"><img src="https://img.shields.io/codecov/linyows/pattern-wall.svg?style=for-the-badge"></a>
<a href="https://github.com/linyows/pattern-wall/blob/master/LICENSE" title="MIT License"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge"></a>

Installation
--

```sh
$ npm install --save pattern-wall
```

Usage
--

```ts
import PatternWall from 'pattern-wall'

const names = ['foo', 'bar', 'baz', 'qux']
const width = 1000
const height = 1000

const pattern = new PatternWall(names, { width, height })
const result = pattern.generate()
console.log(result)

// [ { name: 'foo', position: { x: 775, y: 509 } },
//   { name: 'qux', position: { x: 633, y: 213 } },
//   { name: 'baz', position: { x: 323, y: 319 } },
//   { name: 'bar', position: { x: 515, y: 602 } } ]
```

Options
--

Option | Type   | Default
---    | ---    | ---
width  | number | document.body.clientWidth
height | number | document.body.clientHeight
size   | number | 200
ratio  | numer  | 0.3

Contribution
--

1. Fork (https://github.com/linyows/pattern-wall/fork)
1. Create a feature branch
1. Commit your changes
1. Rebase your local changes against the master branch
1. Run test suite with the `npm ci` command and confirm that it passes
1. Create a new Pull Request

Author
--

[linyows](https://github.com/linyows)
