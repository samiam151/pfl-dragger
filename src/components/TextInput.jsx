import React, { Component } from "react";

function Warning(props){
    let show = props.show;
    if (show){
        return <span>Not Validated...</span> 
    }
    return <span></span>;
}

export class TextInput extends Component {
    constructor(props){
        super(props);
        this.required = this.props.required ? this.props.required : false;
        this.type = this.props.type ? this.props.type : "text";
        this.label = this.props.label;
        this.regex = this.props.validatorRegex ? this.props.validatorRegex : null;

        this.state = {
            isPristine: true,
            isDirty: false,
            isValidated: this.regex === null ? true : false
        };
    }

    validate = function(e, input){
        // if (this.isPristine){
        //     this.setState(function(prevState){
        //         return {
        //             isPristine: !prevState.isPristine,
        //             isDirty: true
        //         }
        //     });
        // }
        // if (this.state.isDirty){
        //     if (this.regex){
        //         let target = e.target.value;
        //         console.log(this.regex.test(target));
        //     } else {
        //         console.log(false);
        //     }
        // } else {
        //     this.setState(function(){
        //         return {
        //             isValidated : true
        //         }
        //     });
        // }
    }

    render() {
        return(
            <div>
                <label htmlFor="">{this.label}</label>
                <input 
                    className="react-input" 
                    required={this.required} 
                    onChange={(e) => this.validate(e, this)}
                    type={this.type} />
                <Warning show={this.state.isValidated && this.state.isDirty} />
            </div>
        );
    }
}