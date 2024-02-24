import React, { useState, useEffect, useCallback } from 'react';

const PreviewPDF = ({ inputId, alertMessage }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [fileType, setFileType] = useState('');

    const handleChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
            const fileType = file.type;
            if (fileType === 'application/pdf' || fileExtension === 'pdf') {
                const reader = new FileReader();
                reader.onload = () => {
                    setPreviewUrl(reader.result);
                    setFileType(fileType);
                };
                reader.readAsDataURL(file);
            } else {
                alert(alertMessage || "Solo se permiten archivos PDF.");
            }
        }
    }, [alertMessage]);

    useEffect(() => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('change', handleChange);
            return () => {
                input.removeEventListener('change', handleChange);
            };
        }
    }, [handleChange, inputId]);

    return (
        <div>
            {previewUrl && <embed src={previewUrl} type={fileType} width="600" height="400" /> }
        </div>
    );
};

export default PreviewPDF;
