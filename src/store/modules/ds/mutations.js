    
export const updateTableOfDs=(state,payload)=>{

     if(payload.total){
         state.default.page.total=payload.total
    }

   if(payload.arg){
        if(payload.arg.page){
            state.default.filter.page=payload.arg.page
        }
        
    }

    
    if(payload.list){
	 state.default.tableList.trtotal=payload.list.length
	var name=payload.type+"List"
	state.default.tableList[name]=payload.list
    }
}

export const initTableOfDs=(state,payload)=>{

     if(payload.total>0){
	 state.default.page.total=payload.total
        state.default.page.totalPage=Math.ceil(payload.total/state.default.filter.pageNum);
    }


    if(payload.firstList){
        state.default.tableList.trtotal=payload.firstList.length


	state.default.tabList.forEach(function(val,key,array){
	    
	    payload.firstList.forEach(function(v,k,arr){
		 state.default.tableList[val.alias+"List"][k]={count:''};
	    });
	});
	
    }
}


export const updateFilterOfDs=(state,payload)=>{
   
    if(payload.arg){
	
	if(payload.arg.name=='全部'){
	    state.default.filter.cityName='全部'
	}else{
	     state.default.filter.cityName=payload.arg.name
	}
	
	if(payload.arg.fwzName||payload.arg.fwzName==''){
            state.default.filter.fwzName=payload.arg.fwzName
        }
	
	

    }

if(payload.search){
    state.default.now.search=''
}
}



export const updateByDateOfDs=(state,payload)=>{

    if(payload.arg){
        if(payload.arg.startDate){
            state.default.filter.dateStart=payload.arg.startDate
        }

        if(payload.arg.endDate){
            state.default.filter.dateEnd=payload.arg.endDate
        }



    }
}



