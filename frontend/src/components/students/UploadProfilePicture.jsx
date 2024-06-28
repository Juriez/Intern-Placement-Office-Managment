import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dashboardImage from '../../assets/dashboardSt2.png';

const UploadProfilePicture = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false);
      setImageUrl(info.file.response.url);
    }
  };

  const uploadButton = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined style={{ color: '#fff', fontSize: '24px' }} />}
      <div style={{ marginTop: 8, color: '#fff' }}>Upload</div>
    </div>
  );

  return (
    <div  style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `url(${dashboardImage})`, // Set the background image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#fff', // Text color
      }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundColor: 'rgba(255, 50, 190, 0.9)' }}>
      <Upload
      
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/upload/profile-picture"
        beforeUpload={() => false} // Return false so that we can manage upload manually
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  </div>
  );
};

export default UploadProfilePicture;
