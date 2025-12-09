import { CreateNewTaskData, CreateNewTaskVariables, GetMyTasksData, UpdateTaskCompletionData, UpdateTaskCompletionVariables, ListAllUsersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewTask(options?: useDataConnectMutationOptions<CreateNewTaskData, FirebaseError, CreateNewTaskVariables>): UseDataConnectMutationResult<CreateNewTaskData, CreateNewTaskVariables>;
export function useCreateNewTask(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewTaskData, FirebaseError, CreateNewTaskVariables>): UseDataConnectMutationResult<CreateNewTaskData, CreateNewTaskVariables>;

export function useGetMyTasks(options?: useDataConnectQueryOptions<GetMyTasksData>): UseDataConnectQueryResult<GetMyTasksData, undefined>;
export function useGetMyTasks(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyTasksData>): UseDataConnectQueryResult<GetMyTasksData, undefined>;

export function useUpdateTaskCompletion(options?: useDataConnectMutationOptions<UpdateTaskCompletionData, FirebaseError, UpdateTaskCompletionVariables>): UseDataConnectMutationResult<UpdateTaskCompletionData, UpdateTaskCompletionVariables>;
export function useUpdateTaskCompletion(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTaskCompletionData, FirebaseError, UpdateTaskCompletionVariables>): UseDataConnectMutationResult<UpdateTaskCompletionData, UpdateTaskCompletionVariables>;

export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
