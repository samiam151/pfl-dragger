import React, { Component } from "react";

export class SelectBox extends Component {
    constructor(props){
        super(props);
        this.name = this.props.name;
        this.required = this.props.required ? this.props.required : false;
        this.items = this.props.items;
        this.label = this.props.label;
    }

    render() {
        return(
            <div>
                <label htmlFor="">{this.label}</label>
                <select className="react-selectbox" name={this.name} required={this.required}>
                    <option selected>-Select an Option-</option>
                    { this.items.map((item, index) => {
                        return <option key={index}>{item}</option>
                    }) }
                </select>
            </div>
        );
    }
}