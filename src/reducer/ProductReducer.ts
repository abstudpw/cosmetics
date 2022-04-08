import {cosmeticsData} from "../data/cosmetics-data";
import {Cosmetic} from "../model/cosmetic";

const initialState: any = {
    data: cosmeticsData,
    display: cosmeticsData,
    sort: '+id',
    min: 0,
    max: 300,
    lastId: 2,
};


export default function ProductReducer(state = initialState, action: any) {
    function dynamicSort() {

        let property = state.sort ? state.sort : '+id';
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
        }
        property = property.substr(1);
        return function (a: any,b: any) {
            /* next line works with strings and numbers,
             * and you may want to customize it to your needs
             */
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    if (action) {
        switch (action.type) {
            case `remove`:
                let withRemoved = [...state.data];
                withRemoved = withRemoved.filter(element => element.id != action.id);
                return {
                    ...state,
                    data: withRemoved,
                    display: withRemoved,
                };
            case `sort1`:
                return {
                    ...state,
                    sort: action.sort,
                };
            case `sort2`:
                let sorted = [...state.data];
                sorted = sorted.filter(element => element.price > state.min && element.price < state.max).sort(dynamicSort());
                return {
                    ...state,
                    display: sorted,
                };
            case `range1`:
                return {
                    ...state,
                    min: action.min,
                    max: action.max,
                };
            case `range2`:
                let ranged = [...state.data];
                ranged = ranged.filter(element => element.price > state.min && element.price < state.max).sort(dynamicSort());
                return {
                    ...state,
                    display: ranged,
                };
            case `new`:
                const newId = state.lastId + 1;
                const added = {...action.payload, id: newId};
                const updated = [...state.data, added]
                return {
                    ...state,
                    data: updated,
                    lastId: newId,
                    display: updated,
                };
            case `update`:
                const entity = action.payload;
                const updatedData = state.data.map((element: Cosmetic) => element.id === entity.id ? {...entity} : element);
                return {
                    ...state,
                    data: updatedData,
                    display: updatedData,
                }
            default:
                return {
                    ...state
                };
        }
    }
    else {
        return {
            ...state
        };
    }
}