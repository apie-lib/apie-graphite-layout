import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'apie-graphite-validation-error',
  styleUrl: 'apie-graphite-validation-error.css',
  shadow: true,
})
export class ApieGraphiteValidationError {
  @Prop() message: string;
  @Prop() valid: boolean = false;

  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', // Adjusts space between icon, message, and cross icon
      padding: '15px',
      backgroundColor: this.valid ? '#d4edda' : '#f8d7da', // Green if valid, red otherwise
      color: this.valid ? '#155724' : '#721c24', // Green text if valid, red otherwise
      border: `1px solid ${this.valid ? '#c3e6cb' : '#f5c6cb'}`, // Green border if valid, red otherwise
      borderRadius: '5px',
      fontSize: '14px',
      margin: '15px',
      maxWidth: '100%',
    };
    const iconStyle = {
      margin: '10px',
      fontSize: '18px',
      color: this.valid ? '#155724' : '#721c24', // Green icon if valid, red otherwise
    };
    const crossIconStyle = {
      marginLeft: '10px',
      fontSize: '18px',
      color: '#721c24',
    };

    return (
      <div style={style}>
        <ion-icon name={this.valid ? 'checkmark-circle-outline' : 'alert-circle-outline'} style={iconStyle}></ion-icon>
        <span>{this.message}</span>
        {this.valid && <div style={crossIconStyle}></div>}
        {!this.valid && (
          <ion-icon name="close-outline" style={crossIconStyle}></ion-icon>
        )}
      </div>
    );
  }
}
