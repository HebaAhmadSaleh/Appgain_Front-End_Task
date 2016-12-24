import * as React from "react";
import  SmartlinksStore  from "../Stores/SmartlinksStore"
import  { Smartlink } from './Smartlink'
import * as smartlinkActions from '../Actions/smartlinkActions'

import Modal from 'react-bootstrap/lib/Modal';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import FormControl from 'react-bootstrap/lib/FormControl'


export  class SmartLinksListing extends React.Component {
    constructor(){
        super();
        this.state={
            smartLinks:[],
            isAddModalOpen:false,
            slugstate:false,
            validationError:"",
             slug:"",
            description:"",
            status:"Choose Status",
            iosPrimary:"",
            iosFallback:"",
            androidPrimary:"",
            androidFallback:"",
            web:"",
            header:""

                }
            }

    componentWillMount(){
       const self=this
     SmartlinksStore.getAll().then(function(response) {
                SmartlinksStore.smartLinks=response.data
                let c=response.data;
                self.setState({smartLinks:c})
            }).catch(function (error) {
                console.log(error);
            });
        SmartlinksStore.on('change',()=>{
            SmartlinksStore.getAll().then(function(response) {
                SmartlinksStore.smartLinks=response.data
                let c=response.data;
                self.setState({smartLinks:c})
            }).catch(function (error) {
                console.log(error);
            });
        })

    }

    openAddModal(slugstate){
        if(slugstate==false){
            this.setState({slug:""})
            this.setState({description:""})
            this.setState({status:"Choose Status"})
            this.setState({iosPrimary:""})
            this.setState({iosFallback:""})
            this.setState({androidPrimary:""})
            this.setState({androidFallback:""})
            this.setState({web:""})
            this.setState({header:""})
        }
        this.setState({slugstate})
        this.setState({isAddModalOpen:true});
    }
    closeAddModal(){

        this.setState({isAddModalOpen:false});

    }

    selectStatus(eventKey){
        this.setState({status:eventKey})

    }
    updateProperty(propertyname,e){
if(propertyname == "slug"){
this.setState({slug:e.target.value})
}
else if(propertyname == "description") {
    this.setState({description:e.target.value})
}
else if(propertyname == "iosPrimary") {
    this.setState({iosPrimary:e.target.value})
}
else if(propertyname == "iosFallback") {
    this.setState({iosFallback:e.target.value})
}
else if(propertyname == "androidPrimary") {
    this.setState({androidPrimary:e.target.value})
}
else if(propertyname == "androidFallback") {
    this.setState({androidFallback:e.target.value})
}
else if(propertyname == "web") {
    this.setState({web:e.target.value})
}
else {
    this.setState({header:e.target.value})
}
 }
    save(){
        const state=this.state;
        if(state.status == "" || state.web =="" || state.androidFallback == "" || state.androidPrimary == ""
        || state.iosPrimary == "" || state.iosFallback == "" || state.header == "" ){
         this.setState({validationError:"Complete the required fields,Please."})
        }
        else {

    this.setState({validationError:""})
    let slug=state.slug,status=state.status,web=state.web,description=state.description,header=state.header,
        iosPrimary=state.iosPrimary,iosFallback=state.iosFallback,androidPrimary=state.androidPrimary,
        androidFallback=state.androidFallback;
    let ios ={
        iosPrimary,
        iosFallback
    },android={

        androidPrimary,
        androidFallback
    },launch_page={header}
    let targets={
        ios,
        android,
        web
    };


    let createdObj={
        slug,
        status,
        description,
        targets,
        launch_page
    };
            if(this.state.slugstate== false){
    smartlinkActions.createSmartlink(createdObj);
} else {
   smartlinkActions.editSmartlink(createdObj);
}

            this.setState({isAddModalOpen:false})
            this.cleardata();
}


        }

cleardata(){
    this.closeAddModal();
    this.setState({slug:""})
    this.setState({description:""})
    this.setState({status:"Choose Status"})
    this.setState({iosPrimary:""})
    this.setState({iosFallback:""})
    this.setState({androidPrimary:""})
    this.setState({androidFallback:""})
    this.setState({web:""})
    this.setState({header:""})
}

    cancel(){
       this.cleardata();
    }

    getSelected(slug,slugstate){
        console.log('slug',slug)
        let selected={}
        for(let i=0;i<this.state.smartLinks.length;i++){
           if(this.state.smartLinks[i].obj.slug == slug){
               selected = this.state.smartLinks[i].obj;
           }
        }
        this.setState({slugstate})
        this.setState({isAddModalOpen:true})
        this.setState({slug:selected.slug})
        this.setState({description:selected.description})
        this.setState({status:selected.status})
        this.setState({iosPrimary:selected.targets.ios.primary})
        this.setState({iosFallback:selected.targets.ios.fallback})
        this.setState({androidPrimary:selected.targets.android.primary})
        this.setState({androidFallback:selected.targets.android.fallback})
        this.setState({web:selected.targets.web})
        this.setState({header:selected.launch_page.header})

    }

    deleteLink(Id){
      // console.log(Id)
        smartlinkActions.deleteSmartlink(Id);
    }
    render() {


        let state=this.state;
        let targets=[]
        for(let i=0;i<state.smartLinks.length;i++){
            targets[i]=state.smartLinks[i].obj.targets;
        }


        const bindingComponent= state.smartLinks.map((item)=>{ return  <Smartlink key={item.obj.slug}  Item={item} getSelected={this.getSelected.bind(this)} deleteLink={this.deleteLink.bind(this)}>  </Smartlink> });
    return <div className="container"> <div className="row"> <h1> Smartlinks </h1>

            {bindingComponent}

<div className="col-xs-offset-9 ">
    <button type="button" className="btn btn-info col-xs-2" onClick={this.openAddModal.bind(this,false)}>Add</button> </div>
        </div>

            <div>
                <Modal
                    show={this.state.isAddModalOpen}
                    onHide={this.closeAddModal.bind(this)}
                > <Modal.Header closeButton>
                    <Modal.Title>Add Smartlink </Modal.Title>
                </Modal.Header>

                    <div className="row" >
                        <form>
                        <div className=" col-xs-10 " >
                            <br/><br/>
                            <div className="col-xs-offset-2 col-xs-11  " >

                                <FormControl
                                    type="text"
                                    placeholder="Slug"
                                    value={state.slug}
                                    onChange={this.updateProperty.bind(this,'slug')}
                                    disabled={state.slugstate}
                                /> <br/>


                                <FormControl
                                    type="text"
                                    placeholder="Description"
                                    value={state.description}
                                    onChange={this.updateProperty.bind(this,'description')}
                                />

                                <br/>
                                <span style={{color:'red'}}><b>* </b> Required </span>
                                <br/>
                                <DropdownButton  id='kk' title={this.state.status} >
                                    <MenuItem eventKey="1"  onClick={this.selectStatus.bind(this,"Active")}>Active</MenuItem>
                                    <MenuItem eventKey="2" onClick={this.selectStatus.bind(this,"Disable")}> Disable </MenuItem>
                                    <MenuItem eventKey="3" onClick={this.selectStatus.bind(this,"Reverse")}>Reverse</MenuItem>
                                </DropdownButton>
<br/><br/>
                                <span style={{color:'red'}}><b>*</b>  Required </span>
                            <h4> Targets </h4>
                            <span>Ios :</span>
                                <FormControl
                                    type="text"
                                    placeholder="Primary"
                                    value={state.iosPrimary}
                                    onChange={this.updateProperty.bind(this,'iosPrimary')}
                                /><br/>
                                <FormControl
                                    type="text"
                                    placeholder="Fallback"
                                    value={state.iosFallback}
                                    onChange={this.updateProperty.bind(this,'iosFallback')}
                                /><br/>
                            <span>Android :</span>
                                <FormControl
                                    type="text"
                                    placeholder="Primary"
                                    value={state.androidPrimary}
                                    onChange={this.updateProperty.bind(this,'androidPrimary')}
                                /><br/>
                                <FormControl
                                    type="text"
                                    placeholder="Fallback"
                                    value={state.androidFallback}
                                    onChange={this.updateProperty.bind(this,'androidFallback')}
                                /><br/>

                                <FormControl
                                    type="text"
                                    placeholder="Web"
                                    value={state.web}
                                    onChange={this.updateProperty.bind(this,'web')}
                                /><br/>
                                <span style={{color:'red'}}><b>* </b> Required</span>
                                <h4> Launch Page </h4>
                                <FormControl
                                    type="text"
                                    placeholder="Header"
                                    value={state.header}
                                    onChange={this.updateProperty.bind(this,'header')}
                                /><br/>
                                <button type="button"  className="btn btn-info col-xs-2  add" onClick={this.save.bind(this)}>Save</button>
                                <button type="button"  className="btn btn-info col-xs-2 col-xs-offset-1 add" onClick={this.cancel.bind(this)}>Cancel</button>
                                <span style={{color:'red',padding:'10px'}}> { state.validationError} </span>
                            </div>


                    </div>
                        </form>
                    </div>

                </Modal>
            </div>

        </div>
    }
}

