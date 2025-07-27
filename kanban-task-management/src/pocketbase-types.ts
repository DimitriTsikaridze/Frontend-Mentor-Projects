/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Authorigins = "_authOrigins",
  Externalauths = "_externalAuths",
  Mfas = "_mfas",
  Otps = "_otps",
  Superusers = "_superusers",
  Boards = "boards",
  Columns = "columns",
  Subtasks = "subtasks",
  Tasks = "tasks",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

type ExpandType<T> = unknown extends T
  ? T extends unknown
    ? { expand?: unknown }
    : { expand: T }
  : { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
  id: RecordIdString;
  collectionId: string;
  collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
  collectionRef: string;
  fingerprint: string;
  id: string;
  recordRef: string;
};

export type ExternalauthsRecord = {
  collectionRef: string;
  id: string;
  provider: string;
  providerId: string;
  recordRef: string;
};

export type MfasRecord = {
  collectionRef: string;
  id: string;
  method: string;
  recordRef: string;
};

export type OtpsRecord = {
  collectionRef: string;
  id: string;
  password: string;
  recordRef: string;
  sentTo?: string;
};

export type SuperusersRecord = {
  email: string;
  emailVisibility?: boolean;
  id: string;
  password: string;
  tokenKey: string;
  verified?: boolean;
};

export type BoardsRecord = {
  id: string;
  name?: string;
};

export type ColumnsRecord = {
  board?: RecordIdString;
  id: string;
  name?: string;
};

export type SubtasksRecord = {
  id: string;
  isCompleted?: boolean;
  task?: RecordIdString;
  title?: string;
};

export type TasksRecord = {
  column?: RecordIdString;
  description?: string;
  id: string;
  title?: string;
};

export type UsersRecord = {
  avatar?: string;
  email: string;
  emailVisibility?: boolean;
  id: string;
  name?: string;
  password: string;
  tokenKey: string;
  verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> &
  BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> &
  BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
  AuthSystemFields<Texpand>;
export type BoardsResponse<Texpand = unknown> = Required<BoardsRecord> & BaseSystemFields<Texpand>;
export type ColumnsResponse<Texpand = unknown> = Required<ColumnsRecord> &
  BaseSystemFields<Texpand>;
export type SubtasksResponse<Texpand = unknown> = Required<SubtasksRecord> &
  BaseSystemFields<Texpand>;
export type TasksResponse<Texpand = unknown> = Required<TasksRecord> & BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  _authOrigins: AuthoriginsRecord;
  _externalAuths: ExternalauthsRecord;
  _mfas: MfasRecord;
  _otps: OtpsRecord;
  _superusers: SuperusersRecord;
  boards: BoardsRecord;
  columns: ColumnsRecord;
  subtasks: SubtasksRecord;
  tasks: TasksRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  _authOrigins: AuthoriginsResponse;
  _externalAuths: ExternalauthsResponse;
  _mfas: MfasResponse;
  _otps: OtpsResponse;
  _superusers: SuperusersResponse;
  boards: BoardsResponse;
  columns: ColumnsResponse;
  subtasks: SubtasksResponse;
  tasks: TasksResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "_authOrigins"): RecordService<AuthoriginsResponse>;
  collection(idOrName: "_externalAuths"): RecordService<ExternalauthsResponse>;
  collection(idOrName: "_mfas"): RecordService<MfasResponse>;
  collection(idOrName: "_otps"): RecordService<OtpsResponse>;
  collection(idOrName: "_superusers"): RecordService<SuperusersResponse>;
  collection(idOrName: "boards"): RecordService<BoardsResponse>;
  collection(idOrName: "columns"): RecordService<ColumnsResponse>;
  collection(idOrName: "subtasks"): RecordService<SubtasksResponse>;
  collection(idOrName: "tasks"): RecordService<TasksResponse>;
  collection(idOrName: "users"): RecordService<UsersResponse>;
};
