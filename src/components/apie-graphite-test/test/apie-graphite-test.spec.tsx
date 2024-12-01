import { newSpecPage } from '@stencil/core/testing';
import { ApieGraphiteTest } from '../apie-graphite-test';

describe('apie-graphite-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApieGraphiteTest],
      html: `<apie-graphite-test></apie-graphite-test>`,
    });
    expect(page.root).toEqualHtml(`
      <apie-graphite-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </apie-graphite-test>
    `);
  });
});
