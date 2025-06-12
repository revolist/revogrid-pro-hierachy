import './style.css';
import 'virtual:uno.css'

import { defineCustomElements } from '@revolist/revogrid/loader';
defineCustomElements();
import '@revolist/revogrid-pro/dist/revogrid-pro.css';
import {
  RowOddPlugin,
  RowSelectPlugin,
  AdvanceFilterPlugin,
  RowOrderPlugin,
  TreeDataPlugin,
  badgeRenderer,
  ColumnStretchPlugin,
} from '@revolist/revogrid-pro';
import { makeData } from './makeData';


const grid = document.createElement('revo-grid');
grid.hideAttribution = true;
grid.theme = 'material';

grid.columns = [
  {
    name: 'Full Name',
    prop: 'fullName',
    size: 300,
    tree: true,
    rowSelect: true,
    rowDrag: true,
    sortable: true,
    filter: ['selection'],
    cellTemplate: (h, { value, model }) => [
      h('img', {
        key: model.id,
        class: 'rounded mx-2 self-center',
        src: model.avatar,
        width: 20,
        height: 20,
      }),
      value,
    ],
    cellProperties: ({ model }) => ({
      subRow: !!model.parentId,
    })
  },
  {
    name: 'Flag',
    prop: 'flag',
    size: 80,
    cellProperties: ({ model }) => ({
      subRow: !!model.parentId,
    })
  },
  {
    name: 'Job title',
    prop: 'position',
    size: 150,
    cellTemplate: badgeRenderer,
    rectangular: true,
    badgeStyles: {
      Designer: { backgroundColor: '#008620', color: '#fff' },
      Developer: { backgroundColor: '#008620', color: '#fff' },
      Strategist: { backgroundColor: '#008620', color: '#fff' },
      Producer: { backgroundColor: '#008620', color: '#fff' },
      Technician: { backgroundColor: '#ff9800', color: '#fff' },
      Administrator: { backgroundColor: '#0068ba', color: '#fff' },
      Agent: { backgroundColor: '#0068ba', color: '#fff' },
      Architect: { backgroundColor: '#0068ba', color: '#fff' },
      Analyst: { backgroundColor: '#0068ba', color: '#fff' },
      Officer: { backgroundColor: '#ff9800', color: '#fff' },
      Planner: { backgroundColor: '#0068ba', color: '#fff' },
      Representative: { backgroundColor: '#f44336', color: '#fff' },
    },
    cellProperties: ({ model }) => ({
      subRow: !!model.parentId,
    })
  },
  {
    name: 'Salary',
    prop: 'salary',
    size: 120,
    columnType: 'currency',
    cellProperties: ({ model }) => ({
      subRow: !!model.parentId,
    })
  },
];
grid.plugins = [
  TreeDataPlugin,
  RowOrderPlugin,
  AdvanceFilterPlugin,
  RowSelectPlugin,
  RowOddPlugin,
  ColumnStretchPlugin
];
const rows = makeData(20, 1, 1).flatMap((v) => [
  v,
  ...(v.subRows?.flatMap((v) => [
    v,
    ...(v.subRows?.flatMap((v) => [v]) || []),
  ]) || []),
]);
grid.source = rows;
grid.additionalData = {
  tree: {
    expandedRowIds: new Set([rows[0]?.id ?? '']),
  },
  stretch: 'last'
};

document.getElementById('app')?.appendChild(grid);