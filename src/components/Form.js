// @ts-check
import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable';
import { Combobox } from "./Combobox";

import { options, dataList } from "../data/data";

// let list = ;

export class Form extends Component {
    constructor(props) {
        super(props);
        this.nextID = 0;
        this.state = {
            items: dataList.map((x, i) => {
                return {
                    content: (
                        this.renderComboBox(x, this.nextID)
                    )
                }
            })
        };
    }

    // This returns a Combobox object
    // This function is the only way to create a Combobox
    renderComboBox(content, index=null) {
        ++this.nextID;
        return <Combobox 
            content={content || "-Unmapped-"} 
            index={this.nextID} 
            options={options} 
            removeItem={this.removeItem}
        />;
    }


    onSort = function(sortedList){
        this.setState(() => ({
            items: sortedList
        }));
    }

    onAddItemClick = function(){
        this.setState(function(prevState){
            prevState.items.push({
                content: (
                    this.renderComboBox(null, this.nextID)
                ),
            })

            return {
                items: prevState.items
            }
        });
    }

    removeItem = (box) => {
        this.setState(function(prevState){
            let newItems = prevState.items.filter(item => {
                return item.content.props.index !== box.index;
            });
            return {
                items: newItems
            }    
        });
    }

    render() {
        return (
            <div>
                <DragSortableList items={this.state.items} onSort={(sortedList) => this.onSort(sortedList)} />
                <button onClick={() => this.onAddItemClick()}>Add Item</button>
            </div>
        );
    }
}