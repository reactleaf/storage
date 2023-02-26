# @reactleaf/storage

[![npm version](https://badge.fury.io/js/@reactleaf%2Fstorage.svg)](https://badge.fury.io/js/@reactleaf%2Fstorage)

Type-safe and Unified way to access storage

## Purpose

This library gives you type-safe way to access storages.

## Installment

```sh
npm install @reactleaf/storage
# or
yarn add @reactleaf/storage
```

### Usage

```typescript
import StorageAccessor from '@reactleaf/storage`

const storage = new StorageAccessor<{ key: { value: number } }>("prefix")

// set
storage.set("key", { value: 1 })

// get
const { value } = storage.get("key")

// remove
storage.remove("key")
```

### StorageAccesssor

Storage Accessor has to know the types of stored values, to make it type-safe.

```typescript
const storage = new StorageAccesssor<{
  key: { value: number };
  SomeToken: string;
  SomeTimestamp: number;
}>("prefix");

// as accessor knows the types, it can be assure types of the value that we read from storage.
const token = storage.get("SomeToken"); // token is string
const { value } = storage.get("key"); // value is number
```

### Prefix

To distinguish storages, you can set prefix option.

```typescript
const defaultStorage = new StorageAccesssor<{ notified_100: boolean }>("myProject/"); // stored as `myProject/${key}`
const authStorage = new StorageAccesssor<{ accessToken: string }>("auth_"); // stored as `auth_${key}`
```

### Using Other Storage

Localstorage is our default storage, but you can use another storage.

Just put storage getter on accessor's second parameter.

```typescript
const storage = new StorageAccesssor("prefix", () => window.sessionStorage);
```

The reason that is not an storage, but getter, is SSR.
Storages are accessible only in client side, so not available during server-side runtime.
Using getter, we avoid the problem for SSR runtime error.

Alternative storages could be anything that implements Web Storage API.

### Limitation

Data will be serialized by `JSON.stringify`, and Deserialized by `JSON.parse`.
So, values like `Date` or `Class Instance` could not be saved and loaded properly.
