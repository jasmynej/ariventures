
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { tools } from "./toolsConfig";

export function createEditorJsInstance(holderId: string, opts?: {
    data?: OutputData | null;
    onChange?: () => void;
}) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        throw new Error('EditorJS must be run in the browser');
    }

    return new EditorJS({
        holder: holderId,
        tools,
        data: opts?.data ?? undefined,
        onChange: opts?.onChange,
        autofocus: true,
        placeholder: 'Write your post content here...',
    });
}