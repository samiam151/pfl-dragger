// @ts-check
import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable';
import { Combobox } from "./ListItem";
import { options } from "../data/data";

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }

    onSort = function(sortedList){
        console.log(this.state.items)
    }

    onAddItemClick = function(){
        this.setState(function(prevState){
            prevState.items.push({
                content: (
                    <Combobox content={"-Unmapped-"} index={+prevState.items.length} options={options} />
                )
            })

            return {
                items: prevState.items
            }
        });
        console.log(this.state.items)
        // this.props.addItem();
    }

    render() {
        return (
            <div>
                <DragSortableList items={this.state.items} onSort={() => this.onSort()} />
                <button onClick={() => this.onAddItemClick()}>Add Item</button>
            </div>
        );
    }
}