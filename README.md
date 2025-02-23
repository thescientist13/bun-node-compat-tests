# bun-node-compat-tests

Compatibility testing for various NodeJS and npm use cases

## Setup

1. Have latest Bun 1.x installed
1. Have latest NodeJS LTS installed (or run `nvm use`)
1. Clone the repo

- For Bun testing, run `bun i`
- For Node testing, run `npm ci`

> Make sure to delete / regenerate _node_modules_ in between testing different runtimes

## Demos

### ✅ node-html-parser

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

### ✅ Lit SSR

> Note: cannot reproduce anymore!

Run the demo:

- `$ bun lit-ssr.js`
- `$ node lit-ssr.js`

Observed in initial [Bun testing](https://github.com/thescientist13/greenwood-lit-ssr/pull/31) that Lit SSR was failing.

<details>
  <pre>
  ➜  greenwood-lit-ssr git:(main) ✗ bun run --bun build 
      $ greenwood build
      -------------------------------------------------------
      Welcome to Greenwood (v0.31.1) ♻️
      -------------------------------------------------------
      Initializing project config
      Initializing project workspace contexts
      Generating graph of workspace files...
      building from local sources...
      200 |   #onClose(e) {
      201 |     this.#onExitPromise = e.code, this.emit("exit", e.code);
      202 |   }
      203 |   #onError(event) {
      204 |     let error = event?.error;
      205 |       error = new Error(event.message, { cause: event });
                          ^
      error: 1 | /**
      2 |  * @license
      3 |  * Copyright 2017 Google LLC
      4 |  * SPDX-License-Identifier: BSD-3-Clause
      5 |  */
      6 | const t=globalThis,i=t.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+h,n=`<${o}>`,r=void 0===t.document?{createTreeWalker:()=>({})}:document,l=()=>r.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=y(2),b=y(3),w=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"":3===i?"":"",c=f;for(let i=0;i TypeError: r.createTreeWalker is not a function. (In 'r.createTreeWalker(r, 129)', 'r.createTreeWalker' is undefined)
        at /Users/owenbuckley/Workspace/github/greenwood-lit-ssr/node_modules/lit-html/node/lit-html.js:6:750

        at #onError (node:worker_threads:205:15)

  Bun v1.2.2 (macOS arm64)
  error: script "build" exited with code 1
  </pre>
</details>


### ⚠️ Apollo GraphQL Server (Playground)

> Looks like this can be resolved by upgrading to [@apollo/server v4](https://www.npmjs.com/package/@apollo/server)
> Run `bun graphql-server-upgrade.js`

1. Run the demo:
    - `$ bun graphql-server.js`
    - `$ node graphql-server.js`
1. Then open `http://localhost:4000` (or just wait a few moments with the terminal open)

Observed in initial [Bun testing](https://github.com/ProjectEvergreen/greenwood/pull/1308) that the Apollo GraphqQL Server would throw this error:

<details>
  <pre>
  GraphQLServer started at http://localhost:4000/
30 |         }
31 |         var connectionHandler = (function (socket, request) {
32 |             socket.upgradeReq = request;
33 |             if (socket.protocol === undefined ||
34 |                 (socket.protocol.indexOf(protocol_1.GRAPHQL_WS) === -1 && socket.protocol.indexOf(protocol_1.GRAPHQL_SUBSCRIPTIONS) === -1)) {
35 |                 socket.close(1002);
                            ^
TypeError: socket.close is not a function. (In 'socket.close(1002)', 'socket.close' is undefined)
      at connectionHandler (/Users/owenbuckley/Workspace/github/bun-node-compat-tests/node_modules/subscriptions-transport-ws/dist/server.js:35:24)
      at emit (node:events:87:22)
      at fetch (node:http:395:86)
GET - / failed
30 |         }
31 |         var connectionHandler = (function (socket, request) {
32 |             socket.upgradeReq = request;
33 |             if (socket.protocol === undefined ||
34 |                 (socket.protocol.indexOf(protocol_1.GRAPHQL_WS) === -1 && socket.protocol.indexOf(protocol_1.GRAPHQL_SUBSCRIPTIONS) === -1)) {
35 |                 socket.close(1002);
                            ^
TypeError: socket.close is not a function. (In 'socket.close(1002)', 'socket.close' is undefined)
      at connectionHandler (/Users/owenbuckley/Workspace/github/bun-node-compat-tests/node_modules/subscriptions-transport-ws/dist/server.js:35:24)
      at emit (node:events:87:22)
      at fetch (node:http:395:86)
  </pre>
</details>