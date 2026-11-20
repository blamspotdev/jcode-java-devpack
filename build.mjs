// Production build for the Java Dev Pack.
//
// What ships is one jar under `lib/`: the debug adapter that the `java-debug` engine's install copies
// into the Linux runtime (`contributes.debugEngines` in extension.yaml). `jext pack` runs this
// (npm run build) before packaging, so packing the extension is enough to produce it -- by hand or
// in CI. Without this script CI built nothing, and a released package carried no jar for that
// install to copy.
//
// `adapter/` is a Gradle build of its own, built with its own wrapper so the Gradle that makes the
// jar is pinned rather than whatever is on PATH. `lib/` is gitignored and `adapter` is in
// `.jextignore`: the jar is rebuilt per release, and the build that makes it stays out of the package.
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const win = process.platform === 'win32';
// Absolute, because a bare `gradlew.bat` is not found in the working directory the way `./gradlew`
// is on a POSIX shell, and the two platforms disagree about which relative spelling works.
const gradlew = resolve('adapter', win ? 'gradlew.bat' : 'gradlew');

const build = spawnSync(gradlew, ['shadowJar'], { cwd: 'adapter', stdio: 'inherit', shell: win });
if (build.status !== 0) process.exit(build.status || 1);

mkdirSync('lib', { recursive: true });
copyFileSync('adapter/build/libs/jcode-java-dap.jar', 'lib/jcode-java-dap.jar');
console.log('✓ built adapter → lib/jcode-java-dap.jar');
