var $ = require('nodobjc');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

$.import('Foundation');
var pool = $.NSAutoreleasePool('alloc')('init');

class MacOSDownloadProgress extends EventEmitter {

 constructor(filePath, options) {
   super();

   var destinationUrl = $.NSURL('fileURLWithPath', $(filePath));

   var userInfo = $.NSMutableDictionary('dictionary');
   userInfo('setObject', $.NSProgressFileOperationKindDownloading,
     'forKey', $.NSProgressFileOperationKindKey);
   userInfo('setObject', destinationUrl,
     'forKey', $.NSProgressFileURLKey);
   this.nsProgress = $.NSProgress('alloc')('initWithParent', null, 'userInfo', userInfo);

   this.nsProgress('setKind', $.NSProgressKindFile)

   var cancellable = opt(options, 'cancellable', false);
   this.nsProgress('setCancellable', cancellable);
   this.nsProgress('setCancellationHandler', $(() => {
     this.emit('cancel');
   }, ['v',[]]))

   this.totalCount = opt(options, 'total', 0);

   this.nsProgress('publish');
 }

 set totalCount(count) {
   this.nsProgress('setTotalUnitCount', count);
 }
 get totalCount() {
   return this.nsProgress('totalUnitCount');
 }

 get fractionCompleted() {
   return this.nsProgress('fractionCompleted');
 }

 set completedCount(count) {
   this.nsProgress('setCompletedUnitCount', count);
 }
 get completedCount() {
   return this.nsProgress('completedUnitCount');
 }

 tick(count) {
   count = count || 1;
   this.completedCount = this.completedCount + count;
 }

}

function opt(options, name, defaultValue) {
     return options && options[name]!==undefined ? options[name] : defaultValue;
}


module.exports = MacOSDownloadProgress;
