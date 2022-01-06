import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';

import { buildMediaPlayerFixture } from '../../../media/test-utils';
import {
  TOGGLE_BUTTON_ELEMENT_TAG_NAME,
  ToggleButtonElement
} from '../ToggleButtonElement';

window.customElements.define(
  TOGGLE_BUTTON_ELEMENT_TAG_NAME,
  ToggleButtonElement
);

describe(TOGGLE_BUTTON_ELEMENT_TAG_NAME, function () {
  async function buildFixture() {
    const { player } = await buildMediaPlayerFixture(html`
      <vds-toggle-button>
        <div class="pressed"></div>
        <div class="not-pressed"></div>
      </vds-toggle-button>
    `);

    const toggle = player.querySelector(TOGGLE_BUTTON_ELEMENT_TAG_NAME)!;

    return { toggle };
  }

  test('it should render DOM correctly', async function () {
    const { toggle } = await buildFixture();
    expect(toggle).dom.to.equal(`
      <vds-toggle-button>
        <div class="pressed"></div>
        <div class="not-pressed"></div>
      </vds-toggle-button>
    `);
  });

  test('it should render shadow DOM correctly', async function () {
    const { toggle } = await buildFixture();
    expect(toggle).shadowDom.to.equal(`
      <button
        id="button"
        part="button"
        aria-pressed="false"
      >
        <slot></slot>
      </button>
    `);
  });

  test('it should toggle pressed state on click', async function () {
    const { toggle } = await buildFixture();

    toggle.click();
    await elementUpdated(toggle);

    expect(toggle).to.have.attribute('pressed');

    toggle.click();
    await elementUpdated(toggle);

    expect(toggle).to.not.have.attribute('pressed');
  });

  test('it should prevent clicking when disabled', async function () {
    const { toggle } = await buildFixture();

    toggle.disabled = true;
    toggle.click();

    await elementUpdated(toggle);

    expect(toggle).to.have.attribute('disabled');
    expect(toggle).to.not.have.attribute('pressed');
  });
});
