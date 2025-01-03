import { newE2EPage } from '@stencil/core/testing';

describe('apie-graphite-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<apie-graphite-form></apie-graphite-form>');

    const element = await page.find('apie-graphite-form');
    expect(element).toHaveClass('hydrated');
  });
});
