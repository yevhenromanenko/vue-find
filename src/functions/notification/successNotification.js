import Swal from "sweetalert2";

export function successNotification() {
    return Swal.fire(
        'Дякую',
        'Інвайт було видалено.',
        'success'
    );
}
