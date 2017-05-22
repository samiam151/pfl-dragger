// @ts-nocheck
import React, { Component } from 'react';
import { fields, options } from "../data/data";


export class Combobox extends Component {
    constructor (props) {
        super(props);
        // console.log(this.props.content);
        this.content = this.props.content; // represents a field in ExportMapFields
        this.index = this.props.index;
        this.options = this.props.options;

        this.state = {
            show: false
            // oneInputValue: ""
        } 

        if (this.content.isSystem){
            this.state['currentValue'] = this.content.SystemValue;
        } else {
            this.state['currentValue'] = "";
        }
    }
    
    onShowHideClick(e) {
        e.preventDefault();
        this.setState(prevState => ({  
            show: !prevState.show
        }));
    };

    onSelectItemClick(e) {
        e.preventDefault();
        let newValue = e.target.innerHTML;
        this.setState(prevState => ({
            currentValue: newValue,
            show: !prevState.show
        }));
    }

    onResetClick(e) {
        e.preventDefault();
        this.setState(prevState => ({
            currentValue: ""
        }));
    }

    onRemoveClick(e, box) {
        e.preventDefault();
        this.props.removeItem(box)
    }

    nameValidator(e){
        let val = e.target.value;
        var value = val;
        this.setState({
            currentValue: val
        });
        console.log(this.state.currentValue);
    }

    render() {
        return (
            <div className="dragger" id={this.index}>
                {/*Hidden Inputs*/}
                <input type="hidden" name={"[" + (this.index - 1) + "].AccountID" } value={this.content.AccountID}/>
                <input type="hidden" name={"[" + (this.index - 1) + "].TemplateID"} value={this.content.TemplateID}/>
                <input type="hidden" name={"[" + (this.index - 1) + "].MapID"} value={this.content.MapID}/>
                <input type="hidden" name={"[" + (this.index - 1) + "].DisplayOrder"} value={this.content.DisplayOrder}/>
                <input type="hidden" name={"[" + (this.index - 1) + "].IsDeleted"} value={this.content.IsDeleted}/>

                {/*Combobox Input*/}
                <div className="dragger__input--content">
                    <i className="fa fa-ellipsis-v"></i>
                    
                    <div className="dragger__dropdown">
                        <input className="input" type="text" placeholder={this.content.TargetFieldName} defaultValue="tester test" value={this.state.currentValue} onChange={(e) => this.nameValidator(e)} />
                        <ul className="dragger__ul" data-show={this.state.show}>
                            { 
                                options.map((item, i) => {
                                    return <li key={i} onClick={(e) => this.onSelectItemClick(e)}>{ item }</li>
                                }) 
                            }
                        </ul>
                    </div>
                    
                    {/*Dropdown Trigger*/}
                    <span className="dragger__dropdownTrigger" onClick={(e) => this.onShowHideClick(e)}>
                        <span className="caret"></span>
                    </span>
                    {/*Input Reset*/}
                    <span className="dragger__inputReset" onClick={(e) => this.onResetClick(e)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </span>
                </div>

                {/*Arrow*/}
                <div className="dragger__arrow">
                    <span className="glyphicon glyphicon-arrow-right"></span>
                </div>

                {/*Template Name*/}
                <div className="dragger__templateField">
                    <input type="hidden" value={this.content.TargetFieldName} />
                    <input type="text" className="input" placeholder="" value={this.content.TargetFieldName} />
                </div>

                {/*Delete Button*/}
                <div className="dragger__remove">
                    <a onClick={(e) => this.onRemoveClick(e, this)}className="clear-button-red" data-name="Delete Field" alt="Delete Field" title="Delete Field" >
                        <i className="fa fa-trash"></i>
                    </a>
                    {/*<button onClick={(e) => this.onRemoveClick(e, this)}>Remove</button>*/}
                </div>
            </div>
        );
    }
}