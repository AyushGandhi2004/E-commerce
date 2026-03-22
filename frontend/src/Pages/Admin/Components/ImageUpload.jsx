import React, { useState } from "react";
import api from '../../../api'
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

const ImageUpload = ({ setImage }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Please select a valid image file");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a file first!");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('bannerImage', file);
      const response = await api.post('/multer/banner', formData);
      setPreview(response.data.cloudinaryResponse);
      setImage(response.data.cloudinaryResponse);
      setFile(null);
    } catch (err) {
      setError("Error uploading image. Please try again.");
      console.log("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setImage(null);
    setError("");
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="preview"
            className="w-full max-w-sm h-48 object-cover rounded-lg border-2 border-[var(--color-primary-light)]"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-[var(--color-error)] text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[var(--color-primary-light)] rounded-lg cursor-pointer hover:bg-[var(--color-primary-light)]/5 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudArrowUpIcon className="w-10 h-10 text-[var(--color-primary-light)] mb-2" />
              <p className="text-sm text-[var(--color-text-primary)] font-semibold">Click to upload image</p>
              <p className="text-xs text-[var(--color-text-light)]">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="flex-grow btn-primary text-[var(--color-primary-deep)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="px-4 py-2 border-2 border-[var(--color-primary-light)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;