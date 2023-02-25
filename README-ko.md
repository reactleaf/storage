# @reactleaf/storage

[![npm version](https://badge.fury.io/js/@reactleaf%2Fstorage.svg)](https://badge.fury.io/js/@reactleaf%2Fstorage)

스토리지 접근 방식의 통일

## 목적

이 라이브러리는 type-safe한 스토리지를 제공합니다.

## 설치 및 사용

```sh
npm install @reactleaf/storage
# 또는
yarn add @reactleaf/storage
```

### 사용법

```typescript
import StorageAccessor from '@reactleaf/storage`

const storage = new StorageAccessor("prefix")

// set
storage.set("key", { value: 1 })

// get
const { value } = storage.get("key")

// remove
storage.remove("key")
```

### StorageAccesssor

Type-safe를 제공하기 위해서, 스토리지에 저장된 값들의 타입을 알려주어야 합니다.

```typescript
// in your custom d.ts

import "@reactleaf/storage";

declare module "@reactleaf/storage" {
  interface StorageData {
    key: { value: number };
    SomeToken: string;
    SomeTimestamp: number;
  }
}
```

이제, storage에서 꺼낸 값의 타입을 추론합니다.

```typescript
const storage = new StorageAccesssor("prefix");

const token = storage.get("SomeToken"); // token is string
const { value } = storage.get("key"); // value is number
```

### Prefix

스토리지를 구분하기 위해, prefix를 다양하게 구성해 각각 사용할 수 있습니다.

```typescript
const defaultStorage = new StorageAccesssor("myProject"); // key as `myProject/${key}`
const authStorage = new StorageAccesssor("auth"); // key as `auth/${key}`
```

단, `StorageData`는 동일한 타입을 참조합니다.

### Using Other Storage

로컬스토리지 대신 세션스토리지를 사용하도록 변경할 수도 있습니다.

스토리지 엑세서의 두 번째 인자로 storage getter를 넘기면 됩니다.

```typescript
const storage = new StorageAccesssor("prefix", () => window.sessionStorage);
```

storage가 아니라 getter로 구현된 이유는, 서버사이드 렌더링 중의 동작을 고려한 선택입니다.
일반적으로 스토리지는 클라이언트에 존재하고, 클라이언트에서만 접속하므로, 서버사이드 렌더링 시에는 사용되지 않습니다.

storage getter에는 WEB Storage API를 구현하는 어떤 스토리지로든 대체할 수 있습니다.
아무 것도 설정하지 않는 경우, 브라우저의 로컬스토리지를 기본으로 사용합니다.

### Limitation

기본적인 스토리지인 localStorage에 맞춰 구성되었습니다.
`JSON.stringify` 를 사용해 직렬화 한 후 저장하고 `JSON.parse`를 사용하여 타입을 복구합니다.
따라서, stringify 및 parse 가 가능한 타입만 저장할 수 있습니다.

ex) Date, Class instance 등은 저장할 수 없습니다.
