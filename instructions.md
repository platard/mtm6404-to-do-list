# Components
## App component
1. Create a React component named 'App' that renders a main title; 'NewTaskForm' and 'List' components.
```
<div className="row justify-content-center">
    <div className="col col-md-6">
        <h1 className="display-4 my-5">To Do List </h1>
        <NewTaskForm />
        <List />
    </div>
</div>
```
## NewTaskForm component
1. Create a React component named 'NewTaskForm'.
```
function NewTaskForm (props) { }
```
2. Inside 'NewTaskForm' render a form with one input.
```
<form>
    <input 
        type="text" 
        className="form-control py-3" 
        placeholder="Create a new todo..." />
</form>
```
## List component
1. Create a React component named 'List'.
```
function List (props) { }
```

2. Inside 'List' component, render an unordered list of elements(tasks) and the 'RemainingItems' component.
```
 <ul className="list-group mt-3">
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="flex-fill">
            <input  type="checkbox"
                    class="form-check-input me-2">
            <span>Buy Milk</span>
        </div>
        <button class="btn text-black-50"><i class="fas fa-times"></i></button>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="flex-fill">
            <input  type="checkbox"
                    class="form-check-input me-2">
            <span>Clean Room</span>
        </div>
        
        <button class="btn text-black-50"><i class="fas fa-times"></i></button>
    </li>
    <li class="list-group-item d-flex align-items-center py-3">
        <span class="text-black-50">Remaining items: 1</span>
    </li>
</ul>

```

3. Verify in your browser and fix any issue
```
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(<App />)
```

## ListItem component
1. Create the 'ListItem' component
```
function ListItem (props) { }
```

2. Inside 'ListItem' component, render a list item
```
<li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="flex-fill">
        <input  type="checkbox"
                class="form-check-input me-2">
        <span>Buy Milk</span>
    </div>
    <button class="btn text-black-50"><i class="fas fa-times"></i></button>
</li>
```
## RemainingItems component
1. Create the 'RemainingItems' component and render the label 'Remaining items:'
```
<li class="list-group-item d-flex align-items-center py-3">
    <span class="text-black-50">Remaining items: 1</span>
</li>
```

---
# Functionality
## Create a new task
1. In the App component, declare a state variable 'list' using the useState hook and initialize it with the 'initial list'
```
const initialList = [
      { task: 'Buy Milk', complete: false },
      { task: 'Feed Cat', complete: true }
    ]
    
    const [list, setList] = React.useState(() => initialList)
```
2. Pass the 'list' variabel to the List component

```
<List list={list} />
```

3. In the List component, map over the list array and renders 'ListItem' components for each item in the list
```
{list.map(item => 
          <ListItem 
            key={item.id} 
            item={item} 
          />)}
```

4. In the List component, map over the props.list array and add an id property to each item. Use the spread syntax.
```
const list = props.list.map((item, id) => ({...item, id}))
```

5. In the ListItem component, replace the static values with dynamic ones

### Estate management & Form handling

6. In the NewTaskForm component, set up a state variable 'task' using the useState hook, which manages the value of the input field

```
const [task, setTask] = React.useState('')
```

7. Retrieve data from the form: Use the 'onChange' event attribute to call the 'changeHandler' function when the input value changes, updating the 'task' state accordingly.
```
value={task}
onChange={changeHandler}
```
```
function changeHandler (e) {
      setTask(e.target.value)
    }
```

8. Prevent default behaviour and clear the input form
```
onSubmit={submitHandler}
```
```
function submitHandler (e) {
      e.preventDefault()
      setTask('')
    }
```

### Bottom-up approach

9. In the submitHandler function, call the props.onAddTask function from the parent, pass an object with the 'task' value from the task state and a default 'complete' value of false. This allows the parent component to handle the addition of the new todo item
```
props.onAddTask({ task: task, complete: false })
```

10. In the submitHandler function, reset the task state to an empty string
```
setTask('')
```

11. In the App component(parent), create the 'onAddTask' custom event attribute to call the 'onAddTaskHandler' function. 
```
onAddTask={onAddTaskHandler}
```
12. In the App component, define the 'onAddTaskHandler' function to add a new item to the 'list' state. Creates a new array by spreading the existing list array elements and appending the item to the end.
```
function onAddHandler (item) {
    setList([...list, item])
}
```

## Remainig Items
1. In the 'List' component, pass the 'list' state variable as a prop to the RemainingItems component
```
<RemainingItems items={list} />
```
2. Display the length of the items array as the value to be display next to the 'Remaining items' label
```
{props.items.length}
```

## Completed task
1. Retrieve data from the form: Use the 'onChange' event attribute to call the 'changeHandler' function when the checkbox value changes, update the 'checked' attribute value.
```
checked={props.item.complete}
onChange={changeHandler} 
```

2. In the changeHandler function, call the props.onUpdateItem function from the parent, pass the item as an argument. This allows the parent component to handle the new value of the complete property.
```
function changeHandler () {
      props.onUpdateItem(props.item)
    } 
```
3. In the List component(parent of ListItem), create the 'onUpdateItem' custom event attribute to call the 'onUpdateItemHandler' function. 
```
onUpdateItem={onUpdateItemHandler}
```
4. In the 'onUpdateItemHandler' function, call the props.onUpdate function from the parent, pass a new list with the updated 'complete' value in the proper item.
```
function onUpdateItemHandler (updated) {
    props.onUpdate(list.map(item => 
    item.id === updated.id ? {...item, complete: !item.complete } : item))
}
```
5. In the App component(parent of List), create the 'onUpdate' custom event attribute to call the 'onUpdateHandler' function. 
```
onUpdate={onUpdateHandler}
```

6. In the 'onUpdateHandler' function, update the state of the 'list' using the setList function
```
function onUpdateHandler (list) {
    setList(list)
}
```

7. Update the 'remaining items' value accordingly
```
{props.items.filter(item => !item.complete).length}
```

## Delete items
1. In the ListItem component, create the 'onClick' event attribute with the 'clickHandler' function.
```
onClick={clickHandler}

function clickHandler () {
      props.onDeleteItem(props.item)
}
```

2. In the List component(parent of ListItem), create the 'onDeleteItem' custom event attribute to call the 'onDeleteItemHandler' function.
```
onDeleteItem={onDeleteItemHandler}
```

3. In the 'onDeleteItemHandler' function, call the props.onDelete function from the parent, pass a new list with the filtered items (all items except the deleted one).
```
function onDeleteItemHandler (deleted) {
      props.onDelete(list.filter(item => item.id !== deleted.id))
    }
```

4. In the App component(parent of List), create the 'onDelete' custom event attribute to call the 'onDeleteHandler' function.
```
onDelete={onDeleteHandler}
```

5. In the 'onDeleteHandler' function, update the state of the 'list' using the setList function
```
function onDeleteHandler (list) {
    setList(list)
}
```

## Persistent state
1. Use the 'useEffect' hook to store the 'list' state in the browser's localStorage whenever the list state changes.
```
React.useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
```

2. Initialize the list state with the value retrieved from the browser's localStorage. If no stored value is found, it falls back to the initialList
```
const [list, setList] = React.useState(() => 
    JSON.parse(localStorage.getItem('list') ? localStorage.getItem('list') : '[]' )
)
```



