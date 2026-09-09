import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {APPS} from './catalog.js';
test('seven unique clinical applications, explicit HTTPS destinations and existing icons',()=>{
  assert.equal(APPS.length,7);assert.equal(new Set(APPS.map(a=>a.key)).size,7);
  for (const app of APPS) {
    const url=new URL(app.url);assert.equal(url.protocol,'https:');assert.equal(url.hostname.endsWith('.vercel.app'),true);
    assert.ok(fs.existsSync(new URL('../public'+app.icon,import.meta.url)),app.icon);
  }
});
