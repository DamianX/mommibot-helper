# mommibot-helper

## What?
A Visual Studio Code extension that produces [MoMMI](https://github.com/PJB3005/MoMMI)-compatible file identifiers.

## Why?
For use among [/vg/station developers](https://github.com/vgstation-coders).

## How?
A single command: **Make MoMMIbot identifier** (`Ctrl+Shift+L` by default).
Works with no selection (only includes the filename), one line selection or multiple lines selection.

## Settings
* `mommibot.useGithubStyle`: Use `[filename.dm#L0-L10]`, as opposed to the default `[filename.dm:0-10]`

## Changelog
### 0.0.2
Fixed off-by-one errors
### 0.0.1
Initial release

Licensed under **GPLv3**.