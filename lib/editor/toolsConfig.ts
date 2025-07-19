import type { ToolConstructable } from '@editorjs/editorjs';
import {uploadMedia} from "@/lib/media";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Underline from "@editorjs/underline";
import Paragraph from "@editorjs/paragraph";
import ColorPicker from 'editorjs-color-picker';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import {file} from "@babel/types";
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
                    try {
                        const url = await uploadMedia({
                            bucket: 'blog-assets',
                            folder: 'body-images',
                            file,
                        });

                        return {
                            success: 1,
                            file: {
                                url: url
                            },
                        };
                    } catch (error) {
                        console.error('Upload failed', error);
                        return {
                            success: 0,
                            file: {},
                        };
                    }
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