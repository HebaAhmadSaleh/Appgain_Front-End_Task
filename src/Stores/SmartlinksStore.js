import * as React from "react";
import { EventEmitter } from "events";
import dispatcher from '../Dispatcher';

import axios from 'axios';

 class SmartlinksStore extends EventEmitter {
    constructor(){
        super()
        this.loading=false;
        this.smartLinks=[
        ];
    }

      getAll() {

     var promise = axios.get('http://localhost:3000/shortlinks')
          return promise;
 }

handleActions(action){
        let self=this;
if( action.type === "CREATE_SMARTLINK"){
    axios.post('http://localhost:3000/shortlinks', {
        id:action.createdObj.slug,
        obj:action.createdObj
    })
        .then(function (response) {
            self.emit('change');
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });
}
else if (action.type ==="EDIT_SMARTLINK" ){
    axios.put('http://localhost:3000/shortlinks/'+action.editedObj.slug, {
        id:action.editedObj.slug,
        obj:action.editedObj
    })
        .then(function (response) {
            self.emit('change');
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });
}

else if (action.type ==="REMOVE_SMARTLINK" ){
    axios.delete('http://localhost:3000/shortlinks/'+action.id, {
        id:action.id
    })
        .then(function (response) {
            self.emit('change');
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });
}

}
}

const smartlinkStore = new SmartlinksStore;
dispatcher.register(smartlinkStore.handleActions.bind(smartlinkStore))
 export default smartlinkStore




