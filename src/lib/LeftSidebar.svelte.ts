import { sezioni } from "./data/sezioni"

export let leftSidebar = $state({
    isOpen: false,
    selected: sezioni[0],
    open(){
        this.isOpen=true
    },
    close(){
        this.isOpen=false
    },
    toggle(){
        this.isOpen=!this.isOpen
    }
})

export let rightSidebar = $state({
    isOpen: true,
    selected: 0,
    open(){
        this.isOpen=true
    },
    close(){
        this.isOpen=false
    },
    toggle(){
        this.isOpen=!this.isOpen
    }
})