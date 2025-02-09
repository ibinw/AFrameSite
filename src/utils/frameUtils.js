function detectTransparentArea(frameSrc) {
    return new Promise((resolve) => {
        // Adjusted dimensions to match the actual frame's inner area
        const transparentArea = {
            x: 40,    // Reduced left margin
            y: 40,    // Reduced top margin
            width: 637,  // 717 - (40 * 2)
            height: 785, // 865 - (40 * 2)
            innerWidth: 637,
            innerHeight: 785
        };
        resolve(transparentArea);
    });
}

async function initializeFramePreview(frameOverlay, container, uploadedImage) {
    const uploadedImageBase64 = localStorage.getItem('uploadedImage');
    if (uploadedImageBase64) {
        try {
            // Set container position and size based on fixed dimensions
            container.style.width = '637px';   // Adjusted width
            container.style.height = '785px';  // Adjusted height
            container.style.top = '40px';      // Adjusted top margin
            container.style.left = '40px';     // Adjusted left margin
            
            // Set image source
            uploadedImage.src = uploadedImageBase64;
            
            uploadedImage.onload = function() {
                const containerAspect = container.offsetWidth / container.offsetHeight;
                const imageAspect = this.naturalWidth / this.naturalHeight;

                if (imageAspect > containerAspect) {
                    this.style.width = '100%';
                    this.style.height = 'auto';
                } else {
                    this.style.width = 'auto';
                    this.style.height = '100%';
                }
            };
            return true;
        } catch (error) {
            console.error('Error initializing frame preview:', error);
            return false;
        }
    }
    return false;
}

// Make the function available globally
window.initializeFramePreview = initializeFramePreview; 