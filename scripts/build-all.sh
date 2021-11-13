#!/bin/bash
set -e

trap 'LAST_COMMAND=$CURRENT_COMMAND; CURRENT_COMMAND=$BASH_COMMAND' DEBUG
trap 'echo "\"${LAST_COMMAND}\" command failed with exit code $?."' EXIT

NPM_BIN=`npm bin`
ENV_FOLDERS=`ls params`

[ ! -d "output" ] && mkdir "output"

for ENV in $ENV_FOLDERS
do
  echo "BUILDING ENVIRONMENT [${ENV}]"
  echo "------------------------------------------------------"
  echo "* Compiling/Optimizing React Application"
  "$NPM_BIN/env-cmd" -f "./params/${ENV}/.env" "$NPM_BIN/react-scripts" build

  echo "* Moving build to environment output directory [./output/${ENV}/]"
  mv "./build" "./output/${ENV}/"
done