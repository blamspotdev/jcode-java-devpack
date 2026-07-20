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

Requires JCode 1.3.5 or newer (the release that added the jdtls language-server catalog entry).

## Building

Pack with [j-code-make-tools](https://github.com/blamspotdev/j-code-make-tools):

```sh
jext pack . -o dist/
```

## License

MIT — see [LICENSE](LICENSE).
