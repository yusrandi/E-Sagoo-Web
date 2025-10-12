import { useEffect, useRef, useState } from 'react';

type TinyMCEEditorProps = {
    id: string;
    name?: string;
    value?: string;
    onChange?: (name: string, content: string) => void;
    height?: number;
    toolbar?: 'full' | 'simple';
};

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ id, name = '', value = '', onChange = () => {}, height = 350, toolbar = 'full' }) => {
    const editorRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);
    const [initError, setInitError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Toolbar configuration
    const getToolbar = (): string => {
        return toolbar === 'full'
            ? 'undo redo | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist indent | image table | charmap hr | code fullscreen preview'
            : 'bold italic underline | forecolor backcolor | numlist | image table | charmap';
    };

    // Check if TinyMCE is available
    const checkTinyMCE = (): boolean => {
        return typeof window !== 'undefined' && !!(window as any).tinymce && typeof (window as any).tinymce.init === 'function';
    };

    // Initialize editor
    const initEditor = (): void => {
        const tinymce = (window as any).tinymce;
        if (!checkTinyMCE()) {
            setInitError('TinyMCE not available');
            return;
        }

        if (!id) {
            setInitError('ID is required');
            return;
        }

        // Remove existing instance if any
        const existingEditor = tinymce.get(id);
        if (existingEditor) {
            existingEditor.remove();
        }

        try {
            tinymce.init({
                license_key: 'gpl',
                selector: `#${id}`,
                branding: false,
                height,
                plugins: 'autolink lists link image charmap preview anchor table code',
                toolbar: getToolbar(),
                menubar: false,
                setup: (editor: any) => {
                    editorRef.current = editor;

                    editor.on('init', () => {
                        setIsReady(true);
                        if (value) {
                            editor.setContent(value);
                        }
                    });

                    editor.on('change keyup', () => {
                        const content = editor.getContent();
                        onChange(name, content);
                    });
                },
                init_instance_callback: () => {},
            });
        } catch (error: any) {
            setInitError(`Editor init failed: ${error.message}`);
            console.error('TinyMCE init error:', error);
        }
    };

    // Load TinyMCE script (hanya sekali per aplikasi)
    useEffect(() => {
        const loadScript = () => {
            const tinymce = (window as any).tinymce;
            if (checkTinyMCE()) {
                initEditor();
                return;
            }

            const existingScript = document.getElementById('tinymce-script');
            if (existingScript) {
                const checkLoaded = setInterval(() => {
                    if (checkTinyMCE()) {
                        clearInterval(checkLoaded);
                        initEditor();
                    }
                }, 100);

                setTimeout(() => {
                    clearInterval(checkLoaded);
                    if (!checkTinyMCE()) {
                        setInitError('TinyMCE loading timeout');
                    }
                }, 500);
                return;
            }

            const script = document.createElement('script');
            script.id = 'tinymce-script';
            script.src = '/tinymce/js/tinymce/tinymce.min.js';
            script.referrerPolicy = 'origin';

            script.onload = () => {
                setTimeout(() => {
                    initEditor();
                }, 100);
            };

            script.onerror = () => {
                setInitError('Failed to load TinyMCE script');
            };

            document.head.appendChild(script);
        };

        loadScript();
    }, [id]);

    // Update content ketika value berubah dari luar
    useEffect(() => {
        if (isReady && editorRef.current && value !== editorRef.current.getContent()) {
            editorRef.current.setContent(value || '');
        }
    }, [value, isReady]);

    // Cleanup editor saat unmount
    useEffect(() => {
        return () => {
            if (editorRef.current) {
                try {
                    editorRef.current.remove();
                } catch (error) {
                    console.warn('Error removing editor:', error);
                }
            }
        };
    }, []);

    if (initError) {
        return (
            <div style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '4px' }}>
                <strong>TinyMCE Error:</strong> {initError}
                <textarea
                    ref={textareaRef}
                    id={id}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    style={{ width: '100%', height: height, marginTop: '10px' }}
                />
            </div>
        );
    }

    return <textarea ref={textareaRef} id={id} name={name} defaultValue={value} style={{ width: '100%', height: height }} />;
};

export default TinyMCEEditor;
