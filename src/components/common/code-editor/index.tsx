import React, { useRef, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const CodeEditor = (props: { language: string; defaultValue: string }) => {
  const { language, defaultValue } = props;
  const monacoRef = useMonaco();
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && monacoRef) {
      editorRef.current.setValue(defaultValue);
      monacoRef.editor.getAction("editor.action.formatDocument").run();
    }
  }, [defaultValue, monacoRef]);

  return (
    <Editor
      height="90vh"
      defaultLanguage={language || "javascript"}
      theme="vs-dark"
      options={{
        automaticLayout: true,
      }}
      onMount={(editor) => {
        editorRef.current = editor;
        editor.setValue(defaultValue);
      }}
    />
  );
};

export default CodeEditor;
