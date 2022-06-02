import React from 'react';
import update from 'immutability-helper';

/* -----------------INITIALIZE API URLs------------------------*/
const API = 'http://localhost:3030/';
const API_DEL = 'http://localhost:3030/delete'
const API_ADD = 'http://localhost:3030/add'
const API_EDIT = 'http://localhost:3030/edit'
/*-----------------------END INIT------------------------------*/

/* component to fetch data from the API
 * creates a state with error, loading, items[], id, name and done
 */
class FetchData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			loading:true,
			items: [],
			id: 0,
			name: null,
			done: false /*used in markComplete, false = not complete, else complete*/
    }

    /* ---------------FUNCTION DECLARATIONS----------------------*/
		this.markComplete = this.markComplete.bind(this);
		this.editListItem = this.editListItem.bind(this);
		this.addItem = this.addItem.bind(this);
		this.formChanger = this.formChanger.bind(this);
		this.postToDB = this.postToDB.bind(this);
    /*---------------END FUNCTION DECLARATIONS------------------*/	
  }
  
  /* postToDB posts to the given URL with the given body
   * @params body, a json object contaning the information to add or update to DB
   * @params url, the URL of the API to POST to 
   */
	postToDB(body, url) {
		fetch(url, {method: 'POST', body: JSON.stringify(body), headers: 
		{'Content-Type': 'application/json'}}).catch(error => console.log(error));
	}

  /* markComplete handles removal and adding items back to the list
   * @param id, takes the id of the current item 
   */
  markComplete(id) {
    /* id starts at 1 instead of 0 index, adjust for that here */
    const id2 = id-1;
    /* if done of current item is true, on button click set it to false*/
    if (this.state.items[id2].done === false) {
      /* update state of the current item */ 
      this.setState({
        items: update(this.state.items, {[id2]: {done: {$set: true}}})
      }, () => {
        /* once state is upated, postToDB */
        this.postToDB(this.state.items[id2], API_DEL);
      })
    /* if done of current item is false, on button click set it to true */  
    } else if (this.state.items[id2].done === true) {
      /* update state of the current item */ 
      this.setState({
        items: update(this.state.items, {[id2]: {done: {$set: false}}})
      }, () => {
        /* once state is upated, postToDB */
        this.postToDB(this.state.items[id2], API_DEL);
      })
    }
  }

  /* editListItem handles saving changes to list when item's ${name} is altered and the save button is clicked
   * @param id, takes the id of the current item 
   */
  editListItem(id) {
    /* id starts at 1 instead of 0 index, adjust for that here */
    const id2 = id-1;
    /* save changes to DB */
    this.postToDB(this.state.items[id2], API_EDIT);
	}
  
  /* addItem adds an item to the list and gives it a default state */
	addItem() {
		const item = {
			done: true, 
			id: this.state.items.length+1, 
			name: "New Item! Double click to edit, and hit save to save changes"
    };
    /* adds an item to the state's items[] array */ 
		this.setState({
			items: update(this.state.items, {$push: [item]})
		}, () => {
      /* once state is upated, postToDB */
      this.postToDB(item, API_ADD);
    })
      this.state.items.push()
	} 

  /* formChanger handles changes to list when item's ${name} is altered, for use with onChange 
   * @param e, the current event object
   * @param id, the id of the current item
   */
	formChanger(e, id) {
    /* id starts at 1 instead of 0 index, adjust for that here */
    const id2 = id - 1;
    /* update state of the current item */ 
		this.setState({
			items: update(this.state.items, {[id2]: {name: {$set: e.target.value}}})
		})
	}
  
  /* componentDidMount is invoked immediately after a component is mounted */
	componentDidMount() {
		fetch(API).then(response => response.json())
		.then(
			(result) => {
				console.log(result);
				this.setState({
					loading: false,
					items: result,
				});
			},
			(error) => {
				console.log(error);
				this.setState({
					loading: false,
					error
				});
			}
		)
  }
  
  /* render handles rendering */
	render() {
		const {error, loading, items} = this.state;
		if (error) {
			return <h1>ERROR</h1>
		} else if (loading) {
			return <h1>Loading...</h1>
		} else {
		  return (
        <ul className = "itemList">
          {items.map(item => (
            <div className="flex-container">
              <li className="expandList" key={item.id}>
                  <textarea className={item.done ? "formList": "striked"}  
                  onChange={(e) => {this.formChanger(e, item.id)}} defaultValue={item.name}></textarea>
              </li>
              {item.done ? <button className="deleteButton" onClick={() => this.markComplete(item.id)}>DEL</button>:
              <button className="reAddButton" onClick={() => {this.markComplete(item.id)}}>Add</button> }
              <button className="editButton" onClick={() => {this.editListItem(item.id)}}>Save</button>
              <button className="addButton" onClick={() => {this.addItem(item.id)}}>+</button>
            </div>
          ))}		
        </ul>
      ) /* end return */
		} /* end else */		
	} /* end render */
} /* END OF COMPONENT FetchData */

/* PostData sets a header and calls the FetchData component */
class PostData extends React.Component {
	render() { 
		return <>
      <h1 className="mainHeader">SuperNiftyListApp</h1>
      <FetchData/>
		</>	/* end return */		
	}	
} /* END OF COMPONENT PostData */

export default PostData; 