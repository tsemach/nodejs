#!/usr/bin/env bash

export TYPEDIR=_types
export DISTDIR=_dist
export isAll=false
export ROOTDIR=`pwd`

# NPM_PRIVATE_ARTIFACT=..
# NPM_PUBLIC_ARTIFACT=..

# NPM_PRIVATE_REGISTRY=..
# NPM_PUBLIC_REGISTRY=..

if [ -d dist/src ]; then 
  DISTSRC=dist/src
  ROOTDIR=../..
else
  DISTSRC=dist
  ROOTDIR=..
fi

function basePackageDotJson() {
  echo '{  
    "bundleDependencies": false,
    "deprecated": false,  
    "license": "ISC",
    "main": "./index.d.ts",
    "types": "/index.d.ts"
  }'
}

function isCommit() {
  if [ -n "$(git status --porcelain -uno)" ]; then
    return 1
  else
    return 0
  fi
}

function toJSON() {
  local key=$1; shift
  local val=$1; shift
  
  echo "{\"$key\": \"$val\"}"
}

function packageDotJson() {
  local name=$(jq -r '.name' package.json)
  local version=$(jq -r '.version' package.json) 
  local type_name="@types/$name"

  if [[ ${name:0:1} == "@" ]]
  then
    name="${name:1}"
    head=$(echo $name | awk -F/ '{print $1}')
    tail=$(echo $name | awk -F/ '{print $2}')
    type_name="@types/${head}__${tail}"
  fi    
  echo $(toJSON name "$type_name") $(toJSON version $version) $(basePackageDotJson)  | jq -s add
}

function copyFiles() {
  if [ X$isAll = Xtrue ]; then          
    # shopt -s globstar; tar -cf - ${DISTSRC}/**/*.d.ts ${DISTSRC}/**/*.js.map | (cd $TYPEDIR/; tar xf -)        
    (cd ${DISTSRC}; shopt -s globstar; tar -cf - *.d.ts *.js.map */**/*.d.ts */**/*.js.map | (cd ${ROOTDIR}/_types/; tar xf -))
    (cd ${DISTSRC}; cp index.d.ts index.js.map ${ROOTDIR}/_types)

    return $?
  fi
  # shopt -s globstar; tar -cf - ${DISTSRC}/types/**/*.d.ts ${DISTSRC}/types/**/*.js.map | (cd $TYPEDIR/; tar xf -)  
  (cd ${DISTSRC}; shopt -s globstar; tar -cf - *.d.ts *.js.map */**/*.d.ts */**/*.js.map | (cd ${ROOTDIR}/_types/; tar xf -))
  (cd ${DISTSRC}; cp index.d.ts index.js.map ${ROOTDIR}/_types)
  
  return $?
}

if [ $# -gt 0 ]; then
  if [ $1 = "-a" -o $1 = "--all" ]; then
    isAll=true
  fi
fi

rm -rf ${TYPEDIR}
mkdir ${TYPEDIR}

copyFiles
packageDotJson > ${TYPEDIR}/package.json

(cd ${TYPEDIR}; npm publish --registry $NPM_PRIVATE_REGISTRY)

exit $?
