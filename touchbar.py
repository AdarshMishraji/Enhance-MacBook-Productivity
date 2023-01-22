#!/usr/bin/env python3.7
import iterm2
import subprocess
import os
import json


def run_command(command):
    result = subprocess.run(command, stdout=subprocess.PIPE, shell=True)
    return result.stdout.decode('utf-8')


async def get_current_git_branch(session):
    present_working_directory = await session.async_get_variable("path")
    git_branch = run_command(
        f"(cd {present_working_directory};git rev-parse --abbrev-ref HEAD)").replace('\n', '')
    return git_branch


async def main(connection):
    app = await iterm2.async_get_app(connection)

    @iterm2.RPC
    async def clear_all():
        window = app.current_terminal_window
        if window is not None:
            # Get the active session in this tab
            code = b'\x1b' + b']1337;ClearScrollback' + b'\x07'
            tabs = window.tabs
            for tab in tabs:
                sessions = tab.sessions
                for session in sessions:
                    # Send text to the session as though the user had typed it
                    await session.async_inject(code)

        else:
            print("No current window")

    @iterm2.RPC
    async def start_all():
        window = app.current_terminal_window
        if window is not None:
            tabs = window.tabs
            for tab in tabs:
                sessions = tab.sessions
                for session in sessions:
                    # Send text to the session as though the user had typed it
                    path = await session.async_get_variable('path')

                    if (not os.path.exists(f"{path}/package.json")):
                        continue

                    package_json = json.load(open(f"{path}/package.json"))

                    scripts = package_json.get('scripts', None)
                    if (scripts is None):
                        continue

                    # for my projects and for yc-frontend
                    if (scripts.get('dev', None) is not None):
                        await session.async_send_text('yarn dev\n')
                    # for backend services of yc
                    elif (scripts.get('start:qa', None) is not None):
                        await session.async_send_text('yarn start:qa\n')
                    # for admin frontend, and for fallback case
                    elif (scripts.get('start', None) is not None):
                        await session.async_send_text('yarn start\n')
        else:
            print("No current window")

    @ iterm2.RPC
    async def stop_all():
        window = app.current_terminal_window
        if window is not None:

            # Get the active session in this tab
            tabs = window.tabs
            curr_session = app.current_terminal_window.current_tab.current_session

            await curr_session.async_send_text("killall node\n")

            for tab in tabs:
                sessions = tab.sessions
                for session in sessions:
                    # Send text to the session as though the user had typed it
                    await session.async_send_text('\x03\nclear\n')

        else:
            print("No current window")

    @ iterm2.RPC
    async def shutdown():
        window = app.current_terminal_window
        if window is not None:
            stop_all()

            await window.async_close(force=True)

        else:
            print("No current window")

    @ iterm2.RPC
    async def git_push():
        window = app.current_terminal_window
        if window is not None:
            session = app.current_terminal_window.current_tab.current_session
            # get git branch
            git_branch = await get_current_git_branch(session)

            await session.async_send_text('git pull origin\n')
            await session.async_send_text('git add -A\n')

            commit_message = await iterm2.TextInputAlert(
                title="Commit Message", subtitle=f"Enter your changes in {git_branch}", placeholder="Enter commit message", default_value="minor fix").async_run(connection)
            if (len(commit_message) < 3):
                return await iterm2.Alert(title='Commit message too short', subtitle='Commit message should be at least 3 characters long').async_run(connection)
            await session.async_send_text(f'git commit -m "{commit_message}"\n')
            await session.async_send_text(f'git push origin {git_branch}\n')

        else:
            print("No current window")

    @ iterm2.RPC
    async def git_pull_develop():
        window = app.current_terminal_window
        if window is not None:

            # Get the active session in this tab
            tabs = window.tabs
            for tab in tabs:
                sessions = tab.sessions
                for session in sessions:
                    # Send text to the session as though the user had typed it
                    git_branch = await get_current_git_branch(session)
                    print(f"**********{git_branch}*************")
                    if (git_branch == "@develop"):
                        await session.async_send_text("git pull origin @develop --ff\n")

        else:
            print("No current window")

    @ iterm2.RPC
    async def git_pull_staging():
        window = app.current_terminal_window
        if window is not None:

            # Get the active session in this tab
            tabs = window.tabs
            for tab in tabs:
                sessions = tab.sessions
                for session in sessions:
                    # Send text to the session as though the user had typed it
                    git_branch = await get_current_git_branch(session)
                    print(f"**********{git_branch}*************")
                    if (git_branch == "@staging"):
                        await session.async_send_text("git pull origin @staging --ff\n")

        else:
            print("No current window")

    @ iterm2.RPC
    async def git_pull_master():
        window = app.current_terminal_window
        if window is not None:

            # Get the active session in this tab
            tabs = window.tabs
            for tab in tabs:
                sessions = tab.sessions
                for session in sessions:
                    # Send text to the session as though the user had typed it
                    git_branch = await get_current_git_branch(session)
                    print(f"**********{git_branch}*************")
                    if (git_branch == "master"):
                        await session.async_send_text("git pull origin master --ff\n")

        else:
            print("No current window")

    await clear_all.async_register(connection)
    await start_all.async_register(connection)
    await stop_all.async_register(connection)
    await shutdown.async_register(connection)
    await git_push.async_register(connection)
    await git_pull_staging.async_register(connection)
    await git_pull_develop.async_register(connection)
    await git_pull_master.async_register(connection)

iterm2.run_forever(main)
