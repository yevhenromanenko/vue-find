import { showBDNotification } from "@/functions/notification/showBDNotification.js";

export async function bDayNotification() {
    const birthdayUsers = await this.bDayToday();
    if (birthdayUsers.length > 0) {
        const text = `
            <ul>
                ${birthdayUsers.map(user => `
                    <li key="${user.id}">
                        🎉
                        <a href="https://findbride.com/search/man_profile/all/${user.id}" target="_blank">
                             ${user.name}
                        </a>
                        <button class="greetings-button" data-user-id="${user.id}">Привітати</button>
                        🎉
                    </li>
                  
                `).join('')}
            </ul>`;
        showBDNotification(text);

        const buttons = document.querySelectorAll('.greetings-button');
        const ladyId = this.ladyId;
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                sendGreetings(userId, ladyId);
            });

            button.style.backgroundColor = 'blue';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '5px 10px';
            button.style.borderRadius = '5px';
            button.style.cursor = 'pointer';
        });
    }
}


