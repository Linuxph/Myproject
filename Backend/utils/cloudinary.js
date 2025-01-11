const v2 = require('cloudinary');

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadImage = async (localPath, name) => {
    try {
        console.log('File path:', localPath);
        const uploadResult = await v2.uploader.upload(localPath, {
            public_id: name,
            resource_type: "auto"
        });
        console.log('Upload result:', uploadResult);
        return uploadResult;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};

const fetchImage = async (imageName) => {
    try {
        const optimizeUrl = v2.url(imageName, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        console.log('Optimized URL:', optimizeUrl);
        return optimizeUrl;
    } catch (error) {
        console.error('Fetch image error:', error);
        throw error;
    }
};

module.exports = { uploadImage, fetchImage };
