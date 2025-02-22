# bun-node-compat-tests

Compatibility testing for various NodeJS and npm use cases

## Setup

1. Have latest Bun 1.x installed
1. Have latest NodeJS LTS installed
1. Clone the repo

- For Bun testing, run `bun i`
- For Node testing, run `npm ci`

> Make sure to delete / regenerate _node_modules_ in between testing different runtimes

## Demos

### node-html-parser

Run the demo:
- `$ bun node-html-parser.js`
- `$ node node-html-parser.js`

Observed in initial [Bun testing](https://github.com/ProjectEvergreen/greenwood/pull/1308) that this usage of [**node-html-parser**](https://github.com/taoqf/node-html-parser)

```js
import htmlparser from "node-html-parser";
```

Resulted in this error:

<details>
  <pre>
  TypeError: htmlparser.parse is not a function. (In 'htmlparser.parse(html, {
      script: !0,
      style: !0
    })', 'htmlparser.parse' is undefined)
        at /Users/owenbuckley/Workspace/github/greenwood-bun/node_modules/@greenwood/cli/src/lib/resource-utils.js:116:27
        at trackResourcesForRoute (/Users/owenbuckley/Workspace/github/greenwood-bun/node_modules/@greenwood/cli/src/lib/resource-utils.js:114:39)
        at /Users/owenbuckley/Workspace/github/greenwood-bun/node_modules/@greenwood/cli/src/lifecycles/prerender.js:168:11
  </pre>
</details>

However, Greenwood is using an old version of that library, and that if we used the current version as installed in this project, this usage works in both runtimes as copy-pasted from their docs

```js
import { parse } from "node-html-parser";
```

---

Interim solution until we upgrade is to use this
```js
import * as htmlparser from "node-html-parser";
```