function showToast(message, type = "success") {

    const toast = document.getElementById("liveToast");
    const msg = document.getElementById("toastMessage");

    // Toast HTML doesn't exist
    if (!toast || !msg) {
        alert(message);
        return;
    }

    msg.innerHTML = message;

    toast.className = "toast align-items-center border-0";

    if (type === "success") {

        toast.classList.add("text-bg-success");

    } else if (type === "error") {

        toast.classList.add("text-bg-danger");

    } else if (type === "warning") {

        toast.classList.add("text-bg-warning");

    } else {

        toast.classList.add("text-bg-primary");

    }

    const bsToast = new bootstrap.Toast(toast);

    bsToast.show();

}