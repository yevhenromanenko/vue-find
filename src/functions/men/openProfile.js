import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";

export function openProfile(id) {
    window.open(`${SITE_DOMEIN}/search/man_profile/all/${id}`, '_blank');
}
