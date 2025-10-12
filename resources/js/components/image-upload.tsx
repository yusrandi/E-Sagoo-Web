import { Image } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
    initialImage?: string | null; // bisa URL string dari server atau null
    onImageUpload: (file: File) => void;
    onImageDelete?: () => void;
}

function ImageUpload({ initialImage, onImageUpload, onImageDelete }: ImageUploadProps) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(initialImage || null);
    const [objectUrl, setObjectUrl] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            // revoke dulu kalau sebelumnya ada URL biar nggak leak
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }

            const previewUrl = URL.createObjectURL(file);
            setImagePreviewUrl(previewUrl);
            setObjectUrl(previewUrl);

            onImageUpload(file);
        },
        [onImageUpload, objectUrl],
    );

    const removeImage = () => {
        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
            setObjectUrl(null);
        }
        setImagePreviewUrl(null);
        if (onImageDelete) onImageDelete();
    };

    useEffect(() => {
        return () => {
            // cleanup saat komponen unmount
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [objectUrl]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
        },
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    return (
        <div className="flex w-full flex-col items-center">
            {imagePreviewUrl ? (
                <div className="aspect-[2/1] w-full overflow-hidden rounded-lg border-2 border-primary p-2">
                    <div className="flex h-full w-full items-center justify-center">
                        <img src={imagePreviewUrl} alt="Preview" className="h-full w-full object-contain" />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <div className="absolute -bottom-1 w-full">
                            <button
                                type="button"
                                onClick={removeImage}
                                className="w-full cursor-pointer rounded-lg bg-primary py-2 text-[12px] font-bold text-white transition-colors hover:bg-primary/80 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none dark:hover:bg-primary/80 dark:focus:ring-offset-slate-900"
                            >
                                Hapus gambar
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`relative flex aspect-[2/1] w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-2 text-center transition-colors ${
                        isDragActive ? 'border-primary bg-primary/5' : 'border-primary'
                    }`}
                >
                    <input {...getInputProps()} className="absolute inset-0 -z-10 h-0 w-0 opacity-0" type="file" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-primary">
                            <Image className="size-[30px]" />
                        </span>
                        <p className="mt-2 text-[14px] font-bold text-primary">Unggah gambar</p>
                        <p className="text-[12px] text-gray-400">(Maks. Ukuran: 5 MB)</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
