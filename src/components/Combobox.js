// @ts-check
import React, { Component } from 'react';

export class Combobox extends Component {
    constructor (props) {
        super(props);
        this.content = this.props.content;
        this.index = this.props.index;
        this.options = this.props.options;
        this.state = {
            show: false,
            currentValue: null
        }
    }
    
    onShowHideClick() {
        this.setState(prevState => ({  
            show: !prevState.show
        }));
    };

    onSelectItemClick(e) {
        let newValue = e.target.innerHTML;
        this.setState(prevState => ({
            currentValue: newValue,
            show: !prevState.show
        }));
    }

    onResetClick() {
        this.setState(prevState => ({
            currentValue: ""
        }));
    }

    onRemoveClick(box) {
        this.props.removeItem(box)
    }

    nameValidator(){
        var value = this.state.currentValue;
    }

    render() {
        return (
            <div className="dragger" id={this.index}>
                <span className="dragger__title" data-index={this.index}>{this.index}.</span>
                <div className="dragger__input--content">
                    <input type="text" placeholder={this.content} value={this.state.currentValue || ""} onChange={this.nameValidator} />
                    <ul className="dragger__ul" data-show={this.state.show}>
                        { 
                            this.options.map((item, i) => {
                                return <li key={i} onClick={(e) => this.onSelectItemClick(e)}>{ item }</li>
                            }) 
                        }
                    </ul>
                </div>
                <button onClick={() => this.onShowHideClick()}>v</button>
                <button onClick={() => this.onResetClick()}>Reset</button>
                <button onClick={() => this.onRemoveClick(this)}>Remove</button>
            </div>
        );
    }
}