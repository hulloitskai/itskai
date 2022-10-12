# Configure completions.
if [ -d ~/.zsh/zsh-completions ]; then
  fpath=(~/.zsh/zsh-completions $fpath)
fi
autoload -Uz compinit
compinit

# Configure autosuggestions.
if [ -s ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh ]; then
  source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
fi

# Configure Vim mode.
if [ -s ~/.zsh/zsh-vi-mode/zsh-vi-mode.plugin.zsh ]; then
  source ~/.zsh/zsh-vi-mode/zsh-vi-mode.plugin.zsh
fi

# Configure default text editor.
export EDITOR=vim

# Use emacs keybinds.
bindkey -e

# Use Starship prompt.
eval "$(starship init zsh)"
