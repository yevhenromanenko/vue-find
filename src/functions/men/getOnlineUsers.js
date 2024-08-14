import axios from "axios";

export async function getOnlineUsers() {
    try {
        const response = await axios.get('https://api.findbride.com/api/v3/users/get_online_list/man.json');
        this.usersOnline = response.data;

    } catch (error) {
        console.error('Error fetching online users:', error);
    }
}
