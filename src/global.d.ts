declare module 'glob' {
  import minimatch from 'minimatch';
  
  interface IOptions extends minimatch.MinimatchOptions {
    // ... 其他選項 ...
  }

  // ... 其他需要的類型定義 ...
}