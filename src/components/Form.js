// @ts-nocheck
import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable';
import { Combobox } from "./Combobox";
import  axios from "axios";
import { fields, options, templateID } from "../data/data";

// let list = ;

export class Form extends Component {
    constructor(props) {
        super(props);
        this.nextID = 0;
        this.state = {
            items: fields.map((field, i) => {
                return {
                    content: (
                        this.renderComboBox(field, this.nextID)
                    )
                }
            })
        };
    }

    // This returns a Combobox object
    // This function is the only way to create a Combobox
    renderComboBox(field, index=null) {
        ++this.nextID;
        return <Combobox 
            content={field} 
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

    onAddItemClick = function(e){
        e.preventDefault();

        axios.post("/Export/AddCustomExportFieldAjax", {
            templateID: templateID,
            numFields: this.nextID
        })
        .catch(err => {
            console.log(err);
        })
        .then(res => {
            this.setState(function(prevState){
                prevState.items.push({
                    content: (
                        this.renderComboBox(res.data, this.nextID)
                    ),
                })

                return {
                    items: prevState.items
                }
            });
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
            <div className="exportTable--react">
                <DragSortableList items={this.state.items} onSort={(sortedList) => this.onSort(sortedList)} />
                <a className="clear-button" onClick={(e) => this.onAddItemClick(e)}>Add Field</a>
                <a className="clear-button" data-toggle="modal" data-target="#manyFieldsModal">Add Multiple Fields</a>
            </div>
        );
    }
}