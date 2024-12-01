import { h, VNode }  from '@stencil/core';
import { InputState, FallbackRenderInfo, RenderInfo, toString, toArray, createErrorMessage, SubmitButtonState, FormGroupState, FormListRowState, FormListRowAddState, toFileList, toEmptyFileList, FieldWrapperOptions } from 'apie-form-elements';
import { Constraint } from 'apie-form-elements/dist/types/components';

async function openFileDialog(callback: (newValue: any) => void)
{
    const [handle] = await (window as any).showOpenFilePicker();
    const fileData = await handle.getFile();
    callback(fileData);
}

function renderFieldRow(content: VNode|VNode[], state: InputState, fieldWrapOptions: FieldWrapperOptions = {}): VNode|VNode[]{
    const canEnterEmptyString = fieldWrapOptions.canEnterEmptyString !== false;
    const showServersideErrors = fieldWrapOptions.canShowServersideValidationErrors !== false;
    const showClientsideErrors = fieldWrapOptions.canShowClientsideValidationErrors !== false;
    
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{ width: "100%", display:"flex", alignItems: 'center' }}>
            <div style={{ width: "10%" }}>
            { state.allowsNull && (!canEnterEmptyString || state.emptyStringAllowed) && <gr-checkbox style={{'--gr-toggle-size': '2rem'}} disabled={state.disabled} checked={state.value !== null} onClick={(ev) => { state.onTouched(); if (!(ev.target as any).checked) { state.valueChanged(null); } else { state.valueChanged(''); }}} /> }
            </div>
            <div style={{ width: "80%" }}>
                {content}
            </div>
            <div style={{ width: "10%" }}>
                {(state.validationResult.valid && undefined === state.serverValidationError[''])  ? <div style={{color: 'green', fontSize: 'xx-large'}}>✅</div> : <div style={{color: 'green', filter: "grayscale(100%)", fontSize: 'xx-large'}}>✅</div>}
            </div>
        </div>
        {showServersideErrors && Array.from(Object.entries(state.serverValidationError))
            .map((v) => {
                return <div style={{width: '100%'}}> 
                    <apie-graphite-validation-error message={toString(v[1] as any)} valid={false}></apie-graphite-validation-error>
                </div>
            })}
        {showClientsideErrors && state.validationResult.messages.filter((v) => v.message && !v.serverSide)
            .map((v) => {
                return <div style={{width: '100%'}}> 
                    <apie-graphite-validation-error message={v.message} valid={v.valid}></apie-graphite-validation-error>
                </div>
            })}
    </div>;
}

function renderGraphiteInput(
    state: InputState,
    type: string,
    subNodes: VNode[]|VNode = [],
    attributes: any = {},
    canEnterEmptyString: boolean = true,
    wrapRow: boolean = true
) {
    const messages = Array.from(Object.entries(state.serverValidationError))
        .map((v) => {
            return toString(v[1] as any)
        }).join("\n");
    
    const input =
        <gr-input 
            name={state.name}
            value={toString(state.value)}
            type={type}
            label={state.label}
            disabled={state.disabled}
            invalid={!state.validationResult.valid || messages}
            invalidText={messages}
            {...attributes}
            onGr-change={(ev: any) => state.valueChanged(ev.target?.value)}
        >
            {subNodes}
        </gr-input>;
    return wrapRow ? state.currentFieldWrapper(input, state, { canEnterEmptyString, canShowServersideValidationErrors: false }) : input;
}
export class GraphiteFormRender extends RenderInfo
{
    constructor(
    ) {
        super(new FallbackRenderInfo());
        this.singleInputRenderers = {
            "date-display"(state: InputState) {
                return renderGraphiteInput(state, 'text', <ion-icon slot="end" icon="calendar-outline"></ion-icon>)
            },
            "date-hours"(state: InputState) {
                return renderGraphiteInput(state, 'number', [], { placeholder: 'HH', label: 'Hours', style: {"--padding-top": '4px' } })
            },
            "date-minutes"(state: InputState) {
                return renderGraphiteInput(state, 'number', [], { placeholder: 'MM', label: 'Minutes', style: {"--padding-top": '4px' } })
            },
            "date-seconds"(state: InputState) {
                return renderGraphiteInput(state, 'number', [], { placeholder: 'SS', label: 'Seconds', style: {"--padding-top": '4px' } })
            },
            "date-milliseconds"(state: InputState) {
                return renderGraphiteInput(state, 'number', [], { placeholder: 'Ms', label: 'Milliseconds', style: {"--padding-top": '4px' } })
            },
            "date-microseconds"(state: InputState) {
                return renderGraphiteInput(state, 'number', [], { placeholder: '000000', label: 'Microseconds', style: {"--padding-top": '4px' } })
            },
            "date-date"(state: InputState) {
                return renderGraphiteInput(state, 'number', [], { placeholder: 'DD', label: 'Date', style: {"--padding-top": '4px' } })
            },
            "date-month"(state: InputState) {
                return renderGraphiteInput(state, 'number', [], { placeholder: 'MM', label: 'Month', style: {"--padding-top": '4px' } })
            },
            "date-year"(state: InputState) {
                return renderGraphiteInput(state, 'number', [], { placeholder: 'YYYY', label: 'Year', style: {"--padding-top": '4px' } })
            },
            text(state: InputState) {
              return renderGraphiteInput(state, 'text');
            },
            number(state: InputState) {
                return renderGraphiteInput(state, 'number');
            },
            integer(state: InputState) {
                return renderGraphiteInput(state, 'number');
            },
            password(state: InputState) {
                return renderGraphiteInput(state, 'password', [], {togglePassword: Boolean(state.value)})
            },
            textarea(state: InputState) {
                const rows = toString(state.value).split("\n").length;
                return state.currentFieldWrapper(
                    <gr-textarea
                        name={state.name}
                        value={toString(state.value)}
                        disabled={state.disabled}
                        label={state.label}
                        onGr-change={(ev: any) => state.valueChanged(ev.target?.value)}
                        rows={rows}>
                    </gr-textarea>,
                    state
                );
            },
            file(state: InputState) {
                return state.currentFieldWrapper(
                    <div onClick={(ev) => {ev.stopImmediatePropagation(); openFileDialog(state.valueChanged)}}>
                      <input type="file" style={ { display: 'none'} } disabled={state.disabled} onInput={(ev: any) => state.valueChanged(ev.target?.files[0])} name={state.name} files={state.value ? toFileList(state.value) : toEmptyFileList()}/>
                      <gr-input
                          label={state.label}
                          type="text"
                          placeholder="no file selected"
                          value={ state.value ? (state.value as any).name : 'no file selected'}
                          readonly
                          >{ state.value
                              ? []
                              : <ion-icon slot="end" icon="cloud-upload"></ion-icon> }
                          </gr-input>
                    </div>,
                    state,
                    {
                        canEnterEmptyString: false
                    }
                );
            },
            multi(state: InputState) {
                const value = new Set(toArray(state.value));
                function toggle(toggleValue) {
                    if (value.has(toggleValue)) {
                        value.delete(toggleValue);
                    } else {
                        value.add(toggleValue);
                    }
                    state.valueChanged(Array.from(value) as any);
                }
                if (!Array.isArray(state.additionalSettings?.options)) {
                  return state.currentFieldWrapper(
                    <gr-select
                      label={state.label}
                      value={state.value}
                      disabled>
                      <gr-menu-item value={state.value} checked>{toString(state.value)}</gr-menu-item>
                    </gr-select>,
                    state,
                    {
                      canEnterEmptyString: false
                    }
                  );
                }
              
                return state.currentFieldWrapper(
                    <gr-select
                        label={state.label}
                        multiple
                        disabled={state.disabled}
                        value={Array.from(value)}
                        >
                    {state.additionalSettings.options.map((opt) => <gr-menu-item value={opt.value} onClick={() => toggle(opt.value)} checked={value.has(opt.value)}>{opt.name}</gr-menu-item>)}
                    </gr-select>,
                    state,
                    {
                        canEnterEmptyString: false
                    }
                );
            },
            select(state: InputState) {
                if (!Array.isArray(state.additionalSettings?.options)) {
                    return state.currentFieldWrapper(
                      <gr-select
                        label={state.label}
                        value={state.value}
                        disabled>
                        <gr-menu-item value={state.value} checked>{toString(state.value)}</gr-menu-item>
                      </gr-select>,
                      state,
                      {
                        canEnterEmptyString: false
                      }
                    );
                  }
                
                  return state.currentFieldWrapper(
                    <gr-select
                      label={state.label}
                      disabled={state.disabled}
                      value={state.value}
                    >
                      {state.additionalSettings.options.map((opt) => <gr-menu-item value={opt.value} onClick={() => state.valueChanged(opt.value as any)} checked={state.value === opt.value}>{opt.name}</gr-menu-item>)}
                    </gr-select>,
                    state,
                    {
                        canEnterEmptyString: false
                    }
                );
            },
        };
    }

    public renderValidationError(state: Constraint, value: any): VNode|VNode[]
    {
        const errorMessage: string | null = createErrorMessage(state, value);
        if (errorMessage && state.serverSide) {
            return <ul>
                <li style={ errorMessage ? { color: '#B00' } : { color: '#080'}}>
                    <ion-icon name={ errorMessage ? 'close-outline' : 'checkmark-outline' }></ion-icon>
                    { state.message }
                </li>
            </ul>
        }
        const style = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '5px',
            fontSize: '14px',
            margin: '15px',
            maxWidth: '100%',
        }
        const iconStyle = {
            margin: '10px',
            fontSize: '18px',
            color: '#721c24',
        }
        if (errorMessage) {
            return <div style={style}>
              <ion-icon name="alert-circle-outline" style={iconStyle}></ion-icon>
              <span>{errorMessage}</span>
            </div>
        }
        return [];
    }

    public renderSubmitButton(state: SubmitButtonState): VNode|VNode[] {
        return <gr-button type="submit" disabled={state.disabled}>{state.label}</gr-button>
    }

    public renderFormGroup(state: FormGroupState, subElements: VNode[], key: number | string | null = null): VNode|VNode[] {
        return <gr-field-group key={key ?? state.name} label={state.name}>{subElements}</gr-field-group>
    }

    public renderListOrMapRow(state: FormListRowState, subElement: VNode|VNode[]): VNode|VNode[]
    {
        if (Array.isArray(subElement) && subElement.length === 0) {
            return [];
        }
        if (!state.onRowRemove) {
            return subElement;
        }
        return <gr-field-group horizontal key={state.mappingKey} style={{'--align-fields': 'end'}}>
            { subElement }
            { <gr-button onClick={() => state.onRowRemove()}><ion-icon slot="icon-only" icon="close-circle-outline"></ion-icon></gr-button> }
        </gr-field-group>
    }

    public renderAddItemToList(state: FormListRowAddState): VNode|VNode[]
    {
        return <gr-button disabled={state.disabled} onClick={() => state.onRowAdd() }>Add</gr-button>
    }

    public renderAddItemToMap(keyField: VNode|VNode[], button: VNode|VNode[]): VNode|VNode[]
    {
        return <gr-field-group horizontal style={{'--align-fields': 'end'}}>
            { keyField }
            { button }
        </gr-field-group>;
    }

    public createFieldWrapper()
    {
        return renderFieldRow;
    }
}