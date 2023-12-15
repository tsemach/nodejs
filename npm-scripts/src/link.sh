#!/usr/bin/env bash

function usage() {
  echo ""
  echo "usage: npx install -t | -p | --package <package-name | -h | --help"    
  echo "  -p | --package: the package name to install"  
  echo "  -t | --types: install types of the package"
  echo "  -D | --debug: install package in devDependencies (debug)"
  echo ""
  echo "Examples"
  echo "  npx uninstall -p @ims/iot-lib  - uninstall @ims/iot-lib and @types/ims__iot-lib"
  echo "  npx uninstall axios            - uninstall only axios with no types"
  echo ""
  echo "Environment Variables:"  
  echo "  NPM_PRIVATE_ARTIFACT - private artifact name to use in jforg"
  echo "  NPM_PUBLIC_ARTIFACT - publich artifact name to use in jforg"
  echo "  NPM_PRIVATE_REGISTRY  - an artifact to upload (publish) ims private packages, default is ims-cloud-npm-dev-local"
  echo "  NPM_PUBLIC_REGISTRY   - an artifact to install publish packages from public registry, default is ims-cloud-npm-virtual"
  echo ""

  exit 1
}

if [ $# -lt 2 ]; then
  usage
fi

function getDistDir() {
  local package=$1; shift 
  local rootdir=$1; shift     
}
package=$1
rootdir=$2

echo "$0: called with package=$package, rootdir=$rootdir"

# rm -rf node_modules/$package 

getDistDir $package $rootdir

exit 
targetdir=$(getDistDir $package $rootdir)
echo ln -s $target node_modules/$package 
# ln -s   node_modules/$package 

