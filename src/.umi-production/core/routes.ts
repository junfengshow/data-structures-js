// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/admin/wujunfeng/codes/frontend/github/data-structures-js/node_modules/_@umijs_runtime@3.5.36@@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/admin/wujunfeng/codes/frontend/github/data-structures-js/node_modules/_@umijs_preset-dumi@1.1.50@@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/admin/wujunfeng/codes/frontend/github/data-structures-js/node_modules/_dumi-theme-default@1.1.24@dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/en-US",
        "component": require('../../../docs/index.en-US.md').default,
        "exact": true,
        "meta": {
          "locale": "en-US",
          "title": "Index"
        },
        "title": "Index - 算法与数据结构"
      },
      {
        "path": "/",
        "component": require('../../../docs/index.md').default,
        "exact": true,
        "meta": {
          "title": "Index"
        },
        "title": "Index - 算法与数据结构"
      },
      {
        "path": "/calculation/complexity",
        "component": require('../../../docs/calculation/complexity.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/calculation",
            "title": "Calculation"
          },
          "title": "Complexity"
        },
        "title": "Complexity - 算法与数据结构"
      },
      {
        "path": "/calculation",
        "component": require('../../../docs/calculation/index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/calculation",
            "title": "Calculation"
          },
          "title": "Calculation"
        },
        "title": "Calculation - 算法与数据结构"
      },
      {
        "path": "/calculation/mode",
        "component": require('../../../docs/calculation/mode.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/calculation",
            "title": "Calculation"
          },
          "title": "Mode"
        },
        "title": "Mode - 算法与数据结构"
      },
      {
        "path": "/calculation/search",
        "component": require('../../../docs/calculation/search.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/calculation",
            "title": "Calculation"
          },
          "title": "Search"
        },
        "title": "Search - 算法与数据结构"
      },
      {
        "path": "/calculation/sort",
        "component": require('../../../docs/calculation/sort.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/calculation",
            "title": "Calculation"
          },
          "title": "Sort"
        },
        "title": "Sort - 算法与数据结构"
      },
      {
        "path": "/foundation",
        "component": require('../../../docs/foundation/index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "title": "Foundation"
        },
        "title": "Foundation - 算法与数据结构"
      },
      {
        "path": "/foundation/queue",
        "component": require('../../../docs/foundation/queue.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "title": "Queue"
        },
        "title": "Queue - 算法与数据结构"
      },
      {
        "path": "/foundation/stack",
        "component": require('../../../docs/foundation/stack.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "title": "Stack"
        },
        "title": "Stack - 算法与数据结构"
      },
      {
        "path": "/foundation/linked-list/list-0-index",
        "component": require('../../../docs/foundation/linked-list/list-0-index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-0-index"
        },
        "title": "List-0-index - 算法与数据结构"
      },
      {
        "path": "/foundation/linked-list/list-1-single",
        "component": require('../../../docs/foundation/linked-list/list-1-single.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-1-single"
        },
        "title": "List-1-single - 算法与数据结构"
      },
      {
        "path": "/foundation/linked-list/list-2-doubly",
        "component": require('../../../docs/foundation/linked-list/list-2-doubly.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-2-doubly"
        },
        "title": "List-2-doubly - 算法与数据结构"
      },
      {
        "path": "/foundation/linked-list/list-3-circular",
        "component": require('../../../docs/foundation/linked-list/list-3-circular.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-3-circular"
        },
        "title": "List-3-circular - 算法与数据结构"
      },
      {
        "path": "/foundation/linked-list/list-9-usage1",
        "component": require('../../../docs/foundation/linked-list/list-9-usage1.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-9-usage1"
        },
        "title": "List-9-usage1 - 算法与数据结构"
      },
      {
        "path": "/foundation/linked-list/list-99-summary",
        "component": require('../../../docs/foundation/linked-list/list-99-summary.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-99-summary"
        },
        "title": "List-99-summary - 算法与数据结构"
      },
      {
        "path": "/foundation/map/map-0-index",
        "component": require('../../../docs/foundation/map/map-0-index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/map",
            "title": "Map"
          },
          "title": "Map-0-index"
        },
        "title": "Map-0-index - 算法与数据结构"
      },
      {
        "path": "/foundation/map/map-1-impl",
        "component": require('../../../docs/foundation/map/map-1-impl.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/map",
            "title": "Map"
          },
          "title": "Map-1-impl"
        },
        "title": "Map-1-impl - 算法与数据结构"
      },
      {
        "path": "/foundation/map/map-2-hash",
        "component": require('../../../docs/foundation/map/map-2-hash.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/map",
            "title": "Map"
          },
          "title": "Map-2-hash"
        },
        "title": "Map-2-hash - 算法与数据结构"
      },
      {
        "path": "/foundation/set/set-0-index",
        "component": require('../../../docs/foundation/set/set-0-index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/set",
            "title": "Set"
          },
          "title": "Set-0-index"
        },
        "title": "Set-0-index - 算法与数据结构"
      },
      {
        "path": "/foundation/set/set-1-impl",
        "component": require('../../../docs/foundation/set/set-1-impl.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/foundation/set",
            "title": "Set"
          },
          "title": "Set-1-impl"
        },
        "title": "Set-1-impl - 算法与数据结构"
      },
      {
        "path": "/tree-graph/graph-0",
        "component": require('../../../docs/tree-graph/graph-0.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Graph-0"
        },
        "title": "Graph-0 - 算法与数据结构"
      },
      {
        "path": "/tree-graph/graph-1",
        "component": require('../../../docs/tree-graph/graph-1.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Graph-1"
        },
        "title": "Graph-1 - 算法与数据结构"
      },
      {
        "path": "/tree-graph/graph-2",
        "component": require('../../../docs/tree-graph/graph-2.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Graph-2"
        },
        "title": "Graph-2 - 算法与数据结构"
      },
      {
        "path": "/tree-graph/graph-3",
        "component": require('../../../docs/tree-graph/graph-3.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Graph-3"
        },
        "title": "Graph-3 - 算法与数据结构"
      },
      {
        "path": "/tree-graph/tree-0-intro",
        "component": require('../../../docs/tree-graph/tree-0-intro.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Tree-0-intro"
        },
        "title": "Tree-0-intro - 算法与数据结构"
      },
      {
        "path": "/tree-graph/tree-1-binary",
        "component": require('../../../docs/tree-graph/tree-1-binary.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Tree-1-binary"
        },
        "title": "Tree-1-binary - 算法与数据结构"
      },
      {
        "path": "/tree-graph/tree-2-avl",
        "component": require('../../../docs/tree-graph/tree-2-AVL.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Tree-2-AVL"
        },
        "title": "Tree-2-AVL - 算法与数据结构"
      },
      {
        "path": "/tree-graph/tree-3-redblack",
        "component": require('../../../docs/tree-graph/tree-3-redblack.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Tree-3-redblack"
        },
        "title": "Tree-3-redblack - 算法与数据结构"
      },
      {
        "path": "/en-US/calculation/complexity",
        "component": require('../../../docs/calculation/complexity.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/calculation",
            "title": "Calculation"
          },
          "title": "Complexity",
          "locale": "en-US"
        },
        "title": "Complexity - 算法与数据结构"
      },
      {
        "path": "/en-US/calculation",
        "component": require('../../../docs/calculation/index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/calculation",
            "title": "Calculation"
          },
          "title": "Calculation",
          "locale": "en-US"
        },
        "title": "Calculation - 算法与数据结构"
      },
      {
        "path": "/en-US/calculation/mode",
        "component": require('../../../docs/calculation/mode.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/calculation",
            "title": "Calculation"
          },
          "title": "Mode",
          "locale": "en-US"
        },
        "title": "Mode - 算法与数据结构"
      },
      {
        "path": "/en-US/calculation/search",
        "component": require('../../../docs/calculation/search.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/calculation",
            "title": "Calculation"
          },
          "title": "Search",
          "locale": "en-US"
        },
        "title": "Search - 算法与数据结构"
      },
      {
        "path": "/en-US/calculation/sort",
        "component": require('../../../docs/calculation/sort.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/calculation",
            "title": "Calculation"
          },
          "title": "Sort",
          "locale": "en-US"
        },
        "title": "Sort - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation",
        "component": require('../../../docs/foundation/index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "title": "Foundation",
          "locale": "en-US"
        },
        "title": "Foundation - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/queue",
        "component": require('../../../docs/foundation/queue.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "title": "Queue",
          "locale": "en-US"
        },
        "title": "Queue - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/stack",
        "component": require('../../../docs/foundation/stack.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "title": "Stack",
          "locale": "en-US"
        },
        "title": "Stack - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/linked-list/list-0-index",
        "component": require('../../../docs/foundation/linked-list/list-0-index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-0-index",
          "locale": "en-US"
        },
        "title": "List-0-index - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/linked-list/list-1-single",
        "component": require('../../../docs/foundation/linked-list/list-1-single.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-1-single",
          "locale": "en-US"
        },
        "title": "List-1-single - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/linked-list/list-2-doubly",
        "component": require('../../../docs/foundation/linked-list/list-2-doubly.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-2-doubly",
          "locale": "en-US"
        },
        "title": "List-2-doubly - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/linked-list/list-3-circular",
        "component": require('../../../docs/foundation/linked-list/list-3-circular.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-3-circular",
          "locale": "en-US"
        },
        "title": "List-3-circular - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/linked-list/list-9-usage1",
        "component": require('../../../docs/foundation/linked-list/list-9-usage1.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-9-usage1",
          "locale": "en-US"
        },
        "title": "List-9-usage1 - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/linked-list/list-99-summary",
        "component": require('../../../docs/foundation/linked-list/list-99-summary.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/linked-list",
            "title": "Linked-list"
          },
          "title": "List-99-summary",
          "locale": "en-US"
        },
        "title": "List-99-summary - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/map/map-0-index",
        "component": require('../../../docs/foundation/map/map-0-index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/map",
            "title": "Map"
          },
          "title": "Map-0-index",
          "locale": "en-US"
        },
        "title": "Map-0-index - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/map/map-1-impl",
        "component": require('../../../docs/foundation/map/map-1-impl.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/map",
            "title": "Map"
          },
          "title": "Map-1-impl",
          "locale": "en-US"
        },
        "title": "Map-1-impl - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/map/map-2-hash",
        "component": require('../../../docs/foundation/map/map-2-hash.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/map",
            "title": "Map"
          },
          "title": "Map-2-hash",
          "locale": "en-US"
        },
        "title": "Map-2-hash - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/set/set-0-index",
        "component": require('../../../docs/foundation/set/set-0-index.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/set",
            "title": "Set"
          },
          "title": "Set-0-index",
          "locale": "en-US"
        },
        "title": "Set-0-index - 算法与数据结构"
      },
      {
        "path": "/en-US/foundation/set/set-1-impl",
        "component": require('../../../docs/foundation/set/set-1-impl.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/foundation",
            "title": "Foundation"
          },
          "group": {
            "path": "/en-US/foundation/set",
            "title": "Set"
          },
          "title": "Set-1-impl",
          "locale": "en-US"
        },
        "title": "Set-1-impl - 算法与数据结构"
      },
      {
        "path": "/en-US/tree-graph/graph-0",
        "component": require('../../../docs/tree-graph/graph-0.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Graph-0",
          "locale": "en-US"
        },
        "title": "Graph-0 - 算法与数据结构"
      },
      {
        "path": "/en-US/tree-graph/graph-1",
        "component": require('../../../docs/tree-graph/graph-1.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Graph-1",
          "locale": "en-US"
        },
        "title": "Graph-1 - 算法与数据结构"
      },
      {
        "path": "/en-US/tree-graph/graph-2",
        "component": require('../../../docs/tree-graph/graph-2.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Graph-2",
          "locale": "en-US"
        },
        "title": "Graph-2 - 算法与数据结构"
      },
      {
        "path": "/en-US/tree-graph/graph-3",
        "component": require('../../../docs/tree-graph/graph-3.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Graph-3",
          "locale": "en-US"
        },
        "title": "Graph-3 - 算法与数据结构"
      },
      {
        "path": "/en-US/tree-graph/tree-0-intro",
        "component": require('../../../docs/tree-graph/tree-0-intro.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Tree-0-intro",
          "locale": "en-US"
        },
        "title": "Tree-0-intro - 算法与数据结构"
      },
      {
        "path": "/en-US/tree-graph/tree-1-binary",
        "component": require('../../../docs/tree-graph/tree-1-binary.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Tree-1-binary",
          "locale": "en-US"
        },
        "title": "Tree-1-binary - 算法与数据结构"
      },
      {
        "path": "/en-US/tree-graph/tree-2-avl",
        "component": require('../../../docs/tree-graph/tree-2-AVL.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Tree-2-AVL",
          "locale": "en-US"
        },
        "title": "Tree-2-AVL - 算法与数据结构"
      },
      {
        "path": "/en-US/tree-graph/tree-3-redblack",
        "component": require('../../../docs/tree-graph/tree-3-redblack.md').default,
        "exact": true,
        "meta": {
          "nav": {
            "path": "/en-US/tree-graph",
            "title": "Tree-graph"
          },
          "title": "Tree-3-redblack",
          "locale": "en-US"
        },
        "title": "Tree-3-redblack - 算法与数据结构"
      },
      {
        "path": "/foundation/linked-list",
        "meta": {},
        "exact": true,
        "redirect": "/foundation/linked-list/list-0-index"
      },
      {
        "path": "/foundation/map",
        "meta": {},
        "exact": true,
        "redirect": "/foundation/map/map-0-index"
      },
      {
        "path": "/foundation/set",
        "meta": {},
        "exact": true,
        "redirect": "/foundation/set/set-0-index"
      },
      {
        "path": "/tree-graph",
        "meta": {},
        "exact": true,
        "redirect": "/tree-graph/graph-0"
      },
      {
        "path": "/en-US/foundation/linked-list",
        "meta": {},
        "exact": true,
        "redirect": "/en-US/foundation/linked-list/list-0-index"
      },
      {
        "path": "/en-US/foundation/map",
        "meta": {},
        "exact": true,
        "redirect": "/en-US/foundation/map/map-0-index"
      },
      {
        "path": "/en-US/foundation/set",
        "meta": {},
        "exact": true,
        "redirect": "/en-US/foundation/set/set-0-index"
      },
      {
        "path": "/en-US/tree-graph",
        "meta": {},
        "exact": true,
        "redirect": "/en-US/tree-graph/graph-0"
      }
    ],
    "title": "算法与数据结构",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
