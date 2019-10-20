import * as actionTypes from './actions'

const initialState = {
        LAmin: 500,
        LAmax: 5000,
        LAvalue:500,
        LDmin:6,
        LDmax:24,
        LDvalue:6,
        loanCalcData: [],
        localStorageData: []
}

const historyDataArray = []
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LA_SLIDER_SLIDE:

        historyDataArray.push({
            'LA':state.LAvalue,
            'LD':state.LDvalue
        })
        return{
            ...state,
            LAvalue:action.ingredientNameD,
            //LDvalue:state.LDvalue,
            localStorageData: historyDataArray
    
        }

        case actionTypes.LD_SLIDER_SLIDE:

        historyDataArray.push({
            'LA':state.LAvalue,
            'LD':state.LDvalue
        })
        return{
            ...state,
            LDvalue:action.ingredientName,
            localStorageData: historyDataArray
    
        }

        default:
        return state;
    }
}

export default reducer;