import { tabs } from "./data/tabs";

export let page = $state({value: 0});
export let sorting: {value: "asc" | "desc" | "special"} = $state({value: "desc"});
export let tabSelected: {value: number} = $state({value: 0});

export const getTab = (index: number) => {
    try{
        if(index < 0 && index >= tabs.length)
            throw new Error ("Indice tab non valido");
        return tabs[index];
    } catch(error){
        console.log(error);
        return undefined;
    }
}

