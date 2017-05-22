// @ts-nocheck
import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable';
import { Combobox } from "./Combobox";
import { Modal, Popover, OverlayTrigger } from "react-bootstrap";
import  axios from "axios";
import { fields, options, templateID } from "../data/data";

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
            }),
            showModal: false,
            addMultipleValue: ""
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

    closeModal = () => {
        this.setState(function(prevState){
            return { showModal: false }
        });
    }

    openModal = () => {
        this.setState(function(prevState){
            return { showModal: true }
        });
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
            this.addNewField(res.data)
        });
    }

    addNewField = function(data) {
        this.setState(function(prevState){
            prevState.items.push({
                content: (
                    this.renderComboBox(data, this.nextID)
                ),
            })
            return {
                items: prevState.items
            }
        });
    }

    addMultipleFields = function(e){
        let fields = this.state.addMultipleValue;

        axios.post("/Export/AddMultipleFieldsAjax", {
            templateID: templateID,
            addManyFields: fields,
            numFields: this.nextID
        })
        .catch(err => {
            console.log(err);
            this.closeModal();
        })
        .then(res => {
            console.log(res);
            let newFields = res.data;
            newFields.forEach(field => {
                this.addNewField(field);
            });
            this.closeModal();
            this.setState(function(prevState){
                return {
                    addMultipleValue: ""
                }
            });
        });
    }

    changeMultipleValue = function(e){
        let newValue = e.target.value;
        this.setState(function(){
            return {
                addMultipleValue: newValue
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
            <div className="exportTable--react">
                <DragSortableList items={this.state.items} onSort={(sortedList) => this.onSort(sortedList)} />
                
                <a className="clear-button" onClick={(e) => this.onAddItemClick(e)}>Add Field</a>
                <a className="clear-button" onClick={() => this.openModal()}>Add Multiple Fields</a>

                {/*Add Multiple Modal*/}
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Add Multiple Fields</h3>
                        <p>Enter the names of the fields you want below. You can separate names of individual fields with line breaks, tabs, commas, semi-colons, and the pipe character (|). You may also paste adjacent fields copied from an Excel spreadsheet.</p>
                        <textarea name="" id="" cols="30" rows="10" onChange={(e) => this.changeMultipleValue(e)}>{this.state.addMultipleValue}</textarea>
                        <a className="clear-button" onClick={() => this.addMultipleFields()}>Save Fields</a>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}