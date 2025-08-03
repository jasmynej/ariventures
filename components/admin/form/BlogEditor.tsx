'use client';
import { useEffect, useRef, useId, useState } from 'react';
import { createEditorJsInstance } from "@/lib/editor/editorInstance";
import { FormComponentProps } from "@/types";
import EditorJS from "@editorjs/editorjs";
import styles from "@/styles/admin/blogForm.module.css";

export default function BlogEditor({ value, onChangeAction }: FormComponentProps) {
    const editorRef = useRef<EditorJS | null>(null);
    const holderId = useId();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // triggers after first mount
    }, []);

    useEffect(() => {
        if (!isClient) return;

        editorRef.current = createEditorJsInstance(holderId, {
            data: value,
            onChange: async () => {
                const output = await editorRef.current?.save();
                onChangeAction(output);
            },
        });

        return () => {
            editorRef.current?.destroy();
            editorRef.current = null;
        };
    }, [isClient]);

    return <div id={holderId} className={styles.textEditor} />;
}