import * as React from "react";


export class Smartlink extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }

    getselectedLink(slug,slugstate){
        this.props.getSelected(slug,slugstate);
console.log(slug)
    }

    deleteLink(slugId){
        this.props.deleteLink(slugId);
    }

    render() {
        const Item=this.props.Item.obj;
        const Target = this.props.Item.obj.targets;
         let target=[];
        for (var key in Target) {
            target[key] = Target[key];
        }

        return <div className=" col-sm-4 col-xs-12"> <div className="panel panel-info ">
            <div className="panel-heading">  <h1>  {Item.slug}</h1> </div>
<div className="panel-body">
    <p><b> Status : </b>{Item.status}</p>
    <p><b> Header : </b>{Item.launch_page.header}</p>
    <p> <b> Description : </b>{Item.description}</p>

       <h5> <b> Web : </b> </h5> {target.web}

            <h5> <b> Ios : </b> </h5>
            <ul >

                <li> Primary : {target.ios.primary}</li>
                <li> Fallback : {target.ios.fallback}</li>

                </ul>

        <h5> <b> Android :  </b> </h5>
            <ul >

                <li> Primary : {target.android.primary}  </li>
                <li> Fallback : {target.android.fallback}</li>

    </ul>


    <button type="button" className="btn btn-primary" onClick={this.getselectedLink.bind(this,Item.slug,true)}>  Edit  </button>
    <button type="button"  className="btn btn-danger col-xs-offset-2" onClick={this.deleteLink.bind(this,Item.slug)}> Delete </button>

        </div>
        </div>
        </div>
    }
}

