// @ts-check
import React, { Component } from 'react';
import './App.css';

import DragSortableList from 'react-drag-sortable';
import { Combobox } from "./components/ListItem";
import { options, dataList } from "./data/data";

let list = dataList.map((x, i) => {
    return {
        content: (
            <Combobox content={x} index={i} options={options} />
        )
    }
});

class App extends Component {
  onSort = function(sortedList){}

  render() {
    console.log(list);
    return (
       <DragSortableList items={list} onSort={this.onSort} />
    );
  }
}

export default App;