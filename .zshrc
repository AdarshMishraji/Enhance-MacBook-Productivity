
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="agnoster-lxander"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="false"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 7

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="false"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="false"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="dd/mm/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git zsh-autosuggestions zsh-syntax-highlighting sudo fzf web-search F-Sy-H)


source $ZSH/oh-my-zsh.sh
source "$HOME/.cargo/env" 

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

export PATH="$PATH:$HOME/flutter/bin"

export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jbr/Contents/Home
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk

export GITHUB_TOKEN=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
export PATH=$JAVA_HOME/bin:$PATH
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
export PATH=$PATH:"/opt/homebrew/opt/mongodb-community@4.4/bin"
export PATH=$PATH:/Library/PostgreSQL/14/bin
export PATH=$PATH:/opt/homebrew/opt/inetutils/libexec/gnubin

alias ysc="yarn start:consumers"
alias yc="yarn clean"
alias yb='yarn build'
alias yd='yarn dev'
alias yi='yarn install'
alias ys='yarn start'
alias ysd='yarn start:qa'

alias ga='git add .'
alias gcm='git commit -m $1'
alias gcs='git checkout @staging'
alias gp='git pull'
alias gpf='git pull origin $1'
alias gpfm='git pull origin master'
alias gpfs='git pull origin @staging'
alias gps='git push'
alias gst='git status'
alias gcd='git checkout @develop'
alias gcs='git checkout @staging'
alias gc='git checkout $1'
alias gcb='git checkout -b $1'
alias gsync='gc @staging && gpf master && gps && gc @develop && gpf @staging && gps'
alias prd='gh pr create -a "@me" -b "" -r yellowclass/master-merge -B @develop'
alias prm='gh pr create -a "@me" -b "" -r yellowclass/master-merge -B master'
alias prs='gh pr create -a "@me" -b "" -r yellowclass/master-merge -B @staging'
alias gfp='git fetch --prune'
alias gpa='git pull --all'
alias gcp='git cherry-pick $1'

alias gomon="nodemon --watch './**/*.go' -e go --signal SIGTERM --exec 'go' run $1"

alias fpg="flutter pub get"

# spy - Scrcpy Physical Device
spy() {
  clear;
  if [ $# -eq 0 ] 
  then
    scrcpy -m 1440 --always-on-top --disable-screensaver -t -w
  else
    scrcpy -m 1440 --always-on-top --disable-screensaver -t -w --window-title $1
  fi
}

alias spy-id="scrcpy -m 1440 --always-on-top --disable-screensaver -t -w -s $1"

fpcng(){
  flutter pub cache clean && fpg
}

ghprdev(){
   gh pr create --base dev --label "feat->dev" --title $1 --body $2
}

ghprstaging(){
   gh pr create --base staging --label "feat->staging" --title $1 --body $2
}

ghpr(){
  gh pr create --base dev --label "feat->dev" --title $1 --body $2;
  gh pr create --base staging --label "feat->staging" --title $1 --body $2
}

ghprbe(){
  gh pr create --base @develop --label "feat->develop" --title $1 --body $2;
  gh pr create --base @staging --label "feat->staging" --title $1 --body $2
}


test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"

iterm2_print_user_vars() {
  # extend this to add whatever
  # you want to have printed out in the status bar
  # if you don't have anaconda install use it for displaying
  # your node version "echo node -v" or anything you like
  iterm2_set_user_var nodeVersion $(node -v)
  iterm2_set_user_var pwd $(pwd)
  iterm2_set_user_var localIP $(ipconfig getifaddr en0)
  iterm2_set_user_var publicIP $(curl ipecho.net/plain -s ; echo)
}

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

export PATH="$PATH":"$HOME/.pub-cache/bin"
