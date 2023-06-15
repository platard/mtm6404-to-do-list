const initialList = [
    { task: 'Buy Milk', complete: false },
    { task: 'Feed Cat', complete: true }
  ]

function App() {
    const [list, setList] = React.useState(initialList)

    function onAddTaskHandler (item) {
        setList([...list, item])
    }

    function onUpdateHandler (list) {
        setList(list)
    }

    function onDeleteHandler (list) {
        setList(list)
    }


    return (
        <div className="row justify-content-center">
            <div className="col col-md-6">
                <h1 className="display-4 my-5">To Do List </h1>
                <NewTaskForm onAddTask={onAddTaskHandler}/>
                <List list={list} onUpdate={onUpdateHandler} 
                     onDelete={onDeleteHandler}   />
            </div>
        </div>
    )
}

function NewTaskForm (props) {
    const [task, setTask] = React.useState('')

    function changeHandler (e) {
        setTask(e.target.value)
      }

      function submitHandler (e) {
        e.preventDefault()
        props.onAddTask({ task: task, complete: false })
        setTask('')
      }

    return (
        <form onSubmit={submitHandler}>
            <input 
                type="text" 
                className="form-control py-3" 
                placeholder="Create a new todo..." 
                value={task}
                onChange={changeHandler}/>
        </form>
    )
 }

 function List (props) { 
    const list = props.list.map((item, id) => ({...item, id}))

    function onUpdateItemHandler (updated) {
        props.onUpdate(list.map(item => 
        item.id === updated.id ? {...item, complete: !item.complete } : item))
    }

    function onDeleteItemHandler (deleted) {
        props.onDelete(list.filter(item => item.id !== deleted.id))
      }

    return (
        <ul className="list-group mt-3">
            {list.map(item => 
                <ListItem 
                    key={item.id} 
                    item={item}
                    onUpdateItem={onUpdateItemHandler}
                    onDeleteItem={onDeleteItemHandler}
                />)}
            <RemainingItems items={list} />
        </ul>

    )
 }

 function ListItem (props) { 

    function changeHandler () {
        props.onUpdateItem(props.item)
    }
      
    function clickHandler () {
        props.onDeleteItem(props.item)
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="flex-fill">
                <input  type="checkbox"
                        className="form-check-input me-2"
                        checked={props.item.complete}
                        onChange={changeHandler}/>
                <span>{props.item.task}</span>
            </div>
            <button className="btn text-black-50"
            onClick={clickHandler}><i className="fas fa-times"></i></button>
        </li>
    )

 }

 function RemainingItems (props) {

    return (
        <li className="list-group-item d-flex align-items-center py-3">
            <span className="text-black-50">Remaining items: {props.items.filter(item => !item.complete).length}</span>
        </li>
    )
 }



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)