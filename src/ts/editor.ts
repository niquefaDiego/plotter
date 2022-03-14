import { Editor, fromTextArea } from "codemirror";
const _textArea: HTMLTextAreaElement = document.getElementById("editorTextArea") as HTMLTextAreaElement;

const editor = fromTextArea(_textArea, {
  lineNumbers: true,
  mode: "javascript",
  // theme: "monokai",
});

const defaultTextAreaValue = "0 0\n0 7\n1 7\n1 6\n2 6\n2 7\n3 7\n3 5\n1 5\n1 4\n4 4\n4 7\n7 7\n7 6\n5 6\n5 5\n7 5\n7 4\n6 4\n6 3\n7 3\n7 1\n6 1\n6 2\n5 2\n5 0\n2 0\n2 1\n4 1\n4 3\n3 3\n3 2\n2 2\n2 3\n1 3\n1 0\n0 0\n";
editor.setValue(defaultTextAreaValue);

// This is async since I want to lazy load it in the future
export async function getEditor(): Promise<Editor> {
  return editor;
}

export async function getEditorText(): Promise<string> {
  return editor.getValue();
}

export async function addEditorKeyMap(key: string, f: () => Promise<void>) {
  editor.addKeyMap({ key: function (ed: Editor) { f(); }});
}