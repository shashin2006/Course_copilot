import { useState } from 'react';
import { uploadPdf } from '../../services/api';

const PdfUploader = ({ onStatusChange }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    onStatusChange('Uploading...');

    try {
      // Attach upload progress handler via a small convention on the File object
      file._uploadConfig = {
        onUploadProgress: (evt) => {
          if (!evt.lengthComputable) return;
          const percent = Math.round((evt.loaded * 100) / evt.total);
          setProgress(percent);
        }
      };

      await uploadPdf(file);
      onStatusChange('Upload successful!');
      setFile(null);
      setProgress(0);
    } catch (error) {
      onStatusChange('Upload failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex-1">
          <div className="flex items-center justify-between p-3 border border-dashed rounded-md cursor-pointer hover:border-gray-400 bg-white">
            <span className="text-sm text-gray-600">{file ? file.name : 'Choose PDF file to upload'}</span>
            <span className="text-xs text-gray-400">.pdf</span>
          </div>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {loading && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;