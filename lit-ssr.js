import { html } from 'lit';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import './greeting.js';

const greetingResult = html`
  <simple-greeting></simple-greeting>
  <simple-greeting name="SSR"></simple-greeting>
`;
const greetingHtml = await collectResult(render(greetingResult));

console.log({ greetingHtml });