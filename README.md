# RemarkableClient

Unofficial reMarkable client.

## Todo

- [x] app registration 
- [x] basic listing notebooks, documents and collections
- [ ] efficient strage sync
- [ ] upload new documents
- [ ] reorganizing items in library
- [ ] pdf and ebook rendering with annotations
- [ ] export annotated pdf and ebooks

## Credits

based on the work 

* https://github.com/splitbrain/ReMarkableAPI/wiki

## Contributing

since the lines-parser library uses node-canvas 2 alpha there are no prebuilt binaries that work in 
electron it is necessary to install cairo and pango dev dependecies. Instructions can be found 
[here](https://github.com/Automattic/node-canvas#compiling)

here is a shortcut for ubuntu:

```sh
sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++
```
