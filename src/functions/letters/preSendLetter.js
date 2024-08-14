import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";
const PreSendLetter = async (subject, letter, photoId, videoId, ladyId, manId) => {
    const formData = new FormData();
    formData.append('is_autosave', '1');
    formData.append('go', 'Send');
    try {
        const res = await fetch(`${SITE_DOMEIN}/mess/send/all/${manId}?opened_form=1`);
        if (res.ok) {
            const data = await res.text();
            const mesSettId = ((data.split(`name="mess_sett_id" value="`) || [])[1] || '').split(`">`)[0];
            formData.append('mess_sett_id', mesSettId);
            formData.append('form[value3]', subject); //subj letter
            formData.append('real', letter); //body letter
            formData.append('form[value4]', ''); //const empty string
            formData.append('draft_img', photoId); //id photo in letter
            formData.append('form[value36]', photoId); //id photo in letter too (it's doubling)
            formData.append('video', videoId); //id video in letter
            const value41 = ((data.split(`form[value41]" value="`) || [])[1] || '').split(`" />`)[0];
            formData.append('form[value41]', value41);
            const value40 = ((data.split(`form[value40]" value="`) || [])[1] || '').split(`" />`)[0];
            formData.set('form[value40]', value40);
            const value33 = ((data.split(`form[value33]" value="`) || [])[1] || '').split(`" />`)[0];
            formData.set('form[value33]', value33);
            return formData;
        }
        const error = res.statusText;
        console.error(error)
        return null; //delete this mass mail user from my users??
    } catch (e) {
        let errorMessage = 'Catch error PreSendLetter';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        console.error(errorMessage);
        return null;
    }
};

export default PreSendLetter;
