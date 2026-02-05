import { HardDriveUpload, X } from 'lucide-react'
import React, { type InputHTMLAttributes, useState } from 'react'

export type UploadFileProps =
    InputHTMLAttributes<HTMLInputElement> & {
        accept?: string
        multiple?: boolean
        onChange?: (files: File[]) => void
        placeholder?: string
    }

export const UploadFile = ({
    onChange,
    multiple = false,
    accept = '*',
    placeholder = 'Upload file'
}: UploadFileProps) => {
    const [files, setFiles] = useState<File[]>([])

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = event.target.files
            ? Array.from(event.target.files)
            : []
        updateFiles(selectedFiles)
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const droppedFiles = event.dataTransfer.files
            ? Array.from(event.dataTransfer.files)
            : []
        updateFiles(droppedFiles)
    }

    const updateFiles = (newFiles: File[]) => {
        const updatedFiles = multiple
            ? [...files, ...newFiles]
            : newFiles
        setFiles(updatedFiles)
        onChange?.(updatedFiles)
    }

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index)
        setFiles(updatedFiles)
        onChange?.(updatedFiles)
    }

    return (
        <div className="w-[130px]">
            <div
                className="flex flex-col  items-center justify-center w-full py-3 border border-secondary-6 rounded-md cursor-pointer "
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}>
                <input
                    type="file"
                    className="hidden"
                    multiple={multiple}
                    accept={accept}
                    onChange={handleFileChange}
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center justify-between gap-3 text-[14px]">
                    <HardDriveUpload
                        size={17}
                        className="text-text"
                    />
                    <span className="text-text">{placeholder}</span>
                </label>
            </div>

            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-2 border rounded bg-white shadow-sm">
                            <span className="truncate w-40 text-[14px]">
                                {file.name}
                            </span>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeFile(index)}>
                                <X size={17} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
