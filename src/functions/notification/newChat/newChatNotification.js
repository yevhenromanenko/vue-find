import Swal from "sweetalert2";

export async function newChatNotification() {
    return await Swal.fire({
        title: 'Почався чат!',
        text: 'Чи хочете перейти в чат?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Перейти',
        cancelButtonText: 'Відмінити'
    })
}
