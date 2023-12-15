#!/bin/bash

export module_type_prefix=ims
export module_prefix=@$module_type_prefix

function set_prefix() {
  local name=$1; shift

  head=$module_type_prefix
  tail=$name

  if [[ ${name:0:1} == "@" ]]
  then
    name="${name:1}"
    head=$(echo $name | awk -F/ '{print $1}')
    tail=$(echo $name | awk -F/ '{print $2}')
    type_name="@types/${head}__${tail}"    
  fi    
  echo $head:$tail
}

function set_lib() {
  local lib=$1; shift

  tail_head=$(set_prefix $lib)  
  lib=`echo $tail_head | awk -F: '{print $2}'`
  module_type_prefix=`echo $tail_head | awk -F: '{print $1}'`
  module_prefix=@$module_type_prefix
  
  rm -rf node_modules/${module_prefix}/$lib
  rm -rf node_modules/@types/${module_type_prefix}__$lib

  dist=dist
  if [ -d ../$lib/dist/src ]; then  
    dist=dist/src
  fi
  ln -s ../../../$lib/$dist node_modules/${module_prefix}/$lib
  ln -s ../../../$lib/$dist node_modules/@types/${module_type_prefix}__$lib    
}

if [ $1 == '-v' ]; then  
  tail_head=$(set_prefix $2)  
  lib=`echo $tail_head | awk -F: '{print $2}'`
  module_type_prefix=`echo $tail_head | awk -F: '{print $1}'`
  module_prefix=@$module_type_prefix

  echo "director: node_modules/@$module_type_prefix/$lib"
  ls -l node_modules/@$module_type_prefix/$lib
  echo ""

  echo "director: node_modules/@types/${module_type_prefix}__${lib}"
  ls -l node_modules/@types/${module_type_prefix}__${lib}
  exit 0
fi

for lib in $*
do  
  set_lib $lib  
  echo "link lib: $lib on node_modules/${module_prefix}/$lib and node_modules/@types/${module_type_prefix}__$lib"
done
