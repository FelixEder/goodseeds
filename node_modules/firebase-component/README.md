# firebase-component
react.js component wrapping firebase refs for easily rendering your data

## Installation
```
npm i firebase-component -S
```

## Usage
```
import FirebaseComponent from 'firebase-component'

const firebase = new Firebase('https://<your-url>.firebaseio.com/')
const plRef = firebase.child(`some/ref`)

// rendering an object
<FirebaseComponent fbRef={plRef} onValue={(val) => {
   return ...
 }}></FirebaseComponent>

// rendering an array of items
<FirebaseComponent fbRef={plRef} forEach={(item) => {
   return ...
 }} manipulate={(items) => {
   return getSortedItems(items)
 }}></FirebaseComponent>
```
