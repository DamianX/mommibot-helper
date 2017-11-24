'use strict';

import * as vscode from 'vscode';
import * as clipboardy from 'clipboardy';
import * as util from 'util';
import * as path from 'path';

function make_identifier(path: string, use_github_style: boolean, lines: number[]): string {
    var filename_separator = use_github_style ? "#L" : ":"
    var line_separator = use_github_style ? "-L" : "-"
    if (lines.length == 2) {
        return util.format("[%s%s%d%s%d]", path, filename_separator, lines[0], line_separator, lines[1])
    }
    if (lines.length == 1) {
        return util.format("[%s%s%d]", path, filename_separator, lines[0])
    }
    return util.format("[%s]", path);
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('mommibot.makeMoMMIbotIdentifier', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var document = editor.document;
        if (!document || document.isUntitled) {
            return;
        }

        var document_absolute_path = document.uri.fsPath;
        var workspace_absolute_path = vscode.workspace.workspaceFolders[0].uri.fsPath;
        var relative_path = path.relative(workspace_absolute_path, document_absolute_path).replace(new RegExp('\\' + path.sep, 'g'), '/');

        var use_github_style: boolean = vscode.workspace.getConfiguration('mommibot').get('useGithubStyle');

        var lines: number[] = []

        var selection = editor.selection;

        if (!selection.isEmpty) {
            if (selection.isSingleLine) {
                lines.push(selection.active.line);
            } else {
                lines.push(selection.start.line);
                lines.push(selection.end.line);
            }
        }

        var identifier = make_identifier(relative_path, use_github_style, lines);

        vscode.window.setStatusBarMessage("Identifier copied to the clipboard.", 3000);
        clipboardy.writeSync(identifier);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}