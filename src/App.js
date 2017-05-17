// @ts-check
import React, { Component } from 'react';
import './App.css';

import { Combobox } from "./components/ListItem";
import { Form } from "./components/Form";
import { options, dataList } from "./data/data";

let list = dataList.map((x, i) => {
    return {
        content: (
            <Combobox content={x} index={i} options={options} />
        )
    }
});

function addItem(){
    list.push({
        content: (<Combobox content={""} index={++list.length} options={options} />)
    });
}

class App extends Component {
  render() {
    return (
        <Form items={list} addItem={addItem}/>
    );
  }
}

export default App;