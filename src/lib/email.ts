import { get } from "svelte/store";
import { emailStore } from "../store/emailStore";
import type { Email } from "./types";

export const createEmail = () => {
        const email : Email={
            id: crypto.randomUUID(),
            mittente: {name: "Marco Febbraro", email: "colloquio@gmail.com"},
            destinatario: ["random@mail.com"],
            cc: [],
            ccn: [],
            oggetto: "",
            testo: "",
            allegati: [],
            sezione: "Bozze",
            cartella: "Principale",
            before: "Bozze",
            data: new Date(),
            bozza: true,
            isUnread: false,
            isSpecial: false,
            specialPos: -1,
            isSelected: false,
        }
        emailStore.update(emails => [...emails, email]);
        return email.id;
}


export const updateEmails = (ids: string[], updates: Partial<Email>, event?: Event) => {
    if(event)
        event.stopPropagation();
    
    emailStore.update(emails =>
        emails.map(email =>
          ids.includes(email.id) ? { ...email, ...updates } : email
        )
    );
}

export const deleteEmails = (ids: string[], event?: Event) => {
    if(event)
        event.stopPropagation();

    emailStore.update(emails =>
        emails.map(email =>
          ids.includes(email.id) ? { ...email, before: email.sezione, sezione: "Cestino" } : email
        )
    );
}

export const restoreEmails = (ids: string[], event?: Event) => {
    if(event)
        event.stopPropagation();
    
    emailStore.update(emails =>
        emails.map(email =>
          ids.includes(email.id) ? { ...email, sezione: email.before } : email
        )
    );
}


export const sortEmails = (emails: Email[], sorting: "asc" | "desc" | "special") => {
    if(sorting == "asc")
        emails.sort((a,b) => a.data.getTime() - b.data.getTime());
    else if (sorting == "desc")
        emails.sort((a,b) => b.data.getTime() - a.data.getTime());
    else 
        emails.sort((a,b) => a.specialPos - b.specialPos);
    return emails;
}



