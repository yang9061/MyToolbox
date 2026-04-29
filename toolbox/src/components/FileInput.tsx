interface FileInputProps {
  label?: string;
  accept?: string;
  onChange: (file: File | null) => void;
  error?: string;
  preview?: string | null;
}

export function FileInput({ label, accept, onChange, error, preview }: FileInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <label
          className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:border-primary transition-colors ${error ? 'border-error dark:border-error' : 'border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200'}`}
        >
          <span className="text-sm">选择文件</span>
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </label>
        {preview && (
          <img
            src={preview}
            alt="预览"
            className="w-12 h-12 object-contain rounded border border-gray-300 dark:border-gray-700"
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-error">{error}</p>
      )}
    </div>
  );
}
