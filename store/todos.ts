import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { defineModule } from 'zoov';
import { persist } from 'zustand/middleware';
import { sorterBy } from '~/common';

export type ITodoCategory = 'next' | 'project' | 'maybe' | 'waiting';
export type ITodo = {
  id: string;
  title: string;
  checked: boolean;
  createdAt: string;
  category?: ITodoCategory;
  finishedAt?: string;
  routineId?: string;
  isDeleted?: boolean;
};

export type IRoutine = {
  id: string;
  title: string;
  createdAt: string;
  config: number[];
};
export const todoModule = defineModule<{ todoList: ITodo[]; routines: IRoutine[] }>({
  todoList: [],
  routines: [],
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
      todo.title = title || '';
    },
    reorderItems(state, todos: ITodo[]) {
      state.todoList = [...state.todoList].sort(
        sorterBy((i) => todos.findIndex((todo) => todo.id === i.id))
      );
    },
    createTodo(
      state,
      title: string,
      category?: ITodoCategory,
      routineId?: string,
      createAt?: string
    ) {
      const createdAt = createAt || dayjs().startOf('day').toISOString();
      state.todoList.push({ id: nanoid(), title, createdAt, checked: false, category, routineId });
    },
    deleteTodo(state, id: string) {
      const todo = state.todoList.find((i) => i.id === id);
      if (!todo) return;
      todo.isDeleted = true;
    },
    createRoutine(state, title: string, config: number[]) {
      state.routines.push({ id: nanoid(), title, createdAt: dayjs().toISOString(), config });
    },
    deleteRoutine(state, id: string) {
      state.routines = state.routines.filter((i) => i.id !== id);
    },
    updateRoutingConfig(state, id: string, config: number[]) {
      const routine = state.routines.find((i) => i.id === id);
      if (!routine) return;
      routine.config = config;
    },
  })
  .methods(({ getActions, getState }) => ({
    applyRoutineTodos: () => {
      const { createTodo } = getActions();
      const { routines, todoList } = getState();
      const now = dayjs().startOf('day');
      for (const routine of routines.filter((i) => i.config.includes(now.day()))) {
        // if a routine has already been created today, skip it
        const relatedTodos = todoList.filter((i) => i.routineId === routine.id);
        if (!relatedTodos.some((i) => dayjs(i.createdAt).isSame(now, 'day'))) {
          createTodo(routine.title, 'project', routine.id);
        }
      }
    },
    initDefaultTodoList: () => {
      const { createTodo } = getActions();
      const { todoList } = getState();
      if (todoList.length > 0 || process.env.NODE_ENV !== 'development') return;
      createTodo('Finish a task by click', 'next');
      createTodo('Create/Edit a task by click the "edit" icon', 'next');
      createTodo('Reorder a task by drag and drop', 'next');
      createTodo('Put this app on blockchain', 'waiting', undefined, '2022-05-13');
      createTodo('Clone the Github Repo', 'maybe');
      createTodo('Learn some Web3 knowledge', 'maybe');
    },
  }))
  .middleware((store) => persist(store, { name: 'todo-list', version: 4 }))
  .build();
