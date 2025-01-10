import type { Email } from "./types";

export let search = $state({
    value:"",
    searchFn(email: Email){
        const text = (`${email.destinatario.join(" ")} ${email.mittente.name} ${email.oggetto} ${email.testo}`).toLowerCase() 
        if(text.includes(this.value.toLowerCase()))
            return true;
        return false;
    }
});