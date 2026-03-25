---
title: NixOS-ification of fedora with chezmoi and ansible
layout: page.njk
author: HeyImKyu
date: 2026-03-25
tags: [ 'pages', 'fedora', 'chezmoi', 'ansible' ]
description: This is what i created, is a bit funky, but it lets you automatically install programs and do configuration on new systems :3
img_alt: meow
---

# Init

Okay, so first of all, what the heck do I mean when i say this...
What i mean in general is:
<ul class="markers">
  <li>I have a file that i can put my programs in that i need</li>
  <li>If i edit it, or any programs are not installed, the system will do that for me</li>
  <li>Also, config-file management</li>
</ul>

First, cause it's simple, let's do

# Config-file management

This is just me normally using <a class="link" href="https://www.chezmoi.io/">chezmoi</a> as intended.
It's a really cool tool and y'all should check it out.

In word that means i have a git repo of my dotfiles that is also the chezmoi folder.
This can either be set by (i believe) `chezmoi init <git-url>` or just by `chezmoi init`, `chezmoi cd` and then `git init`.

Then, do `chezmoi add <config-path>` on every file that you want to track and if you do any updates later you can simply `chezmoi re-add`.

Once that is done, you basically have your dotfiles as a git-repo, can push it whereever, pull it again and so on.

Now to the spicy part:

# Automatic install of packages

## Chezmoi scripting

chezmoi can automatically run shell scripts when updating packages on your machine.
This is fully described in <a class="link" href="https://www.chezmoi.io/user-guide/use-scripts-to-perform-actions/">"Use scripts to perform actions"</a> in the chezmoi documentation.

So basically i have a file titled `run_start_ansible_hash_and_install.sh.tmpl` that get's run anytime `chezmoi update` or `chezmoi apply` are executed.

<details>
<summary><b>Full file here</b></summary>

```bash
#!/usr/bin/env bash
set -euo pipefail

ANSIBLE_DIR="{{ .chezmoi.homeDir }}/.ansible"
HASH_FILE="{{ .chezmoi.homeDir }}/.local/share/chezmoi_ansible_hash"
PLAYBOOKS_HASH=$(find "$ANSIBLE_DIR" -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum | cut -d' ' -f1)

# If ansible is not installed, install it
if ! command -v ansible-playbook >/dev/null 2>&1; then
  echo "[chezmoi→ansible] Ansible not found. Installing..."
  sudo dnf install ansible
fi

# If the hash file doesn't exist, or if the hash changed, run ansible
if [ ! -f "$HASH_FILE" ] || [ "$PLAYBOOKS_HASH" != "$(cat "$HASH_FILE")" ]; then
  echo "[chezmoi→ansible] Detected change in Ansible files. Running playbook..."

  sudo ansible-playbook -v -i "$ANSIBLE_DIR/inventory.ini" "$ANSIBLE_DIR/playbook.yml"

  echo "$PLAYBOOKS_HASH" > "$HASH_FILE"
  echo "[chezmoi→ansible] Playbook run complete. Hash updated."
else
  echo "[chezmoi→ansible] No changes in Ansible files. Skipping playbook."
fi

```

</details>

As you can see, it's pretty simple (except tha hash-checking) D:

<ul class="markers">
  <li>sh file is run</li>
  <li>hash of ansible directory is calculated</li>
  <li>calculated hash and saved hash from last run are compared</li>
  <li>if they differ -> ansible is run</li>
</ul>

which brings me to the next part

## The Ansible playbook

<details>
<summary>
<b>First, of course, the file itself</b>
</summary>

```yaml
- hosts: local
  become: true
  ignore_errors: false
  tasks:

    - name: Upgrade all packages
      ansible.builtin.dnf:
        name: "*"
        state: latest

#---------------------- install

    - name: Install base packages
      ansible.builtin.dnf:
        name:
          - git
          - curl
          - zsh
          - helix
          - firefox
          - yazi
          - starship
          - zoxide
          - atuin
          - wl-clipboard
          - tailscale
          - stgit
          - 7zip
          - ani-cli
          - btop
          - flatpak
          - fzf
          - grep
          - grimblast
          - hyfetch
          - hyprland-devel
          - hyprpicker
          - hyprsunset
          - jq
          - just
          - kitty
          - matugen
          - nodejs
          - ImageMagick
          - swww
          - swappy
          - tesseract
          - fontforge
          - swaylock
          - sddm
          - cmake
          - steam
          - make
          - automake
          - gcc
          - kernel-devel
          - xournalpp
          - blueman
          - helvum

        state: present

#------------------------- flatpak

    - name: Add Flathub remote
      community.general.flatpak_remote:
        name: flathub
        state: present
        flatpakrepo_url: https://flathub.org/repo/flathub.flatpakrepo

    - name: Install specific Flatpak applications
      community.general.flatpak:
        name: "{{ item }}"
        state: present
        remote: flathub
      loop:
        - com.spotify.Client
        - com.surfshark.Surfshark
        - dev.vencord.Vesktop
        - io.github.everestapi.Olympus
        - org.signal.Signal
        - com.visualstudio.code
```

</details>

As you can see, two steps are defined:
<ul class="markers">
  <li>Installing DNF packages</li>
  <li>Installing Flatpack packages</li>
</ul>

(Also feel free to stalk what packages i have install on all my systems lol)

Ya but that's basically it and idk what to yap anymore, so I better stop now ^^

Thanks for reading :3
