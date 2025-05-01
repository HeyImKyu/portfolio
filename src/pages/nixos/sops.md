---
title: Installing and using sops.nix in NixOS
layout: page.njk
author: HeyImKyu
date: 2025-02-19
tags: [ 'pages', 'nixos' ]
description: If you're curious how i made this page, have a look
img_alt: "sops nix"
---


<i>I'm just gonna put this here because i just know I'm gonna foget:</i>

How to do secrets-management:

Get a key with age:
```bash
rage-keygen -o ~/secrets/age/keys.txt
```

<details>
<summary><b>This is now deprecated because i found a cooler way of doing it.</b></summary>

Then grab the secrets.yaml file from vaultwarden that is configured something like this:
```yaml
ariarpc_secret: "my-super-secret-token"
key_in_yaml: "strongpassword123"
```

Run:
```bash
sops --encrypt --age <pub-age-key> secrets.yaml > secrets_enc.yaml
rm secrets.yaml
mv secrets_enc.yaml secrets.yaml
```

</details>

Run `sops` on the secrets.yaml file:
``` bash
sops secrets.yaml
```
If envvar SOPS_AGE_KEY_FILE is set to the right path of the age key, it should decrypt and encrypt it automatically.

<details>
<summary><b>Arbitrary data that isn't yaml</b></summary>

Apparently the key file isn't found even with the envvar if trying to encrypt arbitrary data.
For this purpose this command can be used:
```bash
sops --age "$(grep -o 'age1[^ ]*' "$SOPS_AGE_KEY_FILE")" -e input-file > output-file
```

In nix arbitrary data then has to be declared like this in sops:
```nix
sops = {
  secrets = {
    smb-credentials-kyu = {
      format = "binary";
      sopsFile = ./smb-credentials-kyu;
    };
  };
};

```
Like this we can save save whole secrets-files, e.g. in this example a credentials file.

</details>

Then define the secret in flakes/modules/home-manager/secrets-management/default.nix like:
```nix
sops = {
	age.keyFile = "/home/kyu/secrets/age/keys.txt"; # must have no password!
	defaultSopsFile = ./secrets.yaml;
	secrets = {
		ariarpc = {}; # put all custom secrets from secrets.yaml here
	};
};
```

They can then be used during runtime like this in homemanager/nix files:
```bash
aria2c --rpc-secret=$(cat ${config.sops.secrets.ariarpc.path})
```

Or just manually read from the file in:
```bash
~/.config/sops-nix/secrets/<key-from-yaml>
```

ya i think thats it

I'ma also link this video which explains at the end how to write a systemd service to get those secrets better than to just read out the files:
<a class="link" href="https://youtu.be/G5f6GC7SnhU">https://youtu.be/G5f6GC7SnhU</a>
