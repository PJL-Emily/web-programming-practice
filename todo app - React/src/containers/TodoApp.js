import React, { Component, useState } from "react";
import Header from "../components/Header";
// import Section from "../containers/Section";
// import ListItem from "../components/ListItem";
// import Footer from "../containers/Footer";

const defaultStyle = {opacity: "1", textDecoration: "none",};
const checkedStyle = {opacity: "0.5", textDecoration: "line-through",};

class TodoApp extends Component {
    constructor (props) {
		super (props) ;
		this.state = { 
			MAX_ID: 0,
			count: 0, 
			leftcnt: 0,
			list: [],
			displayList: [],
		};
	}

    addItem = (event) => {
    	event.preventDefault()
    	let inputText = document.getElementsByClassName('todo-app__input')[0].value;
    	this.setState(state => ({ 
    		MAX_ID: state.MAX_ID + 1 ,
    		count: state.count + 1 ,
    		leftcnt: state.leftcnt + 1 ,
    		list: [...state.list, {text: inputText, key: state.MAX_ID, style: defaultStyle, checked: false,}], 
    		displayList: [...state.displayList, {text: inputText, key: state.MAX_ID, style: defaultStyle, checked: false,}]
    	}));
    	document.getElementsByClassName('todo-app__input')[0].value = '';
    	document.getElementsByClassName('todo-app__footer')[0].style = {display: "block"};
    }

	deleteItem = (event, itemKey) => {
		let index = 0;
		for (let i = 0; i < this.state.list.length; i++) {
			if (this.state.list[i].key === itemKey) {
				index = i;
				break;
			}
		}
    	this.setState(state => ({
    		leftcnt: state.list[index].checked? state.leftcnt: state.leftcnt - 1,
	        list: state.list.filter( function (li) {
	        	return li.key !== itemKey
	        } ),
	        displayList: state.displayList.filter( function (li) {
	        	return li.key !== itemKey
	        } ), 
	        count: state.count - 1
	    }));
    }

    displayAll = () => {
    	this.setState(state => ({
	        displayList: state.list
	    }));
    }

    displayActive = () => {
    	this.setState(state => ({
	        displayList: state.list.filter( function (li) {
	        	return li.checked === false
	        } )
	    }));
    }

    displayCompleted = () => {
    	this.setState(state => ({
	        displayList: state.list.filter( function (li) {
	        	return li.checked !== false
	        } )
	    }));
    }

    clearCompleted = () => {
    	this.setState(state => ({
	        displayList: state.list.filter( function (li) {
	        	return li.checked !== true
	        } ), 
	        list: state.list.filter( function (li) {
	        	return li.checked !== true
	        } )
	    }));
    }

    checkItem = (event, itemKey) => {
    	let index = 0;
		for (let i = 0; i < this.state.list.length; i++) {
			if (this.state.list[i].key === itemKey) {
				index = i;
				break;
			}
		}

    	let L = this.state.list;
    	let DL = this.state.displayList;
    	L[index].style = event.target.checked? checkedStyle: defaultStyle;
    	L[index].checked = event.target.checked? true: false;
    	DL[index].style = event.target.checked? checkedStyle: defaultStyle;
    	DL[index].checked = event.target.checked? true: false;
    	// console.log(L);
    	// let newLeftcnt = ;
    	this.setState(state => ({ 
    		leftcnt: event.target.checked? this.state.leftcnt - 1: this.state.leftcnt + 1,
    		list: L,
    		displayList: DL
    	}));
	}

	render() {
        return (
            <div id="root" className="todo-app__root">
                <Header text="todos" className="todo-app__header" />
            	<section className="todo-app__main">
            		<form onSubmit={this.addItem}>
				        <input className="todo-app__input" placeholder="What needs to be done?"/>
				    </form>
			        <ul className="todo-app__list">
			        	{this.state.displayList.map((item) => (
			        		<li className="todo-app__item">
						        <div className="todo-app__checkbox">
						            <input type="checkbox" id={item.key} checked={item.checked} onChange={(event) => (this.checkItem(event, item.key))}/> 
						            <label htmlFor={item.key} />
						        </div>
						        <h1 className="todo-app_item-detail" style={item.style}>{item.text}</h1>
						        <img src="./img/x.png" className="todo-app__item-x" width="20px" onClick={(event) => (this.deleteItem(event, item.key))} />
						    </li>
			            ))}
			        </ul>
			    </section>
			    <footer className="todo-app__footer" style={this.state.count? {display: "block"}: {display: "none"}}>
			        <div className="todo-app__total">{this.state.leftcnt} left</div>
			        <ul className="todo-app__view-buttons">
			        	<li><button onClick={this.displayAll}>All</button></li>
			        	<li><button onClick={this.displayActive}>Active</button></li>
			        	<li><button onClick={this.displayCompleted}>Completed</button></li>
			        </ul>
			        <div className="todo-app__clean">
			        	<button id="todo-app__clean-button" style={(this.state.count === this.state.leftcnt)? {visibility: "hidden"}: {visibility: "visible"}} onClick={this.clearCompleted}>Clear completed</button>
			        </div>
			    </footer>
            </div>
        );
    }
}

export default TodoApp;
