// @ts-check
import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable';
import { Combobox } from "./Combobox";
import { options, dataList } from "../data/data";

// let list = ;

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: dataList.map((x, i) => {
                return {
                    content: (
                        this.renderComboBox(x, i)
                    )
                }
            })
        };
    }

    renderComboBox(content="-Unmapped-", index=null) {
        return <Combobox content={content || "-Unmapped-"} index={index} options={options} removeItem={this.removeItem} />;
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
                    this.renderComboBox(null, +prevState.items.length)
                )
            })

            return {
                items: prevState.items
            }
        });
    }

    removeItem = (box) => {
        this.setState(function(prevState){
            let newItems = prevState.items.filter(item => {
                // console.log(item);
                // console.log(box);
                return item.content.props.content !== box.content;
            });
            return {
                items: newItems
            }    
        });
    }

    render() {
        return (
            <div>
                <DragSortableList items={this.state.items} onSort={(li) => this.onSort(li)} />
                <button onClick={() => this.onAddItemClick()}>Add Item</button>
            </div>
        );
    }
}