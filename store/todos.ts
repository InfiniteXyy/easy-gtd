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
    },
    createTodo: (state, title: string, category?: ITodoCategory) => {
      const createdAt = dayjs().toISOString();
      state.todoList.push({ id: nanoid(), title, createdAt, checked: false, category });
    },
  })
  .methods(({ getActions, getState }) => ({
    initDefaultTodoList: () => {
      const { createTodo } = getActions();
      const { todoList } = getState();
      if (todoList.length > 0) return;
      createTodo('Finish the GTD design', 'next');
      createTodo('Call Alice to the party', 'next');
      createTodo('Learn Figma for 10 mins', 'project');
      createTodo('Buy some food', 'project');
      createTodo('Learn Vue3', 'project');
      createTodo('Something good happens', 'waiting');
      createTodo('Buy a car', 'maybe');
      createTodo('Learn dapp', 'maybe');
    },
  }))
  .middleware((store) => persist(store, { name: 'todo-list', version: 1 }))
  .build();
