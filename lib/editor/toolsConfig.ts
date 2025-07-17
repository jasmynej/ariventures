import type { ToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Underline from "@editorjs/underline";
import Paragraph from "@editorjs/paragraph";
import ColorPicker from 'editorjs-color-picker';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
export const tools: { [toolName: string]: ToolConstructable | any } ={
    header: {
        class: Header,
        inlineToolbar: ['bold', 'italic'],
    },
    list: {
        class: List,
        inlineToolbar: true, // defaults to all available tools
    },
    underline: Underline,
    paragraph: {
        class: Paragraph,
        inlineToolbar: ['bold', 'italic', 'underline', 'link'],
    },
    ColorPicker: {
        class: ColorPicker,
    },
    image: {
        class: ImageTool,
        config: {
            uploader: {
                async uploadByFile(file: File) {
                    // your Supabase upload logic
                }
            }
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
        },
    },
    warning: Warning,
};