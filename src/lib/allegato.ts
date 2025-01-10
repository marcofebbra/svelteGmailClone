import type { Allegato } from "./types"

export const addFiles = (allegati: Allegato[] , files: FileList | File []) => {
    const fileSemplificati = Array.from(files).map((file) => {
       const name = file.name;
       const size = file.size;
       let ext = file.name.split(".").length == 2 ? file.name.split(".")[1] : "";
       return {
        name: name,
        ext: ext,
        size: size
    }
    });
    const oldFileNames = allegati.map((allegati) => allegati.file.name);
    const uniqueFiles = fileSemplificati.filter((file) => {
        return !oldFileNames.includes(file.name);
    })
    const newAllegati = allegati.concat(uniqueFiles.map((file) => {return {id: crypto.randomUUID(), file: file} as Allegato}))
    return newAllegati
}

export const removeFile = (allegati: Allegato[] , id: string) => {
    return allegati.filter((allegato) => allegato.id !== id);
}