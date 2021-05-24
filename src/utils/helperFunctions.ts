import Item from "../model/Item";

export const transformFBList: (arg: any) => any = (response) => {
    let result: Item[] = []
    for (let key in response) {
        // result.push(new Item()) 
    }
}