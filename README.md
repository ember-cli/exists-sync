Replacement for [fs.existsSync()](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback), which is being deprecated. `exists-sync` will recursively follow symlinks to verify the target file exists.

> "fs.exists() is an anachronism and exists only for historical reasons. There should almost never be a reason to use it in your own code.

> In particular, checking if a file exists before opening it is an anti-pattern that leaves you vulnerable to race conditions: another process may remove the file between the calls to fs.exists() and fs.open(). Just open the file and handle the error when it's not there."