import { newE2EPage } from '@stencil/core/testing';

describe('apie-graphite-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<apie-graphite-test></apie-graphite-test>');

    const element = await page.find('apie-graphite-test');
    expect(element).toHaveClass('hydrated');
  });
});
