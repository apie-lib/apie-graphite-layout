import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'apie-graphite-validation-error',
  styleUrl: 'apie-graphite-validation-error.css',
  shadow: true,
})
export class ApieGraphiteValidationError {
  @Prop() message: string;
  @Prop() valid: boolean;

  render() {
    return (
      <Host>
        {!this.valid && <div>{this.message}</div>}
      </Host>
    );
  }
}
