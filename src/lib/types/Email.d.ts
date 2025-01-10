import type { User } from "./User"

export type Email = {
    id: string,
    mittente: User,
    destinatario: string[],
    cc: string[],
    ccn: string[],
    oggetto: string,
    testo: string,
    allegati: Allegato[],
    sezione: string,
    cartella: string,
    before: string,
    data: Date,
    bozza: boolean
    isUnread: boolean,
    isSpecial: boolean,
    specialPos: number,
    isSelected: boolean,
}