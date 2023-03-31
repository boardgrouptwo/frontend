import React from 'react'
import {useEffect, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill'; 

const QuillEditor = ({ value, handleContent, quillRef, files}) => {

    const modules = useMemo(
        () => ({
        toolbar: { // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { color: [] }, { 'align': [] }, { 'background': [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ['clean'],                
            ],
            handlers: { // 위에서 만든 이미지 핸들러 사용하도록 설정
            },
        },
        /* ImageResize: {
            modules: ['Resize']
        } */
    }), [])

    const formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',        
    ]

    return (
        <div style={{height: "550px", display: "flex", justifyContent: "center", padding:"0px"}}>
            <ReactQuill 
                ref={quillRef}
                style={{height: "470px", width: "100%"}} 
                theme="snow" 
                placeholder= "본문 입력"
                modules={modules} 
                formats={formats}
                value={value} 
                onChange={(content, delta, source, editor) => {handleContent(editor.getHTML());}} />
        </div>
    )
}

export default QuillEditor