import { Component, Host, h } from '@stencil/core';
import { GraphiteFormRender } from '../../utils/GraphiteFormRender';

@Component({
  tag: 'apie-graphite-test',
  styleUrl: 'apie-graphite-test.css',
  shadow: true,
})
export class ApieGraphiteTest {
  private renderInfo = new GraphiteFormRender();
  render() {
    return (
      <Host>
        <apie-test-input renderInfo={this.renderInfo}></apie-test-input>
      </Host>
    );
  }
}
