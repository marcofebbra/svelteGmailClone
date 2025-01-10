import { writable, type Writable } from "svelte/store";
import type { Email } from "$lib/types";
import { sortEmails } from "$lib/email";

async function generaEmails(n: number){
    const now = new Date();
    const oneYearAgo = new Date(now.getTime()-1000*60*60*24*365);
    try{
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const utenti = await res.json();
    let emails: Email[] = []; 
    for(let i=0; i<n; i++){
        const randomIndex = Math.round(Math.random() * (utenti.length-1))
        const newEmail: Email = {
            id: crypto.randomUUID(),
            mittente: {
                name: utenti[randomIndex].name,
                email: utenti[randomIndex].email
            },
            destinatario: ["random@mail.com"],
            cc: [],
            ccn: [],
            oggetto: utenti[randomIndex].company.name,
            testo: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan eros at magna luctus, in iaculis nisl egestas. Praesent nec gravida nibh, sit amet vehicula quam. Sed quam tortor, pharetra eget ante ut, fringilla dictum metus. Sed vel augue tellus. Nunc placerat nunc non dignissim dignissim. Sed a placerat neque. Praesent non tincidunt sem. Aliquam venenatis, neque a porta lobortis, mauris massa posuere augue, non pretium turpis neque a augue.`,
            allegati: [],
            sezione: "Posta in arrivo",
            cartella: "Principale",
            before: "Posta in arrivo",
            data: new Date (oneYearAgo.getTime() + Math.round(Math.random()*1000*60*60*24*365)),
            bozza: false,
            isUnread: true,
            isSpecial: false,
            specialPos: -1,
            isSelected: false,
        }
        emails.push(newEmail);
    }
    return emails
    }
    catch(err){
        console.log(err);
        return [] as Email[];
    }
}

async function initEmailStore(){
    const store: Writable<Email[]> = writable([], ()=>{
        if (typeof window !== 'undefined'){
            const savedValue = localStorage.getItem("emails");
            if (savedValue !== null) {
                let emails: Email[] = JSON.parse(savedValue);
                emails = emails.map((email) => {
                return {...email, data: new Date(email.data)}
                })
                store.set(emails);
            } else {
                generaEmails(60).then((value) => {
                store.set(sortEmails(value,"desc"));
                });  
            }
        }
        const unsubscribe = store.subscribe((value)=> {
            if (typeof window !== 'undefined') {
                localStorage.setItem("emails", JSON.stringify(value));
            }
        });
        return unsubscribe;
    });
    return store;
}

export const emailStore = await initEmailStore();







