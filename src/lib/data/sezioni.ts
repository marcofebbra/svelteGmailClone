import { Inbox, SendHorizontal, Star, StickyNote, Trash2, type Icon as IconType } from "lucide-svelte";

export const sezioni = [
    {
        id: 0,
        name: "Posta in arrivo",
        icon: Inbox
    },
    {
        id: 1,
        name: "Speciali",
        icon: Star
    },
    {
        id: 2,
        name: "Inviati",
        icon: SendHorizontal
    },
    {
        id: 3,
        name: "Bozze",
        icon: StickyNote
    },
    {
        id: 4,
        name: "Cestino",
        icon: Trash2
    }
]