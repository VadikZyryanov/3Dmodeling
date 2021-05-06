const changePhoto = () => {
    const photos = document.querySelectorAll('.command__photo');
    photos.forEach((photo) => {
        const changePhoto = () => {
            const src = photo.src;
            const twoSrc = photo.dataset.img;
            photo.src = twoSrc;
            photo.dataset.img = src;
        };
        photo.addEventListener('mouseenter', changePhoto);
        photo.addEventListener('mouseleave', changePhoto);
    });
};

export default changePhoto;