import React, {PropTypes} from 'react'

export default class Firebase extends React.Component {
  constructor () {
    super()
    this.state = {}
    this.onValue = (snapshot) => {
      let value
      if (this.props.forEach) {
        value = []
        snapshot.forEach(function (childSnapshot) {
          value[childSnapshot.key()] = childSnapshot.val()
        })
        if (this.props.manipulate) {
          value = this.props.manipulate(value)
        }
      } else {
        value = snapshot.val()
      }
      this.setState({snapshot: value})
    }
  }
  componentWillMount () {
    this.props.fbRef.on('value', this.onValue)
  }
  componentWillUnmount () {
    this.props.fbRef.off('value', this.onValue)
  }
  render () {
    if (!this.state.snapshot) {
      return <div></div>
    }
    if (this.props.forEach) {
      return <div>{this.state.snapshot.map(this.props.forEach)}</div>
    } else {
      return <div>{this.props.onValue(this.state.snapshot)}</div>
    }
  }
}

Firebase.propTypes = {
  fbRef: PropTypes.object, // renders it's return value before promise is handled
  onValue: PropTypes.func, // renders it's return value whenever value is refreshed
  forEach: PropTypes.func, // renders it's return value into a map whenever value is refreshed
  manipulate: PropTypes.func // change the array coming from firebase before it is rendered(filtering, sorting etc.)
}
