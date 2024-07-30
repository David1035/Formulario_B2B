document.addEventListener('DOMContentLoaded', (event) => {
    const textarea = document.querySelector('.input-observaciones');

    textarea.addEventListener('input', function() {
        this.style.height = 'auto'; // Reset the height
        this.style.height = this.scrollHeight + 'px'; // Set the height based on the content
    });
});

