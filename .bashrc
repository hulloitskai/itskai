# == Vim
export EDITOR=vim
set -o vi

# == Homebrew
export HOMEBREW_PREFIX=/home/linuxbrew/.linuxbrew

# == Nodenv
eval "$(nodenv init -)"

# == Yarn
export PATH="$(yarn global bin):$PATH"

# == Rbenv
eval "$(rbenv init -)"

# == Pyenv
export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv > /dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# == Poetry
export PATH="$HOME/.local/bin:$PATH"

# == Starship
eval "$(starship init bash)"

# == Shell
. ~/.bashrc.orig
