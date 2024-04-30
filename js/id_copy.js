const idCopy = document.querySelector('.id-copy');

idCopy.addEventListener('click', () => {
    navigator.clipboard.writeText('123456');
    idCopy.classList.add('copied');
    setTimeout(() => {
        idCopy.classList.remove('copied');
    }, 1000);
});