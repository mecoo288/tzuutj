
export const  updateByRegionOfFwz=(state,payload)=>{
    
       var chartType=state.default.filter.type;
console.log(chartType,222)       
       if(payload.arg){
	   
           if(payload.arg.type=='province'){
              state.default.filter.province_code=payload.arg.province_code
           }else{
               state.default.filter.city_code=payload.arg.city_code
           }

       }

       
        if(payload.list){
	   var mlist=state.default.chartList[chartType];
	    if(mlist){
		mlist.series[0].data=payload.list
	    }
         }

}

export const updateByFwsOfFwz=(state,payload)=>{
        var chartType=state.default.filter.type

        if(payload.arg){
            state.default.filter.fwsName=payload.arg.fwsName
        }

        if(payload.list){

           var mlist=state.default.chartList[chartType];
            if(mlist){
                mlist.series[0].data=payload.list
            }
         }

}


export const updateByTypeOfFwz=(state,payload)=>{
        
        if(payload.arg){
           state.default.filter.type=payload.arg.chartType
        }
    
        if(payload.list){
           var mlist=state.default.chartList[payload.arg.chartType];
            if(mlist){
                mlist.series[0].data=payload.list
            }
         }

}


export const updateByDateOfFwz=(state,payload)=>{
    if(payload.arg){
	state.default.filter.dateStart=payload.arg.startDate
	state.default.filter.dateEnd  =payload.arg.endDate
    }
    
    var chartType=state.default.filter.type
    
    if(payload.list){
	
	    var mlist=state.default.chartList[chartType];
	    if(mlist){
                mlist.series[0].data=payload.list
            }
	
    }
}

export const updateTableOfFwz=(state,payload)=>{

   if(payload.arg){
        if(payload.arg.page){
            state.default.filter.page=payload.arg.page
        }
        if(payload.arg.threeType){
            state.default.filter.threeType=payload.arg.threeType
        }
    }

    
    if(payload.list){
	state.default.tableList.trtotal=payload.list.length
	var name=payload.type+"List"
	state.default.tableList[name]=payload.list
    }
}

export const initTableOfFwz=(state,payload)=>{

   if(payload.arg){
        if(payload.arg.page){
            state.default.filter.page=payload.arg.page
        }
        if(payload.arg.threeType){
            state.default.filter.threeType=payload.arg.threeType
        }
    }


    if(payload.firstList){
        state.default.tableList.trtotal=payload.firstList.length
	state.default.tableList.firstList=payload.firstList

	
	state.default.tabList.forEach(function(val,key,array){
	    
	    payload.firstList.forEach(function(v,k,arr){
		 state.default.tableList["dateList"][k]={count:''};
		state.default.tableList[val.alias+"List"][k]={count:''};
	    });
	});
	
    }
}




export const updatePageOfFwz=(state,payload)=>{

     state.default.page.pages=[]
    if(payload.total>0&&payload.hasMore){


        state.default.page.totalPage=Math.ceil(payload.total/state.default.filter.pageNum);
         state.default.page.placeholder="输入跳转页码，共("+state.default.page.totalPage+"页)"
        var numShow=Math.min(state.default.filter.pageNum,state.default.page.totalPage)
        var newPage=[];
        for(var i=1;i<=numShow;i++){
               newPage.push(i);
        }

         state.default.page.pages=newPage

    }
}
