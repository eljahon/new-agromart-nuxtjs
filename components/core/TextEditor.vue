<template>
  <div>
    <client-only>
      <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
        <div>
          <button class="h-8 w-8" :class="isActive.bold() ? 'bg-gray-400 text-black rounded-xl' : 'text-black'" @click="commands.bold">
            <font-awesome-icon class="h-4 w-4 text-gray-700" icon="bold" />
          </button>
          <button class="h-8 w-8" :class="isActive.italic() ? 'bg-gray-400 text-black rounded-xl' : 'text-black'" @click="commands.italic">
            <font-awesome-icon class="h-4 w-4 text-gray-700" icon="italic" />
          </button>
          <button class="h-8 w-10" :class="isActive.strike() ? 'bg-gray-400 text-black rounded-xl' : 'text-black'" @click="commands.strike">
            <font-awesome-icon class="h-4 w-4 text-gray-700" icon="strikethrough" />
          </button>
          <button class="h-8 w-8" :class="isActive.underline() ? 'bg-gray-400 text-black rounded-xl' : 'text-black'" @click="commands.underline">
            <font-awesome-icon class="h-4 w-4 text-gray-700" icon="underline" />
          </button>
        </div>
      </editor-menu-bar>
      <editor-content :editor="editor" />
    </client-only>
  </div>
</template>
<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
  Search,
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Focus
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {},
  data () {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Placeholder(),
          new Search(),
          new Table(),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new Focus()
        ],
        content: `
          <h1>Yay Headlines!</h1>
          <p>All these <strong>cool tags</strong> are working now.</p>
        `
      })
    }
  },
  mounted () {},
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
