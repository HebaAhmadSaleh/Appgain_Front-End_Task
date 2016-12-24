import dispatcher from '../Dispatcher';



export function createSmartlink(obj){
    let smartlinkObj={};
    smartlinkObj.targets={},
        smartlinkObj.targets.ios={},
        smartlinkObj.targets.android={},
        smartlinkObj.launch_page ={},
        smartlinkObj.slug=obj.slug,
        smartlinkObj.status= obj.status,
        smartlinkObj.description= obj.description,
        smartlinkObj.targets.ios.primary=obj.targets.ios.iosPrimary,
        smartlinkObj.targets.ios.fallback=obj.targets.ios.iosFallback,
        smartlinkObj.targets.android.primary=obj.targets.android.androidPrimary,
        smartlinkObj.targets.android.fallback=obj.targets.android.androidFallback,
        smartlinkObj.targets.web=obj.targets.web,
        smartlinkObj.launch_page.header=obj.launch_page.header


    if(smartlinkObj.slug == ""){
        smartlinkObj.slug=(Math.random()*1e16).toString(36);
    }
    dispatcher.dispatch({type:'CREATE_SMARTLINK',createdObj:
        smartlinkObj})

}

export function editSmartlink(obj){
    let smartlinkObj={};
    smartlinkObj.targets={},
        smartlinkObj.targets.ios={},
        smartlinkObj.targets.android={},
        smartlinkObj.launch_page ={},
        smartlinkObj.slug=obj.slug,
        smartlinkObj.status= obj.status,
        smartlinkObj.description= obj.description,
        smartlinkObj.targets.ios.primary=obj.targets.ios.iosPrimary,
        smartlinkObj.targets.ios.fallback=obj.targets.ios.iosFallback,
        smartlinkObj.targets.android.primary=obj.targets.android.androidPrimary,
        smartlinkObj.targets.android.fallback=obj.targets.android.androidFallback,
        smartlinkObj.targets.web=obj.targets.web,
        smartlinkObj.launch_page.header=obj.launch_page.header

    dispatcher.dispatch({type:'EDIT_SMARTLINK',editedObj:
    smartlinkObj})
}


export function deleteSmartlink(id){

    dispatcher.dispatch({type:'REMOVE_SMARTLINK',id:
    id})
}