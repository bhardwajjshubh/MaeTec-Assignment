declare global {
  interface ImportMetaEnv {
    readonly DEV: boolean
    // add other env vars if needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

declare module './mocks/browser' {
  export const worker: any
}

export {}
