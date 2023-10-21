import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/photoswipe.css";


export function PhotoSwipeLightboxInit() {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#pswp-gallery',
        children: 'a',
        pswpModule: () => import('photoswipe'),
        zoom: false
    });
    lightbox.init();
}