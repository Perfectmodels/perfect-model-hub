import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNewTaskData {
  task_insert: Task_Key;
}

export interface CreateNewTaskVariables {
  title: string;
  description?: string | null;
  dueDate?: DateString | null;
  isCompleted: boolean;
}

export interface GetMyTasksData {
  tasks: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    dueDate?: DateString | null;
    isCompleted: boolean;
  } & Task_Key)[];
}

export interface ListAllUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    email?: string | null;
  } & User_Key)[];
}

export interface Tag_Key {
  id: UUIDString;
  __typename?: 'Tag_Key';
}

export interface TaskTag_Key {
  taskId: UUIDString;
  tagId: UUIDString;
  __typename?: 'TaskTag_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface UpdateTaskCompletionData {
  task_update?: Task_Key | null;
}

export interface UpdateTaskCompletionVariables {
  id: UUIDString;
  isCompleted: boolean;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewTaskVariables): MutationRef<CreateNewTaskData, CreateNewTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewTaskVariables): MutationRef<CreateNewTaskData, CreateNewTaskVariables>;
  operationName: string;
}
export const createNewTaskRef: CreateNewTaskRef;

export function createNewTask(vars: CreateNewTaskVariables): MutationPromise<CreateNewTaskData, CreateNewTaskVariables>;
export function createNewTask(dc: DataConnect, vars: CreateNewTaskVariables): MutationPromise<CreateNewTaskData, CreateNewTaskVariables>;

interface GetMyTasksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyTasksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyTasksData, undefined>;
  operationName: string;
}
export const getMyTasksRef: GetMyTasksRef;

export function getMyTasks(): QueryPromise<GetMyTasksData, undefined>;
export function getMyTasks(dc: DataConnect): QueryPromise<GetMyTasksData, undefined>;

interface UpdateTaskCompletionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTaskCompletionVariables): MutationRef<UpdateTaskCompletionData, UpdateTaskCompletionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTaskCompletionVariables): MutationRef<UpdateTaskCompletionData, UpdateTaskCompletionVariables>;
  operationName: string;
}
export const updateTaskCompletionRef: UpdateTaskCompletionRef;

export function updateTaskCompletion(vars: UpdateTaskCompletionVariables): MutationPromise<UpdateTaskCompletionData, UpdateTaskCompletionVariables>;
export function updateTaskCompletion(dc: DataConnect, vars: UpdateTaskCompletionVariables): MutationPromise<UpdateTaskCompletionData, UpdateTaskCompletionVariables>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect): QueryPromise<ListAllUsersData, undefined>;

