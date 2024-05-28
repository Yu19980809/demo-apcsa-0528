import Editor from '@monaco-editor/react'

const MonacoEditor = () => {
  return (
    <Editor
      language="java"
      theme="vs"
      options={{ fontSize: 14 }}
      className="w-full h-full bg-background/80"
    />
  )
}

export default MonacoEditor
