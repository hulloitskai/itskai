# == Vim
export EDITOR=vim
set -o vi

# == Homebrew
export HOMEBREW_PREFIX=/home/linuxbrew/.linuxbrew

# == Nodenv
if command -v nodenv > /dev/null; then
  eval "$(nodenv init -)"
fi

# == Yarn
if command -v yarn > /dev/null; then
  export PATH="$(yarn global bin):$PATH"
fi

# == Rbenv
if command -v rbenv > /dev/null; then
  eval "$(rbenv init -)"
fi

# == Pyenv
if command -v pyenv > /dev/null; then
  export PYENV_ROOT="$HOME/.pyenv"
  export PATH="$PYENV_ROOT/bin:$PATH"
  eval "$(pyenv init -)"
fi

# == Poetry
export PATH="$HOME/.local/bin:$PATH"

# == Starship
if command -v starship > /dev/null; then
  eval "$(starship init bash)"
fi

# == Shell
. ~/.bashrc.orig
