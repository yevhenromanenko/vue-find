import Swal from "sweetalert2";

export async function showDeleteNotification(title) {
    return await Swal.fire({
        title: `${title}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Видалити',
        cancelButtonText: 'Скасувати',
    });
}
