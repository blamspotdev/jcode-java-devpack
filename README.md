# Java Dev Pack for JCode

Language support for Java in [JCode](https://github.com/blamspotdev/j-code-android), the native
Android IDE.

## What's included

- **Syntax coloring** for Java (`.java`), including modern keywords (`record`, `sealed`, `var`, `yield`)
- **Completions and snippet helpers** — `main`, `sout`, loops, records, streams, try-with-resources
- **Formatter** — basic rules (indent, trailing whitespace, final newline); full formatting comes
  from the language server

## Toolchain integration

Installing the pack automatically resolves:

- the **Java (JDK)** toolchain (OpenJDK 21) from the Toolchains manager
- the **Eclipse JDT language server (jdtls)** for code intelligence

Suggested (manual install): the **Java (JDWP/JDI)** debug engine for breakpoints and stepping.

## The debug adapter

The pack brings its own debugger. JCode is a generic IDE and ships no JVM adapter of its own, so
this pack contributes one (`contributes.debugEngines` in `extension.yaml`) and bundles the jar that
backs it. Installing the engine copies that jar into the Linux environment — there is no download,
and it works offline.

The adapter is Microsoft's [java-debug](https://github.com/microsoft/java-debug) core wrapped in a
small stdio DAP `Main`; its source is in `adapter/`.

### Building it before you pack

`lib/` is not checked in. Build the jar first, then pack:

```sh
cd adapter && gradle shadowJar && cd ..
mkdir -p lib && cp adapter/build/libs/jcode-java-dap.jar lib/
jext pack . -o build/plain
```

`.jextignore` keeps `adapter/` out of the package: what ships is the jar, not the toolchain that
builds it.

Requires JCode 1.3.5 or newer (the release that added the jdtls language-server catalog entry).

## Building

Pack with [j-code-make-tools](https://github.com/blamspotdev/j-code-make-tools):

```sh
jext pack . -o dist/
```

## License

MIT — see [LICENSE](LICENSE).
