const v2 = require('cloudinary');
const fs = require('fs');

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
        // console.log('Upload result:', uploadResult);
        fs.unlinkSync(localPath, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
        return uploadResult;
    } catch (error) {
        console.error('Upload error:', error);
        fs.unlinkSync(localPath, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
        
    }
};

const DeleteImage = async (imageId) => {
    try {
        const deleteData = await v2.uploader.destroy(imageId)
        // console.log('deleted Data URL:', deleteData);
    } catch (error) {
        console.error('delete image error:', error);
        throw error;
    }
};

module.exports = { uploadImage, DeleteImage };
