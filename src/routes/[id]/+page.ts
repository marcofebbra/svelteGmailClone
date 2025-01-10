import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { emailStore } from '../../store/emailStore';
import { get } from 'svelte/store';
import type { Email } from '$lib/types';

export const ssr = false;
export const load: PageLoad = ({ params }) => {

    return {
        id: params.id
    }
    // let emails = get(emailStore);
    // let email = emails.filter((tmp) => tmp.id === params.id);

    // if(email.length === 1)
    //     return email[0] as Email;
	
    error(404, 'Not found');
};