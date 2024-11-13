import { newE2EPage } from '@stencil/core/testing';

describe('apie-graphite-validation-error', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<apie-graphite-validation-error></apie-graphite-validation-error>');

    const element = await page.find('apie-graphite-validation-error');
    expect(element).toHaveClass('hydrated');
  });
});
