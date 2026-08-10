import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface PhotoUploaderProps {
  photo: string | null;
  onPhotoChange: (photoDataUrl: string | null) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photo, onPhotoChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload an image file (JPG, PNG, WEBP, HEIC)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 10MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onPhotoChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="photo-uploader-field">
      <label className="form-label">
        BUILDER PHOTO
        <span className="label-subtext"> (JPG, PNG, WEBP • Max 10MB)</span>
      </label>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp, image/heic"
        style={{ display: 'none' }}
      />

      {photo ? (
        <div className="uploader-preview-box">
          <img src={photo} alt="Uploaded photo" className="preview-img" />
          <div className="preview-actions">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-action-small"
            >
              Change Photo
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="btn-action-small danger"
              title="Remove photo"
            >
              <X size={14} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`uploader-dropzone ${isDragging ? 'dragging' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="dropzone-icon">
            <Upload size={24} />
          </div>
          <div className="dropzone-text">
            <strong>Drop your photo here</strong> or <span className="highlight-browse">browse</span>
          </div>
          <div className="dropzone-sub">Aspect ratio automatically fits your Builder Pass frame</div>
        </div>
      )}

      {errorMsg && <div className="uploader-error">{errorMsg}</div>}
    </div>
  );
};
