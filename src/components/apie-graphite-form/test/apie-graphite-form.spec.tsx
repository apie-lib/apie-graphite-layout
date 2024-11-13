import { newSpecPage } from '@stencil/core/testing';
import { ApieGraphiteForm } from '../apie-graphite-form';

describe('apie-graphite-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApieGraphiteForm],
      html: `<apie-graphite-form></apie-graphite-form>`,
    });
    expect(page.root).toEqualHtml(`
      <apie-graphite-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </apie-graphite-form>
    `);
  });
});
