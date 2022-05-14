import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { defineModule } from 'zoov';
import { persist } from 'zustand/middleware';

export type ITodoCategory = 'next' | 'project' | 'maybe' | 'waiting';
export type ITodo = {
  id: string;
  title: string;
  checked: boolean;
  createdAt: string;
  category?: ITodoCategory;
  finishedAt?: string;
};

export const todoModule = defineModule<{ todoList: ITodo[] }>({
  todoList: [],
})
  .actions({
    updateTodoChecked: (state, id: string, checked?: boolean) => {
      const todo = state.todoList.find((i) => i.id === id);
      if (!todo) return;
      if (checked === undefined) todo.checked = !todo.checked;
      else todo.checked = checked;
      if (todo.checked) todo.finishedAt = dayjs().toISOString();
    },
    updateTodoCategory(state, id: string, category?: ITodoCategory) {
      const todo = state.todoList.find((i) => i.id === id);
      if (!todo) return;
      todo.category = category;
    },
    updateTodoTitle(state, id: string, title?: string) {
      const todo = state.todoList.find((i) => i.id === id);
      if (!todo) return;
      todo.title = title || 'Empty';
    },
    createTodo: (state, title: string, category?: ITodoCategory, createAt?: string) => {
      const createdAt = createAt || dayjs().toISOString();
      state.todoList.push({ id: nanoid(), title, createdAt, checked: false, category });
    },
    deleteTodo: (state, id: string) => {
      state.todoList = state.todoList.filter((i) => i.id !== id);
    },
  })
  .methods(({ getActions, getState }) => ({
    initDefaultTodoList: () => {
      const { createTodo } = getActions();
      const { todoList } = getState();
      if (todoList.length > 0) return;
      createTodo('[Finish] me by click', 'next');
      createTodo('[Create] a task by click the "+" button', 'next');
      createTodo('[Delete] a task by enter edit mode', 'next');
      createTodo('Put this app on blockchain', 'waiting', '2022-05-13');
      createTodo('Clone the Github Repo', 'maybe');
      createTodo('Learn some Web3 knowledge', 'maybe');
    },
  }))
  .middleware((store) => persist(store, { name: 'todo-list', version: 2 }))
  .build();
