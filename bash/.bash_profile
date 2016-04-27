#run 'source ~/.bash_profile' to take effect immediately
#.bash_profile

# Get the aliases ans functions

if [ -f ~/.bashrc ]; then
  . ~/.bashrc
fi

JAVA_HOME=/usr/local/install/jdk1.8.0_65
JDK_HOME=/usr/local/install/jdk1.8.0_65
INSTALL=/usr/local/install
PATH=$PATH:$HOME/.local/bin:$HOME/bin:$JAVA_HOME/bin:$INSTALL/node-v5.3.0-linux-x64/bin

export JAVA_HOME
export JDK_HOME
export PATH
