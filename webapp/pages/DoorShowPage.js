import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LoadDoor from '../actions/LoadDoor'
import DeleteDoor from '../actions/DeleteDoor'

export default class DoorShowPage extends React.Component {

  static contextTypes = {
    appState: PropTypes.object.isRequired,
  }

  constructor(){
    super()
    this.deleteDoor = this.deleteDoor.bind(this)
  }

  componentDidMount(){
    LoadDoor(this.doorId())
  }

  doorId(){
    return this.props.match.params.id
  }

  door(){
    const doorId = this.doorId()
    const doors = this.context.appState.doors || {}
    return doors[doorId]
  }

  deleteDoor(event){
    event.preventDefault()
    const door = this.door()
    const confirmed = confirm(`Are you sure you want to delete "${door.name}"?`)
    if (confirmed){
      DeleteDoor(door.id).then(() => {
        this.props.history.push('/doors')
      })
    }
  }

  render(){
    const door = this.door()
    const doorId = door ? door.id : this.doorId()

    const content = !door
      ? <div>Loading door {doorId}</div>
      : <div>
          <h1>Door "{door.name}"</h1>
          <ul>
            <li>
              <a href="" onClick={this.deleteDoor}>Delete</a>
            </li>
            <li>
              <Link to={`/doors/${doorId}/edit`}>Edit</Link>
            </li>
          </ul>
        </div>

    return <div className="DoorShowPage">
      {content}
    </div>
  }
}

