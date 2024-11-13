import { newSpecPage } from '@stencil/core/testing';
import { ApieGraphiteValidationError } from '../apie-graphite-validation-error';

describe('apie-graphite-validation-error', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApieGraphiteValidationError],
      html: `<apie-graphite-validation-error></apie-graphite-validation-error>`,
    });
    expect(page.root).toEqualHtml(`
      <apie-graphite-validation-error>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </apie-graphite-validation-error>
    `);
  });
});
