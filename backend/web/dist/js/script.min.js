"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(i){var r=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(i);if(r){var n=_getPrototypeOf(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _possibleConstructorReturn(this,e)}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){l=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(l)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var Emitter=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"on",value:function(e,t){return this._callbacks=this._callbacks||{},this._callbacks[e]||(this._callbacks[e]=[]),this._callbacks[e].push(t),this}},{key:"emit",value:function(e){this._callbacks=this._callbacks||{};var t=this._callbacks[e];if(t){for(var n=arguments.length,i=new Array(1<n?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];var o,a=_createForOfIteratorHelper(t);try{for(a.s();!(o=a.n()).done;){o.value.apply(this,i)}}catch(e){a.e(e)}finally{a.f()}}return this}},{key:"off",value:function(e,t){if(!this._callbacks||0===arguments.length)return this._callbacks={},this;var n=this._callbacks[e];if(!n)return this;if(1===arguments.length)return delete this._callbacks[e],this;for(var i=0;i<n.length;i++){if(n[i]===t){n.splice(i,1);break}}return this}}]),e}(),Dropzone=function(){_inherits(b,Emitter);var a=_createSuper(b);function b(e,t){var n,i,r;if(_classCallCheck(this,b),(n=a.call(this)).element=e,n.version=b.version,n.defaultOptions.previewTemplate=n.defaultOptions.previewTemplate.replace(/\n*/g,""),n.clickableElements=[],n.listeners=[],n.files=[],"string"==typeof n.element&&(n.element=document.querySelector(n.element)),!n.element||null==n.element.nodeType)throw new Error("Invalid dropzone element.");if(n.element.dropzone)throw new Error("Dropzone already attached.");b.instances.push(_assertThisInitialized(n)),n.element.dropzone=_assertThisInitialized(n);var o=null!=(r=b.optionsForElement(n.element))?r:{};if(n.options=b.extend({},n.defaultOptions,o,null!=t?t:{}),n.options.forceFallback||!b.isBrowserSupported())return _possibleConstructorReturn(n,n.options.fallback.call(_assertThisInitialized(n)));if(null==n.options.url&&(n.options.url=n.element.getAttribute("action")),!n.options.url)throw new Error("No URL provided.");if(n.options.acceptedFiles&&n.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");if(n.options.uploadMultiple&&n.options.chunking)throw new Error("You cannot set both: uploadMultiple and chunking.");return n.options.acceptedMimeTypes&&(n.options.acceptedFiles=n.options.acceptedMimeTypes,delete n.options.acceptedMimeTypes),null!=n.options.renameFilename&&(n.options.renameFile=function(e){return n.options.renameFilename.call(_assertThisInitialized(n),e.name,e)}),"string"==typeof n.options.method&&(n.options.method=n.options.method.toUpperCase()),(i=n.getExistingFallback())&&i.parentNode&&i.parentNode.removeChild(i),!1!==n.options.previewsContainer&&(n.options.previewsContainer?n.previewsContainer=b.getElement(n.options.previewsContainer,"previewsContainer"):n.previewsContainer=n.element),n.options.clickable&&(!0===n.options.clickable?n.clickableElements=[n.element]:n.clickableElements=b.getElements(n.options.clickable,"clickable")),n.init(),n}return _createClass(b,null,[{key:"initClass",value:function(){this.prototype.Emitter=Emitter,this.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],this.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,timeout:3e4,parallelUploads:2,uploadMultiple:!1,chunking:!1,forceChunking:!1,chunkSize:2e6,parallelChunkUploads:!1,retryChunks:!1,retryChunksLimit:3,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,thumbnailMethod:"crop",resizeWidth:null,resizeHeight:null,resizeMimeType:null,resizeQuality:.8,resizeMethod:"contain",filesizeBase:1e3,maxFiles:null,headers:null,clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,hiddenInputContainer:"body",capture:null,renameFilename:null,renameFile:null,forceFallback:!1,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictUploadCanceled:"Upload canceled.",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",dictFileSizeUnits:{tb:"TB",gb:"GB",mb:"MB",kb:"KB",b:"b"},init:function(){},params:function(e,t,n){if(n)return{dzuuid:n.file.upload.uuid,dzchunkindex:n.index,dztotalfilesize:n.file.size,dzchunksize:this.options.chunkSize,dztotalchunkcount:n.file.upload.totalChunkCount,dzchunkbyteoffset:n.index*this.options.chunkSize}},accept:function(e,t){return t()},chunksUploaded:function(e,t){t()},fallback:function(){var e;this.element.className="".concat(this.element.className," dz-browser-not-supported");var t,n=_createForOfIteratorHelper(this.element.getElementsByTagName("div"));try{for(n.s();!(t=n.n()).done;){var i=t.value;if(/(^| )dz-message($| )/.test(i.className)){(e=i).className="dz-message";break}}}catch(e){n.e(e)}finally{n.f()}e||(e=b.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(e));var r=e.getElementsByTagName("span")[0];return r&&(null!=r.textContent?r.textContent=this.options.dictFallbackMessage:null!=r.innerText&&(r.innerText=this.options.dictFallbackMessage)),this.element.appendChild(this.getFallbackForm())},resize:function(e,t,n,i){var r={srcX:0,srcY:0,srcWidth:e.width,srcHeight:e.height},o=e.width/e.height;null==t&&null==n?(t=r.srcWidth,n=r.srcHeight):null==t?t=n*o:null==n&&(n=t/o);var a=(t=Math.min(t,r.srcWidth))/(n=Math.min(n,r.srcHeight));if(r.srcWidth>t||r.srcHeight>n)if("crop"===i)a<o?(r.srcHeight=e.height,r.srcWidth=r.srcHeight*a):(r.srcWidth=e.width,r.srcHeight=r.srcWidth/a);else{if("contain"!==i)throw new Error("Unknown resizeMethod '".concat(i,"'"));a<o?n=t/o:t=n*o}return r.srcX=(e.width-r.srcWidth)/2,r.srcY=(e.height-r.srcHeight)/2,r.trgWidth=t,r.trgHeight=n,r},transformFile:function(e,t){return(this.options.resizeWidth||this.options.resizeHeight)&&e.type.match(/image.*/)?this.resizeImage(e,this.options.resizeWidth,this.options.resizeHeight,this.options.resizeMethod,t):t(e)},previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Check</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Error</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',drop:function(){return this.element.classList.remove("dz-drag-hover")},dragstart:function(){},dragend:function(){return this.element.classList.remove("dz-drag-hover")},dragenter:function(){return this.element.classList.add("dz-drag-hover")},dragover:function(){return this.element.classList.add("dz-drag-hover")},dragleave:function(){return this.element.classList.remove("dz-drag-hover")},paste:function(){},reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(t){var n=this;if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer){t.previewElement=b.createElement(this.options.previewTemplate.trim()),t.previewTemplate=t.previewElement,this.previewsContainer.appendChild(t.previewElement);var e,i=_createForOfIteratorHelper(t.previewElement.querySelectorAll("[data-dz-name]"));try{for(i.s();!(e=i.n()).done;){var r=e.value;r.textContent=t.name}}catch(e){i.e(e)}finally{i.f()}var o,a=_createForOfIteratorHelper(t.previewElement.querySelectorAll("[data-dz-size]"));try{for(a.s();!(o=a.n()).done;)(r=o.value).innerHTML=this.filesize(t.size)}catch(e){a.e(e)}finally{a.f()}this.options.addRemoveLinks&&(t._removeLink=b.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'.concat(this.options.dictRemoveFile,"</a>")),t.previewElement.appendChild(t._removeLink));var l,s=function(e){return e.preventDefault(),e.stopPropagation(),t.status===b.UPLOADING?b.confirm(n.options.dictCancelUploadConfirmation,function(){return n.removeFile(t)}):n.options.dictRemoveFileConfirmation?b.confirm(n.options.dictRemoveFileConfirmation,function(){return n.removeFile(t)}):n.removeFile(t)},u=_createForOfIteratorHelper(t.previewElement.querySelectorAll("[data-dz-remove]"));try{for(u.s();!(l=u.n()).done;){l.value.addEventListener("click",s)}}catch(e){u.e(e)}finally{u.f()}}},removedfile:function(e){return null!=e.previewElement&&null!=e.previewElement.parentNode&&e.previewElement.parentNode.removeChild(e.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(e,t){if(e.previewElement){e.previewElement.classList.remove("dz-file-preview");var n,i=_createForOfIteratorHelper(e.previewElement.querySelectorAll("[data-dz-thumbnail]"));try{for(i.s();!(n=i.n()).done;){var r=n.value;r.alt=e.name,r.src=t}}catch(e){i.e(e)}finally{i.f()}return setTimeout(function(){return e.previewElement.classList.add("dz-image-preview")},1)}},error:function(e,t){if(e.previewElement){e.previewElement.classList.add("dz-error"),"string"!=typeof t&&t.error&&(t=t.error);var n,i=_createForOfIteratorHelper(e.previewElement.querySelectorAll("[data-dz-errormessage]"));try{for(i.s();!(n=i.n()).done;){n.value.textContent=t}}catch(e){i.e(e)}finally{i.f()}}},errormultiple:function(){},processing:function(e){if(e.previewElement&&(e.previewElement.classList.add("dz-processing"),e._removeLink))return e._removeLink.innerHTML=this.options.dictCancelUpload},processingmultiple:function(){},uploadprogress:function(e,t){if(e.previewElement){var n,i=_createForOfIteratorHelper(e.previewElement.querySelectorAll("[data-dz-uploadprogress]"));try{for(i.s();!(n=i.n()).done;){var r=n.value;"PROGRESS"===r.nodeName?r.value=t:r.style.width="".concat(t,"%")}}catch(e){i.e(e)}finally{i.f()}}},totaluploadprogress:function(){},sending:function(){},sendingmultiple:function(){},success:function(e){if(e.previewElement)return e.previewElement.classList.add("dz-success")},successmultiple:function(){},canceled:function(e){return this.emit("error",e,this.options.dictUploadCanceled)},canceledmultiple:function(){},complete:function(e){if(e._removeLink&&(e._removeLink.innerHTML=this.options.dictRemoveFile),e.previewElement)return e.previewElement.classList.add("dz-complete")},completemultiple:function(){},maxfilesexceeded:function(){},maxfilesreached:function(){},queuecomplete:function(){},addedfiles:function(){}},this.prototype._thumbnailQueue=[],this.prototype._processingThumbnail=!1}},{key:"extend",value:function(e){for(var t=arguments.length,n=new Array(1<t?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];for(var r=0,o=n;r<o.length;r++){var a=o[r];for(var l in a){var s=a[l];e[l]=s}}return e}}]),_createClass(b,[{key:"getAcceptedFiles",value:function(){return this.files.filter(function(e){return e.accepted}).map(function(e){return e})}},{key:"getRejectedFiles",value:function(){return this.files.filter(function(e){return!e.accepted}).map(function(e){return e})}},{key:"getFilesWithStatus",value:function(t){return this.files.filter(function(e){return e.status===t}).map(function(e){return e})}},{key:"getQueuedFiles",value:function(){return this.getFilesWithStatus(b.QUEUED)}},{key:"getUploadingFiles",value:function(){return this.getFilesWithStatus(b.UPLOADING)}},{key:"getAddedFiles",value:function(){return this.getFilesWithStatus(b.ADDED)}},{key:"getActiveFiles",value:function(){return this.files.filter(function(e){return e.status===b.UPLOADING||e.status===b.QUEUED}).map(function(e){return e})}},{key:"init",value:function(){var o=this;if("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(b.createElement('<div class="dz-default dz-message"><button class="dz-button" type="button">'.concat(this.options.dictDefaultMessage,"</button></div>"))),this.clickableElements.length){!function r(){return o.hiddenFileInput&&o.hiddenFileInput.parentNode.removeChild(o.hiddenFileInput),o.hiddenFileInput=document.createElement("input"),o.hiddenFileInput.setAttribute("type","file"),(null===o.options.maxFiles||1<o.options.maxFiles)&&o.hiddenFileInput.setAttribute("multiple","multiple"),o.hiddenFileInput.className="dz-hidden-input",null!==o.options.acceptedFiles&&o.hiddenFileInput.setAttribute("accept",o.options.acceptedFiles),null!==o.options.capture&&o.hiddenFileInput.setAttribute("capture",o.options.capture),o.hiddenFileInput.style.visibility="hidden",o.hiddenFileInput.style.position="absolute",o.hiddenFileInput.style.top="0",o.hiddenFileInput.style.left="0",o.hiddenFileInput.style.height="0",o.hiddenFileInput.style.width="0",b.getElement(o.options.hiddenInputContainer,"hiddenInputContainer").appendChild(o.hiddenFileInput),o.hiddenFileInput.addEventListener("change",function(){var e=o.hiddenFileInput.files;if(e.length){var t,n=_createForOfIteratorHelper(e);try{for(n.s();!(t=n.n()).done;){var i=t.value;o.addFile(i)}}catch(e){n.e(e)}finally{n.f()}}return o.emit("addedfiles",e),r()})}()}this.URL=null!==window.URL?window.URL:window.webkitURL;var e,t=_createForOfIteratorHelper(this.events);try{for(t.s();!(e=t.n()).done;){var n=e.value;this.on(n,this.options[n])}}catch(e){t.e(e)}finally{t.f()}this.on("uploadprogress",function(){return o.updateTotalUploadProgress()}),this.on("removedfile",function(){return o.updateTotalUploadProgress()}),this.on("canceled",function(e){return o.emit("complete",e)}),this.on("complete",function(e){if(0===o.getAddedFiles().length&&0===o.getUploadingFiles().length&&0===o.getQueuedFiles().length)return setTimeout(function(){return o.emit("queuecomplete")},0)});function i(e){return function(e){if(e.dataTransfer.types)for(var t=0;t<e.dataTransfer.types.length;t++)if("Files"===e.dataTransfer.types[t])return!0;return!1}(e)&&(e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1)}return this.listeners=[{element:this.element,events:{dragstart:function(e){return o.emit("dragstart",e)},dragenter:function(e){return i(e),o.emit("dragenter",e)},dragover:function(e){var t;try{t=e.dataTransfer.effectAllowed}catch(e){}return e.dataTransfer.dropEffect="move"===t||"linkMove"===t?"move":"copy",i(e),o.emit("dragover",e)},dragleave:function(e){return o.emit("dragleave",e)},drop:function(e){return i(e),o.drop(e)},dragend:function(e){return o.emit("dragend",e)}}}],this.clickableElements.forEach(function(t){return o.listeners.push({element:t,events:{click:function(e){return t===o.element&&e.target!==o.element&&!b.elementInside(e.target,o.element.querySelector(".dz-message"))||o.hiddenFileInput.click(),!0}}})}),this.enable(),this.options.init.call(this)}},{key:"destroy",value:function(){return this.disable(),this.removeAllFiles(!0),null!=this.hiddenFileInput&&this.hiddenFileInput.parentNode&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,b.instances.splice(b.instances.indexOf(this),1)}},{key:"updateTotalUploadProgress",value:function(){var e,t=0,n=0;if(this.getActiveFiles().length){var i,r=_createForOfIteratorHelper(this.getActiveFiles());try{for(r.s();!(i=r.n()).done;){var o=i.value;t+=o.upload.bytesSent,n+=o.upload.total}}catch(e){r.e(e)}finally{r.f()}e=100*t/n}else e=100;return this.emit("totaluploadprogress",e,n,t)}},{key:"_getParamName",value:function(e){return"function"==typeof this.options.paramName?this.options.paramName(e):"".concat(this.options.paramName).concat(this.options.uploadMultiple?"[".concat(e,"]"):"")}},{key:"_renameFile",value:function(e){return"function"!=typeof this.options.renameFile?e.name:this.options.renameFile(e)}},{key:"getFallbackForm",value:function(){var e,t;if(e=this.getExistingFallback())return e;var n='<div class="dz-fallback">';this.options.dictFallbackText&&(n+="<p>".concat(this.options.dictFallbackText,"</p>")),n+='<input type="file" name="'.concat(this._getParamName(0),'" ').concat(this.options.uploadMultiple?'multiple="multiple"':void 0,' /><input type="submit" value="Upload!"></div>');var i=b.createElement(n);return"FORM"!==this.element.tagName?(t=b.createElement('<form action="'.concat(this.options.url,'" enctype="multipart/form-data" method="').concat(this.options.method,'"></form>'))).appendChild(i):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=t?t:i}},{key:"getExistingFallback",value:function(){for(var e=function(e){var t,n=_createForOfIteratorHelper(e);try{for(n.s();!(t=n.n()).done;){var i=t.value;if(/(^| )fallback($| )/.test(i.className))return i}}catch(e){n.e(e)}finally{n.f()}},t=0,n=["div","form"];t<n.length;t++){var i,r=n[t];if(i=e(this.element.getElementsByTagName(r)))return i}}},{key:"setupEventListeners",value:function(){return this.listeners.map(function(i){return function(){var e=[];for(var t in i.events){var n=i.events[t];e.push(i.element.addEventListener(t,n,!1))}return e}()})}},{key:"removeEventListeners",value:function(){return this.listeners.map(function(i){return function(){var e=[];for(var t in i.events){var n=i.events[t];e.push(i.element.removeEventListener(t,n,!1))}return e}()})}},{key:"disable",value:function(){var t=this;return this.clickableElements.forEach(function(e){return e.classList.remove("dz-clickable")}),this.removeEventListeners(),this.disabled=!0,this.files.map(function(e){return t.cancelUpload(e)})}},{key:"enable",value:function(){return delete this.disabled,this.clickableElements.forEach(function(e){return e.classList.add("dz-clickable")}),this.setupEventListeners()}},{key:"filesize",value:function(e){var t=0,n="b";if(0<e){for(var i=["tb","gb","mb","kb","b"],r=0;r<i.length;r++){var o=i[r];if(Math.pow(this.options.filesizeBase,4-r)/10<=e){t=e/Math.pow(this.options.filesizeBase,4-r),n=o;break}}t=Math.round(10*t)/10}return"<strong>".concat(t,"</strong> ").concat(this.options.dictFileSizeUnits[n])}},{key:"_updateMaxFilesReachedClass",value:function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")}},{key:"drop",value:function(e){if(e.dataTransfer){this.emit("drop",e);for(var t=[],n=0;n<e.dataTransfer.files.length;n++)t[n]=e.dataTransfer.files[n];if(t.length){var i=e.dataTransfer.items;i&&i.length&&null!=i[0].webkitGetAsEntry?this._addFilesFromItems(i):this.handleFiles(t)}this.emit("addedfiles",t)}}},{key:"paste",value:function(e){if(null!=__guard__(null!=e?e.clipboardData:void 0,function(e){return e.items})){this.emit("paste",e);var t=e.clipboardData.items;return t.length?this._addFilesFromItems(t):void 0}}},{key:"handleFiles",value:function(e){var t,n=_createForOfIteratorHelper(e);try{for(n.s();!(t=n.n()).done;){var i=t.value;this.addFile(i)}}catch(e){n.e(e)}finally{n.f()}}},{key:"_addFilesFromItems",value:function(o){var a=this;return function(){var e,t=[],n=_createForOfIteratorHelper(o);try{for(n.s();!(e=n.n()).done;){var i,r=e.value;null!=r.webkitGetAsEntry&&(i=r.webkitGetAsEntry())?i.isFile?t.push(a.addFile(r.getAsFile())):i.isDirectory?t.push(a._addFilesFromDirectory(i,i.name)):t.push(void 0):null!=r.getAsFile&&(null==r.kind||"file"===r.kind)?t.push(a.addFile(r.getAsFile())):t.push(void 0)}}catch(e){n.e(e)}finally{n.f()}return t}()}},{key:"_addFilesFromDirectory",value:function(e,o){function t(t){return __guardMethod__(console,"log",function(e){return e.log(t)})}var a=this,n=e.createReader();return function r(){return n.readEntries(function(e){if(0<e.length){var t,n=_createForOfIteratorHelper(e);try{for(n.s();!(t=n.n()).done;){var i=t.value;i.isFile?i.file(function(e){if(!a.options.ignoreHiddenFiles||"."!==e.name.substring(0,1))return e.fullPath="".concat(o,"/").concat(e.name),a.addFile(e)}):i.isDirectory&&a._addFilesFromDirectory(i,"".concat(o,"/").concat(i.name))}}catch(e){n.e(e)}finally{n.f()}r()}return null},t)}()}},{key:"accept",value:function(e,t){this.options.maxFilesize&&e.size>1024*this.options.maxFilesize*1024?t(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(e.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):b.isValidFile(e,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",e)):this.options.accept.call(this,e,t):t(this.options.dictInvalidFileType)}},{key:"addFile",value:function(t){var n=this;t.upload={uuid:b.uuidv4(),progress:0,total:t.size,bytesSent:0,filename:this._renameFile(t)},this.files.push(t),t.status=b.ADDED,this.emit("addedfile",t),this._enqueueThumbnail(t),this.accept(t,function(e){e?(t.accepted=!1,n._errorProcessing([t],e)):(t.accepted=!0,n.options.autoQueue&&n.enqueueFile(t)),n._updateMaxFilesReachedClass()})}},{key:"enqueueFiles",value:function(e){var t,n=_createForOfIteratorHelper(e);try{for(n.s();!(t=n.n()).done;){var i=t.value;this.enqueueFile(i)}}catch(e){n.e(e)}finally{n.f()}return null}},{key:"enqueueFile",value:function(e){var t=this;if(e.status!==b.ADDED||!0!==e.accepted)throw new Error("This file can't be queued because it has already been processed or was rejected.");if(e.status=b.QUEUED,this.options.autoProcessQueue)return setTimeout(function(){return t.processQueue()},0)}},{key:"_enqueueThumbnail",value:function(e){var t=this;if(this.options.createImageThumbnails&&e.type.match(/image.*/)&&e.size<=1024*this.options.maxThumbnailFilesize*1024)return this._thumbnailQueue.push(e),setTimeout(function(){return t._processThumbnailQueue()},0)}},{key:"_processThumbnailQueue",value:function(){var t=this;if(!this._processingThumbnail&&0!==this._thumbnailQueue.length){this._processingThumbnail=!0;var n=this._thumbnailQueue.shift();return this.createThumbnail(n,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.thumbnailMethod,!0,function(e){return t.emit("thumbnail",n,e),t._processingThumbnail=!1,t._processThumbnailQueue()})}}},{key:"removeFile",value:function(e){if(e.status===b.UPLOADING&&this.cancelUpload(e),this.files=without(this.files,e),this.emit("removedfile",e),0===this.files.length)return this.emit("reset")}},{key:"removeAllFiles",value:function(e){null==e&&(e=!1);var t,n=_createForOfIteratorHelper(this.files.slice());try{for(n.s();!(t=n.n()).done;){var i=t.value;i.status===b.UPLOADING&&!e||this.removeFile(i)}}catch(e){n.e(e)}finally{n.f()}return null}},{key:"resizeImage",value:function(r,e,t,n,o){var a=this;return this.createThumbnail(r,e,t,n,!0,function(e,t){if(null==t)return o(r);var n=a.options.resizeMimeType;null==n&&(n=r.type);var i=t.toDataURL(n,a.options.resizeQuality);return"image/jpeg"!==n&&"image/jpg"!==n||(i=ExifRestore.restore(r.dataURL,i)),o(b.dataURItoBlob(i))})}},{key:"createThumbnail",value:function(e,t,n,i,r,o){var a=this,l=new FileReader;l.onload=function(){e.dataURL=l.result,"image/svg+xml"!==e.type?a.createThumbnailFromUrl(e,t,n,i,r,o):null!=o&&o(l.result)},l.readAsDataURL(e)}},{key:"displayExistingFile",value:function(t,e,n,i,r){var o=this,a=!(4<arguments.length&&void 0!==r)||r;if(this.emit("addedfile",t),this.emit("complete",t),a){t.dataURL=e,this.createThumbnailFromUrl(t,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.resizeMethod,this.options.fixOrientation,function(e){o.emit("thumbnail",t,e),n&&n()},i)}else this.emit("thumbnail",t,e),n&&n()}},{key:"createThumbnailFromUrl",value:function(o,a,l,s,t,u,e){var c=this,d=document.createElement("img");return e&&(d.crossOrigin=e),t="from-image"!=getComputedStyle(document.body).imageOrientation&&t,d.onload=function(){var e=function(e){return e(1)};return"undefined"!=typeof EXIF&&null!==EXIF&&t&&(e=function(e){return EXIF.getData(d,function(){return e(EXIF.getTag(this,"Orientation"))})}),e(function(e){o.width=d.width,o.height=d.height;var t=c.options.resize.call(c,o,a,l,s),n=document.createElement("canvas"),i=n.getContext("2d");switch(n.width=t.trgWidth,n.height=t.trgHeight,4<e&&(n.width=t.trgHeight,n.height=t.trgWidth),e){case 2:i.translate(n.width,0),i.scale(-1,1);break;case 3:i.translate(n.width,n.height),i.rotate(Math.PI);break;case 4:i.translate(0,n.height),i.scale(1,-1);break;case 5:i.rotate(.5*Math.PI),i.scale(1,-1);break;case 6:i.rotate(.5*Math.PI),i.translate(0,-n.width);break;case 7:i.rotate(.5*Math.PI),i.translate(n.height,-n.width),i.scale(-1,1);break;case 8:i.rotate(-.5*Math.PI),i.translate(-n.height,0)}drawImageIOSFix(i,d,null!=t.srcX?t.srcX:0,null!=t.srcY?t.srcY:0,t.srcWidth,t.srcHeight,null!=t.trgX?t.trgX:0,null!=t.trgY?t.trgY:0,t.trgWidth,t.trgHeight);var r=n.toDataURL("image/png");if(null!=u)return u(r,n)})},null!=u&&(d.onerror=u),d.src=o.dataURL}},{key:"processQueue",value:function(){var e=this.options.parallelUploads,t=this.getUploadingFiles().length,n=t;if(!(e<=t)){var i=this.getQueuedFiles();if(0<i.length){if(this.options.uploadMultiple)return this.processFiles(i.slice(0,e-t));for(;n<e;){if(!i.length)return;this.processFile(i.shift()),n++}}}}},{key:"processFile",value:function(e){return this.processFiles([e])}},{key:"processFiles",value:function(e){var t,n=_createForOfIteratorHelper(e);try{for(n.s();!(t=n.n()).done;){var i=t.value;i.processing=!0,i.status=b.UPLOADING,this.emit("processing",i)}}catch(e){n.e(e)}finally{n.f()}return this.options.uploadMultiple&&this.emit("processingmultiple",e),this.uploadFiles(e)}},{key:"_getFilesWithXhr",value:function(t){return this.files.filter(function(e){return e.xhr===t}).map(function(e){return e})}},{key:"cancelUpload",value:function(e){if(e.status===b.UPLOADING){var t,n=this._getFilesWithXhr(e.xhr),i=_createForOfIteratorHelper(n);try{for(i.s();!(t=i.n()).done;){t.value.status=b.CANCELED}}catch(e){i.e(e)}finally{i.f()}void 0!==e.xhr&&e.xhr.abort();var r,o=_createForOfIteratorHelper(n);try{for(o.s();!(r=o.n()).done;){var a=r.value;this.emit("canceled",a)}}catch(e){o.e(e)}finally{o.f()}this.options.uploadMultiple&&this.emit("canceledmultiple",n)}else e.status!==b.ADDED&&e.status!==b.QUEUED||(e.status=b.CANCELED,this.emit("canceled",e),this.options.uploadMultiple&&this.emit("canceledmultiple",[e]));if(this.options.autoProcessQueue)return this.processQueue()}},{key:"resolveOption",value:function(e){if("function"!=typeof e)return e;for(var t=arguments.length,n=new Array(1<t?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];return e.apply(this,n)}},{key:"uploadFile",value:function(e){return this.uploadFiles([e])}},{key:"uploadFiles",value:function(s){var u=this;this._transformFiles(s,function(e){if(u.options.chunking){var t=e[0];s[0].upload.chunked=u.options.chunking&&(u.options.forceChunking||t.size>u.options.chunkSize),s[0].upload.totalChunkCount=Math.ceil(t.size/u.options.chunkSize)}if(s[0].upload.chunked){var r=s[0],o=e[0];r.upload.chunks=[];var i=function(){for(var e=0;void 0!==r.upload.chunks[e];)e++;if(!(e>=r.upload.totalChunkCount)){0;var t=e*u.options.chunkSize,n=Math.min(t+u.options.chunkSize,o.size),i={name:u._getParamName(0),data:o.webkitSlice?o.webkitSlice(t,n):o.slice(t,n),filename:r.upload.filename,chunkIndex:e};r.upload.chunks[e]={file:r,index:e,dataBlock:i,status:b.UPLOADING,progress:0,retries:0},u._uploadData(s,[i])}};if(r.upload.finishedChunkUpload=function(e){var t=!0;e.status=b.SUCCESS,e.dataBlock=null,e.xhr=null;for(var n=0;n<r.upload.totalChunkCount;n++){if(void 0===r.upload.chunks[n])return i();r.upload.chunks[n].status!==b.SUCCESS&&(t=!1)}t&&u.options.chunksUploaded(r,function(){u._finished(s,"",null)})},u.options.parallelChunkUploads)for(var n=0;n<r.upload.totalChunkCount;n++)i();else i()}else{for(var a=[],l=0;l<s.length;l++)a[l]={name:u._getParamName(l),data:e[l],filename:s[l].upload.filename};u._uploadData(s,a)}})}},{key:"_getChunk",value:function(e,t){for(var n=0;n<e.upload.totalChunkCount;n++)if(void 0!==e.upload.chunks[n]&&e.upload.chunks[n].xhr===t)return e.upload.chunks[n]}},{key:"_uploadData",value:function(t,e){var n,i=this,r=new XMLHttpRequest,o=_createForOfIteratorHelper(t);try{for(o.s();!(n=o.n()).done;){n.value.xhr=r}}catch(e){o.e(e)}finally{o.f()}t[0].upload.chunked&&(t[0].upload.chunks[e[0].chunkIndex].xhr=r);var a=this.resolveOption(this.options.method,t),l=this.resolveOption(this.options.url,t);r.open(a,l,!0),r.timeout=this.resolveOption(this.options.timeout,t),r.withCredentials=!!this.options.withCredentials,r.onload=function(e){i._finishedUploading(t,r,e)},r.ontimeout=function(){i._handleUploadError(t,r,"Request timedout after ".concat(i.options.timeout/1e3," seconds"))},r.onerror=function(){i._handleUploadError(t,r)},(null!=r.upload?r.upload:r).onprogress=function(e){return i._updateFilesUploadProgress(t,r,e)};var s={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"};for(var u in this.options.headers&&b.extend(s,this.options.headers),s){var c=s[u];c&&r.setRequestHeader(u,c)}var d=new FormData;if(this.options.params){var p=this.options.params;for(var h in"function"==typeof p&&(p=p.call(this,t,r,t[0].upload.chunked?this._getChunk(t[0],r):null)),p){var f=p[h];if(Array.isArray(f))for(var m=0;m<f.length;m++)d.append(h,f[m]);else d.append(h,f)}}var v,g=_createForOfIteratorHelper(t);try{for(g.s();!(v=g.n()).done;){var y=v.value;this.emit("sending",y,r,d)}}catch(e){g.e(e)}finally{g.f()}this.options.uploadMultiple&&this.emit("sendingmultiple",t,r,d),this._addFormElementData(d);for(var F=0;F<e.length;F++){var k=e[F];d.append(k.name,k.data,k.filename)}this.submitRequest(r,d,t)}},{key:"_transformFiles",value:function(n,i){for(var e=this,r=[],o=0,t=function(t){e.options.transformFile.call(e,n[t],function(e){r[t]=e,++o===n.length&&i(r)})},a=0;a<n.length;a++)t(a)}},{key:"_addFormElementData",value:function(e){if("FORM"===this.element.tagName){var t,n=_createForOfIteratorHelper(this.element.querySelectorAll("input, textarea, select, button"));try{for(n.s();!(t=n.n()).done;){var i=t.value,r=i.getAttribute("name"),o=i.getAttribute("type");if(o=o&&o.toLowerCase(),null!=r)if("SELECT"===i.tagName&&i.hasAttribute("multiple")){var a,l=_createForOfIteratorHelper(i.options);try{for(l.s();!(a=l.n()).done;){var s=a.value;s.selected&&e.append(r,s.value)}}catch(e){l.e(e)}finally{l.f()}}else(!o||"checkbox"!==o&&"radio"!==o||i.checked)&&e.append(r,i.value)}}catch(e){n.e(e)}finally{n.f()}}}},{key:"_updateFilesUploadProgress",value:function(e,t,n){var i;if(void 0!==n){if(i=100*n.loaded/n.total,e[0].upload.chunked){var r=e[0],o=this._getChunk(r,t);o.progress=i,o.total=n.total,o.bytesSent=n.loaded;r.upload.progress=0,r.upload.total=0;for(var a=r.upload.bytesSent=0;a<r.upload.totalChunkCount;a++)void 0!==r.upload.chunks[a]&&void 0!==r.upload.chunks[a].progress&&(r.upload.progress+=r.upload.chunks[a].progress,r.upload.total+=r.upload.chunks[a].total,r.upload.bytesSent+=r.upload.chunks[a].bytesSent);r.upload.progress=r.upload.progress/r.upload.totalChunkCount}else{var l,s=_createForOfIteratorHelper(e);try{for(s.s();!(l=s.n()).done;){var u=l.value;u.upload.progress=i,u.upload.total=n.total,u.upload.bytesSent=n.loaded}}catch(e){s.e(e)}finally{s.f()}}var c,d=_createForOfIteratorHelper(e);try{for(d.s();!(c=d.n()).done;){var p=c.value;this.emit("uploadprogress",p,p.upload.progress,p.upload.bytesSent)}}catch(e){d.e(e)}finally{d.f()}}else{var h=!0;i=100;var f,m=_createForOfIteratorHelper(e);try{for(m.s();!(f=m.n()).done;){var v=f.value;100===v.upload.progress&&v.upload.bytesSent===v.upload.total||(h=!1),v.upload.progress=i,v.upload.bytesSent=v.upload.total}}catch(e){m.e(e)}finally{m.f()}if(h)return;var g,y=_createForOfIteratorHelper(e);try{for(y.s();!(g=y.n()).done;){var F=g.value;this.emit("uploadprogress",F,i,F.upload.bytesSent)}}catch(e){y.e(e)}finally{y.f()}}}},{key:"_finishedUploading",value:function(e,t,n){var i;if(e[0].status!==b.CANCELED&&4===t.readyState){if("arraybuffer"!==t.responseType&&"blob"!==t.responseType&&(i=t.responseText,t.getResponseHeader("content-type")&&~t.getResponseHeader("content-type").indexOf("application/json")))try{i=JSON.parse(i)}catch(e){n=e,i="Invalid JSON response from server."}this._updateFilesUploadProgress(e),200<=t.status&&t.status<300?e[0].upload.chunked?e[0].upload.finishedChunkUpload(this._getChunk(e[0],t)):this._finished(e,i,n):this._handleUploadError(e,t,i)}}},{key:"_handleUploadError",value:function(e,t,n){if(e[0].status!==b.CANCELED){if(e[0].upload.chunked&&this.options.retryChunks){var i=this._getChunk(e[0],t);if(i.retries++<this.options.retryChunksLimit)return void this._uploadData(e,[i.dataBlock]);console.warn("Retried this chunk too often. Giving up.")}this._errorProcessing(e,n||this.options.dictResponseError.replace("{{statusCode}}",t.status),t)}}},{key:"submitRequest",value:function(e,t){e.send(t)}},{key:"_finished",value:function(e,t,n){var i,r=_createForOfIteratorHelper(e);try{for(r.s();!(i=r.n()).done;){var o=i.value;o.status=b.SUCCESS,this.emit("success",o,t,n),this.emit("complete",o)}}catch(e){r.e(e)}finally{r.f()}if(this.options.uploadMultiple&&(this.emit("successmultiple",e,t,n),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()}},{key:"_errorProcessing",value:function(e,t,n){var i,r=_createForOfIteratorHelper(e);try{for(r.s();!(i=r.n()).done;){var o=i.value;o.status=b.ERROR,this.emit("error",o,t,n),this.emit("complete",o)}}catch(e){r.e(e)}finally{r.f()}if(this.options.uploadMultiple&&(this.emit("errormultiple",e,t,n),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()}}],[{key:"uuidv4",value:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}}]),b}();Dropzone.initClass(),Dropzone.version="5.7.2",Dropzone.options={},Dropzone.optionsForElement=function(e){return e.getAttribute("id")?Dropzone.options[camelize(e.getAttribute("id"))]:void 0},Dropzone.instances=[],Dropzone.forElement=function(e){if("string"==typeof e&&(e=document.querySelector(e)),null==(null!=e?e.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return e.dropzone},Dropzone.autoDiscover=!0,Dropzone.discover=function(){var o;if(document.querySelectorAll)o=document.querySelectorAll(".dropzone");else{o=[];var e=function(r){return function(){var e,t=[],n=_createForOfIteratorHelper(r);try{for(n.s();!(e=n.n()).done;){var i=e.value;/(^| )dropzone($| )/.test(i.className)?t.push(o.push(i)):t.push(void 0)}}catch(e){n.e(e)}finally{n.f()}return t}()};e(document.getElementsByTagName("div")),e(document.getElementsByTagName("form"))}return function(){var e,t=[],n=_createForOfIteratorHelper(o);try{for(n.s();!(e=n.n()).done;){var i=e.value;!1!==Dropzone.optionsForElement(i)?t.push(new Dropzone(i)):t.push(void 0)}}catch(e){n.e(e)}finally{n.f()}return t}()},Dropzone.blacklistedBrowsers=[/opera.*(Macintosh|Windows Phone).*version\/12/i],Dropzone.isBrowserSupported=function(){var e=!0;if(window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a")){var t,n=_createForOfIteratorHelper(Dropzone.blacklistedBrowsers);try{for(n.s();!(t=n.n()).done;){t.value.test(navigator.userAgent)&&(e=!1)}}catch(e){n.e(e)}finally{n.f()}}else e=!1;else e=!1;return e},Dropzone.dataURItoBlob=function(e){for(var t=atob(e.split(",")[1]),n=e.split(",")[0].split(":")[1].split(";")[0],i=new ArrayBuffer(t.length),r=new Uint8Array(i),o=0,a=t.length,l=0<=a;l?o<=a:a<=o;l?o++:o--)r[o]=t.charCodeAt(o);return new Blob([i],{type:n})};var without=function(e,t){return e.filter(function(e){return e!==t}).map(function(e){return e})},camelize=function(e){return e.replace(/[\-_](\w)/g,function(e){return e.charAt(1).toUpperCase()})};Dropzone.createElement=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]},Dropzone.elementInside=function(e,t){if(e===t)return!0;for(;e=e.parentNode;)if(e===t)return!0;return!1},Dropzone.getElement=function(e,t){var n;if("string"==typeof e?n=document.querySelector(e):null!=e.nodeType&&(n=e),null==n)throw new Error("Invalid `".concat(t,"` option provided. Please provide a CSS selector or a plain HTML element."));return n},Dropzone.getElements=function(e,t){var n,i;if(e instanceof Array){i=[];try{var r,o=_createForOfIteratorHelper(e);try{for(o.s();!(r=o.n()).done;)n=r.value,i.push(this.getElement(n,t))}catch(e){o.e(e)}finally{o.f()}}catch(e){i=null}}else if("string"==typeof e){i=[];var a,l=_createForOfIteratorHelper(document.querySelectorAll(e));try{for(l.s();!(a=l.n()).done;)n=a.value,i.push(n)}catch(e){l.e(e)}finally{l.f()}}else null!=e.nodeType&&(i=[e]);if(null==i||!i.length)throw new Error("Invalid `".concat(t,"` option provided. Please provide a CSS selector, a plain HTML element or a list of those."));return i},Dropzone.confirm=function(e,t,n){return window.confirm(e)?t():null!=n?n():void 0},Dropzone.isValidFile=function(e,t){if(!t)return!0;t=t.split(",");var n,i=e.type,r=i.replace(/\/.*$/,""),o=_createForOfIteratorHelper(t);try{for(o.s();!(n=o.n()).done;){var a=n.value;if("."===(a=a.trim()).charAt(0)){if(-1!==e.name.toLowerCase().indexOf(a.toLowerCase(),e.name.length-a.length))return!0}else if(/\/\*$/.test(a)){if(r===a.replace(/\/.*$/,""))return!0}else if(i===a)return!0}}catch(e){o.e(e)}finally{o.f()}return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(e){return this.each(function(){return new Dropzone(this,e)})}),"undefined"!=typeof module&&null!==module?module.exports=Dropzone:window.Dropzone=Dropzone,Dropzone.ADDED="added",Dropzone.QUEUED="queued",Dropzone.ACCEPTED=Dropzone.QUEUED,Dropzone.UPLOADING="uploading",Dropzone.PROCESSING=Dropzone.UPLOADING,Dropzone.CANCELED="canceled",Dropzone.ERROR="error",Dropzone.SUCCESS="success";var detectVerticalSquash=function(e){e.naturalWidth;var t=e.naturalHeight,n=document.createElement("canvas");n.width=1,n.height=t;var i=n.getContext("2d");i.drawImage(e,0,0);for(var r=i.getImageData(1,0,1,t).data,o=0,a=t,l=t;o<l;){0===r[4*(l-1)+3]?a=l:o=l,l=a+o>>1}var s=l/t;return 0==s?1:s},drawImageIOSFix=function(e,t,n,i,r,o,a,l,s,u){var c=detectVerticalSquash(t);return e.drawImage(t,n,i,r,o,a,l,s,u/c)},ExifRestore=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"initClass",value:function(){this.KEY_STR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}},{key:"encode64",value:function(e){for(var t="",n=void 0,i=void 0,r="",o=void 0,a=void 0,l=void 0,s="",u=0;o=(n=e[u++])>>2,a=(3&n)<<4|(i=e[u++])>>4,l=(15&i)<<2|(r=e[u++])>>6,s=63&r,isNaN(i)?l=s=64:isNaN(r)&&(s=64),t=t+this.KEY_STR.charAt(o)+this.KEY_STR.charAt(a)+this.KEY_STR.charAt(l)+this.KEY_STR.charAt(s),n=i=r="",o=a=l=s="",u<e.length;);return t}},{key:"restore",value:function(e,t){if(!e.match("data:image/jpeg;base64,"))return t;var n=this.decode64(e.replace("data:image/jpeg;base64,","")),i=this.slice2Segments(n),r=this.exifManipulation(t,i);return"data:image/jpeg;base64,".concat(this.encode64(r))}},{key:"exifManipulation",value:function(e,t){var n=this.getExifArray(t),i=this.insertExif(e,n);return new Uint8Array(i)}},{key:"getExifArray",value:function(e){for(var t=void 0,n=0;n<e.length;){if(255===(t=e[n])[0]&225===t[1])return t;n++}return[]}},{key:"insertExif",value:function(e,t){var n=e.replace("data:image/jpeg;base64,",""),i=this.decode64(n),r=i.indexOf(255,3),o=i.slice(0,r),a=i.slice(r),l=o;return l=(l=l.concat(t)).concat(a)}},{key:"slice2Segments",value:function(e){for(var t=0,n=[];;){if(255===e[t]&218===e[t+1])break;if(255===e[t]&216===e[t+1])t+=2;else{var i=t+(256*e[t+2]+e[t+3])+2,r=e.slice(t,i);n.push(r),t=i}if(t>e.length)break}return n}},{key:"decode64",value:function(e){var t=void 0,n=void 0,i="",r=void 0,o=void 0,a="",l=0,s=[];for(/[^A-Za-z0-9\+\/\=]/g.exec(e)&&console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");t=this.KEY_STR.indexOf(e.charAt(l++))<<2|(r=this.KEY_STR.indexOf(e.charAt(l++)))>>4,n=(15&r)<<4|(o=this.KEY_STR.indexOf(e.charAt(l++)))>>2,i=(3&o)<<6|(a=this.KEY_STR.indexOf(e.charAt(l++))),s.push(t),64!==o&&s.push(n),64!==a&&s.push(i),t=n=i="",r=o=a="",l<e.length;);return s}}]),e}();ExifRestore.initClass();var contentLoaded=function(t,n){function i(e){if("readystatechange"!==e.type||"complete"===o.readyState)return("load"===e.type?t:o)[s](u+e.type,i,!1),!r&&(r=!0)?n.call(t,e.type||e):void 0}var r=!1,e=!0,o=t.document,a=o.documentElement,l=o.addEventListener?"addEventListener":"attachEvent",s=o.addEventListener?"removeEventListener":"detachEvent",u=o.addEventListener?"":"on";if("complete"!==o.readyState){if(o.createEventObject&&a.doScroll){try{e=!t.frameElement}catch(e){}e&&!function t(){try{a.doScroll("left")}catch(e){return void setTimeout(t,50)}return i("poll")}()}return o[l](u+"DOMContentLoaded",i,!1),o[l](u+"readystatechange",i,!1),t[l](u+"load",i,!1)}};function __guard__(e,t){return null!=e?t(e):void 0}function __guardMethod__(e,t,n){return null!=e&&"function"==typeof e[t]?n(e,t):void 0}Dropzone._autoDiscoverFunction=function(){if(Dropzone.autoDiscover)return Dropzone.discover()},contentLoaded(window,Dropzone._autoDiscoverFunction);
!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define("underscore",r):(n=n||self,function(){var t=n._,e=n._=r();e.noConflict=function(){return n._=t,e}}())}(this,(function(){
//     Underscore.js 1.12.0
//     https://underscorejs.org
//     (c) 2009-2020 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
var n="1.12.0",r="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||Function("return this")()||{},t=Array.prototype,e=Object.prototype,u="undefined"!=typeof Symbol?Symbol.prototype:null,o=t.push,i=t.slice,a=e.toString,f=e.hasOwnProperty,c="undefined"!=typeof ArrayBuffer,l="undefined"!=typeof DataView,s=Array.isArray,p=Object.keys,v=Object.create,h=c&&ArrayBuffer.isView,y=isNaN,g=isFinite,d=!{toString:null}.propertyIsEnumerable("toString"),b=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],m=Math.pow(2,53)-1;function j(n,r){return r=null==r?n.length-1:+r,function(){for(var t=Math.max(arguments.length-r,0),e=Array(t),u=0;u<t;u++)e[u]=arguments[u+r];switch(r){case 0:return n.call(this,e);case 1:return n.call(this,arguments[0],e);case 2:return n.call(this,arguments[0],arguments[1],e)}var o=Array(r+1);for(u=0;u<r;u++)o[u]=arguments[u];return o[r]=e,n.apply(this,o)}}function _(n){var r=typeof n;return"function"===r||"object"===r&&!!n}function w(n){return void 0===n}function A(n){return!0===n||!1===n||"[object Boolean]"===a.call(n)}function x(n){var r="[object "+n+"]";return function(n){return a.call(n)===r}}var S=x("String"),O=x("Number"),M=x("Date"),E=x("RegExp"),B=x("Error"),N=x("Symbol"),I=x("ArrayBuffer"),k=x("Function"),T=r.document&&r.document.childNodes;"function"!=typeof/./&&"object"!=typeof Int8Array&&"function"!=typeof T&&(k=function(n){return"function"==typeof n||!1});var D=k,R=x("Object"),F=l&&R(new DataView(new ArrayBuffer(8))),V="undefined"!=typeof Map&&R(new Map),P=x("DataView");var q=F?function(n){return null!=n&&D(n.getInt8)&&I(n.buffer)}:P,U=s||x("Array");function W(n,r){return null!=n&&f.call(n,r)}var z=x("Arguments");!function(){z(arguments)||(z=function(n){return W(n,"callee")})}();var L=z;function C(n){return O(n)&&y(n)}function K(n){return function(){return n}}function J(n){return function(r){var t=n(r);return"number"==typeof t&&t>=0&&t<=m}}function $(n){return function(r){return null==r?void 0:r[n]}}var G=$("byteLength"),H=J(G),Q=/\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;var X=c?function(n){return h?h(n)&&!q(n):H(n)&&Q.test(a.call(n))}:K(!1),Y=$("length");function Z(n,r){r=function(n){for(var r={},t=n.length,e=0;e<t;++e)r[n[e]]=!0;return{contains:function(n){return r[n]},push:function(t){return r[t]=!0,n.push(t)}}}(r);var t=b.length,u=n.constructor,o=D(u)&&u.prototype||e,i="constructor";for(W(n,i)&&!r.contains(i)&&r.push(i);t--;)(i=b[t])in n&&n[i]!==o[i]&&!r.contains(i)&&r.push(i)}function nn(n){if(!_(n))return[];if(p)return p(n);var r=[];for(var t in n)W(n,t)&&r.push(t);return d&&Z(n,r),r}function rn(n,r){var t=nn(r),e=t.length;if(null==n)return!e;for(var u=Object(n),o=0;o<e;o++){var i=t[o];if(r[i]!==u[i]||!(i in u))return!1}return!0}function tn(n){return n instanceof tn?n:this instanceof tn?void(this._wrapped=n):new tn(n)}function en(n){return new Uint8Array(n.buffer||n,n.byteOffset||0,G(n))}tn.VERSION=n,tn.prototype.value=function(){return this._wrapped},tn.prototype.valueOf=tn.prototype.toJSON=tn.prototype.value,tn.prototype.toString=function(){return String(this._wrapped)};var un="[object DataView]";function on(n,r,t,e){if(n===r)return 0!==n||1/n==1/r;if(null==n||null==r)return!1;if(n!=n)return r!=r;var o=typeof n;return("function"===o||"object"===o||"object"==typeof r)&&function n(r,t,e,o){r instanceof tn&&(r=r._wrapped);t instanceof tn&&(t=t._wrapped);var i=a.call(r);if(i!==a.call(t))return!1;if(F&&"[object Object]"==i&&q(r)){if(!q(t))return!1;i=un}switch(i){case"[object RegExp]":case"[object String]":return""+r==""+t;case"[object Number]":return+r!=+r?+t!=+t:0==+r?1/+r==1/t:+r==+t;case"[object Date]":case"[object Boolean]":return+r==+t;case"[object Symbol]":return u.valueOf.call(r)===u.valueOf.call(t);case"[object ArrayBuffer]":case un:return n(en(r),en(t),e,o)}var f="[object Array]"===i;if(!f&&X(r)){if(G(r)!==G(t))return!1;if(r.buffer===t.buffer&&r.byteOffset===t.byteOffset)return!0;f=!0}if(!f){if("object"!=typeof r||"object"!=typeof t)return!1;var c=r.constructor,l=t.constructor;if(c!==l&&!(D(c)&&c instanceof c&&D(l)&&l instanceof l)&&"constructor"in r&&"constructor"in t)return!1}o=o||[];var s=(e=e||[]).length;for(;s--;)if(e[s]===r)return o[s]===t;if(e.push(r),o.push(t),f){if((s=r.length)!==t.length)return!1;for(;s--;)if(!on(r[s],t[s],e,o))return!1}else{var p,v=nn(r);if(s=v.length,nn(t).length!==s)return!1;for(;s--;)if(p=v[s],!W(t,p)||!on(r[p],t[p],e,o))return!1}return e.pop(),o.pop(),!0}(n,r,t,e)}function an(n){if(!_(n))return[];var r=[];for(var t in n)r.push(t);return d&&Z(n,r),r}function fn(n){var r=Y(n);return function(t){if(null==t)return!1;var e=an(t);if(Y(e))return!1;for(var u=0;u<r;u++)if(!D(t[n[u]]))return!1;return n!==hn||!D(t[cn])}}var cn="forEach",ln="has",sn=["clear","delete"],pn=["get",ln,"set"],vn=sn.concat(cn,pn),hn=sn.concat(pn),yn=["add"].concat(sn,cn,ln),gn=V?fn(vn):x("Map"),dn=V?fn(hn):x("WeakMap"),bn=V?fn(yn):x("Set"),mn=x("WeakSet");function jn(n){for(var r=nn(n),t=r.length,e=Array(t),u=0;u<t;u++)e[u]=n[r[u]];return e}function _n(n){for(var r={},t=nn(n),e=0,u=t.length;e<u;e++)r[n[t[e]]]=t[e];return r}function wn(n){var r=[];for(var t in n)D(n[t])&&r.push(t);return r.sort()}function An(n,r){return function(t){var e=arguments.length;if(r&&(t=Object(t)),e<2||null==t)return t;for(var u=1;u<e;u++)for(var o=arguments[u],i=n(o),a=i.length,f=0;f<a;f++){var c=i[f];r&&void 0!==t[c]||(t[c]=o[c])}return t}}var xn=An(an),Sn=An(nn),On=An(an,!0);function Mn(n){if(!_(n))return{};if(v)return v(n);var r=function(){};r.prototype=n;var t=new r;return r.prototype=null,t}function En(n){return _(n)?U(n)?n.slice():xn({},n):n}function Bn(n){return U(n)?n:[n]}function Nn(n){return tn.toPath(n)}function In(n,r){for(var t=r.length,e=0;e<t;e++){if(null==n)return;n=n[r[e]]}return t?n:void 0}function kn(n,r,t){var e=In(n,Nn(r));return w(e)?t:e}function Tn(n){return n}function Dn(n){return n=Sn({},n),function(r){return rn(r,n)}}function Rn(n){return n=Nn(n),function(r){return In(r,n)}}function Fn(n,r,t){if(void 0===r)return n;switch(null==t?3:t){case 1:return function(t){return n.call(r,t)};case 3:return function(t,e,u){return n.call(r,t,e,u)};case 4:return function(t,e,u,o){return n.call(r,t,e,u,o)}}return function(){return n.apply(r,arguments)}}function Vn(n,r,t){return null==n?Tn:D(n)?Fn(n,r,t):_(n)&&!U(n)?Dn(n):Rn(n)}function Pn(n,r){return Vn(n,r,1/0)}function qn(n,r,t){return tn.iteratee!==Pn?tn.iteratee(n,r):Vn(n,r,t)}function Un(){}function Wn(n,r){return null==r&&(r=n,n=0),n+Math.floor(Math.random()*(r-n+1))}tn.toPath=Bn,tn.iteratee=Pn;var zn=Date.now||function(){return(new Date).getTime()};function Ln(n){var r=function(r){return n[r]},t="(?:"+nn(n).join("|")+")",e=RegExp(t),u=RegExp(t,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,r):n}}var Cn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},Kn=Ln(Cn),Jn=Ln(_n(Cn)),$n=tn.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},Gn=/(.)^/,Hn={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},Qn=/\\|'|\r|\n|\u2028|\u2029/g;function Xn(n){return"\\"+Hn[n]}var Yn=0;function Zn(n,r,t,e,u){if(!(e instanceof r))return n.apply(t,u);var o=Mn(n.prototype),i=n.apply(o,u);return _(i)?i:o}var nr=j((function(n,r){var t=nr.placeholder,e=function(){for(var u=0,o=r.length,i=Array(o),a=0;a<o;a++)i[a]=r[a]===t?arguments[u++]:r[a];for(;u<arguments.length;)i.push(arguments[u++]);return Zn(n,e,this,this,i)};return e}));nr.placeholder=tn;var rr=j((function(n,r,t){if(!D(n))throw new TypeError("Bind must be called on a function");var e=j((function(u){return Zn(n,e,r,this,t.concat(u))}));return e})),tr=J(Y);function er(n,r,t,e){if(e=e||[],r||0===r){if(r<=0)return e.concat(n)}else r=1/0;for(var u=e.length,o=0,i=Y(n);o<i;o++){var a=n[o];if(tr(a)&&(U(a)||L(a)))if(r>1)er(a,r-1,t,e),u=e.length;else for(var f=0,c=a.length;f<c;)e[u++]=a[f++];else t||(e[u++]=a)}return e}var ur=j((function(n,r){var t=(r=er(r,!1,!1)).length;if(t<1)throw new Error("bindAll must be passed function names");for(;t--;){var e=r[t];n[e]=rr(n[e],n)}return n}));var or=j((function(n,r,t){return setTimeout((function(){return n.apply(null,t)}),r)})),ir=nr(or,tn,1);function ar(n){return function(){return!n.apply(this,arguments)}}function fr(n,r){var t;return function(){return--n>0&&(t=r.apply(this,arguments)),n<=1&&(r=null),t}}var cr=nr(fr,2);function lr(n,r,t){r=qn(r,t);for(var e,u=nn(n),o=0,i=u.length;o<i;o++)if(r(n[e=u[o]],e,n))return e}function sr(n){return function(r,t,e){t=qn(t,e);for(var u=Y(r),o=n>0?0:u-1;o>=0&&o<u;o+=n)if(t(r[o],o,r))return o;return-1}}var pr=sr(1),vr=sr(-1);function hr(n,r,t,e){for(var u=(t=qn(t,e,1))(r),o=0,i=Y(n);o<i;){var a=Math.floor((o+i)/2);t(n[a])<u?o=a+1:i=a}return o}function yr(n,r,t){return function(e,u,o){var a=0,f=Y(e);if("number"==typeof o)n>0?a=o>=0?o:Math.max(o+f,a):f=o>=0?Math.min(o+1,f):o+f+1;else if(t&&o&&f)return e[o=t(e,u)]===u?o:-1;if(u!=u)return(o=r(i.call(e,a,f),C))>=0?o+a:-1;for(o=n>0?a:f-1;o>=0&&o<f;o+=n)if(e[o]===u)return o;return-1}}var gr=yr(1,pr,hr),dr=yr(-1,vr);function br(n,r,t){var e=(tr(n)?pr:lr)(n,r,t);if(void 0!==e&&-1!==e)return n[e]}function mr(n,r,t){var e,u;if(r=Fn(r,t),tr(n))for(e=0,u=n.length;e<u;e++)r(n[e],e,n);else{var o=nn(n);for(e=0,u=o.length;e<u;e++)r(n[o[e]],o[e],n)}return n}function jr(n,r,t){r=qn(r,t);for(var e=!tr(n)&&nn(n),u=(e||n).length,o=Array(u),i=0;i<u;i++){var a=e?e[i]:i;o[i]=r(n[a],a,n)}return o}function _r(n){var r=function(r,t,e,u){var o=!tr(r)&&nn(r),i=(o||r).length,a=n>0?0:i-1;for(u||(e=r[o?o[a]:a],a+=n);a>=0&&a<i;a+=n){var f=o?o[a]:a;e=t(e,r[f],f,r)}return e};return function(n,t,e,u){var o=arguments.length>=3;return r(n,Fn(t,u,4),e,o)}}var wr=_r(1),Ar=_r(-1);function xr(n,r,t){var e=[];return r=qn(r,t),mr(n,(function(n,t,u){r(n,t,u)&&e.push(n)})),e}function Sr(n,r,t){r=qn(r,t);for(var e=!tr(n)&&nn(n),u=(e||n).length,o=0;o<u;o++){var i=e?e[o]:o;if(!r(n[i],i,n))return!1}return!0}function Or(n,r,t){r=qn(r,t);for(var e=!tr(n)&&nn(n),u=(e||n).length,o=0;o<u;o++){var i=e?e[o]:o;if(r(n[i],i,n))return!0}return!1}function Mr(n,r,t,e){return tr(n)||(n=jn(n)),("number"!=typeof t||e)&&(t=0),gr(n,r,t)>=0}var Er=j((function(n,r,t){var e,u;return D(r)?u=r:(r=Nn(r),e=r.slice(0,-1),r=r[r.length-1]),jr(n,(function(n){var o=u;if(!o){if(e&&e.length&&(n=In(n,e)),null==n)return;o=n[r]}return null==o?o:o.apply(n,t)}))}));function Br(n,r){return jr(n,Rn(r))}function Nr(n,r,t){var e,u,o=-1/0,i=-1/0;if(null==r||"number"==typeof r&&"object"!=typeof n[0]&&null!=n)for(var a=0,f=(n=tr(n)?n:jn(n)).length;a<f;a++)null!=(e=n[a])&&e>o&&(o=e);else r=qn(r,t),mr(n,(function(n,t,e){((u=r(n,t,e))>i||u===-1/0&&o===-1/0)&&(o=n,i=u)}));return o}function Ir(n,r,t){if(null==r||t)return tr(n)||(n=jn(n)),n[Wn(n.length-1)];var e=tr(n)?En(n):jn(n),u=Y(e);r=Math.max(Math.min(r,u),0);for(var o=u-1,i=0;i<r;i++){var a=Wn(i,o),f=e[i];e[i]=e[a],e[a]=f}return e.slice(0,r)}function kr(n,r){return function(t,e,u){var o=r?[[],[]]:{};return e=qn(e,u),mr(t,(function(r,u){var i=e(r,u,t);n(o,r,i)})),o}}var Tr=kr((function(n,r,t){W(n,t)?n[t].push(r):n[t]=[r]})),Dr=kr((function(n,r,t){n[t]=r})),Rr=kr((function(n,r,t){W(n,t)?n[t]++:n[t]=1})),Fr=kr((function(n,r,t){n[t?0:1].push(r)}),!0),Vr=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;function Pr(n,r,t){return r in t}var qr=j((function(n,r){var t={},e=r[0];if(null==n)return t;D(e)?(r.length>1&&(e=Fn(e,r[1])),r=an(n)):(e=Pr,r=er(r,!1,!1),n=Object(n));for(var u=0,o=r.length;u<o;u++){var i=r[u],a=n[i];e(a,i,n)&&(t[i]=a)}return t})),Ur=j((function(n,r){var t,e=r[0];return D(e)?(e=ar(e),r.length>1&&(t=r[1])):(r=jr(er(r,!1,!1),String),e=function(n,t){return!Mr(r,t)}),qr(n,e,t)}));function Wr(n,r,t){return i.call(n,0,Math.max(0,n.length-(null==r||t?1:r)))}function zr(n,r,t){return null==n||n.length<1?null==r||t?void 0:[]:null==r||t?n[0]:Wr(n,n.length-r)}function Lr(n,r,t){return i.call(n,null==r||t?1:r)}var Cr=j((function(n,r){return r=er(r,!0,!0),xr(n,(function(n){return!Mr(r,n)}))})),Kr=j((function(n,r){return Cr(n,r)}));function Jr(n,r,t,e){A(r)||(e=t,t=r,r=!1),null!=t&&(t=qn(t,e));for(var u=[],o=[],i=0,a=Y(n);i<a;i++){var f=n[i],c=t?t(f,i,n):f;r&&!t?(i&&o===c||u.push(f),o=c):t?Mr(o,c)||(o.push(c),u.push(f)):Mr(u,f)||u.push(f)}return u}var $r=j((function(n){return Jr(er(n,!0,!0))}));function Gr(n){for(var r=n&&Nr(n,Y).length||0,t=Array(r),e=0;e<r;e++)t[e]=Br(n,e);return t}var Hr=j(Gr);function Qr(n,r){return n._chain?tn(r).chain():r}function Xr(n){return mr(wn(n),(function(r){var t=tn[r]=n[r];tn.prototype[r]=function(){var n=[this._wrapped];return o.apply(n,arguments),Qr(this,t.apply(tn,n))}})),tn}mr(["pop","push","reverse","shift","sort","splice","unshift"],(function(n){var r=t[n];tn.prototype[n]=function(){var t=this._wrapped;return null!=t&&(r.apply(t,arguments),"shift"!==n&&"splice"!==n||0!==t.length||delete t[0]),Qr(this,t)}})),mr(["concat","join","slice"],(function(n){var r=t[n];tn.prototype[n]=function(){var n=this._wrapped;return null!=n&&(n=r.apply(n,arguments)),Qr(this,n)}}));var Yr=Xr({__proto__:null,VERSION:n,restArguments:j,isObject:_,isNull:function(n){return null===n},isUndefined:w,isBoolean:A,isElement:function(n){return!(!n||1!==n.nodeType)},isString:S,isNumber:O,isDate:M,isRegExp:E,isError:B,isSymbol:N,isArrayBuffer:I,isDataView:q,isArray:U,isFunction:D,isArguments:L,isFinite:function(n){return!N(n)&&g(n)&&!isNaN(parseFloat(n))},isNaN:C,isTypedArray:X,isEmpty:function(n){if(null==n)return!0;var r=Y(n);return"number"==typeof r&&(U(n)||S(n)||L(n))?0===r:0===Y(nn(n))},isMatch:rn,isEqual:function(n,r){return on(n,r)},isMap:gn,isWeakMap:dn,isSet:bn,isWeakSet:mn,keys:nn,allKeys:an,values:jn,pairs:function(n){for(var r=nn(n),t=r.length,e=Array(t),u=0;u<t;u++)e[u]=[r[u],n[r[u]]];return e},invert:_n,functions:wn,methods:wn,extend:xn,extendOwn:Sn,assign:Sn,defaults:On,create:function(n,r){var t=Mn(n);return r&&Sn(t,r),t},clone:En,tap:function(n,r){return r(n),n},get:kn,has:function(n,r){for(var t=(r=Nn(r)).length,e=0;e<t;e++){var u=r[e];if(!W(n,u))return!1;n=n[u]}return!!t},mapObject:function(n,r,t){r=qn(r,t);for(var e=nn(n),u=e.length,o={},i=0;i<u;i++){var a=e[i];o[a]=r(n[a],a,n)}return o},identity:Tn,constant:K,noop:Un,toPath:Bn,property:Rn,propertyOf:function(n){return null==n?Un:function(r){return kn(n,r)}},matcher:Dn,matches:Dn,times:function(n,r,t){var e=Array(Math.max(0,n));r=Fn(r,t,1);for(var u=0;u<n;u++)e[u]=r(u);return e},random:Wn,now:zn,escape:Kn,unescape:Jn,templateSettings:$n,template:function(n,r,t){!r&&t&&(r=t),r=On({},r,tn.templateSettings);var e,u=RegExp([(r.escape||Gn).source,(r.interpolate||Gn).source,(r.evaluate||Gn).source].join("|")+"|$","g"),o=0,i="__p+='";n.replace(u,(function(r,t,e,u,a){return i+=n.slice(o,a).replace(Qn,Xn),o=a+r.length,t?i+="'+\n((__t=("+t+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":u&&(i+="';\n"+u+"\n__p+='"),r})),i+="';\n",r.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{e=new Function(r.variable||"obj","_",i)}catch(n){throw n.source=i,n}var a=function(n){return e.call(this,n,tn)},f=r.variable||"obj";return a.source="function("+f+"){\n"+i+"}",a},result:function(n,r,t){var e=(r=Nn(r)).length;if(!e)return D(t)?t.call(n):t;for(var u=0;u<e;u++){var o=null==n?void 0:n[r[u]];void 0===o&&(o=t,u=e),n=D(o)?o.call(n):o}return n},uniqueId:function(n){var r=++Yn+"";return n?n+r:r},chain:function(n){var r=tn(n);return r._chain=!0,r},iteratee:Pn,partial:nr,bind:rr,bindAll:ur,memoize:function(n,r){var t=function(e){var u=t.cache,o=""+(r?r.apply(this,arguments):e);return W(u,o)||(u[o]=n.apply(this,arguments)),u[o]};return t.cache={},t},delay:or,defer:ir,throttle:function(n,r,t){var e,u,o,i,a=0;t||(t={});var f=function(){a=!1===t.leading?0:zn(),e=null,i=n.apply(u,o),e||(u=o=null)},c=function(){var c=zn();a||!1!==t.leading||(a=c);var l=r-(c-a);return u=this,o=arguments,l<=0||l>r?(e&&(clearTimeout(e),e=null),a=c,i=n.apply(u,o),e||(u=o=null)):e||!1===t.trailing||(e=setTimeout(f,l)),i};return c.cancel=function(){clearTimeout(e),a=0,e=u=o=null},c},debounce:function(n,r,t){var e,u,o=function(r,t){e=null,t&&(u=n.apply(r,t))},i=j((function(i){if(e&&clearTimeout(e),t){var a=!e;e=setTimeout(o,r),a&&(u=n.apply(this,i))}else e=or(o,r,this,i);return u}));return i.cancel=function(){clearTimeout(e),e=null},i},wrap:function(n,r){return nr(r,n)},negate:ar,compose:function(){var n=arguments,r=n.length-1;return function(){for(var t=r,e=n[r].apply(this,arguments);t--;)e=n[t].call(this,e);return e}},after:function(n,r){return function(){if(--n<1)return r.apply(this,arguments)}},before:fr,once:cr,findKey:lr,findIndex:pr,findLastIndex:vr,sortedIndex:hr,indexOf:gr,lastIndexOf:dr,find:br,detect:br,findWhere:function(n,r){return br(n,Dn(r))},each:mr,forEach:mr,map:jr,collect:jr,reduce:wr,foldl:wr,inject:wr,reduceRight:Ar,foldr:Ar,filter:xr,select:xr,reject:function(n,r,t){return xr(n,ar(qn(r)),t)},every:Sr,all:Sr,some:Or,any:Or,contains:Mr,includes:Mr,include:Mr,invoke:Er,pluck:Br,where:function(n,r){return xr(n,Dn(r))},max:Nr,min:function(n,r,t){var e,u,o=1/0,i=1/0;if(null==r||"number"==typeof r&&"object"!=typeof n[0]&&null!=n)for(var a=0,f=(n=tr(n)?n:jn(n)).length;a<f;a++)null!=(e=n[a])&&e<o&&(o=e);else r=qn(r,t),mr(n,(function(n,t,e){((u=r(n,t,e))<i||u===1/0&&o===1/0)&&(o=n,i=u)}));return o},shuffle:function(n){return Ir(n,1/0)},sample:Ir,sortBy:function(n,r,t){var e=0;return r=qn(r,t),Br(jr(n,(function(n,t,u){return{value:n,index:e++,criteria:r(n,t,u)}})).sort((function(n,r){var t=n.criteria,e=r.criteria;if(t!==e){if(t>e||void 0===t)return 1;if(t<e||void 0===e)return-1}return n.index-r.index})),"value")},groupBy:Tr,indexBy:Dr,countBy:Rr,partition:Fr,toArray:function(n){return n?U(n)?i.call(n):S(n)?n.match(Vr):tr(n)?jr(n,Tn):jn(n):[]},size:function(n){return null==n?0:tr(n)?n.length:nn(n).length},pick:qr,omit:Ur,first:zr,head:zr,take:zr,initial:Wr,last:function(n,r,t){return null==n||n.length<1?null==r||t?void 0:[]:null==r||t?n[n.length-1]:Lr(n,Math.max(0,n.length-r))},rest:Lr,tail:Lr,drop:Lr,compact:function(n){return xr(n,Boolean)},flatten:function(n,r){return er(n,r,!1)},without:Kr,uniq:Jr,unique:Jr,union:$r,intersection:function(n){for(var r=[],t=arguments.length,e=0,u=Y(n);e<u;e++){var o=n[e];if(!Mr(r,o)){var i;for(i=1;i<t&&Mr(arguments[i],o);i++);i===t&&r.push(o)}}return r},difference:Cr,unzip:Gr,transpose:Gr,zip:Hr,object:function(n,r){for(var t={},e=0,u=Y(n);e<u;e++)r?t[n[e]]=r[e]:t[n[e][0]]=n[e][1];return t},range:function(n,r,t){null==r&&(r=n||0,n=0),t||(t=r<n?-1:1);for(var e=Math.max(Math.ceil((r-n)/t),0),u=Array(e),o=0;o<e;o++,n+=t)u[o]=n;return u},chunk:function(n,r){if(null==r||r<1)return[];for(var t=[],e=0,u=n.length;e<u;)t.push(i.call(n,e,e+=r));return t},mixin:Xr,default:tn});return Yr._=Yr,Yr}));
/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function() {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = window.getComputedStyle(e, null);
        return t ? o[t] : o
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e || -1 !== ['HTML', 'BODY', '#document'].indexOf(e.nodeName)) return window.document.body;
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll)/.test(r + s + p) ? e : n(o(e))
    }

    function r(e) {
        var o = e && e.offsetParent,
            i = o && o.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : window.document.documentElement
    }

    function p(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e)
    }

    function s(e) {
        return null === e.parentNode ? e : s(e.parentNode)
    }

    function d(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return window.document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = o ? e : t,
            n = o ? t : e,
            a = document.createRange();
        a.setStart(i, 0), a.setEnd(n, 0);
        var f = a.commonAncestorContainer;
        if (e !== f && t !== f || i.contains(n)) return p(f) ? f : r(f);
        var l = s(e);
        return l.host ? d(l.host, t) : d(e, s(t).host)
    }

    function a(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            i = e.nodeName;
        if ('BODY' === i || 'HTML' === i) {
            var n = window.document.documentElement,
                r = window.document.scrollingElement || n;
            return r[o]
        }
        return e[o]
    }

    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = a(t, 'top'),
            n = a(t, 'left'),
            r = o ? -1 : 1;
        return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e
    }

    function l(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            i = 'Left' == o ? 'Right' : 'Bottom';
        return +e['border' + o + 'Width'].split('px')[0] + +e['border' + i + 'Width'].split('px')[0]
    }

    function m(e, t, o, i) {
        return _(t['offset' + e], o['client' + e], o['offset' + e], ie() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0)
    }

    function h() {
        var e = window.document.body,
            t = window.document.documentElement,
            o = ie() && window.getComputedStyle(t);
        return {
            height: m('Height', e, t, o),
            width: m('Width', e, t, o)
        }
    }

    function c(e) {
        return se({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function g(e) {
        var o = {};
        if (ie()) try {
            o = e.getBoundingClientRect();
            var i = a(e, 'top'),
                n = a(e, 'left');
            o.top += i, o.left += n, o.bottom += i, o.right += n
        } catch (e) {} else o = e.getBoundingClientRect();
        var r = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top
            },
            p = 'HTML' === e.nodeName ? h() : {},
            s = p.width || e.clientWidth || r.right - r.left,
            d = p.height || e.clientHeight || r.bottom - r.top,
            f = e.offsetWidth - s,
            m = e.offsetHeight - d;
        if (f || m) {
            var g = t(e);
            f -= l(g, 'x'), m -= l(g, 'y'), r.width -= f, r.height -= m
        }
        return c(r)
    }

    function u(e, o) {
        var i = ie(),
            r = 'HTML' === o.nodeName,
            p = g(e),
            s = g(o),
            d = n(e),
            a = t(o),
            l = +a.borderTopWidth.split('px')[0],
            m = +a.borderLeftWidth.split('px')[0],
            h = c({
                top: p.top - s.top - l,
                left: p.left - s.left - m,
                width: p.width,
                height: p.height
            });
        if (h.marginTop = 0, h.marginLeft = 0, !i && r) {
            var u = +a.marginTop.split('px')[0],
                b = +a.marginLeft.split('px')[0];
            h.top -= l - u, h.bottom -= l - u, h.left -= m - b, h.right -= m - b, h.marginTop = u, h.marginLeft = b
        }
        return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (h = f(h, o)), h
    }

    function b(e) {
        var t = window.document.documentElement,
            o = u(e, t),
            i = _(t.clientWidth, window.innerWidth || 0),
            n = _(t.clientHeight, window.innerHeight || 0),
            r = a(t),
            p = a(t, 'left'),
            s = {
                top: r - o.top + o.marginTop,
                left: p - o.left + o.marginLeft,
                width: i,
                height: n
            };
        return c(s)
    }

    function y(e) {
        var i = e.nodeName;
        return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || y(o(e))
    }

    function w(e, t, i, r) {
        var p = {
                top: 0,
                left: 0
            },
            s = d(e, t);
        if ('viewport' === r) p = b(s);
        else {
            var a;
            'scrollParent' === r ? (a = n(o(e)), 'BODY' === a.nodeName && (a = window.document.documentElement)) : 'window' === r ? a = window.document.documentElement : a = r;
            var f = u(a, s);
            if ('HTML' === a.nodeName && !y(s)) {
                var l = h(),
                    m = l.height,
                    c = l.width;
                p.top += f.top - f.marginTop, p.bottom = m + f.top, p.left += f.left - f.marginLeft, p.right = c + f.left
            } else p = f
        }
        return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p
    }

    function v(e) {
        var t = e.width,
            o = e.height;
        return t * o
    }

    function E(e, t, o, i, n) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = w(o, i, r, n),
            s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            },
            d = Object.keys(s).map(function(e) {
                return se({
                    key: e
                }, s[e], {
                    area: v(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            a = d.filter(function(e) {
                var t = e.width,
                    i = e.height;
                return t >= o.clientWidth && i >= o.clientHeight
            }),
            f = 0 < a.length ? a[0].key : d[0].key,
            l = e.split('-')[1];
        return f + (l ? '-' + l : '')
    }

    function x(e, t, o) {
        var i = d(t, o);
        return u(o, i)
    }

    function O(e) {
        var t = window.getComputedStyle(e),
            o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            n = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + o
            };
        return n
    }

    function L(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function S(e, t, o) {
        o = o.split('-')[0];
        var i = O(e),
            n = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            d = r ? 'height' : 'width',
            a = r ? 'width' : 'height';
        return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[L(s)], n
    }

    function T(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function C(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === o
        });
        var i = T(e, function(e) {
            return e[t] === o
        });
        return e.indexOf(i)
    }

    function N(t, o, i) {
        var n = void 0 === i ? t : t.slice(0, C(t, 'name', i));
        return n.forEach(function(t) {
            t.function && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var i = t.function || t.fn;
            t.enabled && e(i) && (o.offsets.popper = c(o.offsets.popper), o.offsets.reference = c(o.offsets.reference), o = i(o, t))
        }), o
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = E(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function(e) {
            var o = e.name,
                i = e.enabled;
            return i && o === t
        })
    }

    function B(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof window.document.body.style[r]) return r
        }
        return null
    }

    function D() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function H(e, t, o, i) {
        var r = 'BODY' === e.nodeName,
            p = r ? window : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || H(n(p.parentNode), t, o, i), i.push(p)
    }

    function P(e, t, o, i) {
        o.updateBound = i, window.addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return H(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
    }

    function A() {
        this.state.eventsEnabled || (this.state = P(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function M(e, t) {
        return window.removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function I() {
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state))
    }

    function R(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function U(e, t) {
        Object.keys(t).forEach(function(o) {
            var i = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && R(t[o]) && (i = 'px'), e.style[o] = t[o] + i
        })
    }

    function Y(e, t) {
        Object.keys(t).forEach(function(o) {
            var i = t[o];
            !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function F(e, t, o) {
        var i = T(e, function(e) {
                var o = e.name;
                return o === t
            }),
            n = !!i && e.some(function(e) {
                return e.name === o && e.enabled && e.order < i.order
            });
        if (!n) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return n
    }

    function j(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function K(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = ae.indexOf(e),
            i = ae.slice(o + 1).concat(ae.slice(0, o));
        return t ? i.reverse() : i
    }

    function q(e, t, o, i) {
        var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +n[1],
            p = n[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = i;
            }
            var d = c(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? _(document.documentElement.clientHeight, window.innerHeight || 0) : _(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
        }
        return r
    }

    function G(e, t, o, i) {
        var n = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(i),
            p = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = p.indexOf(T(p, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function(e, i) {
            var n = (1 === i ? !r : r) ? 'height' : 'width',
                p = !1;
            return e.reduce(function(e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return q(e, n, t, o)
            })
        }), a.forEach(function(e, t) {
            e.forEach(function(o, i) {
                R(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1))
            })
        }), n
    }
    for (var z = Math.min, V = Math.floor, _ = Math.max, X = ['native code', '[object MutationObserverConstructor]'], Q = function(e) {
            return X.some(function(t) {
                return -1 < (e || '').toString().indexOf(t)
            })
        }, J = 'undefined' != typeof window, Z = ['Edge', 'Trident', 'Firefox'], $ = 0, ee = 0; ee < Z.length; ee += 1)
        if (J && 0 <= navigator.userAgent.indexOf(Z[ee])) {
            $ = 1;
            break
        }
    var i, te = J && Q(window.MutationObserver),
        oe = te ? function(e) {
            var t = !1,
                o = 0,
                i = document.createElement('span'),
                n = new MutationObserver(function() {
                    e(), t = !1
                });
            return n.observe(i, {
                    attributes: !0
                }),
                function() {
                    t || (t = !0, i.setAttribute('x-index', o), ++o)
                }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, $))
            }
        },
        ie = function() {
            return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')), i
        },
        ne = function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        re = function() {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
            return function(t, o, i) {
                return o && e(t.prototype, o), i && e(t, i), t
            }
        }(),
        pe = function(e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        },
        se = Object.assign || function(e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var i in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        },
        de = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        ae = de.slice(3),
        fe = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        le = function() {
            function t(o, i) {
                var n = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                ne(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(n.update)
                }, this.update = oe(this.update.bind(this)), this.options = se({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o.jquery ? o[0] : o, this.popper = i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                    n.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return se({
                        name: e
                    }, n.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p
            }
            return re(t, [{
                key: 'update',
                value: function() {
                    return k.call(this)
                }
            }, {
                key: 'destroy',
                value: function() {
                    return D.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function() {
                    return A.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function() {
                    return I.call(this)
                }
            }]), t
        }();
    return le.Utils = ('undefined' == typeof window ? global : window).PopperUtils, le.placements = de, le.Defaults = {
        placement: 'bottom',
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        i = t.split('-')[1];
                    if (i) {
                        var n = e.offsets,
                            r = n.reference,
                            p = n.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top',
                            a = s ? 'width' : 'height',
                            f = {
                                start: pe({}, d, r[d]),
                                end: pe({}, d, r[d] + r[a] - p[a])
                            };
                        e.offsets.popper = se({}, p, f[i])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(e, t) {
                    var o, i = t.offset,
                        n = e.placement,
                        r = e.offsets,
                        p = r.popper,
                        s = r.reference,
                        d = n.split('-')[0];
                    return o = R(+i) ? [+i, 0] : G(i, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.boundariesElement || r(e.instance.popper);
                    e.instance.reference === o && (o = r(o));
                    var i = w(e.instance.popper, e.instance.reference, t.padding, o);
                    t.boundaries = i;
                    var n = t.priority,
                        p = e.offsets.popper,
                        s = {
                            primary: function(e) {
                                var o = p[e];
                                return p[e] < i[e] && !t.escapeWithReference && (o = _(p[e], i[e])), pe({}, e, o)
                            },
                            secondary: function(e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = p[o];
                                return p[e] > i[e] && !t.escapeWithReference && (n = z(p[o], i[e] - ('right' === e ? p.width : p.height))), pe({}, o, n)
                            }
                        };
                    return n.forEach(function(e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        p = se({}, p, s[t](e))
                    }), e.offsets.popper = p, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        o = t.popper,
                        i = t.reference,
                        n = e.placement.split('-')[0],
                        r = V,
                        p = -1 !== ['top', 'bottom'].indexOf(n),
                        s = p ? 'right' : 'bottom',
                        d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, t) {
                    if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var o = t.element;
                    if ('string' == typeof o) {
                        if (o = e.instance.popper.querySelector(o), !o) return e;
                    } else if (!e.instance.popper.contains(o)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var i = e.placement.split('-')[0],
                        n = e.offsets,
                        r = n.popper,
                        p = n.reference,
                        s = -1 !== ['left', 'right'].indexOf(i),
                        d = s ? 'height' : 'width',
                        a = s ? 'top' : 'left',
                        f = s ? 'left' : 'top',
                        l = s ? 'bottom' : 'right',
                        m = O(o)[d];
                    p[l] - m < r[a] && (e.offsets.popper[a] -= r[a] - (p[l] - m)), p[a] + m > r[l] && (e.offsets.popper[a] += p[a] + m - r[l]);
                    var h = p[a] + p[d] / 2 - m / 2,
                        g = h - c(e.offsets.popper)[a];
                    return g = _(z(r[d] - m, g), 0), e.arrowElement = o, e.offsets.arrow = {}, e.offsets.arrow[a] = Math.round(g), e.offsets.arrow[f] = '', e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
                        i = e.placement.split('-')[0],
                        n = L(i),
                        r = e.placement.split('-')[1] || '',
                        p = [];
                    switch (t.behavior) {
                        case fe.FLIP:
                            p = [i, n];
                            break;
                        case fe.CLOCKWISE:
                            p = K(i);
                            break;
                        case fe.COUNTERCLOCKWISE:
                            p = K(i, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function(s, d) {
                        if (i !== s || p.length === d + 1) return e;
                        i = e.placement.split('-')[0], n = L(i);
                        var a = e.offsets.popper,
                            f = e.offsets.reference,
                            l = V,
                            m = 'left' === i && l(a.right) > l(f.left) || 'right' === i && l(a.left) < l(f.right) || 'top' === i && l(a.bottom) > l(f.top) || 'bottom' === i && l(a.top) < l(f.bottom),
                            h = l(a.left) < l(o.left),
                            c = l(a.right) > l(o.right),
                            g = l(a.top) < l(o.top),
                            u = l(a.bottom) > l(o.bottom),
                            b = 'left' === i && h || 'right' === i && c || 'top' === i && g || 'bottom' === i && u,
                            y = -1 !== ['top', 'bottom'].indexOf(i),
                            w = !!t.flipVariations && (y && 'start' === r && h || y && 'end' === r && c || !y && 'start' === r && g || !y && 'end' === r && u);
                        (m || b || w) && (e.flipped = !0, (m || b) && (i = p[d + 1]), w && (r = j(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = se({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = N(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        i = e.offsets,
                        n = i.popper,
                        r = i.reference,
                        p = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return n[p ? 'left' : 'top'] = r[t] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = L(t), e.offsets.popper = c(n), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = T(e.instance.modifiers, function(e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.x,
                        i = t.y,
                        n = e.offsets.popper,
                        p = T(e.instance.modifiers, function(e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === p ? t.gpuAcceleration : p,
                        f = r(e.instance.popper),
                        l = g(f),
                        m = {
                            position: n.position
                        },
                        h = {
                            left: V(n.left),
                            top: V(n.top),
                            bottom: V(n.bottom),
                            right: V(n.right)
                        },
                        c = 'bottom' === o ? 'top' : 'bottom',
                        u = 'right' === i ? 'left' : 'right',
                        b = B('transform');
                    if (d = 'bottom' == c ? -l.height + h.bottom : h.top, s = 'right' == u ? -l.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[u] = 0, m.willChange = 'transform';
                    else {
                        var y = 'bottom' == c ? -1 : 1,
                            w = 'right' == u ? -1 : 1;
                        m[c] = d * y, m[u] = s * w, m.willChange = c + ', ' + u
                    }
                    var v = {
                        "x-placement": e.placement
                    };
                    return e.attributes = se({}, v, e.attributes), e.styles = se({}, m, e.styles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.offsets.arrow && U(e.arrowElement, e.offsets.arrow), e
                },
                onLoad: function(e, t, o, i, n) {
                    var r = x(n, t, e),
                        p = E(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), U(t, {
                        position: 'absolute'
                    }), o
                },
                gpuAcceleration: void 0
            }
        }
    }, le
});
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("jquery"),require("popper.js")):"function"==typeof define&&define.amd?define(["jquery","popper.js"],e):e(t.jQuery,t.Popper)}(this,function(t,e){"use strict";function n(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function i(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function o(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}t=t&&t.hasOwnProperty("default")?t.default:t,e=e&&e.hasOwnProperty("default")?e.default:e;var s,a,l,c,h,u,d,f,p,m,g,_,v,y,E,b,C,I,T,A,S,w,D,N,O,k,$,j,R,L,P,x,F,M,Q,H,U,G,W,B,K,V,Y,q,z,X,Z,J,tt,et,nt,it,rt,ot,st,at,lt,ct,ht,ut,dt,ft,pt,mt,gt,_t,vt,yt,Et,bt,Ct,It,Tt,At,St,wt,Dt,Nt,Ot,kt,$t,jt,Rt,Lt,Pt,xt,Ft,Mt,Qt,Ht,Ut,Gt,Wt,Bt,Kt,Vt,Yt,qt,zt,Xt,Zt,Jt,te,ee,ne,ie,re,oe,se,ae,le,ce,he,ue,de,fe,pe,me,ge,_e,ve,ye,Ee,be,Ce,Ie,Te,Ae,Se,we,De,Ne,Oe,ke,$e,je,Re,Le,Pe,xe,Fe,Me,Qe,He,Ue,Ge,We,Be,Ke,Ve,Ye,qe,ze,Xe,Ze,Je,tn,en,nn,rn,on,sn,an,ln,cn,hn,un,dn,fn,pn,mn,gn,_n,vn,yn,En,bn,Cn,In,Tn,An,Sn,wn,Dn,Nn,On,kn,$n,jn,Rn,Ln,Pn,xn,Fn,Mn,Qn,Hn,Un,Gn,Wn,Bn,Kn,Vn,Yn,qn,zn,Xn,Zn,Jn,ti,ei,ni,ii,ri,oi,si,ai,li,ci,hi,ui,di,fi,pi,mi,gi,_i,vi,yi,Ei,bi,Ci,Ii,Ti,Ai,Si,wi,Di,Ni,Oi,ki,$i,ji,Ri,Li,Pi,xi,Fi,Mi,Qi,Hi,Ui,Gi,Wi,Bi,Ki,Vi,Yi,qi,zi,Xi,Zi,Ji,tr,er,nr,ir,rr,or,sr,ar,lr,cr,hr=function(t){var e=!1;function n(e){var n=this,r=!1;return t(this).one(i.TRANSITION_END,function(){r=!0}),setTimeout(function(){r||i.triggerTransitionEnd(n)},e),this}var i={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(e){var n,i=e.getAttribute("data-target");i&&"#"!==i||(i=e.getAttribute("href")||""),"#"===i.charAt(0)&&(n=i,i=n="function"==typeof t.escapeSelector?t.escapeSelector(n).substr(1):n.replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1"));try{return t(document).find(i).length>0?i:null}catch(t){return null}},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(n){t(n).trigger(e.end)},supportsTransitionEnd:function(){return Boolean(e)},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)){var o=n[r],s=e[r],a=s&&i.isElement(s)?"element":(l=s,{}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());if(!new RegExp(o).test(a))throw new Error(t.toUpperCase()+': Option "'+r+'" provided type "'+a+'" but expected type "'+o+'".')}var l}};return e=("undefined"==typeof window||!window.QUnit)&&{end:"transitionend"},t.fn.emulateTransitionEnd=n,i.supportsTransitionEnd()&&(t.event.special[i.TRANSITION_END]={bindType:e.end,delegateType:e.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}),i}(t),ur=(a="alert",c="."+(l="bs.alert"),h=(s=t).fn[a],u={CLOSE:"close"+c,CLOSED:"closed"+c,CLICK_DATA_API:"click"+c+".data-api"},d="alert",f="fade",p="show",m=function(){function t(t){this._element=t}var e=t.prototype;return e.close=function(t){t=t||this._element;var e=this._getRootElement(t);this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},e.dispose=function(){s.removeData(this._element,l),this._element=null},e._getRootElement=function(t){var e=hr.getSelectorFromElement(t),n=!1;return e&&(n=s(e)[0]),n||(n=s(t).closest("."+d)[0]),n},e._triggerCloseEvent=function(t){var e=s.Event(u.CLOSE);return s(t).trigger(e),e},e._removeElement=function(t){var e=this;s(t).removeClass(p),hr.supportsTransitionEnd()&&s(t).hasClass(f)?s(t).one(hr.TRANSITION_END,function(n){return e._destroyElement(t,n)}).emulateTransitionEnd(150):this._destroyElement(t)},e._destroyElement=function(t){s(t).detach().trigger(u.CLOSED).remove()},t._jQueryInterface=function(e){return this.each(function(){var n=s(this),i=n.data(l);i||(i=new t(this),n.data(l,i)),"close"===e&&i[e](this)})},t._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},i(t,null,[{key:"VERSION",get:function(){return"4.0.0"}}]),t}(),s(document).on(u.CLICK_DATA_API,'[data-dismiss="alert"]',m._handleDismiss(new m)),s.fn[a]=m._jQueryInterface,s.fn[a].Constructor=m,s.fn[a].noConflict=function(){return s.fn[a]=h,m._jQueryInterface},_="button",y="."+(v="bs.button"),E=".data-api",b=(g=t).fn[_],C="active",I="btn",T="focus",A='[data-toggle^="button"]',S='[data-toggle="buttons"]',w="input",D=".active",N=".btn",O={CLICK_DATA_API:"click"+y+E,FOCUS_BLUR_DATA_API:"focus"+y+E+" blur"+y+E},k=function(){function t(t){this._element=t}var e=t.prototype;return e.toggle=function(){var t=!0,e=!0,n=g(this._element).closest(S)[0];if(n){var i=g(this._element).find(w)[0];if(i){if("radio"===i.type)if(i.checked&&g(this._element).hasClass(C))t=!1;else{var r=g(n).find(D)[0];r&&g(r).removeClass(C)}if(t){if(i.hasAttribute("disabled")||n.hasAttribute("disabled")||i.classList.contains("disabled")||n.classList.contains("disabled"))return;i.checked=!g(this._element).hasClass(C),g(i).trigger("change")}i.focus(),e=!1}}e&&this._element.setAttribute("aria-pressed",!g(this._element).hasClass(C)),t&&g(this._element).toggleClass(C)},e.dispose=function(){g.removeData(this._element,v),this._element=null},t._jQueryInterface=function(e){return this.each(function(){var n=g(this).data(v);n||(n=new t(this),g(this).data(v,n)),"toggle"===e&&n[e]()})},i(t,null,[{key:"VERSION",get:function(){return"4.0.0"}}]),t}(),g(document).on(O.CLICK_DATA_API,A,function(t){t.preventDefault();var e=t.target;g(e).hasClass(I)||(e=g(e).closest(N)),k._jQueryInterface.call(g(e),"toggle")}).on(O.FOCUS_BLUR_DATA_API,A,function(t){var e=g(t.target).closest(N)[0];g(e).toggleClass(T,/^focus(in)?$/.test(t.type))}),g.fn[_]=k._jQueryInterface,g.fn[_].Constructor=k,g.fn[_].noConflict=function(){return g.fn[_]=b,k._jQueryInterface},j="carousel",L="."+(R="bs.carousel"),P=".data-api",x=($=t).fn[j],F={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},M={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},Q="next",H="prev",U="left",G="right",W={SLIDE:"slide"+L,SLID:"slid"+L,KEYDOWN:"keydown"+L,MOUSEENTER:"mouseenter"+L,MOUSELEAVE:"mouseleave"+L,TOUCHEND:"touchend"+L,LOAD_DATA_API:"load"+L+P,CLICK_DATA_API:"click"+L+P},B="carousel",K="active",V="slide",Y="carousel-item-right",q="carousel-item-left",z="carousel-item-next",X="carousel-item-prev",Z={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},J=function(){function t(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(e),this._element=$(t)[0],this._indicatorsElement=$(this._element).find(Z.INDICATORS)[0],this._addEventListeners()}var e=t.prototype;return e.next=function(){this._isSliding||this._slide(Q)},e.nextWhenVisible=function(){!document.hidden&&$(this._element).is(":visible")&&"hidden"!==$(this._element).css("visibility")&&this.next()},e.prev=function(){this._isSliding||this._slide(H)},e.pause=function(t){t||(this._isPaused=!0),$(this._element).find(Z.NEXT_PREV)[0]&&hr.supportsTransitionEnd()&&(hr.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function(t){var e=this;this._activeElement=$(this._element).find(Z.ACTIVE_ITEM)[0];var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)$(this._element).one(W.SLID,function(){return e.to(t)});else{if(n===t)return this.pause(),void this.cycle();var i=t>n?Q:H;this._slide(i,this._items[t])}},e.dispose=function(){$(this._element).off(L),$.removeData(this._element,R),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},e._getConfig=function(t){return t=r({},F,t),hr.typeCheckConfig(j,t,M),t},e._addEventListeners=function(){var t=this;this._config.keyboard&&$(this._element).on(W.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&($(this._element).on(W.MOUSEENTER,function(e){return t.pause(e)}).on(W.MOUSELEAVE,function(e){return t.cycle(e)}),"ontouchstart"in document.documentElement&&$(this._element).on(W.TOUCHEND,function(){t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},500+t._config.interval)}))},e._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},e._getItemIndex=function(t){return this._items=$.makeArray($(t).parent().find(Z.ITEM)),this._items.indexOf(t)},e._getItemByDirection=function(t,e){var n=t===Q,i=t===H,r=this._getItemIndex(e),o=this._items.length-1;if((i&&0===r||n&&r===o)&&!this._config.wrap)return e;var s=(r+(t===H?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},e._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),i=this._getItemIndex($(this._element).find(Z.ACTIVE_ITEM)[0]),r=$.Event(W.SLIDE,{relatedTarget:t,direction:e,from:i,to:n});return $(this._element).trigger(r),r},e._setActiveIndicatorElement=function(t){if(this._indicatorsElement){$(this._indicatorsElement).find(Z.ACTIVE).removeClass(K);var e=this._indicatorsElement.children[this._getItemIndex(t)];e&&$(e).addClass(K)}},e._slide=function(t,e){var n,i,r,o=this,s=$(this._element).find(Z.ACTIVE_ITEM)[0],a=this._getItemIndex(s),l=e||s&&this._getItemByDirection(t,s),c=this._getItemIndex(l),h=Boolean(this._interval);if(t===Q?(n=q,i=z,r=U):(n=Y,i=X,r=G),l&&$(l).hasClass(K))this._isSliding=!1;else if(!this._triggerSlideEvent(l,r).isDefaultPrevented()&&s&&l){this._isSliding=!0,h&&this.pause(),this._setActiveIndicatorElement(l);var u=$.Event(W.SLID,{relatedTarget:l,direction:r,from:a,to:c});hr.supportsTransitionEnd()&&$(this._element).hasClass(V)?($(l).addClass(i),hr.reflow(l),$(s).addClass(n),$(l).addClass(n),$(s).one(hr.TRANSITION_END,function(){$(l).removeClass(n+" "+i).addClass(K),$(s).removeClass(K+" "+i+" "+n),o._isSliding=!1,setTimeout(function(){return $(o._element).trigger(u)},0)}).emulateTransitionEnd(600)):($(s).removeClass(K),$(l).addClass(K),this._isSliding=!1,$(this._element).trigger(u)),h&&this.cycle()}},t._jQueryInterface=function(e){return this.each(function(){var n=$(this).data(R),i=r({},F,$(this).data());"object"==typeof e&&(i=r({},i,e));var o="string"==typeof e?e:i.slide;if(n||(n=new t(this,i),$(this).data(R,n)),"number"==typeof e)n.to(e);else if("string"==typeof o){if(void 0===n[o])throw new TypeError('No method named "'+o+'"');n[o]()}else i.interval&&(n.pause(),n.cycle())})},t._dataApiClickHandler=function(e){var n=hr.getSelectorFromElement(this);if(n){var i=$(n)[0];if(i&&$(i).hasClass(B)){var o=r({},$(i).data(),$(this).data()),s=this.getAttribute("data-slide-to");s&&(o.interval=!1),t._jQueryInterface.call($(i),o),s&&$(i).data(R).to(s),e.preventDefault()}}},i(t,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return F}}]),t}(),$(document).on(W.CLICK_DATA_API,Z.DATA_SLIDE,J._dataApiClickHandler),$(window).on(W.LOAD_DATA_API,function(){$(Z.DATA_RIDE).each(function(){var t=$(this);J._jQueryInterface.call(t,t.data())})}),$.fn[j]=J._jQueryInterface,$.fn[j].Constructor=J,$.fn[j].noConflict=function(){return $.fn[j]=x,J._jQueryInterface},et="collapse",it="."+(nt="bs.collapse"),rt=(tt=t).fn[et],ot={toggle:!0,parent:""},st={toggle:"boolean",parent:"(string|element)"},at={SHOW:"show"+it,SHOWN:"shown"+it,HIDE:"hide"+it,HIDDEN:"hidden"+it,CLICK_DATA_API:"click"+it+".data-api"},lt="show",ct="collapse",ht="collapsing",ut="collapsed",dt="width",ft="height",pt={ACTIVES:".show, .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},mt=function(){function t(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=tt.makeArray(tt('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var n=tt(pt.DATA_TOGGLE),i=0;i<n.length;i++){var r=n[i],o=hr.getSelectorFromElement(r);null!==o&&tt(o).filter(t).length>0&&(this._selector=o,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var e=t.prototype;return e.toggle=function(){tt(this._element).hasClass(lt)?this.hide():this.show()},e.show=function(){var e,n,i=this;if(!this._isTransitioning&&!tt(this._element).hasClass(lt)&&(this._parent&&0===(e=tt.makeArray(tt(this._parent).find(pt.ACTIVES).filter('[data-parent="'+this._config.parent+'"]'))).length&&(e=null),!(e&&(n=tt(e).not(this._selector).data(nt))&&n._isTransitioning))){var r=tt.Event(at.SHOW);if(tt(this._element).trigger(r),!r.isDefaultPrevented()){e&&(t._jQueryInterface.call(tt(e).not(this._selector),"hide"),n||tt(e).data(nt,null));var o=this._getDimension();tt(this._element).removeClass(ct).addClass(ht),this._element.style[o]=0,this._triggerArray.length>0&&tt(this._triggerArray).removeClass(ut).attr("aria-expanded",!0),this.setTransitioning(!0);var s=function(){tt(i._element).removeClass(ht).addClass(ct).addClass(lt),i._element.style[o]="",i.setTransitioning(!1),tt(i._element).trigger(at.SHOWN)};if(hr.supportsTransitionEnd()){var a="scroll"+(o[0].toUpperCase()+o.slice(1));tt(this._element).one(hr.TRANSITION_END,s).emulateTransitionEnd(600),this._element.style[o]=this._element[a]+"px"}else s()}}},e.hide=function(){var t=this;if(!this._isTransitioning&&tt(this._element).hasClass(lt)){var e=tt.Event(at.HIDE);if(tt(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._getDimension();if(this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",hr.reflow(this._element),tt(this._element).addClass(ht).removeClass(ct).removeClass(lt),this._triggerArray.length>0)for(var i=0;i<this._triggerArray.length;i++){var r=this._triggerArray[i],o=hr.getSelectorFromElement(r);if(null!==o)tt(o).hasClass(lt)||tt(r).addClass(ut).attr("aria-expanded",!1)}this.setTransitioning(!0);var s=function(){t.setTransitioning(!1),tt(t._element).removeClass(ht).addClass(ct).trigger(at.HIDDEN)};this._element.style[n]="",hr.supportsTransitionEnd()?tt(this._element).one(hr.TRANSITION_END,s).emulateTransitionEnd(600):s()}}},e.setTransitioning=function(t){this._isTransitioning=t},e.dispose=function(){tt.removeData(this._element,nt),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},e._getConfig=function(t){return(t=r({},ot,t)).toggle=Boolean(t.toggle),hr.typeCheckConfig(et,t,st),t},e._getDimension=function(){return tt(this._element).hasClass(dt)?dt:ft},e._getParent=function(){var e=this,n=null;hr.isElement(this._config.parent)?(n=this._config.parent,void 0!==this._config.parent.jquery&&(n=this._config.parent[0])):n=tt(this._config.parent)[0];var i='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return tt(n).find(i).each(function(n,i){e._addAriaAndCollapsedClass(t._getTargetFromElement(i),[i])}),n},e._addAriaAndCollapsedClass=function(t,e){if(t){var n=tt(t).hasClass(lt);e.length>0&&tt(e).toggleClass(ut,!n).attr("aria-expanded",n)}},t._getTargetFromElement=function(t){var e=hr.getSelectorFromElement(t);return e?tt(e)[0]:null},t._jQueryInterface=function(e){return this.each(function(){var n=tt(this),i=n.data(nt),o=r({},ot,n.data(),"object"==typeof e&&e);if(!i&&o.toggle&&/show|hide/.test(e)&&(o.toggle=!1),i||(i=new t(this,o),n.data(nt,i)),"string"==typeof e){if(void 0===i[e])throw new TypeError('No method named "'+e+'"');i[e]()}})},i(t,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return ot}}]),t}(),tt(document).on(at.CLICK_DATA_API,pt.DATA_TOGGLE,function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var e=tt(this),n=hr.getSelectorFromElement(this);tt(n).each(function(){var t=tt(this),n=t.data(nt)?"toggle":e.data();mt._jQueryInterface.call(t,n)})}),tt.fn[et]=mt._jQueryInterface,tt.fn[et].Constructor=mt,tt.fn[et].noConflict=function(){return tt.fn[et]=rt,mt._jQueryInterface},_t="modal",yt="."+(vt="bs.modal"),Et=(gt=t).fn[_t],bt={backdrop:!0,keyboard:!0,focus:!0,show:!0},Ct={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},It={HIDE:"hide"+yt,HIDDEN:"hidden"+yt,SHOW:"show"+yt,SHOWN:"shown"+yt,FOCUSIN:"focusin"+yt,RESIZE:"resize"+yt,CLICK_DISMISS:"click.dismiss"+yt,KEYDOWN_DISMISS:"keydown.dismiss"+yt,MOUSEUP_DISMISS:"mouseup.dismiss"+yt,MOUSEDOWN_DISMISS:"mousedown.dismiss"+yt,CLICK_DATA_API:"click"+yt+".data-api"},Tt="modal-scrollbar-measure",At="modal-backdrop",St="modal-open",wt="fade",Dt="show",Nt={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"},Ot=function(){function t(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=gt(t).find(Nt.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}var e=t.prototype;return e.toggle=function(t){return this._isShown?this.hide():this.show(t)},e.show=function(t){var e=this;if(!this._isTransitioning&&!this._isShown){hr.supportsTransitionEnd()&&gt(this._element).hasClass(wt)&&(this._isTransitioning=!0);var n=gt.Event(It.SHOW,{relatedTarget:t});gt(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),gt(document.body).addClass(St),this._setEscapeEvent(),this._setResizeEvent(),gt(this._element).on(It.CLICK_DISMISS,Nt.DATA_DISMISS,function(t){return e.hide(t)}),gt(this._dialog).on(It.MOUSEDOWN_DISMISS,function(){gt(e._element).one(It.MOUSEUP_DISMISS,function(t){gt(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return e._showElement(t)}))}},e.hide=function(t){var e=this;if(t&&t.preventDefault(),!this._isTransitioning&&this._isShown){var n=gt.Event(It.HIDE);if(gt(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var i=hr.supportsTransitionEnd()&&gt(this._element).hasClass(wt);i&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),gt(document).off(It.FOCUSIN),gt(this._element).removeClass(Dt),gt(this._element).off(It.CLICK_DISMISS),gt(this._dialog).off(It.MOUSEDOWN_DISMISS),i?gt(this._element).one(hr.TRANSITION_END,function(t){return e._hideModal(t)}).emulateTransitionEnd(300):this._hideModal()}}},e.dispose=function(){gt.removeData(this._element,vt),gt(window,document,this._element,this._backdrop).off(yt),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},e.handleUpdate=function(){this._adjustDialog()},e._getConfig=function(t){return t=r({},bt,t),hr.typeCheckConfig(_t,t,Ct),t},e._showElement=function(t){var e=this,n=hr.supportsTransitionEnd()&&gt(this._element).hasClass(wt);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,n&&hr.reflow(this._element),gt(this._element).addClass(Dt),this._config.focus&&this._enforceFocus();var i=gt.Event(It.SHOWN,{relatedTarget:t}),r=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,gt(e._element).trigger(i)};n?gt(this._dialog).one(hr.TRANSITION_END,r).emulateTransitionEnd(300):r()},e._enforceFocus=function(){var t=this;gt(document).off(It.FOCUSIN).on(It.FOCUSIN,function(e){document!==e.target&&t._element!==e.target&&0===gt(t._element).has(e.target).length&&t._element.focus()})},e._setEscapeEvent=function(){var t=this;this._isShown&&this._config.keyboard?gt(this._element).on(It.KEYDOWN_DISMISS,function(e){27===e.which&&(e.preventDefault(),t.hide())}):this._isShown||gt(this._element).off(It.KEYDOWN_DISMISS)},e._setResizeEvent=function(){var t=this;this._isShown?gt(window).on(It.RESIZE,function(e){return t.handleUpdate(e)}):gt(window).off(It.RESIZE)},e._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){gt(document.body).removeClass(St),t._resetAdjustments(),t._resetScrollbar(),gt(t._element).trigger(It.HIDDEN)})},e._removeBackdrop=function(){this._backdrop&&(gt(this._backdrop).remove(),this._backdrop=null)},e._showBackdrop=function(t){var e=this,n=gt(this._element).hasClass(wt)?wt:"";if(this._isShown&&this._config.backdrop){var i=hr.supportsTransitionEnd()&&n;if(this._backdrop=document.createElement("div"),this._backdrop.className=At,n&&gt(this._backdrop).addClass(n),gt(this._backdrop).appendTo(document.body),gt(this._element).on(It.CLICK_DISMISS,function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===e._config.backdrop?e._element.focus():e.hide())}),i&&hr.reflow(this._backdrop),gt(this._backdrop).addClass(Dt),!t)return;if(!i)return void t();gt(this._backdrop).one(hr.TRANSITION_END,t).emulateTransitionEnd(150)}else if(!this._isShown&&this._backdrop){gt(this._backdrop).removeClass(Dt);var r=function(){e._removeBackdrop(),t&&t()};hr.supportsTransitionEnd()&&gt(this._element).hasClass(wt)?gt(this._backdrop).one(hr.TRANSITION_END,r).emulateTransitionEnd(150):r()}else t&&t()},e._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},e._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},e._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=t.left+t.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},e._setScrollbar=function(){var t=this;if(this._isBodyOverflowing){gt(Nt.FIXED_CONTENT).each(function(e,n){var i=gt(n)[0].style.paddingRight,r=gt(n).css("padding-right");gt(n).data("padding-right",i).css("padding-right",parseFloat(r)+t._scrollbarWidth+"px")}),gt(Nt.STICKY_CONTENT).each(function(e,n){var i=gt(n)[0].style.marginRight,r=gt(n).css("margin-right");gt(n).data("margin-right",i).css("margin-right",parseFloat(r)-t._scrollbarWidth+"px")}),gt(Nt.NAVBAR_TOGGLER).each(function(e,n){var i=gt(n)[0].style.marginRight,r=gt(n).css("margin-right");gt(n).data("margin-right",i).css("margin-right",parseFloat(r)+t._scrollbarWidth+"px")});var e=document.body.style.paddingRight,n=gt("body").css("padding-right");gt("body").data("padding-right",e).css("padding-right",parseFloat(n)+this._scrollbarWidth+"px")}},e._resetScrollbar=function(){gt(Nt.FIXED_CONTENT).each(function(t,e){var n=gt(e).data("padding-right");void 0!==n&&gt(e).css("padding-right",n).removeData("padding-right")}),gt(Nt.STICKY_CONTENT+", "+Nt.NAVBAR_TOGGLER).each(function(t,e){var n=gt(e).data("margin-right");void 0!==n&&gt(e).css("margin-right",n).removeData("margin-right")});var t=gt("body").data("padding-right");void 0!==t&&gt("body").css("padding-right",t).removeData("padding-right")},e._getScrollbarWidth=function(){var t=document.createElement("div");t.className=Tt,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},t._jQueryInterface=function(e,n){return this.each(function(){var i=gt(this).data(vt),o=r({},t.Default,gt(this).data(),"object"==typeof e&&e);if(i||(i=new t(this,o),gt(this).data(vt,i)),"string"==typeof e){if(void 0===i[e])throw new TypeError('No method named "'+e+'"');i[e](n)}else o.show&&i.show(n)})},i(t,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return bt}}]),t}(),gt(document).on(It.CLICK_DATA_API,Nt.DATA_TOGGLE,function(t){var e,n=this,i=hr.getSelectorFromElement(this);i&&(e=gt(i)[0]);var o=gt(e).data(vt)?"toggle":r({},gt(e).data(),gt(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var s=gt(e).one(It.SHOW,function(t){t.isDefaultPrevented()||s.one(It.HIDDEN,function(){gt(n).is(":visible")&&n.focus()})});Ot._jQueryInterface.call(gt(e),o,this)}),gt.fn[_t]=Ot._jQueryInterface,gt.fn[_t].Constructor=Ot,gt.fn[_t].noConflict=function(){return gt.fn[_t]=Et,Ot._jQueryInterface},$t="tooltip",Rt="."+(jt="bs.tooltip"),Lt=(kt=t).fn[$t],Pt="bs-tooltip",xt=new RegExp("(^|\\s)"+Pt+"\\S+","g"),Ft={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)"},Mt={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},Qt={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent"},Ht="show",Ut="out",Gt={HIDE:"hide"+Rt,HIDDEN:"hidden"+Rt,SHOW:"show"+Rt,SHOWN:"shown"+Rt,INSERTED:"inserted"+Rt,CLICK:"click"+Rt,FOCUSIN:"focusin"+Rt,FOCUSOUT:"focusout"+Rt,MOUSEENTER:"mouseenter"+Rt,MOUSELEAVE:"mouseleave"+Rt},Wt="fade",Bt="show",Kt=".tooltip-inner",Vt=".arrow",Yt="hover",qt="focus",zt="click",Xt="manual",Zt=function(){function t(t,n){if(void 0===e)throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(n),this.tip=null,this._setListeners()}var n=t.prototype;return n.enable=function(){this._isEnabled=!0},n.disable=function(){this._isEnabled=!1},n.toggleEnabled=function(){this._isEnabled=!this._isEnabled},n.toggle=function(t){if(this._isEnabled)if(t){var e=this.constructor.DATA_KEY,n=kt(t.currentTarget).data(e);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),kt(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(kt(this.getTipElement()).hasClass(Bt))return void this._leave(null,this);this._enter(null,this)}},n.dispose=function(){clearTimeout(this._timeout),kt.removeData(this.element,this.constructor.DATA_KEY),kt(this.element).off(this.constructor.EVENT_KEY),kt(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&kt(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},n.show=function(){var n=this;if("none"===kt(this.element).css("display"))throw new Error("Please use show on visible elements");var i=kt.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){kt(this.element).trigger(i);var r=kt.contains(this.element.ownerDocument.documentElement,this.element);if(i.isDefaultPrevented()||!r)return;var o=this.getTipElement(),s=hr.getUID(this.constructor.NAME);o.setAttribute("id",s),this.element.setAttribute("aria-describedby",s),this.setContent(),this.config.animation&&kt(o).addClass(Wt);var a="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,l=this._getAttachment(a);this.addAttachmentClass(l);var c=!1===this.config.container?document.body:kt(this.config.container);kt(o).data(this.constructor.DATA_KEY,this),kt.contains(this.element.ownerDocument.documentElement,this.tip)||kt(o).appendTo(c),kt(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new e(this.element,o,{placement:l,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:Vt},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&n._handlePopperPlacementChange(t)},onUpdate:function(t){n._handlePopperPlacementChange(t)}}),kt(o).addClass(Bt),"ontouchstart"in document.documentElement&&kt("body").children().on("mouseover",null,kt.noop);var h=function(){n.config.animation&&n._fixTransition();var t=n._hoverState;n._hoverState=null,kt(n.element).trigger(n.constructor.Event.SHOWN),t===Ut&&n._leave(null,n)};hr.supportsTransitionEnd()&&kt(this.tip).hasClass(Wt)?kt(this.tip).one(hr.TRANSITION_END,h).emulateTransitionEnd(t._TRANSITION_DURATION):h()}},n.hide=function(t){var e=this,n=this.getTipElement(),i=kt.Event(this.constructor.Event.HIDE),r=function(){e._hoverState!==Ht&&n.parentNode&&n.parentNode.removeChild(n),e._cleanTipClass(),e.element.removeAttribute("aria-describedby"),kt(e.element).trigger(e.constructor.Event.HIDDEN),null!==e._popper&&e._popper.destroy(),t&&t()};kt(this.element).trigger(i),i.isDefaultPrevented()||(kt(n).removeClass(Bt),"ontouchstart"in document.documentElement&&kt("body").children().off("mouseover",null,kt.noop),this._activeTrigger[zt]=!1,this._activeTrigger[qt]=!1,this._activeTrigger[Yt]=!1,hr.supportsTransitionEnd()&&kt(this.tip).hasClass(Wt)?kt(n).one(hr.TRANSITION_END,r).emulateTransitionEnd(150):r(),this._hoverState="")},n.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},n.isWithContent=function(){return Boolean(this.getTitle())},n.addAttachmentClass=function(t){kt(this.getTipElement()).addClass(Pt+"-"+t)},n.getTipElement=function(){return this.tip=this.tip||kt(this.config.template)[0],this.tip},n.setContent=function(){var t=kt(this.getTipElement());this.setElementContent(t.find(Kt),this.getTitle()),t.removeClass(Wt+" "+Bt)},n.setElementContent=function(t,e){var n=this.config.html;"object"==typeof e&&(e.nodeType||e.jquery)?n?kt(e).parent().is(t)||t.empty().append(e):t.text(kt(e).text()):t[n?"html":"text"](e)},n.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},n._getAttachment=function(t){return Mt[t.toUpperCase()]},n._setListeners=function(){var t=this;this.config.trigger.split(" ").forEach(function(e){if("click"===e)kt(t.element).on(t.constructor.Event.CLICK,t.config.selector,function(e){return t.toggle(e)});else if(e!==Xt){var n=e===Yt?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,i=e===Yt?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;kt(t.element).on(n,t.config.selector,function(e){return t._enter(e)}).on(i,t.config.selector,function(e){return t._leave(e)})}kt(t.element).closest(".modal").on("hide.bs.modal",function(){return t.hide()})}),this.config.selector?this.config=r({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},n._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},n._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||kt(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),kt(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?qt:Yt]=!0),kt(e.getTipElement()).hasClass(Bt)||e._hoverState===Ht?e._hoverState=Ht:(clearTimeout(e._timeout),e._hoverState=Ht,e.config.delay&&e.config.delay.show?e._timeout=setTimeout(function(){e._hoverState===Ht&&e.show()},e.config.delay.show):e.show())},n._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||kt(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),kt(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?qt:Yt]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState=Ut,e.config.delay&&e.config.delay.hide?e._timeout=setTimeout(function(){e._hoverState===Ut&&e.hide()},e.config.delay.hide):e.hide())},n._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},n._getConfig=function(t){return"number"==typeof(t=r({},this.constructor.Default,kt(this.element).data(),t)).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),hr.typeCheckConfig($t,t,this.constructor.DefaultType),t},n._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},n._cleanTipClass=function(){var t=kt(this.getTipElement()),e=t.attr("class").match(xt);null!==e&&e.length>0&&t.removeClass(e.join(""))},n._handlePopperPlacementChange=function(t){this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},n._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(kt(t).removeClass(Wt),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},t._jQueryInterface=function(e){return this.each(function(){var n=kt(this).data(jt),i="object"==typeof e&&e;if((n||!/dispose|hide/.test(e))&&(n||(n=new t(this,i),kt(this).data(jt,n)),"string"==typeof e)){if(void 0===n[e])throw new TypeError('No method named "'+e+'"');n[e]()}})},i(t,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return Qt}},{key:"NAME",get:function(){return $t}},{key:"DATA_KEY",get:function(){return jt}},{key:"Event",get:function(){return Gt}},{key:"EVENT_KEY",get:function(){return Rt}},{key:"DefaultType",get:function(){return Ft}}]),t}(),kt.fn[$t]=Zt._jQueryInterface,kt.fn[$t].Constructor=Zt,kt.fn[$t].noConflict=function(){return kt.fn[$t]=Lt,Zt._jQueryInterface},Zt),dr=(te="popover",ne="."+(ee="bs.popover"),ie=(Jt=t).fn[te],re="bs-popover",oe=new RegExp("(^|\\s)"+re+"\\S+","g"),se=r({},ur.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),ae=r({},ur.DefaultType,{content:"(string|element|function)"}),le="fade",ce="show",he=".popover-header",ue=".popover-body",de={HIDE:"hide"+ne,HIDDEN:"hidden"+ne,SHOW:"show"+ne,SHOWN:"shown"+ne,INSERTED:"inserted"+ne,CLICK:"click"+ne,FOCUSIN:"focusin"+ne,FOCUSOUT:"focusout"+ne,MOUSEENTER:"mouseenter"+ne,MOUSELEAVE:"mouseleave"+ne},fe=function(t){function e(){return t.apply(this,arguments)||this}o(e,t);var n=e.prototype;return n.isWithContent=function(){return this.getTitle()||this._getContent()},n.addAttachmentClass=function(t){Jt(this.getTipElement()).addClass(re+"-"+t)},n.getTipElement=function(){return this.tip=this.tip||Jt(this.config.template)[0],this.tip},n.setContent=function(){var t=Jt(this.getTipElement());this.setElementContent(t.find(he),this.getTitle());var e=this._getContent();"function"==typeof e&&(e=e.call(this.element)),this.setElementContent(t.find(ue),e),t.removeClass(le+" "+ce)},n._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},n._cleanTipClass=function(){var t=Jt(this.getTipElement()),e=t.attr("class").match(oe);null!==e&&e.length>0&&t.removeClass(e.join(""))},e._jQueryInterface=function(t){return this.each(function(){var n=Jt(this).data(ee),i="object"==typeof t?t:null;if((n||!/destroy|hide/.test(t))&&(n||(n=new e(this,i),Jt(this).data(ee,n)),"string"==typeof t)){if(void 0===n[t])throw new TypeError('No method named "'+t+'"');n[t]()}})},i(e,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return se}},{key:"NAME",get:function(){return te}},{key:"DATA_KEY",get:function(){return ee}},{key:"Event",get:function(){return de}},{key:"EVENT_KEY",get:function(){return ne}},{key:"DefaultType",get:function(){return ae}}]),e}(ur),Jt.fn[te]=fe._jQueryInterface,Jt.fn[te].Constructor=fe,Jt.fn[te].noConflict=function(){return Jt.fn[te]=ie,fe._jQueryInterface},me="scrollspy",_e="."+(ge="bs.scrollspy"),ve=(pe=t).fn[me],ye={offset:10,method:"auto",target:""},Ee={offset:"number",method:"string",target:"(string|element)"},be={ACTIVATE:"activate"+_e,SCROLL:"scroll"+_e,LOAD_DATA_API:"load"+_e+".data-api"},Ce="dropdown-item",Ie="active",Te={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",NAV_ITEMS:".nav-item",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},Ae="offset",Se="position",we=function(){function t(t,e){var n=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" "+Te.NAV_LINKS+","+this._config.target+" "+Te.LIST_ITEMS+","+this._config.target+" "+Te.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,pe(this._scrollElement).on(be.SCROLL,function(t){return n._process(t)}),this.refresh(),this._process()}var e=t.prototype;return e.refresh=function(){var t=this,e=this._scrollElement===this._scrollElement.window?Ae:Se,n="auto"===this._config.method?e:this._config.method,i=n===Se?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),pe.makeArray(pe(this._selector)).map(function(t){var e,r=hr.getSelectorFromElement(t);if(r&&(e=pe(r)[0]),e){var o=e.getBoundingClientRect();if(o.width||o.height)return[pe(e)[n]().top+i,r]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(e){t._offsets.push(e[0]),t._targets.push(e[1])})},e.dispose=function(){pe.removeData(this._element,ge),pe(this._scrollElement).off(_e),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},e._getConfig=function(t){if("string"!=typeof(t=r({},ye,t)).target){var e=pe(t.target).attr("id");e||(e=hr.getUID(me),pe(t.target).attr("id",e)),t.target="#"+e}return hr.typeCheckConfig(me,t,Ee),t},e._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},e._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},e._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},e._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var r=this._offsets.length;r--;){this._activeTarget!==this._targets[r]&&t>=this._offsets[r]&&(void 0===this._offsets[r+1]||t<this._offsets[r+1])&&this._activate(this._targets[r])}}},e._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",");e=e.map(function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'});var n=pe(e.join(","));n.hasClass(Ce)?(n.closest(Te.DROPDOWN).find(Te.DROPDOWN_TOGGLE).addClass(Ie),n.addClass(Ie)):(n.addClass(Ie),n.parents(Te.NAV_LIST_GROUP).prev(Te.NAV_LINKS+", "+Te.LIST_ITEMS).addClass(Ie),n.parents(Te.NAV_LIST_GROUP).prev(Te.NAV_ITEMS).children(Te.NAV_LINKS).addClass(Ie)),pe(this._scrollElement).trigger(be.ACTIVATE,{relatedTarget:t})},e._clear=function(){pe(this._selector).filter(Te.ACTIVE).removeClass(Ie)},t._jQueryInterface=function(e){return this.each(function(){var n=pe(this).data(ge);if(n||(n=new t(this,"object"==typeof e&&e),pe(this).data(ge,n)),"string"==typeof e){if(void 0===n[e])throw new TypeError('No method named "'+e+'"');n[e]()}})},i(t,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return ye}}]),t}(),pe(window).on(be.LOAD_DATA_API,function(){for(var t=pe.makeArray(pe(Te.DATA_SPY)),e=t.length;e--;){var n=pe(t[e]);we._jQueryInterface.call(n,n.data())}}),pe.fn[me]=we._jQueryInterface,pe.fn[me].Constructor=we,pe.fn[me].noConflict=function(){return pe.fn[me]=ve,we._jQueryInterface},Oe="."+(Ne="bs.tab"),ke=(De=t).fn.tab,$e={HIDE:"hide"+Oe,HIDDEN:"hidden"+Oe,SHOW:"show"+Oe,SHOWN:"shown"+Oe,CLICK_DATA_API:"click"+Oe+".data-api"},je="dropdown-menu",Re="active",Le="disabled",Pe="fade",xe="show",Fe=".dropdown",Me=".nav, .list-group",Qe=".active",He="> li > .active",Ue='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',Ge=".dropdown-toggle",We="> .dropdown-menu .active",Be=function(){function t(t){this._element=t}var e=t.prototype;return e.show=function(){var t=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&De(this._element).hasClass(Re)||De(this._element).hasClass(Le))){var e,n,i=De(this._element).closest(Me)[0],r=hr.getSelectorFromElement(this._element);if(i){var o="UL"===i.nodeName?He:Qe;n=(n=De.makeArray(De(i).find(o)))[n.length-1]}var s=De.Event($e.HIDE,{relatedTarget:this._element}),a=De.Event($e.SHOW,{relatedTarget:n});if(n&&De(n).trigger(s),De(this._element).trigger(a),!a.isDefaultPrevented()&&!s.isDefaultPrevented()){r&&(e=De(r)[0]),this._activate(this._element,i);var l=function(){var e=De.Event($e.HIDDEN,{relatedTarget:t._element}),i=De.Event($e.SHOWN,{relatedTarget:n});De(n).trigger(e),De(t._element).trigger(i)};e?this._activate(e,e.parentNode,l):l()}}},e.dispose=function(){De.removeData(this._element,Ne),this._element=null},e._activate=function(t,e,n){var i=this,r=("UL"===e.nodeName?De(e).find(He):De(e).children(Qe))[0],o=n&&hr.supportsTransitionEnd()&&r&&De(r).hasClass(Pe),s=function(){return i._transitionComplete(t,r,n)};r&&o?De(r).one(hr.TRANSITION_END,s).emulateTransitionEnd(150):s()},e._transitionComplete=function(t,e,n){if(e){De(e).removeClass(xe+" "+Re);var i=De(e.parentNode).find(We)[0];i&&De(i).removeClass(Re),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}if(De(t).addClass(Re),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),hr.reflow(t),De(t).addClass(xe),t.parentNode&&De(t.parentNode).hasClass(je)){var r=De(t).closest(Fe)[0];r&&De(r).find(Ge).addClass(Re),t.setAttribute("aria-expanded",!0)}n&&n()},t._jQueryInterface=function(e){return this.each(function(){var n=De(this),i=n.data(Ne);if(i||(i=new t(this),n.data(Ne,i)),"string"==typeof e){if(void 0===i[e])throw new TypeError('No method named "'+e+'"');i[e]()}})},i(t,null,[{key:"VERSION",get:function(){return"4.0.0"}}]),t}(),De(document).on($e.CLICK_DATA_API,Ue,function(t){t.preventDefault(),Be._jQueryInterface.call(De(this),"show")}),De.fn.tab=Be._jQueryInterface,De.fn.tab.Constructor=Be,De.fn.tab.noConflict=function(){return De.fn.tab=ke,Be._jQueryInterface},function(){var t=!1,e="",n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};var i={transitionEndSupported:function(){return t},transitionEndSelector:function(){return e},isChar:function(t){return void 0===t.which||"number"==typeof t.which&&t.which>0&&(!t.ctrlKey&&!t.metaKey&&!t.altKey&&8!==t.which&&9!==t.which&&13!==t.which&&16!==t.which&&17!==t.which&&20!==t.which&&27!==t.which)},assert:function(t,e,n){if(e)throw void 0===!t&&t.css("border","1px solid red"),console.error(n,t),n},describe:function(t){return void 0===t?"undefined":0===t.length?"(no matching elements)":t[0].outerHTML.split(">")[0]+">"}};return function(){t=function(){if(window.QUnit)return!1;var t=document.createElement("bmd");for(var e in n)if(void 0!==t.style[e])return n[e];return!1}();for(var i in n)e+=" "+n[i]}(),i}(jQuery)),fr=(Ke=jQuery,Ve="is-filled",Ye="is-focused",qe={BMD_FORM_GROUP:"."+"bmd-form-group"},ze={},function(){function t(t,e,n){void 0===n&&(n={}),this.$element=t,this.config=Ke.extend(!0,{},ze,e);for(var i in n)this[i]=n[i]}var e=t.prototype;return e.dispose=function(t){this.$element.data(t,null),this.$element=null,this.config=null},e.addFormGroupFocus=function(){this.$element.prop("disabled")||this.$bmdFormGroup.addClass(Ye)},e.removeFormGroupFocus=function(){this.$bmdFormGroup.removeClass(Ye)},e.removeIsFilled=function(){this.$bmdFormGroup.removeClass(Ve)},e.addIsFilled=function(){this.$bmdFormGroup.addClass(Ve)},e.findMdbFormGroup=function(t){void 0===t&&(t=!0);var e=this.$element.closest(qe.BMD_FORM_GROUP);return 0===e.length&&t&&Ke.error("Failed to find "+qe.BMD_FORM_GROUP+" for "+dr.describe(this.$element)),e},t}()),pr=(Xe=jQuery,tn="has-danger",en="input-group",nn={FORM_GROUP:"."+"form-group",BMD_FORM_GROUP:"."+(Ze="bmd-form-group"),BMD_LABEL_WILDCARD:"label[class^='"+(Je="bmd-label")+"'], label[class*=' "+Je+"']"},rn={validate:!1,formGroup:{required:!1},bmdFormGroup:{template:"<span class='"+Ze+"'></span>",create:!0,required:!0},label:{required:!1,selectors:[".form-control-label","> label"],className:"bmd-label-floating"},requiredClasses:[],invalidComponentMatches:[],convertInputSizeVariations:!0},on={"form-control-lg":"bmd-form-group-lg","form-control-sm":"bmd-form-group-sm"},function(t){function e(e,n,i){var r;return void 0===i&&(i={}),(r=t.call(this,e,Xe.extend(!0,{},rn,n),i)||this)._rejectInvalidComponentMatches(),r.rejectWithoutRequiredStructure(),r._rejectWithoutRequiredClasses(),r.$formGroup=r.findFormGroup(r.config.formGroup.required),r.$bmdFormGroup=r.resolveMdbFormGroup(),r.$bmdLabel=r.resolveMdbLabel(),r.resolveMdbFormGroupSizing(),r.addFocusListener(),r.addChangeListener(),""!=r.$element.val()&&r.addIsFilled(),r}o(e,t);var n=e.prototype;return n.dispose=function(e){t.prototype.dispose.call(this,e),this.$bmdFormGroup=null,this.$formGroup=null},n.rejectWithoutRequiredStructure=function(){},n.addFocusListener=function(){var t=this;this.$element.on("focus",function(){t.addFormGroupFocus()}).on("blur",function(){t.removeFormGroupFocus()})},n.addChangeListener=function(){var t=this;this.$element.on("keydown paste",function(e){dr.isChar(e)&&t.addIsFilled()}).on("keyup change",function(){t.isEmpty()?t.removeIsFilled():t.addIsFilled(),t.config.validate&&(void 0===t.$element[0].checkValidity||t.$element[0].checkValidity()?t.removeHasDanger():t.addHasDanger())})},n.addHasDanger=function(){this.$bmdFormGroup.addClass(tn)},n.removeHasDanger=function(){this.$bmdFormGroup.removeClass(tn)},n.isEmpty=function(){return null===this.$element.val()||void 0===this.$element.val()||""===this.$element.val()},n.resolveMdbFormGroup=function(){var t=this.findMdbFormGroup(!1);return void 0!==t&&0!==t.length||(!this.config.bmdFormGroup.create||void 0!==this.$formGroup&&0!==this.$formGroup.length?this.$formGroup.addClass(Ze):this.outerElement().parent().hasClass(en)?this.outerElement().parent().wrap(this.config.bmdFormGroup.template):this.outerElement().wrap(this.config.bmdFormGroup.template),t=this.findMdbFormGroup(this.config.bmdFormGroup.required)),t},n.outerElement=function(){return this.$element},n.resolveMdbLabel=function(){var t=this.$bmdFormGroup.find(nn.BMD_LABEL_WILDCARD);return void 0!==t&&0!==t.length||void 0===(t=this.findMdbLabel(this.config.label.required))||0===t.length||t.addClass(this.config.label.className),t},n.findMdbLabel=function(t){void 0===t&&(t=!0);var e=null,n=this.config.label.selectors,i=Array.isArray(n),r=0;for(n=i?n:n[Symbol.iterator]();;){var o;if(i){if(r>=n.length)break;o=n[r++]}else{if((r=n.next()).done)break;o=r.value}var s=o;if(void 0!==(e=Xe.isFunction(s)?s(this):this.$bmdFormGroup.find(s))&&e.length>0)break}return 0===e.length&&t&&Xe.error("Failed to find "+nn.BMD_LABEL_WILDCARD+" within form-group for "+dr.describe(this.$element)),e},n.findFormGroup=function(t){void 0===t&&(t=!0);var e=this.$element.closest(nn.FORM_GROUP);return 0===e.length&&t&&Xe.error("Failed to find "+nn.FORM_GROUP+" for "+dr.describe(this.$element)),e},n.resolveMdbFormGroupSizing=function(){if(this.config.convertInputSizeVariations)for(var t in on)this.$element.hasClass(t)&&this.$bmdFormGroup.addClass(on[t])},n._rejectInvalidComponentMatches=function(){var t=this.config.invalidComponentMatches,e=Array.isArray(t),n=0;for(t=e?t:t[Symbol.iterator]();;){var i;if(e){if(n>=t.length)break;i=t[n++]}else{if((n=t.next()).done)break;i=n.value}i.rejectMatch(this.constructor.name,this.$element)}},n._rejectWithoutRequiredClasses=function(){var t=this.config.requiredClasses,e=Array.isArray(t),n=0;for(t=e?t:t[Symbol.iterator]();;){var i;if(e){if(n>=t.length)break;i=t[n++]}else{if((n=t.next()).done)break;i=n.value}var r=i,o=!1;if(-1!==r.indexOf("||")){var s=r.split("||"),a=Array.isArray(s),l=0;for(s=a?s:s[Symbol.iterator]();;){var c;if(a){if(l>=s.length)break;c=s[l++]}else{if((l=s.next()).done)break;c=l.value}var h=c;if(this.$element.hasClass(h)){o=!0;break}}}else this.$element.hasClass(r)&&(o=!0);o||Xe.error(this.constructor.name+" element: "+dr.describe(this.$element)+" requires class: "+r)}},e}(fr)),mr=(sn=jQuery,an={label:{required:!1}},ln="label",function(t){function e(e,n,i){var r;return(r=t.call(this,e,sn.extend(!0,{},an,n),i)||this).decorateMarkup(),r}o(e,t);var n=e.prototype;return n.decorateMarkup=function(){var t=sn(this.config.template);this.$element.after(t),!1!==this.config.ripples&&t.bmdRipples()},n.outerElement=function(){return this.$element.parent().closest("."+this.outerClass)},n.rejectWithoutRequiredStructure=function(){dr.assert(this.$element,"label"===!this.$element.parent().prop("tagName"),this.constructor.name+"'s "+dr.describe(this.$element)+" parent element should be <label>."),dr.assert(this.$element,!this.outerElement().hasClass(this.outerClass),this.constructor.name+"'s "+dr.describe(this.$element)+" outer element should have class "+this.outerClass+".")},n.addFocusListener=function(){var t=this;this.$element.closest(ln).hover(function(){t.addFormGroupFocus()},function(){t.removeFormGroupFocus()})},n.addChangeListener=function(){var t=this;this.$element.change(function(){t.$element.blur()})},e}(pr)),gr=(cn=jQuery,un="bmd."+(hn="checkbox"),dn="bmd"+(hn.charAt(0).toUpperCase()+hn.slice(1)),fn=cn.fn[dn],pn={template:"<span class='checkbox-decorator'><span class='check'></span></span>"},mn=function(t){function e(e,n,i){return void 0===i&&(i={inputType:hn,outerClass:hn}),t.call(this,e,cn.extend(!0,pn,n),i)||this}return o(e,t),e.prototype.dispose=function(e){void 0===e&&(e=un),t.prototype.dispose.call(this,e)},e.matches=function(t){return"checkbox"===t.attr("type")},e.rejectMatch=function(t,e){dr.assert(this.$element,this.matches(e),t+" component element "+dr.describe(e)+" is invalid for type='checkbox'.")},e._jQueryInterface=function(t){return this.each(function(){var n=cn(this),i=n.data(un);i||(i=new e(n,t),n.data(un,i))})},e}(mr),cn.fn[dn]=mn._jQueryInterface,cn.fn[dn].Constructor=mn,cn.fn[dn].noConflict=function(){return cn.fn[dn]=fn,mn._jQueryInterface},mn),_r=(gn=jQuery,vn="bmd."+(_n="checkboxInline"),yn="bmd"+(_n.charAt(0).toUpperCase()+_n.slice(1)),En=gn.fn[yn],bn={bmdFormGroup:{create:!1,required:!1}},Cn=function(t){function e(e,n,i){return void 0===i&&(i={inputType:"checkbox",outerClass:"checkbox-inline"}),t.call(this,e,gn.extend(!0,{},bn,n),i)||this}return o(e,t),e.prototype.dispose=function(){t.prototype.dispose.call(this,vn)},e._jQueryInterface=function(t){return this.each(function(){var n=gn(this),i=n.data(vn);i||(i=new e(n,t),n.data(vn,i))})},e}(gr),gn.fn[yn]=Cn._jQueryInterface,gn.fn[yn].Constructor=Cn,gn.fn[yn].noConflict=function(){return gn.fn[yn]=En,Cn._jQueryInterface},In=jQuery,An="bmd."+(Tn="collapseInline"),Sn="bmd"+(Tn.charAt(0).toUpperCase()+Tn.slice(1)),wn=In.fn[Sn],Dn={ANY_INPUT:"input, select, textarea"},Nn={IN:"in",COLLAPSE:"collapse",COLLAPSING:"collapsing",COLLAPSED:"collapsed",WIDTH:"width"},On={},kn=function(t){function e(e,n){var i;(i=t.call(this,e,In.extend(!0,{},On,n))||this).$bmdFormGroup=i.findMdbFormGroup(!0);var r=e.data("target");i.$collapse=In(r),dr.assert(e,0===i.$collapse.length,"Cannot find collapse target for "+dr.describe(e)),dr.assert(i.$collapse,!i.$collapse.hasClass(Nn.COLLAPSE),dr.describe(i.$collapse)+" is expected to have the '"+Nn.COLLAPSE+"' class.  It is being targeted by "+dr.describe(e));var o=i.$bmdFormGroup.find(Dn.ANY_INPUT);return o.length>0&&(i.$input=o.first()),i.$collapse.hasClass(Nn.WIDTH)||i.$collapse.addClass(Nn.WIDTH),i.$input&&(i.$collapse.on("shown.bs.collapse",function(){i.$input.focus()}),i.$input.blur(function(){i.$collapse.collapse("hide")})),i}return o(e,t),e.prototype.dispose=function(){t.prototype.dispose.call(this,An),this.$bmdFormGroup=null,this.$collapse=null,this.$input=null},e._jQueryInterface=function(t){return this.each(function(){var n=In(this),i=n.data(An);i||(i=new e(n,t),n.data(An,i))})},e}(fr),In.fn[Sn]=kn._jQueryInterface,In.fn[Sn].Constructor=kn,In.fn[Sn].noConflict=function(){return In.fn[Sn]=wn,kn._jQueryInterface},$n=jQuery,Rn="bmd."+(jn="file"),Ln="bmd"+(jn.charAt(0).toUpperCase()+jn.slice(1)),Pn=$n.fn[Ln],xn={},Fn={FILE:jn,IS_FILE:"is-file"},Mn="input.form-control[readonly]",Qn=function(t){function e(e,n){var i;return(i=t.call(this,e,$n.extend(!0,xn,n))||this).$bmdFormGroup.addClass(Fn.IS_FILE),i}o(e,t);var n=e.prototype;return n.dispose=function(){t.prototype.dispose.call(this,Rn)},e.matches=function(t){return"file"===t.attr("type")},e.rejectMatch=function(t,e){dr.assert(this.$element,this.matches(e),t+" component element "+dr.describe(e)+" is invalid for type='file'.")},n.outerElement=function(){return this.$element.parent().closest("."+Fn.FILE)},n.rejectWithoutRequiredStructure=function(){dr.assert(this.$element,"label"===!this.outerElement().prop("tagName"),this.constructor.name+"'s "+dr.describe(this.$element)+" parent element "+dr.describe(this.outerElement())+" should be <label>."),dr.assert(this.$element,!this.outerElement().hasClass(Fn.FILE),this.constructor.name+"'s "+dr.describe(this.$element)+" parent element "+dr.describe(this.outerElement())+" should have class ."+Fn.FILE+".")},n.addFocusListener=function(){var t=this;this.$bmdFormGroup.on("focus",function(){t.addFormGroupFocus()}).on("blur",function(){t.removeFormGroupFocus()})},n.addChangeListener=function(){var t=this;this.$element.on("change",function(){var e="";$n.each(t.$element.files,function(t,n){e+=n.name+"  , "}),(e=e.substring(0,e.length-2))?t.addIsFilled():t.removeIsFilled(),t.$bmdFormGroup.find(Mn).val(e)})},e._jQueryInterface=function(t){return this.each(function(){var n=$n(this),i=n.data(Rn);i||(i=new e(n,t),n.data(Rn,i))})},e}(pr),$n.fn[Ln]=Qn._jQueryInterface,$n.fn[Ln].Constructor=Qn,$n.fn[Ln].noConflict=function(){return $n.fn[Ln]=Pn,Qn._jQueryInterface},Hn=jQuery,Gn="bmd."+(Un="radio"),Wn="bmd"+(Un.charAt(0).toUpperCase()+Un.slice(1)),Bn=Hn.fn[Wn],Kn={template:"<span class='bmd-radio'></span>"},Vn=function(t){function e(e,n,i){return void 0===i&&(i={inputType:Un,outerClass:Un}),t.call(this,e,Hn.extend(!0,Kn,n),i)||this}return o(e,t),e.prototype.dispose=function(e){void 0===e&&(e=Gn),t.prototype.dispose.call(this,e)},e.matches=function(t){return"radio"===t.attr("type")},e.rejectMatch=function(t,e){dr.assert(this.$element,this.matches(e),t+" component element "+dr.describe(e)+" is invalid for type='radio'.")},e._jQueryInterface=function(t){return this.each(function(){var n=Hn(this),i=n.data(Gn);i||(i=new e(n,t),n.data(Gn,i))})},e}(mr),Hn.fn[Wn]=Vn._jQueryInterface,Hn.fn[Wn].Constructor=Vn,Hn.fn[Wn].noConflict=function(){return Hn.fn[Wn]=Bn,Vn._jQueryInterface},Vn),vr=(Yn=jQuery,zn="bmd."+(qn="radioInline"),Xn="bmd"+(qn.charAt(0).toUpperCase()+qn.slice(1)),Zn=Yn.fn[Xn],Jn={bmdFormGroup:{create:!1,required:!1}},ti=function(t){function e(e,n,i){return void 0===i&&(i={inputType:"radio",outerClass:"radio-inline"}),t.call(this,e,Yn.extend(!0,{},Jn,n),i)||this}return o(e,t),e.prototype.dispose=function(){t.prototype.dispose.call(this,zn)},e._jQueryInterface=function(t){return this.each(function(){var n=Yn(this),i=n.data(zn);i||(i=new e(n,t),n.data(zn,i))})},e}(_r),Yn.fn[Xn]=ti._jQueryInterface,Yn.fn[Xn].Constructor=ti,Yn.fn[Xn].noConflict=function(){return Yn.fn[Xn]=Zn,ti._jQueryInterface},ei=jQuery,ni={requiredClasses:["form-control"]},function(t){function e(e,n){var i;return(i=t.call(this,e,ei.extend(!0,ni,n))||this).isEmpty()&&i.removeIsFilled(),i}return o(e,t),e}(pr)),yr=(ii=jQuery,oi="bmd."+(ri="select"),si="bmd"+(ri.charAt(0).toUpperCase()+ri.slice(1)),ai=ii.fn[si],li={requiredClasses:["form-control||custom-select"]},ci=function(t){function e(e,n){var i;return(i=t.call(this,e,ii.extend(!0,li,n))||this).addIsFilled(),i}return o(e,t),e.prototype.dispose=function(){t.prototype.dispose.call(this,oi)},e.matches=function(t){return"select"===t.prop("tagName")},e.rejectMatch=function(t,e){dr.assert(this.$element,this.matches(e),t+" component element "+dr.describe(e)+" is invalid for <select>.")},e._jQueryInterface=function(t){return this.each(function(){var n=ii(this),i=n.data(oi);i||(i=new e(n,t),n.data(oi,i))})},e}(vr),ii.fn[si]=ci._jQueryInterface,ii.fn[si].Constructor=ci,ii.fn[si].noConflict=function(){return ii.fn[si]=ai,ci._jQueryInterface},hi=jQuery,di="bmd."+(ui="switch"),fi="bmd"+(ui.charAt(0).toUpperCase()+ui.slice(1)),pi=hi.fn[fi],mi={template:"<span class='bmd-switch-track'></span>"},gi=function(t){function e(e,n,i){return void 0===i&&(i={inputType:"checkbox",outerClass:"switch"}),t.call(this,e,hi.extend(!0,{},mi,n),i)||this}return o(e,t),e.prototype.dispose=function(){t.prototype.dispose.call(this,di)},e._jQueryInterface=function(t){return this.each(function(){var n=hi(this),i=n.data(di);i||(i=new e(n,t),n.data(di,i))})},e}(gr),hi.fn[fi]=gi._jQueryInterface,hi.fn[fi].Constructor=gi,hi.fn[fi].noConflict=function(){return hi.fn[fi]=pi,gi._jQueryInterface},_i=jQuery,yi="bmd."+(vi="text"),Ei="bmd"+(vi.charAt(0).toUpperCase()+vi.slice(1)),bi=_i.fn[Ei],Ci={},Ii=function(t){function e(e,n){return t.call(this,e,_i.extend(!0,Ci,n))||this}return o(e,t),e.prototype.dispose=function(e){void 0===e&&(e=yi),t.prototype.dispose.call(this,e)},e.matches=function(t){return"text"===t.attr("type")},e.rejectMatch=function(t,e){dr.assert(this.$element,this.matches(e),t+" component element "+dr.describe(e)+" is invalid for type='text'.")},e._jQueryInterface=function(t){return this.each(function(){var n=_i(this),i=n.data(yi);i||(i=new e(n,t),n.data(yi,i))})},e}(vr),_i.fn[Ei]=Ii._jQueryInterface,_i.fn[Ei].Constructor=Ii,_i.fn[Ei].noConflict=function(){return _i.fn[Ei]=bi,Ii._jQueryInterface},Ti=jQuery,Si="bmd."+(Ai="textarea"),wi="bmd"+(Ai.charAt(0).toUpperCase()+Ai.slice(1)),Di=Ti.fn[wi],Ni={},Oi=function(t){function e(e,n){return t.call(this,e,Ti.extend(!0,Ni,n))||this}return o(e,t),e.prototype.dispose=function(){t.prototype.dispose.call(this,Si)},e.matches=function(t){return"textarea"===t.prop("tagName")},e.rejectMatch=function(t,e){dr.assert(this.$element,this.matches(e),t+" component element "+dr.describe(e)+" is invalid for <textarea>.")},e._jQueryInterface=function(t){return this.each(function(){var n=Ti(this),i=n.data(Si);i||(i=new e(n,t),n.data(Si,i))})},e}(vr),Ti.fn[wi]=Oi._jQueryInterface,Ti.fn[wi].Constructor=Oi,Ti.fn[wi].noConflict=function(){return Ti.fn[wi]=Di,Oi._jQueryInterface},function(t){if("undefined"==typeof Popper)throw new Error("Bootstrap dropdown require Popper.js (https://popper.js.org)");var e="dropdown",n="bs.dropdown",r="."+n,o=".data-api",s=t.fn[e],a=new RegExp("38|40|27"),l={HIDE:"hide"+r,HIDDEN:"hidden"+r,SHOW:"show"+r,SHOWN:"shown"+r,CLICK:"click"+r,CLICK_DATA_API:"click"+r+o,KEYDOWN_DATA_API:"keydown"+r+o,KEYUP_DATA_API:"keyup"+r+o,TRANSITION_END:"transitionend webkitTransitionEnd oTransitionEnd animationend webkitAnimationEnd oAnimationEnd"},c="disabled",h="show",u="showing",d="hiding",f="dropup",p="dropdown-menu-right",m="dropdown-menu-left",g='[data-toggle="dropdown"]',_=".dropdown form",v=".dropdown-menu",y=".navbar-nav",E=".dropdown-menu .dropdown-item:not(.disabled)",b={TOP:"top-start",TOPEND:"top-end",BOTTOM:"bottom-start",BOTTOMEND:"bottom-end"},C={placement:b.BOTTOM,offset:0,flip:!0},I={placement:"string",offset:"(number|string)",flip:"boolean"},T=function(){function o(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var s=o.prototype;return s.toggle=function(){var e=this;if(!this._element.disabled&&!t(this._element).hasClass(c)){var n=o._getParentFromElement(this._element),i=t(this._menu).hasClass(h);if(o._clearMenus(),!i){var r={relatedTarget:this._element},s=t.Event(l.SHOW,r);if(t(n).trigger(s),!s.isDefaultPrevented()){var a=this._element;t(n).hasClass(f)&&(t(this._menu).hasClass(m)||t(this._menu).hasClass(p))&&(a=n),this._popper=new Popper(a,this._menu,this._getPopperConfig()),"ontouchstart"in document.documentElement&&!t(n).closest(y).length&&t("body").children().on("mouseover",null,t.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),t(this._menu).one(l.TRANSITION_END,function(){t(n).trigger(t.Event(l.SHOWN,r)),t(e._menu).removeClass(u)}),t(this._menu).addClass(h+" "+u),t(n).addClass(h)}}}},s.dispose=function(){t.removeData(this._element,n),t(this._element).off(r),this._element=null,this._menu=null,null!==this._popper&&this._popper.destroy(),this._popper=null},s.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},s._addEventListeners=function(){var e=this;t(this._element).on(l.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},s._getConfig=function(n){var i=t(this._element).data();return void 0!==i.placement&&(i.placement=b[i.placement.toUpperCase()]),n=t.extend({},this.constructor.Default,t(this._element).data(),n),hr.typeCheckConfig(e,n,this.constructor.DefaultType),n},s._getMenuElement=function(){if(!this._menu){var e=o._getParentFromElement(this._element);this._menu=t(e).find(v)[0]}return this._menu},s._getPlacement=function(){var e=t(this._element).parent(),n=this._config.placement;return e.hasClass(f)||this._config.placement===b.TOP?(n=b.TOP,t(this._menu).hasClass(p)&&(n=b.TOPEND)):t(this._menu).hasClass(p)&&(n=b.BOTTOMEND),n},s._detectNavbar=function(){return t(this._element).closest(".navbar").length>0},s._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:{offset:this._config.offset},flip:{enabled:this._config.flip}}};return this._inNavbar&&(t.modifiers.applyStyle={enabled:!this._inNavbar}),t},o._jQueryInterface=function(e){return this.each(function(){var i=t(this).data(n);if(i||(i=new o(this,"object"==typeof e?e:null),t(this).data(n,i)),"string"==typeof e){if(void 0===i[e])throw new Error('No method named "'+e+'"');i[e]()}})},o._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var i=t.makeArray(t(g)),r=function(r){var s=o._getParentFromElement(i[r]),a=t(i[r]).data(n),c={relatedTarget:i[r]};if(!a)return"continue";var u=a._menu;if(!t(s).hasClass(h))return"continue";if(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&t.contains(s,e.target))return"continue";var f=t.Event(l.HIDE,c);if(t(s).trigger(f),f.isDefaultPrevented())return"continue";"ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),i[r].setAttribute("aria-expanded","false"),t(u).addClass(d).removeClass(h),t(s).removeClass(h),t(u).one(l.TRANSITION_END,function(){t(s).trigger(t.Event(l.HIDDEN,c)),t(u).removeClass(d)})},s=0;s<i.length;s++)r(s)},o._getParentFromElement=function(e){var n,i=hr.getSelectorFromElement(e);return i&&(n=t(i)[0]),n||e.parentNode},o._dataApiKeydownHandler=function(e){if(!(!a.test(e.which)||/button/i.test(e.target.tagName)&&32===e.which||/input|textarea/i.test(e.target.tagName)||(e.preventDefault(),e.stopPropagation(),this.disabled||t(this).hasClass(c)))){var n=o._getParentFromElement(this),i=t(n).hasClass(h);if((i||27===e.which&&32===e.which)&&(!i||27!==e.which&&32!==e.which)){var r=t(n).find(E).get();if(r.length){var s=r.indexOf(e.target);38===e.which&&s>0&&s--,40===e.which&&s<r.length-1&&s++,s<0&&(s=0),r[s].focus()}}else{if(27===e.which){var l=t(n).find(g)[0];t(l).trigger("focus")}t(this).trigger("click")}}},i(o,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return C}},{key:"DefaultType",get:function(){return I}}]),o}();t(document).on(l.KEYDOWN_DATA_API,g,T._dataApiKeydownHandler).on(l.KEYDOWN_DATA_API,v,T._dataApiKeydownHandler).on(l.CLICK_DATA_API+" "+l.KEYUP_DATA_API,T._clearMenus).on(l.CLICK_DATA_API,g,function(e){e.preventDefault(),e.stopPropagation(),T._jQueryInterface.call(t(this),"toggle")}).on(l.CLICK_DATA_API,_,function(t){t.stopPropagation()}),t.fn[e]=T._jQueryInterface,t.fn[e].Constructor=T,t.fn[e].noConflict=function(){return t.fn[e]=s,T._jQueryInterface}}(jQuery),ki=jQuery,Ri={CANVAS:"."+($i="bmd-layout-canvas"),CONTAINER:"."+"bmd-layout-container",BACKDROP:"."+(ji="bmd-layout-backdrop")},Li={canvas:{create:!0,required:!0,template:'<div class="'+$i+'"></div>'},backdrop:{create:!0,required:!0,template:'<div class="'+ji+'"></div>'}},function(t){function e(e,n,i){var r;return void 0===i&&(i={}),(r=t.call(this,e,ki.extend(!0,{},Li,n),i)||this).$container=r.findContainer(!0),r.$backdrop=r.resolveBackdrop(),r.resolveCanvas(),r}o(e,t);var n=e.prototype;return n.dispose=function(e){t.prototype.dispose.call(this,e),this.$container=null,this.$backdrop=null},n.resolveCanvas=function(){var t=this.findCanvas(!1);return void 0!==t&&0!==t.length||(this.config.canvas.create&&this.$container.wrap(this.config.canvas.template),t=this.findCanvas(this.config.canvas.required)),t},n.findCanvas=function(t,e){void 0===t&&(t=!0),void 0===e&&(e=this.$container);var n=e.closest(Ri.CANVAS);return 0===n.length&&t&&ki.error("Failed to find "+Ri.CANVAS+" for "+dr.describe(e)),n},n.resolveBackdrop=function(){var t=this.findBackdrop(!1);return void 0!==t&&0!==t.length||(this.config.backdrop.create&&this.$container.append(this.config.backdrop.template),t=this.findBackdrop(this.config.backdrop.required)),t},n.findBackdrop=function(t,e){void 0===t&&(t=!0),void 0===e&&(e=this.$container);var n=e.find("> "+Ri.BACKDROP);return 0===n.length&&t&&ki.error("Failed to find "+Ri.BACKDROP+" for "+dr.describe(e)),n},n.findContainer=function(t,e){void 0===t&&(t=!0),void 0===e&&(e=this.$element);var n=e.closest(Ri.CONTAINER);return 0===n.length&&t&&ki.error("Failed to find "+Ri.CONTAINER+" for "+dr.describe(e)),n},e}(fr));Pi=jQuery,Fi="bmd."+(xi="drawer"),Mi="bmd"+(xi.charAt(0).toUpperCase()+xi.slice(1)),Qi=Pi.fn[Mi],Hi={ESCAPE:27},Ui="in",Gi="bmd-drawer-in",Wi="bmd-drawer-out",Bi={focusSelector:"a, button, input"},Ki=function(t){function e(e,n){var i;return(i=t.call(this,e,Pi.extend(!0,{},Bi,n))||this).$toggles=Pi('[data-toggle="drawer"][href="#'+i.$element[0].id+'"], [data-toggle="drawer"][data-target="#'+i.$element[0].id+'"]'),i._addAria(),i.$backdrop.keydown(function(t){t.which===Hi.ESCAPE&&i.hide()}).click(function(){i.hide()}),i.$element.keydown(function(t){t.which===Hi.ESCAPE&&i.hide()}),i.$toggles.click(function(){i.toggle()}),i}o(e,t);var n=e.prototype;return n.dispose=function(){t.prototype.dispose.call(this,Fi),this.$toggles=null},n.toggle=function(){this._isOpen()?this.hide():this.show()},n.show=function(){if(!this._isForcedClosed()&&!this._isOpen()){this.$toggles.attr("aria-expanded",!0),this.$element.attr("aria-expanded",!0),this.$element.attr("aria-hidden",!1);var t=this.$element.find(this.config.focusSelector);t.length>0&&t.first().focus(),this.$container.addClass(Gi),this.$backdrop.addClass(Ui)}},n.hide=function(){this._isOpen()&&(this.$toggles.attr("aria-expanded",!1),this.$element.attr("aria-expanded",!1),this.$element.attr("aria-hidden",!0),this.$container.removeClass(Gi),this.$backdrop.removeClass(Ui))},n._isOpen=function(){return this.$container.hasClass(Gi)},n._isForcedClosed=function(){return this.$container.hasClass(Wi)},n._addAria=function(){var t=this._isOpen();this.$element.attr("aria-expanded",t),this.$element.attr("aria-hidden",t),this.$toggles.length&&this.$toggles.attr("aria-expanded",t)},e._jQueryInterface=function(t){return this.each(function(){var n=Pi(this),i=n.data(Fi);i||(i=new e(n,t),n.data(Fi,i))})},e}(yr),Pi.fn[Mi]=Ki._jQueryInterface,Pi.fn[Mi].Constructor=Ki,Pi.fn[Mi].noConflict=function(){return Pi.fn[Mi]=Qi,Ki._jQueryInterface},Vi=jQuery,qi="bmd."+(Yi="ripples"),zi="bmd"+(Yi.charAt(0).toUpperCase()+Yi.slice(1)),Xi=Vi.fn[zi],tr={CONTAINER:"."+(Zi="ripple-container"),DECORATOR:"."+(Ji="ripple-decorator")},er={container:{template:"<div class='"+Zi+"'></div>"},decorator:{template:"<div class='"+Ji+"'></div>"},trigger:{start:"mousedown touchstart",end:"mouseup mouseleave touchend"},touchUserAgentRegex:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,duration:500},nr=function(){function t(t,e){var n=this;this.$element=t,this.config=Vi.extend(!0,{},er,e),this.$element.on(this.config.trigger.start,function(t){n._onStartRipple(t)})}var e=t.prototype;return e.dispose=function(){this.$element.data(qi,null),this.$element=null,this.$container=null,this.$decorator=null,this.config=null},e._onStartRipple=function(t){var e=this;if(!this._isTouch()||"mousedown"!==t.type){this._findOrCreateContainer();var n=this._getRelY(t),i=this._getRelX(t);(n||i)&&(this.$decorator.css({left:i,top:n,"background-color":this._getRipplesColor()}),this._forceStyleApplication(),this.rippleOn(),setTimeout(function(){e.rippleEnd()},this.config.duration),this.$element.on(this.config.trigger.end,function(){e.$decorator&&(e.$decorator.data("mousedown","off"),"off"===e.$decorator.data("animating")&&e.rippleOut())}))}},e._findOrCreateContainer=function(){(!this.$container||!this.$container.length>0)&&(this.$element.append(this.config.container.template),this.$container=this.$element.find(tr.CONTAINER)),this.$container.append(this.config.decorator.template),this.$decorator=this.$container.find(tr.DECORATOR)},e._forceStyleApplication=function(){return window.getComputedStyle(this.$decorator[0]).opacity},e._getRelX=function(t){var e=this.$container.offset();return this._isTouch()?1===(t=t.originalEvent).touches.length&&t.touches[0].pageX-e.left:t.pageX-e.left},e._getRelY=function(t){var e=this.$container.offset();return this._isTouch()?1===(t=t.originalEvent).touches.length&&t.touches[0].pageY-e.top:t.pageY-e.top},e._getRipplesColor=function(){return this.$element.data("ripple-color")?this.$element.data("ripple-color"):window.getComputedStyle(this.$element[0]).color},e._isTouch=function(){return this.config.touchUserAgentRegex.test(navigator.userAgent)},e.rippleEnd=function(){this.$decorator&&(this.$decorator.data("animating","off"),"off"===this.$decorator.data("mousedown")&&this.rippleOut(this.$decorator))},e.rippleOut=function(){var t=this;this.$decorator.off(),dr.transitionEndSupported()?this.$decorator.addClass("ripple-out"):this.$decorator.animate({opacity:0},100,function(){t.$decorator.trigger("transitionend")}),this.$decorator.on(dr.transitionEndSelector(),function(){t.$decorator&&(t.$decorator.remove(),t.$decorator=null)})},e.rippleOn=function(){var t=this,e=this._getNewSize();dr.transitionEndSupported()?this.$decorator.css({"-ms-transform":"scale("+e+")","-moz-transform":"scale("+e+")","-webkit-transform":"scale("+e+")",transform:"scale("+e+")"}).addClass("ripple-on").data("animating","on").data("mousedown","on"):this.$decorator.animate({width:2*Math.max(this.$element.outerWidth(),this.$element.outerHeight()),height:2*Math.max(this.$element.outerWidth(),this.$element.outerHeight()),"margin-left":-1*Math.max(this.$element.outerWidth(),this.$element.outerHeight()),"margin-top":-1*Math.max(this.$element.outerWidth(),this.$element.outerHeight()),opacity:.2},this.config.duration,function(){t.$decorator.trigger("transitionend")})},e._getNewSize=function(){return Math.max(this.$element.outerWidth(),this.$element.outerHeight())/this.$decorator.outerWidth()*2.5},t._jQueryInterface=function(e){return this.each(function(){var n=Vi(this),i=n.data(qi);i||(i=new t(n,e),n.data(qi,i))})},t}(),Vi.fn[zi]=nr._jQueryInterface,Vi.fn[zi].Constructor=nr,Vi.fn[zi].noConflict=function(){return Vi.fn[zi]=Xi,nr._jQueryInterface},ir=jQuery,or="bmd."+(rr="autofill"),sr="bmd"+(rr.charAt(0).toUpperCase()+rr.slice(1)),ar=ir.fn[sr],lr={},cr=function(t){function e(e,n){var i;return(i=t.call(this,e,ir.extend(!0,{},lr,n))||this)._watchLoading(),i._attachEventHandlers(),i}o(e,t);var n=e.prototype;return n.dispose=function(){t.prototype.dispose.call(this,or)},n._watchLoading=function(){var t=this;setTimeout(function(){clearInterval(t._onLoading)},1e4)},n._onLoading=function(){setInterval(function(){ir("input[type!=checkbox]").each(function(t,e){var n=ir(e);n.val()&&n.val()!==n.attr("value")&&n.trigger("change")})},100)},n._attachEventHandlers=function(){var t=null;ir(document).on("focus","input",function(e){var n=ir(e.currentTarget).closest("form").find("input").not("[type=file]").not('[class*="picker"]');t=setInterval(function(){n.each(function(t,e){var n=ir(e);n.val()!==n.attr("value")&&n.trigger("change")})},100)}).on("blur",".form-group input",function(){clearInterval(t)})},e._jQueryInterface=function(t){return this.each(function(){var n=ir(this),i=n.data(or);i||(i=new e(n,t),n.data(or,i))})},e}(fr),ir.fn[sr]=cr._jQueryInterface,ir.fn[sr].Constructor=cr,ir.fn[sr].noConflict=function(){return ir.fn[sr]=ar,cr._jQueryInterface};Popper.Defaults.modifiers.computeStyle.gpuAcceleration=!1;var Er,br,Cr,Ir,Tr,Ar,Sr;Er=jQuery,Cr="bmd."+(br="bootstrapMaterialDesign"),Ir=br,Tr=Er.fn[Ir],Ar={global:{validate:!1,label:{className:"bmd-label-floating"}},autofill:{selector:"body"},checkbox:{selector:".checkbox > label > input[type=checkbox]"},checkboxInline:{selector:"label.checkbox-inline > input[type=checkbox]"},collapseInline:{selector:'.bmd-collapse-inline [data-toggle="collapse"]'},drawer:{selector:".bmd-layout-drawer"},file:{selector:"input[type=file]"},radio:{selector:".radio > label > input[type=radio]"},radioInline:{selector:"label.radio-inline > input[type=radio]"},ripples:{selector:[".btn:not(.ripple-none)",".card-image:not(.ripple-none)",".navbar a:not(.ripple-none)",".dropdown-menu a:not(.ripple-none)",".nav-tabs a:not(.ripple-none)",".pagination li:not(.active):not(.disabled) a:not(.ripple-none)",".ripple"]},select:{selector:["select"]},switch:{selector:".switch > label > input[type=checkbox]"},text:{selector:["input.form-control:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])"]},textarea:{selector:["textarea.form-control"]},arrive:!0,instantiation:["ripples","checkbox","checkboxInline","collapseInline","drawer","radio","radioInline","switch","text","textarea","autofill"]},Sr=function(){function t(t,e){var n=this;this.$element=t,this.config=Er.extend(!0,{},Ar,e);var i=Er(document),r=function(t){var e=n.config[t];if(e){var r=n._resolveSelector(e);e=Er.extend(!0,{},n.config.global,e);var o="bmd"+(""+(t.charAt(0).toUpperCase()+t.slice(1)));try{Er(r)[o](e),document.arrive&&n.config.arrive&&i.arrive(r,function(){Er(this)[o](e)})}catch(t){var s="Failed to instantiate component: $('"+r+"')["+o+"]("+e+")";throw console.error(s,t,"\nSelected elements: ",Er(r)),t}}},o=this.config.instantiation,s=Array.isArray(o),a=0;for(o=s?o:o[Symbol.iterator]();;){var l;if(s){if(a>=o.length)break;l=o[a++]}else{if((a=o.next()).done)break;l=a.value}r(l)}}var e=t.prototype;return e.dispose=function(){this.$element.data(Cr,null),this.$element=null,this.config=null},e._resolveSelector=function(t){var e=t.selector;return Array.isArray(e)&&(e=e.join(", ")),e},t._jQueryInterface=function(e){return this.each(function(){var n=Er(this),i=n.data(Cr);i||(i=new t(n,e),n.data(Cr,i))})},t}(),Er.fn[Ir]=Sr._jQueryInterface,Er.fn[Ir].Constructor=Sr,Er.fn[Ir].noConflict=function(){return Er.fn[Ir]=Tr,Sr._jQueryInterface}});

/* perfect-scrollbar v0.6.13 */
!function t(e,n,r){function o(i,s){if(!n[i]){if(!e[i]){var a="function"==typeof require&&require;if(!s&&a)return a(i,!0);if(l)return l(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[i]={exports:{}};e[i][0].call(u.exports,function(t){var n=e[i][1][t];return o(n?n:t)},u,u.exports,t,e,n,r)}return n[i].exports}for(var l="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(t,e,n){"use strict";function r(t){t.fn.perfectScrollbar=function(t){return this.each(function(){if("object"==typeof t||"undefined"==typeof t){var e=t;l.get(this)||o.initialize(this,e)}else{var n=t;"update"===n?o.update(this):"destroy"===n&&o.destroy(this)}})}}var o=t("../main"),l=t("../plugin/instances");if("function"==typeof define&&define.amd)define(["jquery"],r);else{var i=window.jQuery?window.jQuery:window.$;"undefined"!=typeof i&&r(i)}e.exports=r},{"../main":7,"../plugin/instances":18}],2:[function(t,e,n){"use strict";function r(t,e){var n=t.className.split(" ");n.indexOf(e)<0&&n.push(e),t.className=n.join(" ")}function o(t,e){var n=t.className.split(" "),r=n.indexOf(e);r>=0&&n.splice(r,1),t.className=n.join(" ")}n.add=function(t,e){t.classList?t.classList.add(e):r(t,e)},n.remove=function(t,e){t.classList?t.classList.remove(e):o(t,e)},n.list=function(t){return t.classList?Array.prototype.slice.apply(t.classList):t.className.split(" ")}},{}],3:[function(t,e,n){"use strict";function r(t,e){return window.getComputedStyle(t)[e]}function o(t,e,n){return"number"==typeof n&&(n=n.toString()+"px"),t.style[e]=n,t}function l(t,e){for(var n in e){var r=e[n];"number"==typeof r&&(r=r.toString()+"px"),t.style[n]=r}return t}var i={};i.e=function(t,e){var n=document.createElement(t);return n.className=e,n},i.appendTo=function(t,e){return e.appendChild(t),t},i.css=function(t,e,n){return"object"==typeof e?l(t,e):"undefined"==typeof n?r(t,e):o(t,e,n)},i.matches=function(t,e){return"undefined"!=typeof t.matches?t.matches(e):"undefined"!=typeof t.matchesSelector?t.matchesSelector(e):"undefined"!=typeof t.webkitMatchesSelector?t.webkitMatchesSelector(e):"undefined"!=typeof t.mozMatchesSelector?t.mozMatchesSelector(e):"undefined"!=typeof t.msMatchesSelector?t.msMatchesSelector(e):void 0},i.remove=function(t){"undefined"!=typeof t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)},i.queryChildren=function(t,e){return Array.prototype.filter.call(t.childNodes,function(t){return i.matches(t,e)})},e.exports=i},{}],4:[function(t,e,n){"use strict";var r=function(t){this.element=t,this.events={}};r.prototype.bind=function(t,e){"undefined"==typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e),this.element.addEventListener(t,e,!1)},r.prototype.unbind=function(t,e){var n="undefined"!=typeof e;this.events[t]=this.events[t].filter(function(r){return!(!n||r===e)||(this.element.removeEventListener(t,r,!1),!1)},this)},r.prototype.unbindAll=function(){for(var t in this.events)this.unbind(t)};var o=function(){this.eventElements=[]};o.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return"undefined"==typeof e&&(e=new r(t),this.eventElements.push(e)),e},o.prototype.bind=function(t,e,n){this.eventElement(t).bind(e,n)},o.prototype.unbind=function(t,e,n){this.eventElement(t).unbind(e,n)},o.prototype.unbindAll=function(){for(var t=0;t<this.eventElements.length;t++)this.eventElements[t].unbindAll()},o.prototype.once=function(t,e,n){var r=this.eventElement(t),o=function(t){r.unbind(e,o),n(t)};r.bind(e,o)},e.exports=o},{}],5:[function(t,e,n){"use strict";e.exports=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}}()},{}],6:[function(t,e,n){"use strict";var r=t("./class"),o=t("./dom"),l=n.toInt=function(t){return parseInt(t,10)||0},i=n.clone=function(t){if(t){if(t.constructor===Array)return t.map(i);if("object"==typeof t){var e={};for(var n in t)e[n]=i(t[n]);return e}return t}return null};n.extend=function(t,e){var n=i(t);for(var r in e)n[r]=i(e[r]);return n},n.isEditable=function(t){return o.matches(t,"input,[contenteditable]")||o.matches(t,"select,[contenteditable]")||o.matches(t,"textarea,[contenteditable]")||o.matches(t,"button,[contenteditable]")},n.removePsClasses=function(t){for(var e=r.list(t),n=0;n<e.length;n++){var o=e[n];0===o.indexOf("ps-")&&r.remove(t,o)}},n.outerWidth=function(t){return l(o.css(t,"width"))+l(o.css(t,"paddingLeft"))+l(o.css(t,"paddingRight"))+l(o.css(t,"borderLeftWidth"))+l(o.css(t,"borderRightWidth"))},n.startScrolling=function(t,e){r.add(t,"ps-in-scrolling"),"undefined"!=typeof e?r.add(t,"ps-"+e):(r.add(t,"ps-x"),r.add(t,"ps-y"))},n.stopScrolling=function(t,e){r.remove(t,"ps-in-scrolling"),"undefined"!=typeof e?r.remove(t,"ps-"+e):(r.remove(t,"ps-x"),r.remove(t,"ps-y"))},n.env={isWebKit:"WebkitAppearance"in document.documentElement.style,supportsTouch:"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,supportsIePointer:null!==window.navigator.msMaxTouchPoints}},{"./class":2,"./dom":3}],7:[function(t,e,n){"use strict";var r=t("./plugin/destroy"),o=t("./plugin/initialize"),l=t("./plugin/update");e.exports={initialize:o,update:l,destroy:r}},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":21}],8:[function(t,e,n){"use strict";e.exports={handlers:["click-rail","drag-scrollbar","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipePropagation:!0,useBothWheelAxes:!1,wheelPropagation:!1,wheelSpeed:1,theme:"default"}},{}],9:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/dom"),l=t("./instances");e.exports=function(t){var e=l.get(t);e&&(e.event.unbindAll(),o.remove(e.scrollbarX),o.remove(e.scrollbarY),o.remove(e.scrollbarXRail),o.remove(e.scrollbarYRail),r.removePsClasses(t),l.remove(t))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(t,e,n){"use strict";function r(t,e){function n(t){return t.getBoundingClientRect()}var r=function(t){t.stopPropagation()};e.event.bind(e.scrollbarY,"click",r),e.event.bind(e.scrollbarYRail,"click",function(r){var o=r.pageY-window.pageYOffset-n(e.scrollbarYRail).top,s=o>e.scrollbarYTop?1:-1;i(t,"top",t.scrollTop+s*e.containerHeight),l(t),r.stopPropagation()}),e.event.bind(e.scrollbarX,"click",r),e.event.bind(e.scrollbarXRail,"click",function(r){var o=r.pageX-window.pageXOffset-n(e.scrollbarXRail).left,s=o>e.scrollbarXLeft?1:-1;i(t,"left",t.scrollLeft+s*e.containerWidth),l(t),r.stopPropagation()})}var o=t("../instances"),l=t("../update-geometry"),i=t("../update-scroll");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],11:[function(t,e,n){"use strict";function r(t,e){function n(n){var o=r+n*e.railXRatio,i=Math.max(0,e.scrollbarXRail.getBoundingClientRect().left)+e.railXRatio*(e.railXWidth-e.scrollbarXWidth);o<0?e.scrollbarXLeft=0:o>i?e.scrollbarXLeft=i:e.scrollbarXLeft=o;var s=l.toInt(e.scrollbarXLeft*(e.contentWidth-e.containerWidth)/(e.containerWidth-e.railXRatio*e.scrollbarXWidth))-e.negativeScrollAdjustment;c(t,"left",s)}var r=null,o=null,s=function(e){n(e.pageX-o),a(t),e.stopPropagation(),e.preventDefault()},u=function(){l.stopScrolling(t,"x"),e.event.unbind(e.ownerDocument,"mousemove",s)};e.event.bind(e.scrollbarX,"mousedown",function(n){o=n.pageX,r=l.toInt(i.css(e.scrollbarX,"left"))*e.railXRatio,l.startScrolling(t,"x"),e.event.bind(e.ownerDocument,"mousemove",s),e.event.once(e.ownerDocument,"mouseup",u),n.stopPropagation(),n.preventDefault()})}function o(t,e){function n(n){var o=r+n*e.railYRatio,i=Math.max(0,e.scrollbarYRail.getBoundingClientRect().top)+e.railYRatio*(e.railYHeight-e.scrollbarYHeight);o<0?e.scrollbarYTop=0:o>i?e.scrollbarYTop=i:e.scrollbarYTop=o;var s=l.toInt(e.scrollbarYTop*(e.contentHeight-e.containerHeight)/(e.containerHeight-e.railYRatio*e.scrollbarYHeight));c(t,"top",s)}var r=null,o=null,s=function(e){n(e.pageY-o),a(t),e.stopPropagation(),e.preventDefault()},u=function(){l.stopScrolling(t,"y"),e.event.unbind(e.ownerDocument,"mousemove",s)};e.event.bind(e.scrollbarY,"mousedown",function(n){o=n.pageY,r=l.toInt(i.css(e.scrollbarY,"top"))*e.railYRatio,l.startScrolling(t,"y"),e.event.bind(e.ownerDocument,"mousemove",s),e.event.once(e.ownerDocument,"mouseup",u),n.stopPropagation(),n.preventDefault()})}var l=t("../../lib/helper"),i=t("../../lib/dom"),s=t("../instances"),a=t("../update-geometry"),c=t("../update-scroll");e.exports=function(t){var e=s.get(t);r(t,e),o(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],12:[function(t,e,n){"use strict";function r(t,e){function n(n,r){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&r>0||o>=e.contentHeight-e.containerHeight&&r<0)return!e.settings.wheelPropagation}var l=t.scrollLeft;if(0===r){if(!e.scrollbarXActive)return!1;if(0===l&&n<0||l>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}var r=!1;e.event.bind(t,"mouseenter",function(){r=!0}),e.event.bind(t,"mouseleave",function(){r=!1});var i=!1;e.event.bind(e.ownerDocument,"keydown",function(c){if(!(c.isDefaultPrevented&&c.isDefaultPrevented()||c.defaultPrevented)){var u=l.matches(e.scrollbarX,":focus")||l.matches(e.scrollbarY,":focus");if(r||u){var d=document.activeElement?document.activeElement:e.ownerDocument.activeElement;if(d){if("IFRAME"===d.tagName)d=d.contentDocument.activeElement;else for(;d.shadowRoot;)d=d.shadowRoot.activeElement;if(o.isEditable(d))return}var p=0,f=0;switch(c.which){case 37:p=c.metaKey?-e.contentWidth:c.altKey?-e.containerWidth:-30;break;case 38:f=c.metaKey?e.contentHeight:c.altKey?e.containerHeight:30;break;case 39:p=c.metaKey?e.contentWidth:c.altKey?e.containerWidth:30;break;case 40:f=c.metaKey?-e.contentHeight:c.altKey?-e.containerHeight:-30;break;case 33:f=90;break;case 32:f=c.shiftKey?90:-90;break;case 34:f=-90;break;case 35:f=c.ctrlKey?-e.contentHeight:-e.containerHeight;break;case 36:f=c.ctrlKey?t.scrollTop:e.containerHeight;break;default:return}a(t,"top",t.scrollTop-f),a(t,"left",t.scrollLeft+p),s(t),i=n(p,f),i&&c.preventDefault()}}})}var o=t("../../lib/helper"),l=t("../../lib/dom"),i=t("../instances"),s=t("../update-geometry"),a=t("../update-scroll");e.exports=function(t){var e=i.get(t);r(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],13:[function(t,e,n){"use strict";function r(t,e){function n(n,r){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&r>0||o>=e.contentHeight-e.containerHeight&&r<0)return!e.settings.wheelPropagation}var l=t.scrollLeft;if(0===r){if(!e.scrollbarXActive)return!1;if(0===l&&n<0||l>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}function r(t){var e=t.deltaX,n=-1*t.deltaY;return"undefined"!=typeof e&&"undefined"!=typeof n||(e=-1*t.wheelDeltaX/6,n=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,n*=10),e!==e&&n!==n&&(e=0,n=t.wheelDelta),t.shiftKey?[-n,-e]:[e,n]}function o(e,n){var r=t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");if(r){if(!window.getComputedStyle(r).overflow.match(/(scroll|auto)/))return!1;var o=r.scrollHeight-r.clientHeight;if(o>0&&!(0===r.scrollTop&&n>0||r.scrollTop===o&&n<0))return!0;var l=r.scrollLeft-r.clientWidth;if(l>0&&!(0===r.scrollLeft&&e<0||r.scrollLeft===l&&e>0))return!0}return!1}function s(s){var c=r(s),u=c[0],d=c[1];o(u,d)||(a=!1,e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(d?i(t,"top",t.scrollTop-d*e.settings.wheelSpeed):i(t,"top",t.scrollTop+u*e.settings.wheelSpeed),a=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(u?i(t,"left",t.scrollLeft+u*e.settings.wheelSpeed):i(t,"left",t.scrollLeft-d*e.settings.wheelSpeed),a=!0):(i(t,"top",t.scrollTop-d*e.settings.wheelSpeed),i(t,"left",t.scrollLeft+u*e.settings.wheelSpeed)),l(t),a=a||n(u,d),a&&(s.stopPropagation(),s.preventDefault()))}var a=!1;"undefined"!=typeof window.onwheel?e.event.bind(t,"wheel",s):"undefined"!=typeof window.onmousewheel&&e.event.bind(t,"mousewheel",s)}var o=t("../instances"),l=t("../update-geometry"),i=t("../update-scroll");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],14:[function(t,e,n){"use strict";function r(t,e){e.event.bind(t,"scroll",function(){l(t)})}var o=t("../instances"),l=t("../update-geometry");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19}],15:[function(t,e,n){"use strict";function r(t,e){function n(){var t=window.getSelection?window.getSelection():document.getSelection?document.getSelection():"";return 0===t.toString().length?null:t.getRangeAt(0).commonAncestorContainer}function r(){c||(c=setInterval(function(){return l.get(t)?(s(t,"top",t.scrollTop+u.top),s(t,"left",t.scrollLeft+u.left),void i(t)):void clearInterval(c)},50))}function a(){c&&(clearInterval(c),c=null),o.stopScrolling(t)}var c=null,u={top:0,left:0},d=!1;e.event.bind(e.ownerDocument,"selectionchange",function(){t.contains(n())?d=!0:(d=!1,a())}),e.event.bind(window,"mouseup",function(){d&&(d=!1,a())}),e.event.bind(window,"keyup",function(){d&&(d=!1,a())}),e.event.bind(window,"mousemove",function(e){if(d){var n={x:e.pageX,y:e.pageY},l={left:t.offsetLeft,right:t.offsetLeft+t.offsetWidth,top:t.offsetTop,bottom:t.offsetTop+t.offsetHeight};n.x<l.left+3?(u.left=-5,o.startScrolling(t,"x")):n.x>l.right-3?(u.left=5,o.startScrolling(t,"x")):u.left=0,n.y<l.top+3?(l.top+3-n.y<5?u.top=-5:u.top=-20,o.startScrolling(t,"y")):n.y>l.bottom-3?(n.y-l.bottom+3<5?u.top=5:u.top=20,o.startScrolling(t,"y")):u.top=0,0===u.top&&0===u.left?a():r()}})}var o=t("../../lib/helper"),l=t("../instances"),i=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){var e=l.get(t);r(t,e)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],16:[function(t,e,n){"use strict";function r(t,e,n,r){function o(n,r){var o=t.scrollTop,l=t.scrollLeft,i=Math.abs(n),s=Math.abs(r);if(s>i){if(r<0&&o===e.contentHeight-e.containerHeight||r>0&&0===o)return!e.settings.swipePropagation}else if(i>s&&(n<0&&l===e.contentWidth-e.containerWidth||n>0&&0===l))return!e.settings.swipePropagation;return!0}function a(e,n){s(t,"top",t.scrollTop-n),s(t,"left",t.scrollLeft-e),i(t)}function c(){w=!0}function u(){w=!1}function d(t){return t.targetTouches?t.targetTouches[0]:t}function p(t){return!(!t.targetTouches||1!==t.targetTouches.length)||!(!t.pointerType||"mouse"===t.pointerType||t.pointerType===t.MSPOINTER_TYPE_MOUSE)}function f(t){if(p(t)){Y=!0;var e=d(t);g.pageX=e.pageX,g.pageY=e.pageY,v=(new Date).getTime(),null!==y&&clearInterval(y),t.stopPropagation()}}function h(t){if(!Y&&e.settings.swipePropagation&&f(t),!w&&Y&&p(t)){var n=d(t),r={pageX:n.pageX,pageY:n.pageY},l=r.pageX-g.pageX,i=r.pageY-g.pageY;a(l,i),g=r;var s=(new Date).getTime(),c=s-v;c>0&&(m.x=l/c,m.y=i/c,v=s),o(l,i)&&(t.stopPropagation(),t.preventDefault())}}function b(){!w&&Y&&(Y=!1,clearInterval(y),y=setInterval(function(){return l.get(t)&&(m.x||m.y)?Math.abs(m.x)<.01&&Math.abs(m.y)<.01?void clearInterval(y):(a(30*m.x,30*m.y),m.x*=.8,void(m.y*=.8)):void clearInterval(y)},10))}var g={},v=0,m={},y=null,w=!1,Y=!1;n&&(e.event.bind(window,"touchstart",c),e.event.bind(window,"touchend",u),e.event.bind(t,"touchstart",f),e.event.bind(t,"touchmove",h),e.event.bind(t,"touchend",b)),r&&(window.PointerEvent?(e.event.bind(window,"pointerdown",c),e.event.bind(window,"pointerup",u),e.event.bind(t,"pointerdown",f),e.event.bind(t,"pointermove",h),e.event.bind(t,"pointerup",b)):window.MSPointerEvent&&(e.event.bind(window,"MSPointerDown",c),e.event.bind(window,"MSPointerUp",u),e.event.bind(t,"MSPointerDown",f),e.event.bind(t,"MSPointerMove",h),e.event.bind(t,"MSPointerUp",b)))}var o=t("../../lib/helper"),l=t("../instances"),i=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){if(o.env.supportsTouch||o.env.supportsIePointer){var e=l.get(t);r(t,e,o.env.supportsTouch,o.env.supportsIePointer)}}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],17:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/class"),l=t("./instances"),i=t("./update-geometry"),s={"click-rail":t("./handler/click-rail"),"drag-scrollbar":t("./handler/drag-scrollbar"),keyboard:t("./handler/keyboard"),wheel:t("./handler/mouse-wheel"),touch:t("./handler/touch"),selection:t("./handler/selection")},a=t("./handler/native-scroll");e.exports=function(t,e){e="object"==typeof e?e:{},o.add(t,"ps-container");var n=l.add(t);n.settings=r.extend(n.settings,e),o.add(t,"ps-theme-"+n.settings.theme),n.settings.handlers.forEach(function(e){s[e](t)}),a(t),i(t)}},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(t,e,n){"use strict";function r(t){function e(){a.add(t,"ps-focus")}function n(){a.remove(t,"ps-focus")}var r=this;r.settings=s.clone(c),r.containerWidth=null,r.containerHeight=null,r.contentWidth=null,r.contentHeight=null,r.isRtl="rtl"===u.css(t,"direction"),r.isNegativeScroll=function(){var e=t.scrollLeft,n=null;return t.scrollLeft=-1,n=t.scrollLeft<0,t.scrollLeft=e,n}(),r.negativeScrollAdjustment=r.isNegativeScroll?t.scrollWidth-t.clientWidth:0,r.event=new d,r.ownerDocument=t.ownerDocument||document,r.scrollbarXRail=u.appendTo(u.e("div","ps-scrollbar-x-rail"),t),r.scrollbarX=u.appendTo(u.e("div","ps-scrollbar-x"),r.scrollbarXRail),r.scrollbarX.setAttribute("tabindex",0),r.event.bind(r.scrollbarX,"focus",e),r.event.bind(r.scrollbarX,"blur",n),r.scrollbarXActive=null,r.scrollbarXWidth=null,r.scrollbarXLeft=null,r.scrollbarXBottom=s.toInt(u.css(r.scrollbarXRail,"bottom")),r.isScrollbarXUsingBottom=r.scrollbarXBottom===r.scrollbarXBottom,r.scrollbarXTop=r.isScrollbarXUsingBottom?null:s.toInt(u.css(r.scrollbarXRail,"top")),r.railBorderXWidth=s.toInt(u.css(r.scrollbarXRail,"borderLeftWidth"))+s.toInt(u.css(r.scrollbarXRail,"borderRightWidth")),u.css(r.scrollbarXRail,"display","block"),r.railXMarginWidth=s.toInt(u.css(r.scrollbarXRail,"marginLeft"))+s.toInt(u.css(r.scrollbarXRail,"marginRight")),u.css(r.scrollbarXRail,"display",""),r.railXWidth=null,r.railXRatio=null,r.scrollbarYRail=u.appendTo(u.e("div","ps-scrollbar-y-rail"),t),r.scrollbarY=u.appendTo(u.e("div","ps-scrollbar-y"),r.scrollbarYRail),r.scrollbarY.setAttribute("tabindex",0),r.event.bind(r.scrollbarY,"focus",e),r.event.bind(r.scrollbarY,"blur",n),r.scrollbarYActive=null,r.scrollbarYHeight=null,r.scrollbarYTop=null,r.scrollbarYRight=s.toInt(u.css(r.scrollbarYRail,"right")),r.isScrollbarYUsingRight=r.scrollbarYRight===r.scrollbarYRight,r.scrollbarYLeft=r.isScrollbarYUsingRight?null:s.toInt(u.css(r.scrollbarYRail,"left")),r.scrollbarYOuterWidth=r.isRtl?s.outerWidth(r.scrollbarY):null,r.railBorderYWidth=s.toInt(u.css(r.scrollbarYRail,"borderTopWidth"))+s.toInt(u.css(r.scrollbarYRail,"borderBottomWidth")),u.css(r.scrollbarYRail,"display","block"),r.railYMarginHeight=s.toInt(u.css(r.scrollbarYRail,"marginTop"))+s.toInt(u.css(r.scrollbarYRail,"marginBottom")),u.css(r.scrollbarYRail,"display",""),r.railYHeight=null,r.railYRatio=null}function o(t){return t.getAttribute("data-ps-id")}function l(t,e){t.setAttribute("data-ps-id",e)}function i(t){t.removeAttribute("data-ps-id")}var s=t("../lib/helper"),a=t("../lib/class"),c=t("./default-setting"),u=t("../lib/dom"),d=t("../lib/event-manager"),p=t("../lib/guid"),f={};n.add=function(t){var e=p();return l(t,e),f[e]=new r(t),f[e]},n.remove=function(t){delete f[o(t)],i(t)},n.get=function(t){return f[o(t)]}},{"../lib/class":2,"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,"../lib/helper":6,"./default-setting":8}],19:[function(t,e,n){"use strict";function r(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function o(t,e){var n={width:e.railXWidth};e.isRtl?n.left=e.negativeScrollAdjustment+t.scrollLeft+e.containerWidth-e.contentWidth:n.left=t.scrollLeft,e.isScrollbarXUsingBottom?n.bottom=e.scrollbarXBottom-t.scrollTop:n.top=e.scrollbarXTop+t.scrollTop,s.css(e.scrollbarXRail,n);var r={top:t.scrollTop,height:e.railYHeight};e.isScrollbarYUsingRight?e.isRtl?r.right=e.contentWidth-(e.negativeScrollAdjustment+t.scrollLeft)-e.scrollbarYRight-e.scrollbarYOuterWidth:r.right=e.scrollbarYRight-t.scrollLeft:e.isRtl?r.left=e.negativeScrollAdjustment+t.scrollLeft+2*e.containerWidth-e.contentWidth-e.scrollbarYLeft-e.scrollbarYOuterWidth:r.left=e.scrollbarYLeft+t.scrollLeft,s.css(e.scrollbarYRail,r),s.css(e.scrollbarX,{left:e.scrollbarXLeft,width:e.scrollbarXWidth-e.railBorderXWidth}),s.css(e.scrollbarY,{top:e.scrollbarYTop,height:e.scrollbarYHeight-e.railBorderYWidth})}var l=t("../lib/helper"),i=t("../lib/class"),s=t("../lib/dom"),a=t("./instances"),c=t("./update-scroll");e.exports=function(t){var e=a.get(t);e.containerWidth=t.clientWidth,e.containerHeight=t.clientHeight,e.contentWidth=t.scrollWidth,e.contentHeight=t.scrollHeight;var n;t.contains(e.scrollbarXRail)||(n=s.queryChildren(t,".ps-scrollbar-x-rail"),n.length>0&&n.forEach(function(t){s.remove(t)}),s.appendTo(e.scrollbarXRail,t)),t.contains(e.scrollbarYRail)||(n=s.queryChildren(t,".ps-scrollbar-y-rail"),n.length>0&&n.forEach(function(t){s.remove(t)}),s.appendTo(e.scrollbarYRail,t)),!e.settings.suppressScrollX&&e.containerWidth+e.settings.scrollXMarginOffset<e.contentWidth?(e.scrollbarXActive=!0,e.railXWidth=e.containerWidth-e.railXMarginWidth,e.railXRatio=e.containerWidth/e.railXWidth,e.scrollbarXWidth=r(e,l.toInt(e.railXWidth*e.containerWidth/e.contentWidth)),e.scrollbarXLeft=l.toInt((e.negativeScrollAdjustment+t.scrollLeft)*(e.railXWidth-e.scrollbarXWidth)/(e.contentWidth-e.containerWidth))):e.scrollbarXActive=!1,!e.settings.suppressScrollY&&e.containerHeight+e.settings.scrollYMarginOffset<e.contentHeight?(e.scrollbarYActive=!0,e.railYHeight=e.containerHeight-e.railYMarginHeight,e.railYRatio=e.containerHeight/e.railYHeight,e.scrollbarYHeight=r(e,l.toInt(e.railYHeight*e.containerHeight/e.contentHeight)),e.scrollbarYTop=l.toInt(t.scrollTop*(e.railYHeight-e.scrollbarYHeight)/(e.contentHeight-e.containerHeight))):e.scrollbarYActive=!1,e.scrollbarXLeft>=e.railXWidth-e.scrollbarXWidth&&(e.scrollbarXLeft=e.railXWidth-e.scrollbarXWidth),e.scrollbarYTop>=e.railYHeight-e.scrollbarYHeight&&(e.scrollbarYTop=e.railYHeight-e.scrollbarYHeight),o(t,e),e.scrollbarXActive?i.add(t,"ps-active-x"):(i.remove(t,"ps-active-x"),e.scrollbarXWidth=0,e.scrollbarXLeft=0,c(t,"left",0)),e.scrollbarYActive?i.add(t,"ps-active-y"):(i.remove(t,"ps-active-y"),e.scrollbarYHeight=0,e.scrollbarYTop=0,c(t,"top",0))}},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-scroll":20}],20:[function(t,e,n){"use strict";var r,o,l=t("./instances"),i=function(t){var e=document.createEvent("Event");return e.initEvent(t,!0,!0),e};e.exports=function(t,e,n){if("undefined"==typeof t)throw"You must provide an element to the update-scroll function";if("undefined"==typeof e)throw"You must provide an axis to the update-scroll function";if("undefined"==typeof n)throw"You must provide a value to the update-scroll function";"top"===e&&n<=0&&(t.scrollTop=n=0,t.dispatchEvent(i("ps-y-reach-start"))),"left"===e&&n<=0&&(t.scrollLeft=n=0,t.dispatchEvent(i("ps-x-reach-start")));var s=l.get(t);"top"===e&&n>=s.contentHeight-s.containerHeight&&(n=s.contentHeight-s.containerHeight,n-t.scrollTop<=1?n=t.scrollTop:t.scrollTop=n,t.dispatchEvent(i("ps-y-reach-end"))),"left"===e&&n>=s.contentWidth-s.containerWidth&&(n=s.contentWidth-s.containerWidth,n-t.scrollLeft<=1?n=t.scrollLeft:t.scrollLeft=n,t.dispatchEvent(i("ps-x-reach-end"))),r||(r=t.scrollTop),o||(o=t.scrollLeft),"top"===e&&n<r&&t.dispatchEvent(i("ps-scroll-up")),"top"===e&&n>r&&t.dispatchEvent(i("ps-scroll-down")),"left"===e&&n<o&&t.dispatchEvent(i("ps-scroll-left")),"left"===e&&n>o&&t.dispatchEvent(i("ps-scroll-right")),"top"===e&&(t.scrollTop=r=n,t.dispatchEvent(i("ps-scroll-y"))),"left"===e&&(t.scrollLeft=o=n,t.dispatchEvent(i("ps-scroll-x")))}},{"./instances":18}],21:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/dom"),l=t("./instances"),i=t("./update-geometry"),s=t("./update-scroll");e.exports=function(t){var e=l.get(t);e&&(e.negativeScrollAdjustment=e.isNegativeScroll?t.scrollWidth-t.clientWidth:0,o.css(e.scrollbarXRail,"display","block"),o.css(e.scrollbarYRail,"display","block"),e.railXMarginWidth=r.toInt(o.css(e.scrollbarXRail,"marginLeft"))+r.toInt(o.css(e.scrollbarXRail,"marginRight")),e.railYMarginHeight=r.toInt(o.css(e.scrollbarYRail,"marginTop"))+r.toInt(o.css(e.scrollbarYRail,"marginBottom")),o.css(e.scrollbarXRail,"display","none"),o.css(e.scrollbarYRail,"display","none"),i(t),s(t,"top",t.scrollTop),s(t,"left",t.scrollLeft),o.css(e.scrollbarXRail,"display",""),o.css(e.scrollbarYRail,"display",""))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-geometry":19,"./update-scroll":20}]},{},[1]);
//! moment.js
//! version : 2.14.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return md.apply(null,arguments)}
// This is done to register the method called with moment()
// without creating circular dependencies.
function b(a){md=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return"[object Object]"===Object.prototype.toString.call(a)}function e(a){var b;for(b in a)
// even if its not own property I'd still call it non-empty
return!1;return!0}function f(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function g(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function h(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function i(a,b){for(var c in b)h(b,c)&&(a[c]=b[c]);return h(b,"toString")&&(a.toString=b.toString),h(b,"valueOf")&&(a.valueOf=b.valueOf),a}function j(a,b,c,d){return qb(a,b,c,d,!0).utc()}function k(){
// We need to deep clone this object.
return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function l(a){return null==a._pf&&(a._pf=k()),a._pf}function m(a){if(null==a._isValid){var b=l(a),c=nd.call(b.parsedDateParts,function(a){return null!=a});a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function n(a){var b=j(NaN);return null!=a?i(l(b),a):l(b).userInvalidated=!0,b}function o(a){return void 0===a}function p(a,b){var c,d,e;if(o(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),o(b._i)||(a._i=b._i),o(b._f)||(a._f=b._f),o(b._l)||(a._l=b._l),o(b._strict)||(a._strict=b._strict),o(b._tzm)||(a._tzm=b._tzm),o(b._isUTC)||(a._isUTC=b._isUTC),o(b._offset)||(a._offset=b._offset),o(b._pf)||(a._pf=l(b)),o(b._locale)||(a._locale=b._locale),od.length>0)for(c in od)d=od[c],e=b[d],o(e)||(a[d]=e);return a}
// Moment prototype object
function q(b){p(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),pd===!1&&(pd=!0,a.updateOffset(this),pd=!1)}function r(a){return a instanceof q||null!=a&&null!=a._isAMomentObject}function s(a){return 0>a?Math.ceil(a)||0:Math.floor(a)}function t(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=s(b)),c}
// compare two arrays, return the number of differences
function u(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&t(a[d])!==t(b[d]))&&g++;return g+f}function v(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function w(b,c){var d=!0;return i(function(){return null!=a.deprecationHandler&&a.deprecationHandler(null,b),d&&(v(b+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),d=!1),c.apply(this,arguments)},c)}function x(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),qd[b]||(v(c),qd[b]=!0)}function y(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function z(a){var b,c;for(c in a)b=a[c],y(b)?this[c]=b:this["_"+c]=b;this._config=a,
// Lenient ordinal parsing accepts just a number in addition to
// number + (possibly) stuff coming from _ordinalParseLenient.
this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function A(a,b){var c,e=i({},a);for(c in b)h(b,c)&&(d(a[c])&&d(b[c])?(e[c]={},i(e[c],a[c]),i(e[c],b[c])):null!=b[c]?e[c]=b[c]:delete e[c]);for(c in a)h(a,c)&&!h(b,c)&&d(a[c])&&(
// make sure changes to properties don't modify parent config
e[c]=i({},e[c]));return e}function B(a){null!=a&&this.set(a)}function C(a,b,c){var d=this._calendar[a]||this._calendar.sameElse;return y(d)?d.call(b,c):d}function D(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function E(){return this._invalidDate}function F(a){return this._ordinal.replace("%d",a)}function G(a,b,c,d){var e=this._relativeTime[c];return y(e)?e(a,b,c,d):e.replace(/%d/i,a)}function H(a,b){var c=this._relativeTime[a>0?"future":"past"];return y(c)?c(b):c.replace(/%s/i,b)}function I(a,b){var c=a.toLowerCase();zd[c]=zd[c+"s"]=zd[b]=a}function J(a){return"string"==typeof a?zd[a]||zd[a.toLowerCase()]:void 0}function K(a){var b,c,d={};for(c in a)h(a,c)&&(b=J(c),b&&(d[b]=a[c]));return d}function L(a,b){Ad[a]=b}function M(a){var b=[];for(var c in a)b.push({unit:c,priority:Ad[c]});return b.sort(function(a,b){return a.priority-b.priority}),b}function N(b,c){return function(d){return null!=d?(P(this,b,d),a.updateOffset(this,c),this):O(this,b)}}function O(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function P(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}
// MOMENTS
function Q(a){return a=J(a),y(this[a])?this[a]():this}function R(a,b){if("object"==typeof a){a=K(a);for(var c=M(a),d=0;d<c.length;d++)this[c[d].unit](a[c[d].unit])}else if(a=J(a),y(this[a]))return this[a](b);return this}function S(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}
// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function T(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Ed[a]=e),b&&(Ed[b[0]]=function(){return S(e.apply(this,arguments),b[1],b[2])}),c&&(Ed[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function U(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function V(a){var b,c,d=a.match(Bd);for(b=0,c=d.length;c>b;b++)Ed[d[b]]?d[b]=Ed[d[b]]:d[b]=U(d[b]);return function(b){var e,f="";for(e=0;c>e;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}
// format date using native date object
function W(a,b){return a.isValid()?(b=X(b,a.localeData()),Dd[b]=Dd[b]||V(b),Dd[b](a)):a.localeData().invalidDate()}function X(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Cd.lastIndex=0;d>=0&&Cd.test(a);)a=a.replace(Cd,c),Cd.lastIndex=0,d-=1;return a}function Y(a,b,c){Wd[a]=y(b)?b:function(a,d){return a&&c?c:b}}function Z(a,b){return h(Wd,a)?Wd[a](b._strict,b._locale):new RegExp($(a))}
// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function $(a){return _(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function _(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function aa(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=t(a)}),c=0;c<a.length;c++)Xd[a[c]]=d}function ba(a,b){aa(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function ca(a,b,c){null!=b&&h(Xd,a)&&Xd[a](b,c._a,c,a)}function da(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ea(a,b){return c(this._months)?this._months[a.month()]:this._months[(this._months.isFormat||fe).test(b)?"format":"standalone"][a.month()]}function fa(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[fe.test(b)?"format":"standalone"][a.month()]}function ga(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(
// this is not used
this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;12>d;++d)f=j([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=sd.call(this._shortMonthsParse,g),-1!==e?e:null):(e=sd.call(this._longMonthsParse,g),-1!==e?e:null):"MMM"===b?(e=sd.call(this._shortMonthsParse,g),-1!==e?e:(e=sd.call(this._longMonthsParse,g),-1!==e?e:null)):(e=sd.call(this._longMonthsParse,g),-1!==e?e:(e=sd.call(this._shortMonthsParse,g),-1!==e?e:null))}function ha(a,b,c){var d,e,f;if(this._monthsParseExact)return ga.call(this,a,b,c);
// TODO: add sorting
// Sorting makes sure if one month (or abbr) is a prefix of another
// see sorting in computeMonthsParse
for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){
// test the regex
if(e=j([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}
// MOMENTS
function ia(a,b){var c;if(!a.isValid())
// No op
return a;if("string"==typeof b)if(/^\d+$/.test(b))b=t(b);else
// TODO: Another silent failure?
if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),da(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ja(b){return null!=b?(ia(this,b),a.updateOffset(this,!0),this):O(this,"Month")}function ka(){return da(this.year(),this.month())}function la(a){return this._monthsParseExact?(h(this,"_monthsRegex")||na.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):(h(this,"_monthsShortRegex")||(this._monthsShortRegex=ie),this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex)}function ma(a){return this._monthsParseExact?(h(this,"_monthsRegex")||na.call(this),a?this._monthsStrictRegex:this._monthsRegex):(h(this,"_monthsRegex")||(this._monthsRegex=je),this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex)}function na(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=j([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(
// Sorting makes sure if one month (or abbr) is a prefix of another it
// will match the longer piece.
d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=_(d[b]),e[b]=_(e[b]);for(b=0;24>b;b++)f[b]=_(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}
// HELPERS
function oa(a){return pa(a)?366:365}function pa(a){return a%4===0&&a%100!==0||a%400===0}function qa(){return pa(this.year())}function ra(a,b,c,d,e,f,g){
//can't just apply() to create a date:
//http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
var h=new Date(a,b,c,d,e,f,g);
//the date constructor remaps years 0-99 to 1900-1999
return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function sa(a){var b=new Date(Date.UTC.apply(null,arguments));
//the Date.UTC function remaps years 0-99 to 1900-1999
return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}
// start-of-first-week - start-of-year
function ta(a,b,c){var// first-week day -- which january is always in the first week (4 for iso, 1 for other)
d=7+b-c,
// first-week day local weekday -- which local weekday is fwd
e=(7+sa(a,0,d).getUTCDay()-b)%7;return-e+d-1}
//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function ua(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ta(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=oa(f)+j):j>oa(a)?(f=a+1,g=j-oa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function va(a,b,c){var d,e,f=ta(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+wa(e,b,c)):g>wa(a.year(),b,c)?(d=g-wa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function wa(a,b,c){var d=ta(a,b,c),e=ta(a+1,b,c);return(oa(a)-d+e)/7}
// HELPERS
// LOCALES
function xa(a){return va(a,this._week.dow,this._week.doy).week}function ya(){return this._week.dow}function za(){return this._week.doy}
// MOMENTS
function Aa(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ba(a){var b=va(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}
// HELPERS
function Ca(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Da(a,b){return"string"==typeof a?b.weekdaysParse(a)%7||7:isNaN(a)?null:a}function Ea(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function Fa(a){return this._weekdaysShort[a.day()]}function Ga(a){return this._weekdaysMin[a.day()]}function Ha(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;7>d;++d)f=j([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=sd.call(this._weekdaysParse,g),-1!==e?e:null):"ddd"===b?(e=sd.call(this._shortWeekdaysParse,g),-1!==e?e:null):(e=sd.call(this._minWeekdaysParse,g),-1!==e?e:null):"dddd"===b?(e=sd.call(this._weekdaysParse,g),-1!==e?e:(e=sd.call(this._shortWeekdaysParse,g),-1!==e?e:(e=sd.call(this._minWeekdaysParse,g),-1!==e?e:null))):"ddd"===b?(e=sd.call(this._shortWeekdaysParse,g),-1!==e?e:(e=sd.call(this._weekdaysParse,g),-1!==e?e:(e=sd.call(this._minWeekdaysParse,g),-1!==e?e:null))):(e=sd.call(this._minWeekdaysParse,g),-1!==e?e:(e=sd.call(this._weekdaysParse,g),-1!==e?e:(e=sd.call(this._shortWeekdaysParse,g),-1!==e?e:null)))}function Ia(a,b,c){var d,e,f;if(this._weekdaysParseExact)return Ha.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){
// test the regex
if(e=j([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}
// MOMENTS
function Ja(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Ca(a,this.localeData()),this.add(a-b,"d")):b}function Ka(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function La(a){if(!this.isValid())return null!=a?this:NaN;
// behaves the same as moment#day except
// as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
// as a setter, sunday should belong to the previous week.
if(null!=a){var b=Da(a,this.localeData());return this.day(this.day()%7?b:b-7)}return this.day()||7}function Ma(a){return this._weekdaysParseExact?(h(this,"_weekdaysRegex")||Pa.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):(h(this,"_weekdaysRegex")||(this._weekdaysRegex=pe),this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex)}function Na(a){return this._weekdaysParseExact?(h(this,"_weekdaysRegex")||Pa.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(h(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=qe),this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Oa(a){return this._weekdaysParseExact?(h(this,"_weekdaysRegex")||Pa.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(h(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=re),this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Pa(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],h=[],i=[],k=[];for(b=0;7>b;b++)c=j([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),h.push(e),i.push(f),k.push(d),k.push(e),k.push(f);for(
// Sorting makes sure if one weekday (or abbr) is a prefix of another it
// will match the longer piece.
g.sort(a),h.sort(a),i.sort(a),k.sort(a),b=0;7>b;b++)h[b]=_(h[b]),i[b]=_(i[b]),k[b]=_(k[b]);this._weekdaysRegex=new RegExp("^("+k.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}
// FORMATTING
function Qa(){return this.hours()%12||12}function Ra(){return this.hours()||24}function Sa(a,b){T(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}
// PARSING
function Ta(a,b){return b._meridiemParse}
// LOCALES
function Ua(a){
// IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
// Using charAt should be more compatible.
return"p"===(a+"").toLowerCase().charAt(0)}function Va(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Wa(a){return a?a.toLowerCase().replace("_","-"):a}
// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function Xa(a){for(var b,c,d,e,f=0;f<a.length;){for(e=Wa(a[f]).split("-"),b=e.length,c=Wa(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=Ya(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&u(e,c,!0)>=b-1)
//the next array item is better than a shallower substring of this one
break;b--}f++}return null}function Ya(a){var b=null;
// TODO: Find a better way to register and load all the locales in Node
if(!we[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=se._abbr,require("./locale/"+a),
// because defineLocale currently also sets the global locale, we
// want to undo that for lazy loaded locales
Za(b)}catch(c){}return we[a]}
// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function Za(a,b){var c;
// moment.duration._locale = moment._locale = data;
return a&&(c=o(b)?ab(a):$a(a,b),c&&(se=c)),se._abbr}function $a(a,b){if(null!==b){var c=ve;
// treat as if there is no base config
// backwards compat for now: also set the locale
return b.abbr=a,null!=we[a]?(x("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),c=we[a]._config):null!=b.parentLocale&&(null!=we[b.parentLocale]?c=we[b.parentLocale]._config:x("parentLocaleUndefined","specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/")),we[a]=new B(A(c,b)),Za(a),we[a]}
// useful for testing
return delete we[a],null}function _a(a,b){if(null!=b){var c,d=ve;
// MERGE
null!=we[a]&&(d=we[a]._config),b=A(d,b),c=new B(b),c.parentLocale=we[a],we[a]=c,
// backwards compat for now: also set the locale
Za(a)}else
// pass null for config to unupdate, useful for tests
null!=we[a]&&(null!=we[a].parentLocale?we[a]=we[a].parentLocale:null!=we[a]&&delete we[a]);return we[a]}
// returns locale data
function ab(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return se;if(!c(a)){if(b=Ya(a))return b;a=[a]}return Xa(a)}function bb(){return rd(we)}function cb(a){var b,c=a._a;return c&&-2===l(a).overflow&&(b=c[Zd]<0||c[Zd]>11?Zd:c[$d]<1||c[$d]>da(c[Yd],c[Zd])?$d:c[_d]<0||c[_d]>24||24===c[_d]&&(0!==c[ae]||0!==c[be]||0!==c[ce])?_d:c[ae]<0||c[ae]>59?ae:c[be]<0||c[be]>59?be:c[ce]<0||c[ce]>999?ce:-1,l(a)._overflowDayOfYear&&(Yd>b||b>$d)&&(b=$d),l(a)._overflowWeeks&&-1===b&&(b=de),l(a)._overflowWeekday&&-1===b&&(b=ee),l(a).overflow=b),a}
// date from iso format
function db(a){var b,c,d,e,f,g,h=a._i,i=xe.exec(h)||ye.exec(h);if(i){for(l(a).iso=!0,b=0,c=Ae.length;c>b;b++)if(Ae[b][1].exec(i[1])){e=Ae[b][0],d=Ae[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Be.length;c>b;b++)if(Be[b][1].exec(i[3])){
// match[2] should be 'T' or space
f=(i[2]||" ")+Be[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!ze.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),jb(a)}else a._isValid=!1}
// date from iso format or fallback
function eb(b){var c=Ce.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(db(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}
// Pick the first defined of two or three arguments.
function fb(a,b,c){return null!=a?a:null!=b?b:c}function gb(b){
// hooks is actually the exported moment object
var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}
// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function hb(a){var b,c,d,e,f=[];if(!a._d){
// Default to current date.
// * if no year, month, day of month are given, default to today
// * if day of month is given, default month and year
// * if month is given, default only year
// * if year is given, don't default anything
for(d=gb(a),a._w&&null==a._a[$d]&&null==a._a[Zd]&&ib(a),a._dayOfYear&&(e=fb(a._a[Yd],d[Yd]),a._dayOfYear>oa(e)&&(l(a)._overflowDayOfYear=!0),c=sa(e,0,a._dayOfYear),a._a[Zd]=c.getUTCMonth(),a._a[$d]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];
// Zero out whatever was not defaulted, including time
for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];
// Check for 24:00:00.000
24===a._a[_d]&&0===a._a[ae]&&0===a._a[be]&&0===a._a[ce]&&(a._nextDay=!0,a._a[_d]=0),a._d=(a._useUTC?sa:ra).apply(null,f),
// Apply timezone offset from input. The actual utcOffset can be changed
// with parseZone.
null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[_d]=24)}}function ib(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=fb(b.GG,a._a[Yd],va(rb(),1,4).year),d=fb(b.W,1),e=fb(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=fb(b.gg,a._a[Yd],va(rb(),f,g).year),d=fb(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>wa(c,f,g)?l(a)._overflowWeeks=!0:null!=i?l(a)._overflowWeekday=!0:(h=ua(c,d,e,f,g),a._a[Yd]=h.year,a._dayOfYear=h.dayOfYear)}
// date from string and format string
function jb(b){
// TODO: Move this to another part of the creation flow to prevent circular deps
if(b._f===a.ISO_8601)return void db(b);b._a=[],l(b).empty=!0;
// This array is used to make a Date, either with `new Date` or `Date.UTC`
var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=X(b._f,b._locale).match(Bd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(Z(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&l(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),Ed[f]?(d?l(b).empty=!1:l(b).unusedTokens.push(f),ca(f,d,b)):b._strict&&!d&&l(b).unusedTokens.push(f);
// add remaining unparsed input length to the string
l(b).charsLeftOver=i-j,h.length>0&&l(b).unusedInput.push(h),
// clear _12h flag if hour is <= 12
b._a[_d]<=12&&l(b).bigHour===!0&&b._a[_d]>0&&(l(b).bigHour=void 0),l(b).parsedDateParts=b._a.slice(0),l(b).meridiem=b._meridiem,
// handle meridiem
b._a[_d]=kb(b._locale,b._a[_d],b._meridiem),hb(b),cb(b)}function kb(a,b,c){var d;
// Fallback
return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}
// date from string and array of format strings
function lb(a){var b,c,d,e,f;if(0===a._f.length)return l(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=p({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],jb(b),m(b)&&(f+=l(b).charsLeftOver,f+=10*l(b).unusedTokens.length,l(b).score=f,(null==d||d>f)&&(d=f,c=b));i(a,c||b)}function mb(a){if(!a._d){var b=K(a._i);a._a=g([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),hb(a)}}function nb(a){var b=new q(cb(ob(a)));
// Adding is smart enough around DST
return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function ob(a){var b=a._i,d=a._f;return a._locale=a._locale||ab(a._l),null===b||void 0===d&&""===b?n({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),r(b)?new q(cb(b)):(c(d)?lb(a):f(b)?a._d=b:d?jb(a):pb(a),m(a)||(a._d=null),a))}function pb(b){var d=b._i;void 0===d?b._d=new Date(a.now()):f(d)?b._d=new Date(d.valueOf()):"string"==typeof d?eb(b):c(d)?(b._a=g(d.slice(0),function(a){return parseInt(a,10)}),hb(b)):"object"==typeof d?mb(b):"number"==typeof d?
// from milliseconds
b._d=new Date(d):a.createFromInputFallback(b)}function qb(a,b,f,g,h){var i={};
// object construction must be done this way.
// https://github.com/moment/moment/issues/1423
return"boolean"==typeof f&&(g=f,f=void 0),(d(a)&&e(a)||c(a)&&0===a.length)&&(a=void 0),i._isAMomentObject=!0,i._useUTC=i._isUTC=h,i._l=f,i._i=a,i._f=b,i._strict=g,nb(i)}function rb(a,b,c,d){return qb(a,b,c,d,!1)}
// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function sb(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return rb();for(d=b[0],e=1;e<b.length;++e)b[e].isValid()&&!b[e][a](d)||(d=b[e]);return d}
// TODO: Use [].sort instead?
function tb(){var a=[].slice.call(arguments,0);return sb("isBefore",a)}function ub(){var a=[].slice.call(arguments,0);return sb("isAfter",a)}function vb(a){var b=K(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;
// representation for dateAddRemove
this._milliseconds=+k+1e3*j+// 1000
6e4*i+// 1000 * 60
1e3*h*60*60,//using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
// Because of dateAddRemove treats 24 hours as different from a
// day when working around DST, we need to store them separately
this._days=+g+7*f,
// It is impossible translate months into days without knowing
// which months you are are talking about, so we have to store
// it separately.
this._months=+e+3*d+12*c,this._data={},this._locale=ab(),this._bubble()}function wb(a){return a instanceof vb}
// FORMATTING
function xb(a,b){T(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+S(~~(a/60),2)+b+S(~~a%60,2)})}function yb(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(Ge)||["-",0,0],f=+(60*e[1])+t(e[2]);return"+"===e[0]?f:-f}
// Return a moment from input, that is local/utc/zone equivalent to model.
function zb(b,c){var d,e;
// Use low-level api, because this fn is low-level api.
return c._isUTC?(d=c.clone(),e=(r(b)||f(b)?b.valueOf():rb(b).valueOf())-d.valueOf(),d._d.setTime(d._d.valueOf()+e),a.updateOffset(d,!1),d):rb(b).local()}function Ab(a){
// On Firefox.24 Date#getTimezoneOffset returns a floating point.
// https://github.com/moment/moment/pull/1871
return 15*-Math.round(a._d.getTimezoneOffset()/15)}
// MOMENTS
// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function Bb(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=yb(Td,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ab(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?Sb(this,Mb(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ab(this):null!=b?this:NaN}function Cb(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Db(a){return this.utcOffset(0,a)}function Eb(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ab(this),"m")),this}function Fb(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(yb(Sd,this._i)),this}function Gb(a){return this.isValid()?(a=a?rb(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function Hb(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ib(){if(!o(this._isDSTShifted))return this._isDSTShifted;var a={};if(p(a,this),a=ob(a),a._a){var b=a._isUTC?j(a._a):rb(a._a);this._isDSTShifted=this.isValid()&&u(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Jb(){return this.isValid()?!this._isUTC:!1}function Kb(){return this.isValid()?this._isUTC:!1}function Lb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function Mb(a,b){var c,d,e,f=a,
// matching against regexp is expensive, do it on demand
g=null;// checks for null or undefined
return wb(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(f={},b?f[b]=a:f.milliseconds=a):(g=He.exec(a))?(c="-"===g[1]?-1:1,f={y:0,d:t(g[$d])*c,h:t(g[_d])*c,m:t(g[ae])*c,s:t(g[be])*c,ms:t(g[ce])*c}):(g=Ie.exec(a))?(c="-"===g[1]?-1:1,f={y:Nb(g[2],c),M:Nb(g[3],c),w:Nb(g[4],c),d:Nb(g[5],c),h:Nb(g[6],c),m:Nb(g[7],c),s:Nb(g[8],c)}):null==f?f={}:"object"==typeof f&&("from"in f||"to"in f)&&(e=Pb(rb(f.from),rb(f.to)),f={},f.ms=e.milliseconds,f.M=e.months),d=new vb(f),wb(a)&&h(a,"_locale")&&(d._locale=a._locale),d}function Nb(a,b){
// We'd normally use ~~inp for this, but unfortunately it also
// converts floats to ints.
// inp may be undefined, so careful calling replace on it.
var c=a&&parseFloat(a.replace(",","."));
// apply sign while we're at it
return(isNaN(c)?0:c)*b}function Ob(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Pb(a,b){var c;return a.isValid()&&b.isValid()?(b=zb(b,a),a.isBefore(b)?c=Ob(a,b):(c=Ob(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function Qb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}
// TODO: remove 'name' arg after deprecation is removed
function Rb(a,b){return function(c,d){var e,f;
//invert the arguments, but complain about it
return null===d||isNaN(+d)||(x(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Mb(c,d),Sb(this,e,a),this}}function Sb(b,c,d,e){var f=c._milliseconds,g=Qb(c._days),h=Qb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&P(b,"Date",O(b,"Date")+g*d),h&&ia(b,O(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function Tb(a,b){var c=a.diff(b,"days",!0);return-6>c?"sameElse":-1>c?"lastWeek":0>c?"lastDay":1>c?"sameDay":2>c?"nextDay":7>c?"nextWeek":"sameElse"}function Ub(b,c){
// We want to compare the start of today, vs this.
// Getting start-of-today depends on whether we're local/utc/offset or not.
var d=b||rb(),e=zb(d,this).startOf("day"),f=a.calendarFormat(this,e)||"sameElse",g=c&&(y(c[f])?c[f].call(this,d):c[f]);return this.format(g||this.localeData().calendar(f,this,rb(d)))}function Vb(){return new q(this)}function Wb(a,b){var c=r(a)?a:rb(a);return this.isValid()&&c.isValid()?(b=J(o(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf()):!1}function Xb(a,b){var c=r(a)?a:rb(a);return this.isValid()&&c.isValid()?(b=J(o(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf()):!1}function Yb(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function Zb(a,b){var c,d=r(a)?a:rb(a);return this.isValid()&&d.isValid()?(b=J(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf())):!1}function $b(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function _b(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function ac(a,b,c){var d,e,f,g;// 1000
// 1000 * 60
// 1000 * 60 * 60
// 1000 * 60 * 60 * 24, negate dst
// 1000 * 60 * 60 * 24 * 7, negate dst
return this.isValid()?(d=zb(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=J(b),"year"===b||"month"===b||"quarter"===b?(g=bc(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:s(g)):NaN):NaN}function bc(a,b){
// difference in months
var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),
// b is in (anchor - 1 month, anchor + 1 month)
f=a.clone().add(e,"months");
//check for negative zero, return zero if negative zero
// linear across the month
// linear across the month
return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function cc(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function dc(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?y(Date.prototype.toISOString)?this.toDate().toISOString():W(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):W(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function ec(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=W(this,b);return this.localeData().postformat(c)}function fc(a,b){return this.isValid()&&(r(a)&&a.isValid()||rb(a).isValid())?Mb({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function gc(a){return this.from(rb(),a)}function hc(a,b){return this.isValid()&&(r(a)&&a.isValid()||rb(a).isValid())?Mb({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ic(a){return this.to(rb(),a)}
// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function jc(a){var b;return void 0===a?this._locale._abbr:(b=ab(a),null!=b&&(this._locale=b),this)}function kc(){return this._locale}function lc(a){
// the following switch intentionally omits break keywords
// to utilize falling through the cases.
switch(a=J(a)){case"year":this.month(0);/* falls through */
case"quarter":case"month":this.date(1);/* falls through */
case"week":case"isoWeek":case"day":case"date":this.hours(0);/* falls through */
case"hour":this.minutes(0);/* falls through */
case"minute":this.seconds(0);/* falls through */
case"second":this.milliseconds(0)}
// weeks are a special case
// quarters are also special
return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function mc(a){
// 'date' is an alias for 'day', so it should be considered as such.
return a=J(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function nc(){return this._d.valueOf()-6e4*(this._offset||0)}function oc(){return Math.floor(this.valueOf()/1e3)}function pc(){return new Date(this.valueOf())}function qc(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function rc(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function sc(){
// new Date(NaN).toJSON() === null
return this.isValid()?this.toISOString():null}function tc(){return m(this)}function uc(){return i({},l(this))}function vc(){return l(this).overflow}function wc(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function xc(a,b){T(0,[a,a.length],0,b)}
// MOMENTS
function yc(a){return Cc.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function zc(a){return Cc.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Ac(){return wa(this.year(),1,4)}function Bc(){var a=this.localeData()._week;return wa(this.year(),a.dow,a.doy)}function Cc(a,b,c,d,e){var f;return null==a?va(this,d,e).year:(f=wa(a,d,e),b>f&&(b=f),Dc.call(this,a,b,c,d,e))}function Dc(a,b,c,d,e){var f=ua(a,b,c,d,e),g=sa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}
// MOMENTS
function Ec(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}
// HELPERS
// MOMENTS
function Fc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function Gc(a,b){b[ce]=t(1e3*("0."+a))}
// MOMENTS
function Hc(){return this._isUTC?"UTC":""}function Ic(){return this._isUTC?"Coordinated Universal Time":""}function Jc(a){return rb(1e3*a)}function Kc(){return rb.apply(null,arguments).parseZone()}function Lc(a){return a}function Mc(a,b,c,d){var e=ab(),f=j().set(d,b);return e[c](f,a)}function Nc(a,b,c){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return Mc(a,b,c,"month");var d,e=[];for(d=0;12>d;d++)e[d]=Mc(a,d,c,"month");return e}
// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function Oc(a,b,c,d){"boolean"==typeof a?("number"==typeof b&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,"number"==typeof b&&(c=b,b=void 0),b=b||"");var e=ab(),f=a?e._week.dow:0;if(null!=c)return Mc(b,(c+f)%7,d,"day");var g,h=[];for(g=0;7>g;g++)h[g]=Mc(b,(g+f)%7,d,"day");return h}function Pc(a,b){return Nc(a,b,"months")}function Qc(a,b){return Nc(a,b,"monthsShort")}function Rc(a,b,c){return Oc(a,b,c,"weekdays")}function Sc(a,b,c){return Oc(a,b,c,"weekdaysShort")}function Tc(a,b,c){return Oc(a,b,c,"weekdaysMin")}function Uc(){var a=this._data;return this._milliseconds=Ue(this._milliseconds),this._days=Ue(this._days),this._months=Ue(this._months),a.milliseconds=Ue(a.milliseconds),a.seconds=Ue(a.seconds),a.minutes=Ue(a.minutes),a.hours=Ue(a.hours),a.months=Ue(a.months),a.years=Ue(a.years),this}function Vc(a,b,c,d){var e=Mb(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}
// supports only 2.0-style add(1, 's') or add(duration)
function Wc(a,b){return Vc(this,a,b,1)}
// supports only 2.0-style subtract(1, 's') or subtract(duration)
function Xc(a,b){return Vc(this,a,b,-1)}function Yc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Zc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;
// if we have a mix of positive and negative values, bubble down first
// check: https://github.com/moment/moment/issues/2166
// The following code bubbles up values, see the tests for
// examples of what that means.
// convert days to months
// 12 months -> 1 year
return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Yc(_c(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=s(f/1e3),i.seconds=a%60,b=s(a/60),i.minutes=b%60,c=s(b/60),i.hours=c%24,g+=s(c/24),e=s($c(g)),h+=e,g-=Yc(_c(e)),d=s(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function $c(a){
// 400 years have 146097 days (taking into account leap year rules)
// 400 years have 12 months === 4800
return 4800*a/146097}function _c(a){
// the reverse of daysToMonths
return 146097*a/4800}function ad(a){var b,c,d=this._milliseconds;if(a=J(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+$c(b),"month"===a?c:c/12;switch(b=this._days+Math.round(_c(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;
// Math.floor prevents floating point math errors here
case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}
// TODO: Use this.as('ms')?
function bd(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*t(this._months/12)}function cd(a){return function(){return this.as(a)}}function dd(a){return a=J(a),this[a+"s"]()}function ed(a){return function(){return this._data[a]}}function fd(){return s(this.days()/7)}
// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function gd(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function hd(a,b,c){var d=Mb(a).abs(),e=jf(d.as("s")),f=jf(d.as("m")),g=jf(d.as("h")),h=jf(d.as("d")),i=jf(d.as("M")),j=jf(d.as("y")),k=e<kf.s&&["s",e]||1>=f&&["m"]||f<kf.m&&["mm",f]||1>=g&&["h"]||g<kf.h&&["hh",g]||1>=h&&["d"]||h<kf.d&&["dd",h]||1>=i&&["M"]||i<kf.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,gd.apply(null,k)}
// This function allows you to set the rounding function for relative time strings
function id(a){return void 0===a?jf:"function"==typeof a?(jf=a,!0):!1}
// This function allows you to set a threshold for relative time strings
function jd(a,b){return void 0===kf[a]?!1:void 0===b?kf[a]:(kf[a]=b,!0)}function kd(a){var b=this.localeData(),c=hd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function ld(){
// for ISO strings we do not use the normal bubbling rules:
//  * milliseconds bubble up until they become hours
//  * days do not bubble at all
//  * months bubble up until they become years
// This is because there is no context-free conversion between hours and days
// (think of clock changes)
// and also not between days and months (28-31 days per month)
var a,b,c,d=lf(this._milliseconds)/1e3,e=lf(this._days),f=lf(this._months);a=s(d/60),b=s(a/60),d%=60,a%=60,c=s(f/12),f%=12;
// inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var md,nd;nd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;c>d;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};
// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var od=a.momentProperties=[],pd=!1,qd={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var rd;rd=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)h(a,b)&&c.push(b);return c};var sd,td={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},ud={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},vd="Invalid date",wd="%d",xd=/\d{1,2}/,yd={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},zd={},Ad={},Bd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Cd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Dd={},Ed={},Fd=/\d/,Gd=/\d\d/,Hd=/\d{3}/,Id=/\d{4}/,Jd=/[+-]?\d{6}/,Kd=/\d\d?/,Ld=/\d\d\d\d?/,Md=/\d\d\d\d\d\d?/,Nd=/\d{1,3}/,Od=/\d{1,4}/,Pd=/[+-]?\d{1,6}/,Qd=/\d+/,Rd=/[+-]?\d+/,Sd=/Z|[+-]\d\d:?\d\d/gi,Td=/Z|[+-]\d\d(?::?\d\d)?/gi,Ud=/[+-]?\d+(\.\d{1,3})?/,Vd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Wd={},Xd={},Yd=0,Zd=1,$d=2,_d=3,ae=4,be=5,ce=6,de=7,ee=8;sd=Array.prototype.indexOf?Array.prototype.indexOf:function(a){
// I know
var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1},T("M",["MM",2],"Mo",function(){return this.month()+1}),T("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),T("MMMM",0,0,function(a){return this.localeData().months(this,a)}),I("month","M"),L("month",8),Y("M",Kd),Y("MM",Kd,Gd),Y("MMM",function(a,b){return b.monthsShortRegex(a)}),Y("MMMM",function(a,b){return b.monthsRegex(a)}),aa(["M","MM"],function(a,b){b[Zd]=t(a)-1}),aa(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Zd]=e:l(c).invalidMonth=a});
// LOCALES
var fe=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,ge="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),he="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),ie=Vd,je=Vd;
// FORMATTING
T("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),T(0,["YY",2],0,function(){return this.year()%100}),T(0,["YYYY",4],0,"year"),T(0,["YYYYY",5],0,"year"),T(0,["YYYYYY",6,!0],0,"year"),
// ALIASES
I("year","y"),
// PRIORITIES
L("year",1),
// PARSING
Y("Y",Rd),Y("YY",Kd,Gd),Y("YYYY",Od,Id),Y("YYYYY",Pd,Jd),Y("YYYYYY",Pd,Jd),aa(["YYYYY","YYYYYY"],Yd),aa("YYYY",function(b,c){c[Yd]=2===b.length?a.parseTwoDigitYear(b):t(b)}),aa("YY",function(b,c){c[Yd]=a.parseTwoDigitYear(b)}),aa("Y",function(a,b){b[Yd]=parseInt(a,10)}),
// HOOKS
a.parseTwoDigitYear=function(a){return t(a)+(t(a)>68?1900:2e3)};
// MOMENTS
var ke=N("FullYear",!0);
// FORMATTING
T("w",["ww",2],"wo","week"),T("W",["WW",2],"Wo","isoWeek"),
// ALIASES
I("week","w"),I("isoWeek","W"),
// PRIORITIES
L("week",5),L("isoWeek",5),
// PARSING
Y("w",Kd),Y("ww",Kd,Gd),Y("W",Kd),Y("WW",Kd,Gd),ba(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=t(a)});var le={dow:0,// Sunday is the first day of the week.
doy:6};
// FORMATTING
T("d",0,"do","day"),T("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),T("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),T("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),T("e",0,0,"weekday"),T("E",0,0,"isoWeekday"),
// ALIASES
I("day","d"),I("weekday","e"),I("isoWeekday","E"),
// PRIORITY
L("day",11),L("weekday",11),L("isoWeekday",11),
// PARSING
Y("d",Kd),Y("e",Kd),Y("E",Kd),Y("dd",function(a,b){return b.weekdaysMinRegex(a)}),Y("ddd",function(a,b){return b.weekdaysShortRegex(a)}),Y("dddd",function(a,b){return b.weekdaysRegex(a)}),ba(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);
// if we didn't get a weekday name, mark the date as invalid
null!=e?b.d=e:l(c).invalidWeekday=a}),ba(["d","e","E"],function(a,b,c,d){b[d]=t(a)});
// LOCALES
var me="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),ne="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),oe="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),pe=Vd,qe=Vd,re=Vd;T("H",["HH",2],0,"hour"),T("h",["hh",2],0,Qa),T("k",["kk",2],0,Ra),T("hmm",0,0,function(){return""+Qa.apply(this)+S(this.minutes(),2)}),T("hmmss",0,0,function(){return""+Qa.apply(this)+S(this.minutes(),2)+S(this.seconds(),2)}),T("Hmm",0,0,function(){return""+this.hours()+S(this.minutes(),2)}),T("Hmmss",0,0,function(){return""+this.hours()+S(this.minutes(),2)+S(this.seconds(),2)}),Sa("a",!0),Sa("A",!1),
// ALIASES
I("hour","h"),
// PRIORITY
L("hour",13),Y("a",Ta),Y("A",Ta),Y("H",Kd),Y("h",Kd),Y("HH",Kd,Gd),Y("hh",Kd,Gd),Y("hmm",Ld),Y("hmmss",Md),Y("Hmm",Ld),Y("Hmmss",Md),aa(["H","HH"],_d),aa(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),aa(["h","hh"],function(a,b,c){b[_d]=t(a),l(c).bigHour=!0}),aa("hmm",function(a,b,c){var d=a.length-2;b[_d]=t(a.substr(0,d)),b[ae]=t(a.substr(d)),l(c).bigHour=!0}),aa("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[_d]=t(a.substr(0,d)),b[ae]=t(a.substr(d,2)),b[be]=t(a.substr(e)),l(c).bigHour=!0}),aa("Hmm",function(a,b,c){var d=a.length-2;b[_d]=t(a.substr(0,d)),b[ae]=t(a.substr(d))}),aa("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[_d]=t(a.substr(0,d)),b[ae]=t(a.substr(d,2)),b[be]=t(a.substr(e))});var se,te=/[ap]\.?m?\.?/i,ue=N("Hours",!0),ve={calendar:td,longDateFormat:ud,invalidDate:vd,ordinal:wd,ordinalParse:xd,relativeTime:yd,months:ge,monthsShort:he,week:le,weekdays:me,weekdaysMin:oe,weekdaysShort:ne,meridiemParse:te},we={},xe=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,ye=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,ze=/Z|[+-]\d\d(?::?\d\d)?/,Ae=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],
// YYYYMM is NOT allowed by the standard
["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Be=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ce=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=w("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),
// constant that refers to the ISO standard
a.ISO_8601=function(){};var De=w("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=rb.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:n()}),Ee=w("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=rb.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:n()}),Fe=function(){return Date.now?Date.now():+new Date};xb("Z",":"),xb("ZZ",""),
// PARSING
Y("Z",Td),Y("ZZ",Td),aa(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=yb(Td,a)});
// HELPERS
// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var Ge=/([\+\-]|\d\d)/gi;
// HOOKS
// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
a.updateOffset=function(){};
// ASP.NET json date format regex
var He=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,Ie=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Mb.fn=vb.prototype;var Je=Rb(1,"add"),Ke=Rb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Le=w("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});
// FORMATTING
T(0,["gg",2],0,function(){return this.weekYear()%100}),T(0,["GG",2],0,function(){return this.isoWeekYear()%100}),xc("gggg","weekYear"),xc("ggggg","weekYear"),xc("GGGG","isoWeekYear"),xc("GGGGG","isoWeekYear"),
// ALIASES
I("weekYear","gg"),I("isoWeekYear","GG"),
// PRIORITY
L("weekYear",1),L("isoWeekYear",1),
// PARSING
Y("G",Rd),Y("g",Rd),Y("GG",Kd,Gd),Y("gg",Kd,Gd),Y("GGGG",Od,Id),Y("gggg",Od,Id),Y("GGGGG",Pd,Jd),Y("ggggg",Pd,Jd),ba(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=t(a)}),ba(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),
// FORMATTING
T("Q",0,"Qo","quarter"),
// ALIASES
I("quarter","Q"),
// PRIORITY
L("quarter",7),
// PARSING
Y("Q",Fd),aa("Q",function(a,b){b[Zd]=3*(t(a)-1)}),
// FORMATTING
T("D",["DD",2],"Do","date"),
// ALIASES
I("date","D"),
// PRIOROITY
L("date",9),
// PARSING
Y("D",Kd),Y("DD",Kd,Gd),Y("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),aa(["D","DD"],$d),aa("Do",function(a,b){b[$d]=t(a.match(Kd)[0],10)});
// MOMENTS
var Me=N("Date",!0);
// FORMATTING
T("DDD",["DDDD",3],"DDDo","dayOfYear"),
// ALIASES
I("dayOfYear","DDD"),
// PRIORITY
L("dayOfYear",4),
// PARSING
Y("DDD",Nd),Y("DDDD",Hd),aa(["DDD","DDDD"],function(a,b,c){c._dayOfYear=t(a)}),
// FORMATTING
T("m",["mm",2],0,"minute"),
// ALIASES
I("minute","m"),
// PRIORITY
L("minute",14),
// PARSING
Y("m",Kd),Y("mm",Kd,Gd),aa(["m","mm"],ae);
// MOMENTS
var Ne=N("Minutes",!1);
// FORMATTING
T("s",["ss",2],0,"second"),
// ALIASES
I("second","s"),
// PRIORITY
L("second",15),
// PARSING
Y("s",Kd),Y("ss",Kd,Gd),aa(["s","ss"],be);
// MOMENTS
var Oe=N("Seconds",!1);
// FORMATTING
T("S",0,0,function(){return~~(this.millisecond()/100)}),T(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),T(0,["SSS",3],0,"millisecond"),T(0,["SSSS",4],0,function(){return 10*this.millisecond()}),T(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),T(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),T(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),T(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),T(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),
// ALIASES
I("millisecond","ms"),
// PRIORITY
L("millisecond",16),
// PARSING
Y("S",Nd,Fd),Y("SS",Nd,Gd),Y("SSS",Nd,Hd);var Pe;for(Pe="SSSS";Pe.length<=9;Pe+="S")Y(Pe,Qd);for(Pe="S";Pe.length<=9;Pe+="S")aa(Pe,Gc);
// MOMENTS
var Qe=N("Milliseconds",!1);
// FORMATTING
T("z",0,0,"zoneAbbr"),T("zz",0,0,"zoneName");var Re=q.prototype;Re.add=Je,Re.calendar=Ub,Re.clone=Vb,Re.diff=ac,Re.endOf=mc,Re.format=ec,Re.from=fc,Re.fromNow=gc,Re.to=hc,Re.toNow=ic,Re.get=Q,Re.invalidAt=vc,Re.isAfter=Wb,Re.isBefore=Xb,Re.isBetween=Yb,Re.isSame=Zb,Re.isSameOrAfter=$b,Re.isSameOrBefore=_b,Re.isValid=tc,Re.lang=Le,Re.locale=jc,Re.localeData=kc,Re.max=Ee,Re.min=De,Re.parsingFlags=uc,Re.set=R,Re.startOf=lc,Re.subtract=Ke,Re.toArray=qc,Re.toObject=rc,Re.toDate=pc,Re.toISOString=dc,Re.toJSON=sc,Re.toString=cc,Re.unix=oc,Re.valueOf=nc,Re.creationData=wc,
// Year
Re.year=ke,Re.isLeapYear=qa,
// Week Year
Re.weekYear=yc,Re.isoWeekYear=zc,
// Quarter
Re.quarter=Re.quarters=Ec,
// Month
Re.month=ja,Re.daysInMonth=ka,
// Week
Re.week=Re.weeks=Aa,Re.isoWeek=Re.isoWeeks=Ba,Re.weeksInYear=Bc,Re.isoWeeksInYear=Ac,
// Day
Re.date=Me,Re.day=Re.days=Ja,Re.weekday=Ka,Re.isoWeekday=La,Re.dayOfYear=Fc,
// Hour
Re.hour=Re.hours=ue,
// Minute
Re.minute=Re.minutes=Ne,
// Second
Re.second=Re.seconds=Oe,
// Millisecond
Re.millisecond=Re.milliseconds=Qe,
// Offset
Re.utcOffset=Bb,Re.utc=Db,Re.local=Eb,Re.parseZone=Fb,Re.hasAlignedHourOffset=Gb,Re.isDST=Hb,Re.isLocal=Jb,Re.isUtcOffset=Kb,Re.isUtc=Lb,Re.isUTC=Lb,
// Timezone
Re.zoneAbbr=Hc,Re.zoneName=Ic,
// Deprecations
Re.dates=w("dates accessor is deprecated. Use date instead.",Me),Re.months=w("months accessor is deprecated. Use month instead",ja),Re.years=w("years accessor is deprecated. Use year instead",ke),Re.zone=w("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Cb),Re.isDSTShifted=w("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Ib);var Se=Re,Te=B.prototype;Te.calendar=C,Te.longDateFormat=D,Te.invalidDate=E,Te.ordinal=F,Te.preparse=Lc,Te.postformat=Lc,Te.relativeTime=G,Te.pastFuture=H,Te.set=z,
// Month
Te.months=ea,Te.monthsShort=fa,Te.monthsParse=ha,Te.monthsRegex=ma,Te.monthsShortRegex=la,
// Week
Te.week=xa,Te.firstDayOfYear=za,Te.firstDayOfWeek=ya,
// Day of Week
Te.weekdays=Ea,Te.weekdaysMin=Ga,Te.weekdaysShort=Fa,Te.weekdaysParse=Ia,Te.weekdaysRegex=Ma,Te.weekdaysShortRegex=Na,Te.weekdaysMinRegex=Oa,
// Hours
Te.isPM=Ua,Te.meridiem=Va,Za("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===t(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),
// Side effect imports
a.lang=w("moment.lang is deprecated. Use moment.locale instead.",Za),a.langData=w("moment.langData is deprecated. Use moment.localeData instead.",ab);var Ue=Math.abs,Ve=cd("ms"),We=cd("s"),Xe=cd("m"),Ye=cd("h"),Ze=cd("d"),$e=cd("w"),_e=cd("M"),af=cd("y"),bf=ed("milliseconds"),cf=ed("seconds"),df=ed("minutes"),ef=ed("hours"),ff=ed("days"),gf=ed("months"),hf=ed("years"),jf=Math.round,kf={s:45,// seconds to minute
m:45,// minutes to hour
h:22,// hours to day
d:26,// days to month
M:11},lf=Math.abs,mf=vb.prototype;mf.abs=Uc,mf.add=Wc,mf.subtract=Xc,mf.as=ad,mf.asMilliseconds=Ve,mf.asSeconds=We,mf.asMinutes=Xe,mf.asHours=Ye,mf.asDays=Ze,mf.asWeeks=$e,mf.asMonths=_e,mf.asYears=af,mf.valueOf=bd,mf._bubble=Zc,mf.get=dd,mf.milliseconds=bf,mf.seconds=cf,mf.minutes=df,mf.hours=ef,mf.days=ff,mf.weeks=fd,mf.months=gf,mf.years=hf,mf.humanize=kd,mf.toISOString=ld,mf.toString=ld,mf.toJSON=ld,mf.locale=jc,mf.localeData=kc,
// Deprecations
mf.toIsoString=w("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",ld),mf.lang=Le,
// Side effect imports
// FORMATTING
T("X",0,0,"unix"),T("x",0,0,"valueOf"),
// PARSING
Y("x",Rd),Y("X",Ud),aa("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),aa("x",function(a,b,c){c._d=new Date(t(a))}),
// Side effect imports
a.version="2.14.1",b(rb),a.fn=Se,a.min=tb,a.max=ub,a.now=Fe,a.utc=j,a.unix=Jc,a.months=Pc,a.isDate=f,a.locale=Za,a.invalid=n,a.duration=Mb,a.isMoment=r,a.weekdays=Rc,a.parseZone=Kc,a.localeData=ab,a.isDuration=wb,a.monthsShort=Qc,a.weekdaysMin=Tc,a.defineLocale=$a,a.updateLocale=_a,a.locales=bb,a.weekdaysShort=Sc,a.normalizeUnits=J,a.relativeTimeRounding=id,a.relativeTimeThreshold=jd,a.calendarFormat=Tb,a.prototype=Se;var nf=a;return nf});

/*!
 * sweetalert2 v7.24.1
 * Released under the MIT License.
 */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Sweetalert2 = factory());
}(this, (function() {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };











  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();







  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };











  var possibleConstructorReturn = function(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };





  var slicedToArray = function() {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function(arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var consolePrefix = 'SweetAlert2:';

  /**
   * Filter the unique values into a new array
   * @param arr
   */
  var uniqueArray = function uniqueArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }
    return result;
  };

  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   * @param inputOptions
   */
  var formatInputOptions = function formatInputOptions(inputOptions) {
    var result = [];
    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
      inputOptions.forEach(function(value, key) {
        result.push([key, value]);
      });
    } else {
      Object.keys(inputOptions).forEach(function(key) {
        result.push([key, inputOptions[key]]);
      });
    }
    return result;
  };

  /**
   * Standardise console warnings
   * @param message
   */
  var warn = function warn(message) {
    console.warn(consolePrefix + ' ' + message);
  };

  /**
   * Standardise console errors
   * @param message
   */
  var error = function error(message) {
    console.error(consolePrefix + ' ' + message);
  };

  /**
   * Private global state for `warnOnce`
   * @type {Array}
   * @private
   */
  var previousWarnOnceMessages = [];

  /**
   * Show a console warning, but only if it hasn't already been shown
   * @param message
   */
  var warnOnce = function warnOnce(message) {
    if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };

  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   * @param arg
   */
  var callIfFunction = function callIfFunction(arg) {
    return typeof arg === 'function' ? arg() : arg;
  };

  var isThenable = function isThenable(arg) {
    return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.then === 'function';
  };

  var DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'overlay',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  var version = "7.24.1";

  var argsToParams = function argsToParams(args) {
    var params = {};
    switch (_typeof(args[0])) {
      case 'string':
        ['title', 'html', 'type'].forEach(function(name, index) {
          switch (_typeof(args[index])) {
            case 'string':
              params[name] = args[index];
              break;
            case 'undefined':
              break;
            default:
              error('Unexpected type of ' + name + '! Expected "string", got ' + _typeof(args[index]));
          }
        });
        break;

      case 'object':
        _extends(params, args[0]);
        break;

      default:
        error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
        return false;
    }
    return params;
  };

  /**
   * Adapt a legacy inputValidator for use with expectRejections=false
   */
  var adaptInputValidator = function adaptInputValidator(legacyValidator) {
    return function adaptedInputValidator(inputValue, extraParams) {
      return legacyValidator.call(this, inputValue, extraParams).then(function() {
        return undefined;
      }, function(validationError) {
        return validationError;
      });
    };
  };

  var swalPrefix = 'swal2-';

  var prefix = function prefix(items) {
    var result = {};
    for (var i in items) {
      result[items[i]] = swalPrefix + items[i];
    }
    return result;
  };

  var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'icon-text', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

  var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

  // Remember state in cases where opening and handling a modal will fiddle with it.
  var states = {
    previousBodyPadding: null
  };

  var hasClass = function hasClass(elem, className) {
    if (elem.classList) {
      return elem.classList.contains(className);
    }
    return false;
  };

  var focusInput = function focusInput(input) {
    input.focus();

    // place cursor at end of text in text input
    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915/1331425
      var val = input.value;
      input.value = '';
      input.value = val;
    }
  };

  var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
    if (!target || !classList) {
      return;
    }
    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }
    classList.forEach(function(className) {
      if (target.forEach) {
        target.forEach(function(elem) {
          add ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        add ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };

  var addClass = function addClass(target, classList) {
    addOrRemoveClass(target, classList, true);
  };

  var removeClass = function removeClass(target, classList) {
    addOrRemoveClass(target, classList, false);
  };

  var getChildByClass = function getChildByClass(elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i];
      }
    }
  };

  var show = function show(elem) {
    elem.style.opacity = '';
    elem.style.display = elem.id === swalClasses.content ? 'block' : 'flex';
  };

  var hide = function hide(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  };

  var empty = function empty(elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  };

  // borrowed from jquery $(elem).is(':visible') implementation
  var isVisible = function isVisible(elem) {
    return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  var removeStyleProperty = function removeStyleProperty(elem, property) {
    if (elem.style.removeProperty) {
      elem.style.removeProperty(property);
    } else {
      elem.style.removeAttribute(property);
    }
  };

  var getContainer = function getContainer() {
    return document.body.querySelector('.' + swalClasses.container);
  };

  var elementByClass = function elementByClass(className) {
    var container = getContainer();
    return container ? container.querySelector('.' + className) : null;
  };

  var getPopup = function getPopup() {
    return elementByClass(swalClasses.popup);
  };

  var getIcons = function getIcons() {
    var popup = getPopup();
    return popup.querySelectorAll('.' + swalClasses.icon);
  };

  var getTitle = function getTitle() {
    return elementByClass(swalClasses.title);
  };

  var getContent = function getContent() {
    return elementByClass(swalClasses.content);
  };

  var getImage = function getImage() {
    return elementByClass(swalClasses.image);
  };

  var getProgressSteps = function getProgressSteps() {
    return elementByClass(swalClasses.progresssteps);
  };

  var getValidationError = function getValidationError() {
    return elementByClass(swalClasses.validationerror);
  };

  var getConfirmButton = function getConfirmButton() {
    return elementByClass(swalClasses.confirm);
  };

  var getCancelButton = function getCancelButton() {
    return elementByClass(swalClasses.cancel);
  };

  var getButtonsWrapper = function getButtonsWrapper() {
    warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
    return elementByClass(swalClasses.actions);
  };

  var getActions = function getActions() {
    return elementByClass(swalClasses.actions);
  };

  var getFooter = function getFooter() {
    return elementByClass(swalClasses.footer);
  };

  var getCloseButton = function getCloseButton() {
    return elementByClass(swalClasses.close);
  };

  var getFocusableElements = function getFocusableElements() {
    var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
      // sort according to tabindex
      .sort(function(a, b) {
        a = parseInt(a.getAttribute('tabindex'));
        b = parseInt(b.getAttribute('tabindex'));
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }
        return 0;
      });

    // https://github.com/jkup/focusable/blob/master/index.js
    var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]'));

    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
  };

  var isModal = function isModal() {
    return !document.body.classList.contains(swalClasses['toast-shown']);
  };

  var isToast = function isToast() {
    return document.body.classList.contains(swalClasses['toast-shown']);
  };

  var isLoading = function isLoading() {
    return getPopup().hasAttribute('data-loading');
  };

  // Detect Node env
  var isNodeEnv = function isNodeEnv() {
    return typeof window === 'undefined' || typeof document === 'undefined';
  };

  var sweetHTML = ('\n <div aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">\n       <span class="' + swalClasses['icon-text'] + '">?</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">\n       <span class="' + swalClasses['icon-text'] + '">!</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">\n       <span class="' + swalClasses['icon-text'] + '">i</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

  /*
   * Add modal + backdrop to DOM
   */
  var init = function init(params) {
    // Clean up the old popup if it exists
    var c = getContainer();
    if (c) {
      c.parentNode.removeChild(c);
      removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
    }

    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }

    var container = document.createElement('div');
    container.className = swalClasses.container;
    container.innerHTML = sweetHTML;

    var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
    targetElement.appendChild(container);

    var popup = getPopup();
    var content = getContent();
    var input = getChildByClass(content, swalClasses.input);
    var file = getChildByClass(content, swalClasses.file);
    var range = content.querySelector('.' + swalClasses.range + ' input');
    var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
    var select = getChildByClass(content, swalClasses.select);
    var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
    var textarea = getChildByClass(content, swalClasses.textarea);

    // a11y
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }

    var oldInputVal = void 0; // IE11 workaround, see #1109 for details
    var resetValidationError = function resetValidationError(e) {
      if (Swal.isVisible() && oldInputVal !== e.target.value) {
        Swal.resetValidationError();
      }
      oldInputVal = e.target.value;
    };

    input.oninput = resetValidationError;
    file.onchange = resetValidationError;
    select.onchange = resetValidationError;
    checkbox.onchange = resetValidationError;
    textarea.oninput = resetValidationError;

    range.oninput = function(e) {
      resetValidationError(e);
      rangeOutput.value = range.value;
    };

    range.onchange = function(e) {
      resetValidationError(e);
      range.nextSibling.value = range.value;
    };

    return popup;
  };

  var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
    if (!param) {
      return hide(target);
    }

    if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
      target.innerHTML = '';
      if (0 in param) {
        for (var i = 0; i in param; i++) {
          target.appendChild(param[i].cloneNode(true));
        }
      } else {
        target.appendChild(param.cloneNode(true));
      }
    } else if (param) {
      target.innerHTML = param;
    } else {}
    show(target);
  };

  var animationEndEvent = function() {
    // Prevent run in Node env
    if (isNodeEnv()) {
      return false;
    }

    var testEl = document.createElement('div');
    var transEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd oanimationend',
      'animation': 'animationend'
    };
    for (var i in transEndEventNames) {
      if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
        return transEndEventNames[i];
      }
    }

    return false;
  }();

  // Measure width of scrollbar
  // https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
  var measureScrollbar = function measureScrollbar() {
    var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    if (supportsTouch) {
      return 0;
    }
    var scrollDiv = document.createElement('div');
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  var fixScrollbar = function fixScrollbar() {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return;
    }
    // if the body has overflow
    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = states.previousBodyPadding + measureScrollbar() + 'px';
    }
  };

  var undoScrollbar = function undoScrollbar() {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = states.previousBodyPadding;
      states.previousBodyPadding = null;
    }
  };

  // Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
  var iOSfix = function iOSfix() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop;
      document.body.style.top = offset * -1 + 'px';
      addClass(document.body, swalClasses.iosfix);
    }
  };

  var undoIOSfix = function undoIOSfix() {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  var globalState = {};

  // Restore previous active (focused) element
  var restoreActiveElement = function restoreActiveElement() {
    var x = window.scrollX;
    var y = window.scrollY;
    globalState.restoreFocusTimeout = setTimeout(function() {
      if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
        globalState.previousActiveElement.focus();
        globalState.previousActiveElement = null;
      }
    }, 100); // issues/900
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      // IE doesn't have scrollX/scrollY support
      window.scrollTo(x, y);
    }
  };

  /*
   * Global function to close sweetAlert
   */
  var close = function close(onClose, onAfterClose) {
    var container = getContainer();
    var popup = getPopup();
    if (!popup) {
      return;
    }

    if (onClose !== null && typeof onClose === 'function') {
      onClose(popup);
    }

    removeClass(popup, swalClasses.show);
    addClass(popup, swalClasses.hide);

    var removePopupAndResetState = function removePopupAndResetState() {
      if (!isToast()) {
        restoreActiveElement();
        globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture
        });
        globalState.keydownHandlerAdded = false;
      }

      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

      if (isModal()) {
        undoScrollbar();
        undoIOSfix();
      }

      if (onAfterClose !== null && typeof onAfterClose === 'function') {
        setTimeout(function() {
          onAfterClose();
        });
      }
    };

    // If animation is supported, animate
    if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
      popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
        popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
        if (hasClass(popup, swalClasses.hide)) {
          removePopupAndResetState();
        }
      });
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState();
    }
  };

  /*
   * Global function to determine if swal2 popup is shown
   */
  var isVisible$1 = function isVisible() {
    return !!getPopup();
  };

  /*
   * Global function to click 'Confirm' button
   */
  var clickConfirm = function clickConfirm() {
    return getConfirmButton().click();
  };

  /*
   * Global function to click 'Cancel' button
   */
  var clickCancel = function clickCancel() {
    return getCancelButton().click();
  };

  function fire() {
    var Swal = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new(Function.prototype.bind.apply(Swal, [null].concat(args)))();
  }

  /**
   * Extends a Swal class making it able to be instantiated without the `new` keyword (and thus without `Swal.fire`)
   * @param ParentSwal
   * @returns {NoNewKeywordSwal}
   */
  function withNoNewKeyword(ParentSwal) {
    var NoNewKeywordSwal = function NoNewKeywordSwal() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!(this instanceof NoNewKeywordSwal)) {
        return new(Function.prototype.bind.apply(NoNewKeywordSwal, [null].concat(args)))();
      }
      Object.getPrototypeOf(NoNewKeywordSwal).apply(this, args);
    };
    NoNewKeywordSwal.prototype = _extends(Object.create(ParentSwal.prototype), {
      constructor: NoNewKeywordSwal
    });

    if (typeof Object.setPrototypeOf === 'function') {
      Object.setPrototypeOf(NoNewKeywordSwal, ParentSwal);
    } else {
      // Android 4.4
      // eslint-disable-next-line
      NoNewKeywordSwal.__proto__ = ParentSwal;
    }
    return NoNewKeywordSwal;
  }

  var defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    type: null,
    toast: false,
    customClass: '',
    target: 'body',
    backdrop: true,
    animation: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showCancelButton: false,
    preConfirm: null,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: null,
    confirmButtonClass: null,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: null,
    cancelButtonClass: null,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusCancel: false,
    showCloseButton: false,
    closeButtonAriaLabel: 'Close this dialog',
    showLoaderOnConfirm: false,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageAlt: '',
    imageClass: null,
    timer: null,
    width: null,
    padding: null,
    background: null,
    input: null,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputClass: null,
    inputAttributes: {},
    inputValidator: null,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: null,
    progressStepsDistance: null,
    onBeforeOpen: null,
    onAfterClose: null,
    onOpen: null,
    onClose: null,
    useRejections: false,
    expectRejections: false
  };

  var deprecatedParams = ['useRejections', 'expectRejections'];

  /**
   * Is valid parameter
   * @param {String} paramName
   */
  var isValidParameter = function isValidParameter(paramName) {
    return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
  };

  /**
   * Is deprecated parameter
   * @param {String} paramName
   */
  var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
    return deprecatedParams.indexOf(paramName) !== -1;
  };

  /**
   * Show relevant warnings for given params
   *
   * @param params
   */
  var showWarningsForParams = function showWarningsForParams(params) {
    for (var param in params) {
      if (!isValidParameter(param)) {
        warn('Unknown parameter "' + param + '"');
      }
      if (isDeprecatedParameter(param)) {
        warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
      }
    }
  };

  var deprecationWarning = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.';
  var defaults$1 = {};

  function withGlobalDefaults(ParentSwal) {
    var SwalWithGlobalDefaults = function(_ParentSwal) {
      inherits(SwalWithGlobalDefaults, _ParentSwal);

      function SwalWithGlobalDefaults() {
        classCallCheck(this, SwalWithGlobalDefaults);
        return possibleConstructorReturn(this, (SwalWithGlobalDefaults.__proto__ || Object.getPrototypeOf(SwalWithGlobalDefaults)).apply(this, arguments));
      }

      createClass(SwalWithGlobalDefaults, [{
        key: '_main',
        value: function _main(params) {
          return get(SwalWithGlobalDefaults.prototype.__proto__ || Object.getPrototypeOf(SwalWithGlobalDefaults.prototype), '_main', this).call(this, _extends({}, defaults$1, params));
        }
      }], [{
        key: 'setDefaults',
        value: function setDefaults(params) {
          warnOnce(deprecationWarning);
          if (!params || (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
            throw new TypeError('SweetAlert2: The argument for setDefaults() is required and has to be a object');
          }
          showWarningsForParams(params);
          // assign valid params from `params` to `defaults`
          Object.keys(params).forEach(function(param) {
            if (ParentSwal.isValidParameter(param)) {
              defaults$1[param] = params[param];
            }
          });
        }
      }, {
        key: 'resetDefaults',
        value: function resetDefaults() {
          warnOnce(deprecationWarning);
          defaults$1 = {};
        }
      }]);
      return SwalWithGlobalDefaults;
    }(ParentSwal);

    // Set default params if `window._swalDefaults` is an object


    if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
      SwalWithGlobalDefaults.setDefaults(window._swalDefaults);
    }

    return SwalWithGlobalDefaults;
  }

  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */
  function mixin(mixinParams) {
    var Swal = this;
    return withNoNewKeyword(function(_Swal) {
      inherits(MixinSwal, _Swal);

      function MixinSwal() {
        classCallCheck(this, MixinSwal);
        return possibleConstructorReturn(this, (MixinSwal.__proto__ || Object.getPrototypeOf(MixinSwal)).apply(this, arguments));
      }

      createClass(MixinSwal, [{
        key: '_main',
        value: function _main(params) {
          return get(MixinSwal.prototype.__proto__ || Object.getPrototypeOf(MixinSwal.prototype), '_main', this).call(this, _extends({}, mixinParams, params));
        }
      }]);
      return MixinSwal;
    }(Swal));
  }

  // private global state for the queue feature
  var currentSteps = [];

  /*
   * Global function for chaining sweetAlert popups
   */
  var queue = function queue(steps) {
    var swal = this;
    currentSteps = steps;
    var resetQueue = function resetQueue() {
      currentSteps = [];
      document.body.removeAttribute('data-swal2-queue-step');
    };
    var queueResult = [];
    return new Promise(function(resolve, reject) {
      (function step(i, callback) {
        if (i < currentSteps.length) {
          document.body.setAttribute('data-swal2-queue-step', i);

          swal(currentSteps[i]).then(function(result) {
            if (typeof result.value !== 'undefined') {
              queueResult.push(result.value);
              step(i + 1, callback);
            } else {
              resetQueue();
              resolve({
                dismiss: result.dismiss
              });
            }
          });
        } else {
          resetQueue();
          resolve({
            value: queueResult
          });
        }
      })(0);
    });
  };

  /*
   * Global function for getting the index of current popup in queue
   */
  var getQueueStep = function getQueueStep() {
    return document.body.getAttribute('data-swal2-queue-step');
  };

  /*
   * Global function for inserting a popup to the queue
   */
  var insertQueueStep = function insertQueueStep(step, index) {
    if (index && index < currentSteps.length) {
      return currentSteps.splice(index, 0, step);
    }
    return currentSteps.push(step);
  };

  /*
   * Global function for deleting a popup from the queue
   */
  var deleteQueueStep = function deleteQueueStep(index) {
    if (typeof currentSteps[index] !== 'undefined') {
      currentSteps.splice(index, 1);
    }
  };

  /**
   * Show spinner instead of Confirm button and disable Cancel button
   */
  var showLoading = function showLoading() {
    var popup = getPopup();
    if (!popup) {
      Swal('');
    }
    popup = getPopup();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();

    show(actions);
    show(confirmButton);
    addClass([popup, actions], swalClasses.loading);
    confirmButton.disabled = true;
    cancelButton.disabled = true;

    popup.setAttribute('data-loading', true);
    popup.setAttribute('aria-busy', true);
    popup.focus();
  };

  /**
   * Show spinner instead of Confirm button and disable Cancel button
   */
  var getTimerLeft = function getTimerLeft() {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };



  var staticMethods = Object.freeze({
    isValidParameter: isValidParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    adaptInputValidator: adaptInputValidator,
    close: close,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    isVisible: isVisible$1,
    clickConfirm: clickConfirm,
    clickCancel: clickCancel,
    getPopup: getPopup,
    getTitle: getTitle,
    getContent: getContent,
    getImage: getImage,
    getButtonsWrapper: getButtonsWrapper,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getCancelButton: getCancelButton,
    getFooter: getFooter,
    isLoading: isLoading,
    fire: fire,
    mixin: mixin,
    queue: queue,
    getQueueStep: getQueueStep,
    insertQueueStep: insertQueueStep,
    deleteQueueStep: deleteQueueStep,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft
  });

  // https://github.com/Riim/symbol-polyfill/blob/master/index.js

  var _Symbol = typeof Symbol === 'function' ? Symbol : function() {
    var idCounter = 0;

    function _Symbol(key) {
      return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + ++idCounter + '__';
    }
    _Symbol.iterator = _Symbol('Symbol.iterator');
    return _Symbol;
  }();

  // WeakMap polyfill, needed for Android 4.4
  // Related issue: https://github.com/sweetalert2/sweetalert2/issues/1071
  // http://webreflection.blogspot.fi/2015/04/a-weakmap-polyfill-in-20-lines-of-code.html

  var WeakMap$1 = typeof WeakMap === 'function' ? WeakMap : function(s, dP, hOP) {
    function WeakMap() {
      dP(this, s, {
        value: _Symbol('WeakMap')
      });
    }
    WeakMap.prototype = {
      'delete': function del(o) {
        delete o[this[s]];
      },
      get: function get(o) {
        return o[this[s]];
      },
      has: function has(o) {
        return hOP.call(o, this[s]);
      },
      set: function set(o, v) {
        dP(o, this[s], {
          configurable: true,
          value: v
        });
      }
    };
    return WeakMap;
  }(_Symbol('WeakMap'), Object.defineProperty, {}.hasOwnProperty);

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */

  var privateProps = {
    promise: new WeakMap$1(),
    innerParams: new WeakMap$1(),
    domCache: new WeakMap$1()
  };

  /**
   * Show spinner instead of Confirm button and disable Cancel button
   */
  function hideLoading() {
    var innerParams = privateProps.innerParams.get(this);
    var domCache = privateProps.domCache.get(this);
    if (!innerParams.showConfirmButton) {
      hide(domCache.confirmButton);
      if (!innerParams.showCancelButton) {
        hide(domCache.actions);
      }
    }
    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  // Get input element by specified type or, if type isn't specified, by params.input
  function getInput(inputType) {
    var innerParams = privateProps.innerParams.get(this);
    var domCache = privateProps.domCache.get(this);
    inputType = inputType || innerParams.input;
    if (!inputType) {
      return null;
    }
    switch (inputType) {
      case 'select':
      case 'textarea':
      case 'file':
        return getChildByClass(domCache.content, swalClasses[inputType]);
      case 'checkbox':
        return domCache.popup.querySelector('.' + swalClasses.checkbox + ' input');
      case 'radio':
        return domCache.popup.querySelector('.' + swalClasses.radio + ' input:checked') || domCache.popup.querySelector('.' + swalClasses.radio + ' input:first-child');
      case 'range':
        return domCache.popup.querySelector('.' + swalClasses.range + ' input');
      default:
        return getChildByClass(domCache.content, swalClasses.input);
    }
  }

  function enableButtons() {
    var domCache = privateProps.domCache.get(this);
    domCache.confirmButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  function disableButtons() {
    var domCache = privateProps.domCache.get(this);
    domCache.confirmButton.disabled = true;
    domCache.cancelButton.disabled = true;
  }

  function enableConfirmButton() {
    var domCache = privateProps.domCache.get(this);
    domCache.confirmButton.disabled = false;
  }

  function disableConfirmButton() {
    var domCache = privateProps.domCache.get(this);
    domCache.confirmButton.disabled = true;
  }

  function enableInput() {
    var input = this.getInput();
    if (!input) {
      return false;
    }
    if (input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');
      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = false;
      }
    } else {
      input.disabled = false;
    }
  }

  function disableInput() {
    var input = this.getInput();
    if (!input) {
      return false;
    }
    if (input && input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');
      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
      }
    } else {
      input.disabled = true;
    }
  }

  // Show block with validation error
  function showValidationError(error) {
    var domCache = privateProps.domCache.get(this);
    domCache.validationError.innerHTML = error;
    var popupComputedStyle = window.getComputedStyle(domCache.popup);
    domCache.validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
    domCache.validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
    show(domCache.validationError);

    var input = this.getInput();
    if (input) {
      input.setAttribute('aria-invalid', true);
      input.setAttribute('aria-describedBy', swalClasses.validationerror);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  }

  // Hide block with validation error
  function resetValidationError() {
    var domCache = privateProps.domCache.get(this);
    if (domCache.validationError) {
      hide(domCache.validationError);
    }

    var input = this.getInput();
    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedBy');
      removeClass(input, swalClasses.inputerror);
    }
  }

  var Timer = function Timer(callback, delay) {
    classCallCheck(this, Timer);

    var id, started, running;
    var remaining = delay;
    this.start = function() {
      running = true;
      started = new Date();
      id = setTimeout(callback, remaining);
    };
    this.stop = function() {
      running = false;
      clearTimeout(id);
      remaining -= new Date() - started;
    };
    this.getTimerLeft = function() {
      if (running) {
        this.stop();
        this.start();
      }
      return remaining;
    };
    this.getStateRunning = function() {
      return running;
    };
    this.start();
  };

  var defaultInputValidators = {
    email: function email(string, extraParams) {
      return (/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.reject(extraParams && extraParams.validationMessage ? extraParams.validationMessage : 'Invalid email address'));
    },
    url: function url(string, extraParams) {
      // taken from https://stackoverflow.com/a/3809435/1331425
      return (/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(string) ? Promise.resolve() : Promise.reject(extraParams && extraParams.validationMessage ? extraParams.validationMessage : 'Invalid URL'));
    }
  };

  /**
   * Set type, text and actions on popup
   *
   * @param params
   * @returns {boolean}
   */
  function setParameters(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (!params.inputValidator) {
      Object.keys(defaultInputValidators).forEach(function(key) {
        if (params.input === key) {
          params.inputValidator = params.expectRejections ? defaultInputValidators[key] : Swal.adaptInputValidator(defaultInputValidators[key]);
        }
      });
    }

    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }

    var popup = void 0;
    var oldPopup = getPopup();
    var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
    // If the model target has changed, refresh the popup
    if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
      popup = init(params);
    } else {
      popup = oldPopup || init(params);
    }

    // Set popup width
    if (params.width) {
      popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
    }

    // Set popup padding
    if (params.padding) {
      popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
    }

    // Set popup background
    if (params.background) {
      popup.style.background = params.background;
    }
    var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
    for (var i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }

    var container = getContainer();
    var title = getTitle();
    var content = getContent().querySelector('#' + swalClasses.content);
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();
    var closeButton = getCloseButton();
    var footer = getFooter();

    // Title
    if (params.titleText) {
      title.innerText = params.titleText;
    } else if (params.title) {
      title.innerHTML = params.title.split('\n').join('<br />');
    }

    if (typeof params.backdrop === 'string') {
      getContainer().style.background = params.backdrop;
    } else if (!params.backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }

    // Content as HTML
    if (params.html) {
      parseHtmlToContainer(params.html, content);

      // Content as plain text
    } else if (params.text) {
      content.textContent = params.text;
      show(content);
    } else {
      hide(content);
    }

    // Position
    if (params.position in swalClasses) {
      addClass(container, swalClasses[params.position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }

    // Grow
    if (params.grow && typeof params.grow === 'string') {
      var growClass = 'grow-' + params.grow;
      if (growClass in swalClasses) {
        addClass(container, swalClasses[growClass]);
      }
    }

    // Animation
    if (typeof params.animation === 'function') {
      params.animation = params.animation.call();
    }

    // Close button
    if (params.showCloseButton) {
      closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
      show(closeButton);
    } else {
      hide(closeButton);
    }

    // Default Class
    popup.className = swalClasses.popup;
    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    }

    // Custom Class
    if (params.customClass) {
      addClass(popup, params.customClass);
    }

    // Progress steps
    var progressStepsContainer = getProgressSteps();
    var currentProgressStep = parseInt(params.currentProgressStep === null ? Swal.getQueueStep() : params.currentProgressStep, 10);
    if (params.progressSteps && params.progressSteps.length) {
      show(progressStepsContainer);
      empty(progressStepsContainer);
      if (currentProgressStep >= params.progressSteps.length) {
        warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
      }
      params.progressSteps.forEach(function(step, index) {
        var circle = document.createElement('li');
        addClass(circle, swalClasses.progresscircle);
        circle.innerHTML = step;
        if (index === currentProgressStep) {
          addClass(circle, swalClasses.activeprogressstep);
        }
        progressStepsContainer.appendChild(circle);
        if (index !== params.progressSteps.length - 1) {
          var line = document.createElement('li');
          addClass(line, swalClasses.progressline);
          if (params.progressStepsDistance) {
            line.style.width = params.progressStepsDistance;
          }
          progressStepsContainer.appendChild(line);
        }
      });
    } else {
      hide(progressStepsContainer);
    }

    // Icon
    var icons = getIcons();
    for (var _i = 0; _i < icons.length; _i++) {
      hide(icons[_i]);
    }
    if (params.type) {
      var validType = false;
      for (var iconType in iconTypes) {
        if (params.type === iconType) {
          validType = true;
          break;
        }
      }
      if (!validType) {
        error('Unknown alert type: ' + params.type);
        return false;
      }
      var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
      show(icon);

      // Animate icon
      if (params.animation) {
        addClass(icon, 'swal2-animate-' + params.type + '-icon');
      }
    }

    // Custom image
    var image = getImage();
    if (params.imageUrl) {
      image.setAttribute('src', params.imageUrl);
      image.setAttribute('alt', params.imageAlt);
      show(image);

      if (params.imageWidth) {
        image.setAttribute('width', params.imageWidth);
      } else {
        image.removeAttribute('width');
      }

      if (params.imageHeight) {
        image.setAttribute('height', params.imageHeight);
      } else {
        image.removeAttribute('height');
      }

      image.className = swalClasses.image;
      if (params.imageClass) {
        addClass(image, params.imageClass);
      }
    } else {
      hide(image);
    }

    // Cancel button
    if (params.showCancelButton) {
      cancelButton.style.display = 'inline-block';
    } else {
      hide(cancelButton);
    }

    // Confirm button
    if (params.showConfirmButton) {
      removeStyleProperty(confirmButton, 'display');
    } else {
      hide(confirmButton);
    }

    // Actions (buttons) wrapper
    if (!params.showConfirmButton && !params.showCancelButton) {
      hide(actions);
    } else {
      show(actions);
    }

    // Edit text on confirm and cancel buttons
    confirmButton.innerHTML = params.confirmButtonText;
    cancelButton.innerHTML = params.cancelButtonText;

    // ARIA labels for confirm and cancel buttons
    confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
    cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

    // Add buttons custom classes
    confirmButton.className = swalClasses.confirm;
    addClass(confirmButton, params.confirmButtonClass);
    cancelButton.className = swalClasses.cancel;
    addClass(cancelButton, params.cancelButtonClass);

    // Buttons styling
    if (params.buttonsStyling) {
      addClass([confirmButton, cancelButton], swalClasses.styled);

      // Buttons background colors
      if (params.confirmButtonColor) {
        confirmButton.style.backgroundColor = params.confirmButtonColor;
      }
      if (params.cancelButtonColor) {
        cancelButton.style.backgroundColor = params.cancelButtonColor;
      }

      // Loading state
      var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
      confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
      confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
    } else {
      removeClass([confirmButton, cancelButton], swalClasses.styled);

      confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
      cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
    }

    // Footer
    parseHtmlToContainer(params.footer, footer);

    // CSS animation
    if (params.animation === true) {
      removeClass(popup, swalClasses.noanimation);
    } else {
      addClass(popup, swalClasses.noanimation);
    }

    // showLoaderOnConfirm && preConfirm
    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    }
  }

  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {Array} params
   */
  var openPopup = function openPopup(params) {
    var container = getContainer();
    var popup = getPopup();

    if (params.onBeforeOpen !== null && typeof params.onBeforeOpen === 'function') {
      params.onBeforeOpen(popup);
    }

    if (params.animation) {
      addClass(popup, swalClasses.show);
      addClass(container, swalClasses.fade);
      removeClass(popup, swalClasses.hide);
    } else {
      removeClass(popup, swalClasses.fade);
    }
    show(popup);

    // scrolling is 'hidden' until animation is done, after that 'auto'
    container.style.overflowY = 'hidden';
    if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
      popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
        popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
        container.style.overflowY = 'auto';
      });
    } else {
      container.style.overflowY = 'auto';
    }

    addClass([document.documentElement, document.body, container], swalClasses.shown);
    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }

    if (isModal()) {
      fixScrollbar();
      iOSfix();
    }
    if (!globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }
    if (params.onOpen !== null && typeof params.onOpen === 'function') {
      setTimeout(function() {
        params.onOpen(popup);
      });
    }
  };

  function _main(userParams) {
    var _this = this;

    showWarningsForParams(userParams);

    var innerParams = _extends({}, defaultParams, userParams);
    setParameters(innerParams);
    Object.freeze(innerParams);
    privateProps.innerParams.set(this, innerParams);

    // clear the previous timer
    if (globalState.timeout) {
      globalState.timeout.stop();
      delete globalState.timeout;
    }

    // clear the restore focus timeout
    clearTimeout(globalState.restoreFocusTimeout);

    var domCache = {
      popup: getPopup(),
      container: getContainer(),
      content: getContent(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      cancelButton: getCancelButton(),
      closeButton: getCloseButton(),
      validationError: getValidationError(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(this, domCache);

    var constructor = this.constructor;

    return new Promise(function(resolve, reject) {
      // functions to handle all resolving/rejecting/settling
      var succeedWith = function succeedWith(value) {
        constructor.closePopup(innerParams.onClose, innerParams.onAfterClose); // TODO: make closePopup an *instance* method
        if (innerParams.useRejections) {
          resolve(value);
        } else {
          resolve({
            value: value
          });
        }
      };
      var dismissWith = function dismissWith(dismiss) {
        constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
        if (innerParams.useRejections) {
          reject(dismiss);
        } else {
          resolve({
            dismiss: dismiss
          });
        }
      };
      var errorWith = function errorWith(error$$1) {
        constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
        reject(error$$1);
      };

      // Close on timer
      if (innerParams.timer) {
        globalState.timeout = new Timer(function() {
          dismissWith('timer');
          delete globalState.timeout;
        }, innerParams.timer);
      }

      // Get the value of the popup input
      var getInputValue = function getInputValue() {
        var input = _this.getInput();
        if (!input) {
          return null;
        }
        switch (innerParams.input) {
          case 'checkbox':
            return input.checked ? 1 : 0;
          case 'radio':
            return input.checked ? input.value : null;
          case 'file':
            return input.files.length ? input.files[0] : null;
          default:
            return innerParams.inputAutoTrim ? input.value.trim() : input.value;
        }
      };

      // input autofocus
      if (innerParams.input) {
        setTimeout(function() {
          var input = _this.getInput();
          if (input) {
            focusInput(input);
          }
        }, 0);
      }

      var confirm = function confirm(value) {
        if (innerParams.showLoaderOnConfirm) {
          constructor.showLoading(); // TODO: make showLoading an *instance* method
        }

        if (innerParams.preConfirm) {
          _this.resetValidationError();
          var preConfirmPromise = Promise.resolve().then(function() {
            return innerParams.preConfirm(value, innerParams.extraParams);
          });
          if (innerParams.expectRejections) {
            preConfirmPromise.then(function(preConfirmValue) {
              return succeedWith(preConfirmValue || value);
            }, function(validationError) {
              _this.hideLoading();
              if (validationError) {
                _this.showValidationError(validationError);
              }
            });
          } else {
            preConfirmPromise.then(function(preConfirmValue) {
              if (isVisible(domCache.validationError) || preConfirmValue === false) {
                _this.hideLoading();
              } else {
                succeedWith(preConfirmValue || value);
              }
            }, function(error$$1) {
              return errorWith(error$$1);
            });
          }
        } else {
          succeedWith(value);
        }
      };

      // Mouse interactions
      var onButtonEvent = function onButtonEvent(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var confirmButton = domCache.confirmButton,
          cancelButton = domCache.cancelButton;

        var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
        var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

        switch (e.type) {
          case 'click':
            // Clicked 'confirm'
            if (targetedConfirm && constructor.isVisible()) {
              _this.disableButtons();
              if (innerParams.input) {
                var inputValue = getInputValue();

                if (innerParams.inputValidator) {
                  _this.disableInput();
                  var validationPromise = Promise.resolve().then(function() {
                    return innerParams.inputValidator(inputValue, innerParams.extraParams);
                  });
                  if (innerParams.expectRejections) {
                    validationPromise.then(function() {
                      _this.enableButtons();
                      _this.enableInput();
                      confirm(inputValue);
                    }, function(validationError) {
                      _this.enableButtons();
                      _this.enableInput();
                      if (validationError) {
                        _this.showValidationError(validationError);
                      }
                    });
                  } else {
                    validationPromise.then(function(validationError) {
                      _this.enableButtons();
                      _this.enableInput();
                      if (validationError) {
                        _this.showValidationError(validationError);
                      } else {
                        confirm(inputValue);
                      }
                    }, function(error$$1) {
                      return errorWith(error$$1);
                    });
                  }
                } else {
                  confirm(inputValue);
                }
              } else {
                confirm(true);
              }

              // Clicked 'cancel'
            } else if (targetedCancel && constructor.isVisible()) {
              _this.disableButtons();
              dismissWith(constructor.DismissReason.cancel);
            }
            break;
          default:
        }
      };

      var buttons = domCache.popup.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = onButtonEvent;
        buttons[i].onmouseover = onButtonEvent;
        buttons[i].onmouseout = onButtonEvent;
        buttons[i].onmousedown = onButtonEvent;
      }

      // Closing popup by close button
      domCache.closeButton.onclick = function() {
        dismissWith(constructor.DismissReason.close);
      };

      if (innerParams.toast) {
        // Closing popup by internal click
        domCache.popup.onclick = function(e) {
          if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
            return;
          }
          constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
          dismissWith(constructor.DismissReason.close);
        };
      } else {
        var ignoreOutsideClick = false;

        // Ignore click events that had mousedown on the popup but mouseup on the container
        // This can happen when the user drags a slider
        domCache.popup.onmousedown = function() {
          domCache.container.onmouseup = function(e) {
            domCache.container.onmouseup = undefined;
            // We only check if the mouseup target is the container because usually it doesn't
            // have any other direct children aside of the popup
            if (e.target === domCache.container) {
              ignoreOutsideClick = true;
            }
          };
        };

        // Ignore click events that had mousedown on the container but mouseup on the popup
        domCache.container.onmousedown = function() {
          domCache.popup.onmouseup = function(e) {
            domCache.popup.onmouseup = undefined;
            // We also need to check if the mouseup target is a child of the popup
            if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
              ignoreOutsideClick = true;
            }
          };
        };

        domCache.container.onclick = function(e) {
          if (ignoreOutsideClick) {
            ignoreOutsideClick = false;
            return;
          }
          if (e.target !== domCache.container) {
            return;
          }
          if (callIfFunction(innerParams.allowOutsideClick)) {
            dismissWith(constructor.DismissReason.backdrop);
          }
        };
      }

      // Reverse buttons (Confirm on the right side)
      if (innerParams.reverseButtons) {
        domCache.confirmButton.parentNode.insertBefore(domCache.cancelButton, domCache.confirmButton);
      } else {
        domCache.confirmButton.parentNode.insertBefore(domCache.confirmButton, domCache.cancelButton);
      }

      // Focus handling
      var setFocus = function setFocus(index, increment) {
        var focusableElements = getFocusableElements(innerParams.focusCancel);
        // search for visible elements and select the next possible match
        for (var _i = 0; _i < focusableElements.length; _i++) {
          index = index + increment;

          // rollover to first item
          if (index === focusableElements.length) {
            index = 0;

            // go to last item
          } else if (index === -1) {
            index = focusableElements.length - 1;
          }

          // determine if element is visible
          var el = focusableElements[index];
          if (isVisible(el)) {
            return el.focus();
          }
        }
        // no visible focusable elements, focus the popup
        domCache.popup.focus();
      };

      var keydownHandler = function keydownHandler(e, innerParams) {
        if (innerParams.stopKeydownPropagation) {
          e.stopPropagation();
        }

        var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
        ];

        if (e.key === 'Enter' && !e.isComposing) {
          if (e.target && _this.getInput() && e.target.outerHTML === _this.getInput().outerHTML) {
            if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
              return; // do not submit
            }

            constructor.clickConfirm();
            e.preventDefault();
          }

          // TAB
        } else if (e.key === 'Tab') {
          var targetElement = e.target || e.srcElement;

          var focusableElements = getFocusableElements(innerParams.focusCancel);
          var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
          for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
            if (targetElement === focusableElements[_i2]) {
              btnIndex = _i2;
              break;
            }
          }

          if (!e.shiftKey) {
            // Cycle to the next button
            setFocus(btnIndex, 1);
          } else {
            // Cycle to the prev button
            setFocus(btnIndex, -1);
          }
          e.stopPropagation();
          e.preventDefault();

          // ARROWS - switch focus between buttons
        } else if (arrowKeys.indexOf(e.key) !== -1) {
          // focus Cancel button if Confirm button is currently focused
          if (document.activeElement === domCache.confirmButton && isVisible(domCache.cancelButton)) {
            domCache.cancelButton.focus();
            // and vice versa
          } else if (document.activeElement === domCache.cancelButton && isVisible(domCache.confirmButton)) {
            domCache.confirmButton.focus();
          }

          // ESC
        } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(innerParams.allowEscapeKey) === true) {
          dismissWith(constructor.DismissReason.esc);
        }
      };

      if (globalState.keydownHandlerAdded) {
        globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture
        });
        globalState.keydownHandlerAdded = false;
      }

      if (!innerParams.toast) {
        globalState.keydownHandler = function(e) {
          return keydownHandler(e, innerParams);
        };
        globalState.keydownTarget = innerParams.keydownListenerCapture ? window : domCache.popup;
        globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
        globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture
        });
        globalState.keydownHandlerAdded = true;
      }

      _this.enableButtons();
      _this.hideLoading();
      _this.resetValidationError();

      if (innerParams.input) {
        addClass(document.body, swalClasses['has-input']);
      }

      // inputs
      var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
      var input = void 0;
      for (var _i3 = 0; _i3 < inputTypes.length; _i3++) {
        var inputClass = swalClasses[inputTypes[_i3]];
        var inputContainer = getChildByClass(domCache.content, inputClass);
        input = _this.getInput(inputTypes[_i3]);

        // set attributes
        if (input) {
          for (var j in input.attributes) {
            if (input.attributes.hasOwnProperty(j)) {
              var attrName = input.attributes[j].name;
              if (attrName !== 'type' && attrName !== 'value') {
                input.removeAttribute(attrName);
              }
            }
          }
          for (var attr in innerParams.inputAttributes) {
            input.setAttribute(attr, innerParams.inputAttributes[attr]);
          }
        }

        // set class
        inputContainer.className = inputClass;
        if (innerParams.inputClass) {
          addClass(inputContainer, innerParams.inputClass);
        }

        hide(inputContainer);
      }

      var populateInputOptions = void 0;
      switch (innerParams.input) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
        case 'tel':
        case 'url':
          input = getChildByClass(domCache.content, swalClasses.input);
          input.value = innerParams.inputValue;
          input.placeholder = innerParams.inputPlaceholder;
          input.type = innerParams.input;
          show(input);
          break;
        case 'file':
          input = getChildByClass(domCache.content, swalClasses.file);
          input.placeholder = innerParams.inputPlaceholder;
          input.type = innerParams.input;
          show(input);
          break;
        case 'range':
          var range = getChildByClass(domCache.content, swalClasses.range);
          var rangeInput = range.querySelector('input');
          var rangeOutput = range.querySelector('output');
          rangeInput.value = innerParams.inputValue;
          rangeInput.type = innerParams.input;
          rangeOutput.value = innerParams.inputValue;
          show(range);
          break;
        case 'select':
          var select = getChildByClass(domCache.content, swalClasses.select);
          select.innerHTML = '';
          if (innerParams.inputPlaceholder) {
            var placeholder = document.createElement('option');
            placeholder.innerHTML = innerParams.inputPlaceholder;
            placeholder.value = '';
            placeholder.disabled = true;
            placeholder.selected = true;
            select.appendChild(placeholder);
          }
          populateInputOptions = function populateInputOptions(inputOptions) {
            inputOptions.forEach(function(_ref) {
              var _ref2 = slicedToArray(_ref, 2),
                optionValue = _ref2[0],
                optionLabel = _ref2[1];

              var option = document.createElement('option');
              option.value = optionValue;
              option.innerHTML = optionLabel;
              if (innerParams.inputValue.toString() === optionValue.toString()) {
                option.selected = true;
              }
              select.appendChild(option);
            });
            show(select);
            select.focus();
          };
          break;
        case 'radio':
          var radio = getChildByClass(domCache.content, swalClasses.radio);
          radio.innerHTML = '';
          populateInputOptions = function populateInputOptions(inputOptions) {
            inputOptions.forEach(function(_ref3) {
              var _ref4 = slicedToArray(_ref3, 2),
                radioValue = _ref4[0],
                radioLabel = _ref4[1];

              var radioInput = document.createElement('input');
              var radioLabelElement = document.createElement('label');
              radioInput.type = 'radio';
              radioInput.name = swalClasses.radio;
              radioInput.value = radioValue;
              if (innerParams.inputValue.toString() === radioValue.toString()) {
                radioInput.checked = true;
              }
              radioLabelElement.innerHTML = radioLabel;
              radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
              radio.appendChild(radioLabelElement);
            });
            show(radio);
            var radios = radio.querySelectorAll('input');
            if (radios.length) {
              radios[0].focus();
            }
          };
          break;
        case 'checkbox':
          var checkbox = getChildByClass(domCache.content, swalClasses.checkbox);
          var checkboxInput = _this.getInput('checkbox');
          checkboxInput.type = 'checkbox';
          checkboxInput.value = 1;
          checkboxInput.id = swalClasses.checkbox;
          checkboxInput.checked = Boolean(innerParams.inputValue);
          var label = checkbox.getElementsByTagName('span');
          if (label.length) {
            checkbox.removeChild(label[0]);
          }
          label = document.createElement('span');
          label.innerHTML = innerParams.inputPlaceholder;
          checkbox.appendChild(label);
          show(checkbox);
          break;
        case 'textarea':
          var textarea = getChildByClass(domCache.content, swalClasses.textarea);
          textarea.value = innerParams.inputValue;
          textarea.placeholder = innerParams.inputPlaceholder;
          show(textarea);
          break;
        case null:
          break;
        default:
          error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + innerParams.input + '"');
          break;
      }

      if (innerParams.input === 'select' || innerParams.input === 'radio') {
        var processInputOptions = function processInputOptions(inputOptions) {
          return populateInputOptions(formatInputOptions(inputOptions));
        };
        if (isThenable(innerParams.inputOptions)) {
          constructor.showLoading();
          innerParams.inputOptions.then(function(inputOptions) {
            _this.hideLoading();
            processInputOptions(inputOptions);
          });
        } else if (_typeof(innerParams.inputOptions) === 'object') {
          processInputOptions(innerParams.inputOptions);
        } else {
          error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(innerParams.inputOptions));
        }
      } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(innerParams.input) !== -1 && isThenable(innerParams.inputValue)) {
        constructor.showLoading();
        hide(input);
        innerParams.inputValue.then(function(inputValue) {
          input.value = innerParams.input === 'number' ? parseFloat(inputValue) || 0 : inputValue + '';
          show(input);
          _this.hideLoading();
        }).catch(function(err) {
          error('Error in inputValue promise: ' + err);
          input.value = '';
          show(input);
          _this.hideLoading();
        });
      }

      openPopup(innerParams);

      if (!innerParams.toast) {
        if (!callIfFunction(innerParams.allowEnterKey)) {
          if (document.activeElement) {
            document.activeElement.blur();
          }
        } else if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
          domCache.cancelButton.focus();
        } else if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
          domCache.confirmButton.focus();
        } else {
          setFocus(-1, 1);
        }
      }

      // fix scroll
      domCache.container.scrollTop = 0;
    });
  }



  var instanceMethods = Object.freeze({
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableConfirmButton: enableConfirmButton,
    disableConfirmButton: disableConfirmButton,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationError: showValidationError,
    resetValidationError: resetValidationError,
    _main: _main
  });

  var currentInstance = void 0;

  // SweetAlert constructor
  function SweetAlert() {
    // Prevent run in Node env
    if (typeof window === 'undefined') {
      return;
    }

    // Check for the existence of Promise
    if (typeof Promise === 'undefined') {
      error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[0] === 'undefined') {
      error('SweetAlert2 expects at least 1 attribute!');
      return false;
    }

    currentInstance = this;

    var outerParams = Object.freeze(this.constructor.argsToParams(args));

    Object.defineProperties(this, {
      params: {
        value: outerParams,
        writable: false,
        enumerable: true
      }
    });

    var promise = this._main(this.params);
    privateProps.promise.set(this, promise);
  }

  // `catch` cannot be the name of a module export, so we define our thenable methods here instead
  SweetAlert.prototype.then = function(onFulfilled, onRejected) {
    var promise = privateProps.promise.get(this);
    return promise.then(onFulfilled, onRejected);
  };
  SweetAlert.prototype.catch = function(onRejected) {
    var promise = privateProps.promise.get(this);
    return promise.catch(onRejected);
  };
  SweetAlert.prototype.finally = function(onFinally) {
    var promise = privateProps.promise.get(this);
    return promise.finally(onFinally);
  };

  // Assign instance methods from src/instanceMethods/*.js to prototype
  _extends(SweetAlert.prototype, instanceMethods);

  // Assign static methods from src/staticMethods/*.js to constructor
  _extends(SweetAlert, staticMethods);

  // Proxy to instance methods to constructor, for now, for backwards compatibility
  Object.keys(instanceMethods).forEach(function(key) {
    SweetAlert[key] = function() {
      if (currentInstance) {
        var _currentInstance;

        return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
      }
    };
  });

  SweetAlert.DismissReason = DismissReason;

  SweetAlert.noop = function() {};

  SweetAlert.version = version;

  var Swal = withNoNewKeyword(withGlobalDefaults(SweetAlert));
  Swal.default = Swal;

  return Swal;

})));
if (typeof window !== 'undefined' && window.Sweetalert2) {
  window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2
}

"undefined" != typeof document && function(e, t) {
  var n = e.createElement("style");
  if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);
  else try {
    n.innerHTML = t
  } catch (e) {
    n.innerText = t
  }
}(document, "@-webkit-keyframes swal2-show {\n" +
  "  0% {\n" +
  "    -webkit-transform: scale(0.7);\n" +
  "            transform: scale(0.7); }\n" +
  "  45% {\n" +
  "    -webkit-transform: scale(1.05);\n" +
  "            transform: scale(1.05); }\n" +
  "  80% {\n" +
  "    -webkit-transform: scale(0.95);\n" +
  "            transform: scale(0.95); }\n" +
  "  100% {\n" +
  "    -webkit-transform: scale(1);\n" +
  "            transform: scale(1); } }\n" +
  "\n" +
  "@keyframes swal2-show {\n" +
  "  0% {\n" +
  "    -webkit-transform: scale(0.7);\n" +
  "            transform: scale(0.7); }\n" +
  "  45% {\n" +
  "    -webkit-transform: scale(1.05);\n" +
  "            transform: scale(1.05); }\n" +
  "  80% {\n" +
  "    -webkit-transform: scale(0.95);\n" +
  "            transform: scale(0.95); }\n" +
  "  100% {\n" +
  "    -webkit-transform: scale(1);\n" +
  "            transform: scale(1); } }\n" +
  "\n" +
  "@-webkit-keyframes swal2-hide {\n" +
  "  0% {\n" +
  "    -webkit-transform: scale(1);\n" +
  "            transform: scale(1);\n" +
  "    opacity: 1; }\n" +
  "  100% {\n" +
  "    -webkit-transform: scale(0.5);\n" +
  "            transform: scale(0.5);\n" +
  "    opacity: 0; } }\n" +
  "\n" +
  "@keyframes swal2-hide {\n" +
  "  0% {\n" +
  "    -webkit-transform: scale(1);\n" +
  "            transform: scale(1);\n" +
  "    opacity: 1; }\n" +
  "  100% {\n" +
  "    -webkit-transform: scale(0.5);\n" +
  "            transform: scale(0.5);\n" +
  "    opacity: 0; } }\n" +
  "\n" +
  "@-webkit-keyframes swal2-animate-success-line-tip {\n" +
  "  0% {\n" +
  "    top: 1.1875em;\n" +
  "    left: .0625em;\n" +
  "    width: 0; }\n" +
  "  54% {\n" +
  "    top: 1.0625em;\n" +
  "    left: .125em;\n" +
  "    width: 0; }\n" +
  "  70% {\n" +
  "    top: 2.1875em;\n" +
  "    left: -.375em;\n" +
  "    width: 3.125em; }\n" +
  "  84% {\n" +
  "    top: 3em;\n" +
  "    left: 1.3125em;\n" +
  "    width: 1.0625em; }\n" +
  "  100% {\n" +
  "    top: 2.8125em;\n" +
  "    left: .875em;\n" +
  "    width: 1.5625em; } }\n" +
  "\n" +
  "@keyframes swal2-animate-success-line-tip {\n" +
  "  0% {\n" +
  "    top: 1.1875em;\n" +
  "    left: .0625em;\n" +
  "    width: 0; }\n" +
  "  54% {\n" +
  "    top: 1.0625em;\n" +
  "    left: .125em;\n" +
  "    width: 0; }\n" +
  "  70% {\n" +
  "    top: 2.1875em;\n" +
  "    left: -.375em;\n" +
  "    width: 3.125em; }\n" +
  "  84% {\n" +
  "    top: 3em;\n" +
  "    left: 1.3125em;\n" +
  "    width: 1.0625em; }\n" +
  "  100% {\n" +
  "    top: 2.8125em;\n" +
  "    left: .875em;\n" +
  "    width: 1.5625em; } }\n" +
  "\n" +
  "@-webkit-keyframes swal2-animate-success-line-long {\n" +
  "  0% {\n" +
  "    top: 3.375em;\n" +
  "    right: 2.875em;\n" +
  "    width: 0; }\n" +
  "  65% {\n" +
  "    top: 3.375em;\n" +
  "    right: 2.875em;\n" +
  "    width: 0; }\n" +
  "  84% {\n" +
  "    top: 2.1875em;\n" +
  "    right: 0;\n" +
  "    width: 3.4375em; }\n" +
  "  100% {\n" +
  "    top: 2.375em;\n" +
  "    right: .5em;\n" +
  "    width: 2.9375em; } }\n" +
  "\n" +
  "@keyframes swal2-animate-success-line-long {\n" +
  "  0% {\n" +
  "    top: 3.375em;\n" +
  "    right: 2.875em;\n" +
  "    width: 0; }\n" +
  "  65% {\n" +
  "    top: 3.375em;\n" +
  "    right: 2.875em;\n" +
  "    width: 0; }\n" +
  "  84% {\n" +
  "    top: 2.1875em;\n" +
  "    right: 0;\n" +
  "    width: 3.4375em; }\n" +
  "  100% {\n" +
  "    top: 2.375em;\n" +
  "    right: .5em;\n" +
  "    width: 2.9375em; } }\n" +
  "\n" +
  "@-webkit-keyframes swal2-rotate-success-circular-line {\n" +
  "  0% {\n" +
  "    -webkit-transform: rotate(-45deg);\n" +
  "            transform: rotate(-45deg); }\n" +
  "  5% {\n" +
  "    -webkit-transform: rotate(-45deg);\n" +
  "            transform: rotate(-45deg); }\n" +
  "  12% {\n" +
  "    -webkit-transform: rotate(-405deg);\n" +
  "            transform: rotate(-405deg); }\n" +
  "  100% {\n" +
  "    -webkit-transform: rotate(-405deg);\n" +
  "            transform: rotate(-405deg); } }\n" +
  "\n" +
  "@keyframes swal2-rotate-success-circular-line {\n" +
  "  0% {\n" +
  "    -webkit-transform: rotate(-45deg);\n" +
  "            transform: rotate(-45deg); }\n" +
  "  5% {\n" +
  "    -webkit-transform: rotate(-45deg);\n" +
  "            transform: rotate(-45deg); }\n" +
  "  12% {\n" +
  "    -webkit-transform: rotate(-405deg);\n" +
  "            transform: rotate(-405deg); }\n" +
  "  100% {\n" +
  "    -webkit-transform: rotate(-405deg);\n" +
  "            transform: rotate(-405deg); } }\n" +
  "\n" +
  "@-webkit-keyframes swal2-animate-error-x-mark {\n" +
  "  0% {\n" +
  "    margin-top: 1.625em;\n" +
  "    -webkit-transform: scale(0.4);\n" +
  "            transform: scale(0.4);\n" +
  "    opacity: 0; }\n" +
  "  50% {\n" +
  "    margin-top: 1.625em;\n" +
  "    -webkit-transform: scale(0.4);\n" +
  "            transform: scale(0.4);\n" +
  "    opacity: 0; }\n" +
  "  80% {\n" +
  "    margin-top: -.375em;\n" +
  "    -webkit-transform: scale(1.15);\n" +
  "            transform: scale(1.15); }\n" +
  "  100% {\n" +
  "    margin-top: 0;\n" +
  "    -webkit-transform: scale(1);\n" +
  "            transform: scale(1);\n" +
  "    opacity: 1; } }\n" +
  "\n" +
  "@keyframes swal2-animate-error-x-mark {\n" +
  "  0% {\n" +
  "    margin-top: 1.625em;\n" +
  "    -webkit-transform: scale(0.4);\n" +
  "            transform: scale(0.4);\n" +
  "    opacity: 0; }\n" +
  "  50% {\n" +
  "    margin-top: 1.625em;\n" +
  "    -webkit-transform: scale(0.4);\n" +
  "            transform: scale(0.4);\n" +
  "    opacity: 0; }\n" +
  "  80% {\n" +
  "    margin-top: -.375em;\n" +
  "    -webkit-transform: scale(1.15);\n" +
  "            transform: scale(1.15); }\n" +
  "  100% {\n" +
  "    margin-top: 0;\n" +
  "    -webkit-transform: scale(1);\n" +
  "            transform: scale(1);\n" +
  "    opacity: 1; } }\n" +
  "\n" +
  "@-webkit-keyframes swal2-animate-error-icon {\n" +
  "  0% {\n" +
  "    -webkit-transform: rotateX(100deg);\n" +
  "            transform: rotateX(100deg);\n" +
  "    opacity: 0; }\n" +
  "  100% {\n" +
  "    -webkit-transform: rotateX(0deg);\n" +
  "            transform: rotateX(0deg);\n" +
  "    opacity: 1; } }\n" +
  "\n" +
  "@keyframes swal2-animate-error-icon {\n" +
  "  0% {\n" +
  "    -webkit-transform: rotateX(100deg);\n" +
  "            transform: rotateX(100deg);\n" +
  "    opacity: 0; }\n" +
  "  100% {\n" +
  "    -webkit-transform: rotateX(0deg);\n" +
  "            transform: rotateX(0deg);\n" +
  "    opacity: 1; } }\n" +
  "\n" +
  "body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n" +
  "  flex-direction: column;\n" +
  "  align-items: stretch; }\n" +
  "  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n" +
  "    flex: 1;\n" +
  "    align-self: stretch;\n" +
  "    justify-content: flex-end;\n" +
  "    height: 2.2em; }\n" +
  "  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n" +
  "    justify-content: center; }\n" +
  "  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n" +
  "    height: 2em;\n" +
  "    margin: .3125em auto;\n" +
  "    font-size: 1em; }\n" +
  "  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n" +
  "    font-size: 1em; }\n" +
  "\n" +
  "body.swal2-toast-shown > .swal2-container {\n" +
  "  position: fixed;\n" +
  "  background-color: transparent; }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-shown {\n" +
  "    background-color: transparent; }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-top {\n" +
  "    top: 0;\n" +
  "    right: auto;\n" +
  "    bottom: auto;\n" +
  "    left: 50%;\n" +
  "    -webkit-transform: translateX(-50%);\n" +
  "            transform: translateX(-50%); }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n" +
  "    top: 0;\n" +
  "    right: 0;\n" +
  "    bottom: auto;\n" +
  "    left: auto; }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n" +
  "    top: 0;\n" +
  "    right: auto;\n" +
  "    bottom: auto;\n" +
  "    left: 0; }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n" +
  "    top: 50%;\n" +
  "    right: auto;\n" +
  "    bottom: auto;\n" +
  "    left: 0;\n" +
  "    -webkit-transform: translateY(-50%);\n" +
  "            transform: translateY(-50%); }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-center {\n" +
  "    top: 50%;\n" +
  "    right: auto;\n" +
  "    bottom: auto;\n" +
  "    left: 50%;\n" +
  "    -webkit-transform: translate(-50%, -50%);\n" +
  "            transform: translate(-50%, -50%); }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n" +
  "    top: 50%;\n" +
  "    right: 0;\n" +
  "    bottom: auto;\n" +
  "    left: auto;\n" +
  "    -webkit-transform: translateY(-50%);\n" +
  "            transform: translateY(-50%); }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n" +
  "    top: auto;\n" +
  "    right: auto;\n" +
  "    bottom: 0;\n" +
  "    left: 0; }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n" +
  "    top: auto;\n" +
  "    right: auto;\n" +
  "    bottom: 0;\n" +
  "    left: 50%;\n" +
  "    -webkit-transform: translateX(-50%);\n" +
  "            transform: translateX(-50%); }\n" +
  "  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n" +
  "    top: auto;\n" +
  "    right: 0;\n" +
  "    bottom: 0;\n" +
  "    left: auto; }\n" +
  "\n" +
  ".swal2-popup.swal2-toast {\n" +
  "  flex-direction: row;\n" +
  "  align-items: center;\n" +
  "  width: auto;\n" +
  "  padding: 0.625em;\n" +
  "  box-shadow: 0 0 0.625em #d9d9d9;\n" +
  "  overflow-y: hidden; }\n" +
  "  .swal2-popup.swal2-toast .swal2-header {\n" +
  "    flex-direction: row; }\n" +
  "  .swal2-popup.swal2-toast .swal2-title {\n" +
  "    justify-content: flex-start;\n" +
  "    margin: 0 .6em;\n" +
  "    font-size: 1em; }\n" +
  "  .swal2-popup.swal2-toast .swal2-close {\n" +
  "    position: initial; }\n" +
  "  .swal2-popup.swal2-toast .swal2-content {\n" +
  "    justify-content: flex-start;\n" +
  "    font-size: 1em; }\n" +
  "  .swal2-popup.swal2-toast .swal2-icon {\n" +
  "    width: 2em;\n" +
  "    min-width: 2em;\n" +
  "    height: 2em;\n" +
  "    margin: 0; }\n" +
  "    .swal2-popup.swal2-toast .swal2-icon-text {\n" +
  "      font-size: 2em;\n" +
  "      font-weight: bold;\n" +
  "      line-height: 1em; }\n" +
  "    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n" +
  "      width: 2em;\n" +
  "      height: 2em; }\n" +
  "    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n" +
  "      top: .875em;\n" +
  "      width: 1.375em; }\n" +
  "      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n" +
  "        left: .3125em; }\n" +
  "      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n" +
  "        right: .3125em; }\n" +
  "  .swal2-popup.swal2-toast .swal2-actions {\n" +
  "    height: auto;\n" +
  "    margin: 0 .3125em; }\n" +
  "  .swal2-popup.swal2-toast .swal2-styled {\n" +
  "    margin: 0 .3125em;\n" +
  "    padding: .3125em .625em;\n" +
  "    font-size: 1em; }\n" +
  "    .swal2-popup.swal2-toast .swal2-styled:focus {\n" +
  "      box-shadow: 0 0 0 0.0625em #fff, 0 0 0 0.125em rgba(50, 100, 150, 0.4); }\n" +
  "  .swal2-popup.swal2-toast .swal2-success {\n" +
  "    border-color: #a5dc86; }\n" +
  "    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n" +
  "      position: absolute;\n" +
  "      width: 2em;\n" +
  "      height: 2.8125em;\n" +
  "      -webkit-transform: rotate(45deg);\n" +
  "              transform: rotate(45deg);\n" +
  "      border-radius: 50%; }\n" +
  "      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n" +
  "        top: -.25em;\n" +
  "        left: -.9375em;\n" +
  "        -webkit-transform: rotate(-45deg);\n" +
  "                transform: rotate(-45deg);\n" +
  "        -webkit-transform-origin: 2em 2em;\n" +
  "                transform-origin: 2em 2em;\n" +
  "        border-radius: 4em 0 0 4em; }\n" +
  "      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n" +
  "        top: -.25em;\n" +
  "        left: .9375em;\n" +
  "        -webkit-transform-origin: 0 2em;\n" +
  "                transform-origin: 0 2em;\n" +
  "        border-radius: 0 4em 4em 0; }\n" +
  "    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n" +
  "      width: 2em;\n" +
  "      height: 2em; }\n" +
  "    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n" +
  "      top: 0;\n" +
  "      left: .4375em;\n" +
  "      width: .4375em;\n" +
  "      height: 2.6875em; }\n" +
  "    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n" +
  "      height: .3125em; }\n" +
  "      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n" +
  "        top: 1.125em;\n" +
  "        left: .1875em;\n" +
  "        width: .75em; }\n" +
  "      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n" +
  "        top: .9375em;\n" +
  "        right: .1875em;\n" +
  "        width: 1.375em; }\n" +
  "  .swal2-popup.swal2-toast.swal2-show {\n" +
  "    -webkit-animation: showSweetToast .5s;\n" +
  "            animation: showSweetToast .5s; }\n" +
  "  .swal2-popup.swal2-toast.swal2-hide {\n" +
  "    -webkit-animation: hideSweetToast .2s forwards;\n" +
  "            animation: hideSweetToast .2s forwards; }\n" +
  "  .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip {\n" +
  "    -webkit-animation: animate-toast-success-tip .75s;\n" +
  "            animation: animate-toast-success-tip .75s; }\n" +
  "  .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long {\n" +
  "    -webkit-animation: animate-toast-success-long .75s;\n" +
  "            animation: animate-toast-success-long .75s; }\n" +
  "\n" +
  "@-webkit-keyframes showSweetToast {\n" +
  "  0% {\n" +
  "    -webkit-transform: translateY(-0.625em) rotateZ(2deg);\n" +
  "            transform: translateY(-0.625em) rotateZ(2deg);\n" +
  "    opacity: 0; }\n" +
  "  33% {\n" +
  "    -webkit-transform: translateY(0) rotateZ(-2deg);\n" +
  "            transform: translateY(0) rotateZ(-2deg);\n" +
  "    opacity: .5; }\n" +
  "  66% {\n" +
  "    -webkit-transform: translateY(0.3125em) rotateZ(2deg);\n" +
  "            transform: translateY(0.3125em) rotateZ(2deg);\n" +
  "    opacity: .7; }\n" +
  "  100% {\n" +
  "    -webkit-transform: translateY(0) rotateZ(0);\n" +
  "            transform: translateY(0) rotateZ(0);\n" +
  "    opacity: 1; } }\n" +
  "\n" +
  "@keyframes showSweetToast {\n" +
  "  0% {\n" +
  "    -webkit-transform: translateY(-0.625em) rotateZ(2deg);\n" +
  "            transform: translateY(-0.625em) rotateZ(2deg);\n" +
  "    opacity: 0; }\n" +
  "  33% {\n" +
  "    -webkit-transform: translateY(0) rotateZ(-2deg);\n" +
  "            transform: translateY(0) rotateZ(-2deg);\n" +
  "    opacity: .5; }\n" +
  "  66% {\n" +
  "    -webkit-transform: translateY(0.3125em) rotateZ(2deg);\n" +
  "            transform: translateY(0.3125em) rotateZ(2deg);\n" +
  "    opacity: .7; }\n" +
  "  100% {\n" +
  "    -webkit-transform: translateY(0) rotateZ(0);\n" +
  "            transform: translateY(0) rotateZ(0);\n" +
  "    opacity: 1; } }\n" +
  "\n" +
  "@-webkit-keyframes hideSweetToast {\n" +
  "  0% {\n" +
  "    opacity: 1; }\n" +
  "  33% {\n" +
  "    opacity: .5; }\n" +
  "  100% {\n" +
  "    -webkit-transform: rotateZ(1deg);\n" +
  "            transform: rotateZ(1deg);\n" +
  "    opacity: 0; } }\n" +
  "\n" +
  "@keyframes hideSweetToast {\n" +
  "  0% {\n" +
  "    opacity: 1; }\n" +
  "  33% {\n" +
  "    opacity: .5; }\n" +
  "  100% {\n" +
  "    -webkit-transform: rotateZ(1deg);\n" +
  "            transform: rotateZ(1deg);\n" +
  "    opacity: 0; } }\n" +
  "\n" +
  "@-webkit-keyframes animate-toast-success-tip {\n" +
  "  0% {\n" +
  "    top: .5625em;\n" +
  "    left: .0625em;\n" +
  "    width: 0; }\n" +
  "  54% {\n" +
  "    top: .125em;\n" +
  "    left: .125em;\n" +
  "    width: 0; }\n" +
  "  70% {\n" +
  "    top: .625em;\n" +
  "    left: -.25em;\n" +
  "    width: 1.625em; }\n" +
  "  84% {\n" +
  "    top: 1.0625em;\n" +
  "    left: .75em;\n" +
  "    width: .5em; }\n" +
  "  100% {\n" +
  "    top: 1.125em;\n" +
  "    left: .1875em;\n" +
  "    width: .75em; } }\n" +
  "\n" +
  "@keyframes animate-toast-success-tip {\n" +
  "  0% {\n" +
  "    top: .5625em;\n" +
  "    left: .0625em;\n" +
  "    width: 0; }\n" +
  "  54% {\n" +
  "    top: .125em;\n" +
  "    left: .125em;\n" +
  "    width: 0; }\n" +
  "  70% {\n" +
  "    top: .625em;\n" +
  "    left: -.25em;\n" +
  "    width: 1.625em; }\n" +
  "  84% {\n" +
  "    top: 1.0625em;\n" +
  "    left: .75em;\n" +
  "    width: .5em; }\n" +
  "  100% {\n" +
  "    top: 1.125em;\n" +
  "    left: .1875em;\n" +
  "    width: .75em; } }\n" +
  "\n" +
  "@-webkit-keyframes animate-toast-success-long {\n" +
  "  0% {\n" +
  "    top: 1.625em;\n" +
  "    right: 1.375em;\n" +
  "    width: 0; }\n" +
  "  65% {\n" +
  "    top: 1.25em;\n" +
  "    right: .9375em;\n" +
  "    width: 0; }\n" +
  "  84% {\n" +
  "    top: .9375em;\n" +
  "    right: 0;\n" +
  "    width: 1.125em; }\n" +
  "  100% {\n" +
  "    top: .9375em;\n" +
  "    right: .1875em;\n" +
  "    width: 1.375em; } }\n" +
  "\n" +
  "@keyframes animate-toast-success-long {\n" +
  "  0% {\n" +
  "    top: 1.625em;\n" +
  "    right: 1.375em;\n" +
  "    width: 0; }\n" +
  "  65% {\n" +
  "    top: 1.25em;\n" +
  "    right: .9375em;\n" +
  "    width: 0; }\n" +
  "  84% {\n" +
  "    top: .9375em;\n" +
  "    right: 0;\n" +
  "    width: 1.125em; }\n" +
  "  100% {\n" +
  "    top: .9375em;\n" +
  "    right: .1875em;\n" +
  "    width: 1.375em; } }\n" +
  "\n" +
  "body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n" +
  "  overflow-y: hidden; }\n" +
  "\n" +
  "body.swal2-height-auto {\n" +
  "  height: auto !important; }\n" +
  "\n" +
  "body.swal2-no-backdrop .swal2-shown {\n" +
  "  top: auto;\n" +
  "  right: auto;\n" +
  "  bottom: auto;\n" +
  "  left: auto;\n" +
  "  background-color: transparent; }\n" +
  "  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n" +
  "    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-top {\n" +
  "    top: 0;\n" +
  "    left: 50%;\n" +
  "    -webkit-transform: translateX(-50%);\n" +
  "            transform: translateX(-50%); }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n" +
  "    top: 0;\n" +
  "    left: 0; }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n" +
  "    top: 0;\n" +
  "    right: 0; }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-center {\n" +
  "    top: 50%;\n" +
  "    left: 50%;\n" +
  "    -webkit-transform: translate(-50%, -50%);\n" +
  "            transform: translate(-50%, -50%); }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n" +
  "    top: 50%;\n" +
  "    left: 0;\n" +
  "    -webkit-transform: translateY(-50%);\n" +
  "            transform: translateY(-50%); }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n" +
  "    top: 50%;\n" +
  "    right: 0;\n" +
  "    -webkit-transform: translateY(-50%);\n" +
  "            transform: translateY(-50%); }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n" +
  "    bottom: 0;\n" +
  "    left: 50%;\n" +
  "    -webkit-transform: translateX(-50%);\n" +
  "            transform: translateX(-50%); }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n" +
  "    bottom: 0;\n" +
  "    left: 0; }\n" +
  "  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n" +
  "    right: 0;\n" +
  "    bottom: 0; }\n" +
  "\n" +
  ".swal2-container {\n" +
  "  display: flex;\n" +
  "  position: fixed;\n" +
  "  top: 0;\n" +
  "  right: 0;\n" +
  "  bottom: 0;\n" +
  "  left: 0;\n" +
  "  flex-direction: row;\n" +
  "  align-items: center;\n" +
  "  justify-content: center;\n" +
  "  padding: 10px;\n" +
  "  background-color: transparent;\n" +
  "  z-index: 1060;\n" +
  "  overflow-x: hidden;\n" +
  "  -webkit-overflow-scrolling: touch; }\n" +
  "  .swal2-container.swal2-top {\n" +
  "    align-items: flex-start; }\n" +
  "  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n" +
  "    align-items: flex-start;\n" +
  "    justify-content: flex-start; }\n" +
  "  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n" +
  "    align-items: flex-start;\n" +
  "    justify-content: flex-end; }\n" +
  "  .swal2-container.swal2-center {\n" +
  "    align-items: center; }\n" +
  "  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n" +
  "    align-items: center;\n" +
  "    justify-content: flex-start; }\n" +
  "  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n" +
  "    align-items: center;\n" +
  "    justify-content: flex-end; }\n" +
  "  .swal2-container.swal2-bottom {\n" +
  "    align-items: flex-end; }\n" +
  "  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n" +
  "    align-items: flex-end;\n" +
  "    justify-content: flex-start; }\n" +
  "  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n" +
  "    align-items: flex-end;\n" +
  "    justify-content: flex-end; }\n" +
  "  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n" +
  "    display: flex !important;\n" +
  "    flex: 1;\n" +
  "    align-self: stretch;\n" +
  "    justify-content: center; }\n" +
  "  .swal2-container.swal2-grow-row > .swal2-modal {\n" +
  "    display: flex !important;\n" +
  "    flex: 1;\n" +
  "    align-content: center;\n" +
  "    justify-content: center; }\n" +
  "  .swal2-container.swal2-grow-column {\n" +
  "    flex: 1;\n" +
  "    flex-direction: column; }\n" +
  "    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n" +
  "      align-items: center; }\n" +
  "    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n" +
  "      align-items: flex-start; }\n" +
  "    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n" +
  "      align-items: flex-end; }\n" +
  "    .swal2-container.swal2-grow-column > .swal2-modal {\n" +
  "      display: flex !important;\n" +
  "      flex: 1;\n" +
  "      align-content: center;\n" +
  "      justify-content: center; }\n" +
  "  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n" +
  "    margin: auto; }\n" +
  "  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n" +
  "    .swal2-container .swal2-modal {\n" +
  "      margin: 0 !important; } }\n" +
  "  .swal2-container.swal2-fade {\n" +
  "    transition: background-color .1s; }\n" +
  "  .swal2-container.swal2-shown {\n" +
  "    background-color: rgba(0, 0, 0, 0.4); }\n" +
  "\n" +
  ".swal2-popup {\n" +
  "  display: none;\n" +
  "  position: relative;\n" +
  "  flex-direction: column;\n" +
  "  justify-content: center;\n" +
  "  width: 32em;\n" +
  "  max-width: 100%;\n" +
  "  padding: 1.25em;\n" +
  "  border-radius: 0.3125em;\n" +
  "  background: #fff;\n" +
  "  font-family: inherit;\n" +
  "  font-size: 1rem;\n" +
  "  box-sizing: border-box; }\n" +
  "  .swal2-popup:focus {\n" +
  "    outline: none; }\n" +
  "  .swal2-popup.swal2-loading {\n" +
  "    overflow-y: hidden; }\n" +
  "  .swal2-popup .swal2-header {\n" +
  "    display: flex;\n" +
  "    flex-direction: column;\n" +
  "    align-items: center; }\n" +
  "  .swal2-popup .swal2-title {\n" +
  "    display: block;\n" +
  "    position: relative;\n" +
  "    max-width: 100%;\n" +
  "    margin: 0 0 0.4em;\n" +
  "    padding: 0;\n" +
  "    color: #595959;\n" +
  "    font-size: 1.875em;\n" +
  "    font-weight: 600;\n" +
  "    text-align: center;\n" +
  "    text-transform: none;\n" +
  "    word-wrap: break-word; }\n" +
  "  .swal2-popup .swal2-actions {\n" +
  "    align-items: center;\n" +
  "    justify-content: center;\n" +
  "    margin: 1.25em auto 0; }\n" +
  "    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n" +
  "      opacity: .4; }\n" +
  "    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {\n" +
  "      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }\n" +
  "    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {\n" +
  "      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }\n" +
  "    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n" +
  "      width: 2.5em;\n" +
  "      height: 2.5em;\n" +
  "      margin: .46875em;\n" +
  "      padding: 0;\n" +
  "      border: .25em solid transparent;\n" +
  "      border-radius: 100%;\n" +
  "      border-color: transparent;\n" +
  "      background-color: transparent !important;\n" +
  "      color: transparent;\n" +
  "      cursor: default;\n" +
  "      box-sizing: border-box;\n" +
  "      -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
  "              animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
  "      -webkit-user-select: none;\n" +
  "         -moz-user-select: none;\n" +
  "          -ms-user-select: none;\n" +
  "              user-select: none; }\n" +
  "    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n" +
  "      margin-right: 30px;\n" +
  "      margin-left: 30px; }\n" +
  "    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n" +
  "      display: inline-block;\n" +
  "      width: 15px;\n" +
  "      height: 15px;\n" +
  "      margin-left: 5px;\n" +
  "      border: 3px solid #999999;\n" +
  "      border-radius: 50%;\n" +
  "      border-right-color: transparent;\n" +
  "      box-shadow: 1px 1px 1px #fff;\n" +
  "      content: '';\n" +
  "      -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
  "              animation: swal2-rotate-loading 1.5s linear 0s infinite normal; }\n" +
  "  .swal2-popup .swal2-styled {\n" +
  "    margin: 0 .3125em;\n" +
  "    padding: .625em 2em;\n" +
  "    font-weight: 500;\n" +
  "    box-shadow: none; }\n" +
  "    .swal2-popup .swal2-styled:not([disabled]) {\n" +
  "      cursor: pointer; }\n" +
  "    .swal2-popup .swal2-styled.swal2-confirm {\n" +
  "      border: 0;\n" +
  "      border-radius: 0.25em;\n" +
  "      background: initial;\n" +
  "      background-color: #3085d6;\n" +
  "      color: #fff;\n" +
  "      font-size: 1.0625em; }\n" +
  "    .swal2-popup .swal2-styled.swal2-cancel {\n" +
  "      border: 0;\n" +
  "      border-radius: 0.25em;\n" +
  "      background: initial;\n" +
  "      background-color: #aaa;\n" +
  "      color: #fff;\n" +
  "      font-size: 1.0625em; }\n" +
  "    .swal2-popup .swal2-styled:focus {\n" +
  "      outline: none;\n" +
  "      box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n" +
  "    .swal2-popup .swal2-styled::-moz-focus-inner {\n" +
  "      border: 0; }\n" +
  "  .swal2-popup .swal2-footer {\n" +
  "    justify-content: center;\n" +
  "    margin: 1.25em 0 0;\n" +
  "    padding-top: 1em;\n" +
  "    border-top: 1px solid #eee;\n" +
  "    color: #545454;\n" +
  "    font-size: 1em; }\n" +
  "  .swal2-popup .swal2-image {\n" +
  "    max-width: 100%;\n" +
  "    margin: 1.25em auto; }\n" +
  "  .swal2-popup .swal2-close {\n" +
  "    position: absolute;\n" +
  "    top: 0;\n" +
  "    right: 0;\n" +
  "    justify-content: center;\n" +
  "    width: 1.2em;\n" +
  "    height: 1.2em;\n" +
  "    padding: 0;\n" +
  "    transition: color 0.1s ease-out;\n" +
  "    border: none;\n" +
  "    border-radius: 0;\n" +
  "    background: transparent;\n" +
  "    color: #cccccc;\n" +
  "    font-family: serif;\n" +
  "    font-size: 2.5em;\n" +
  "    line-height: 1.2;\n" +
  "    cursor: pointer;\n" +
  "    overflow: hidden; }\n" +
  "    .swal2-popup .swal2-close:hover {\n" +
  "      -webkit-transform: none;\n" +
  "              transform: none;\n" +
  "      color: #f27474; }\n" +
  "  .swal2-popup > .swal2-input,\n" +
  "  .swal2-popup > .swal2-file,\n" +
  "  .swal2-popup > .swal2-textarea,\n" +
  "  .swal2-popup > .swal2-select,\n" +
  "  .swal2-popup > .swal2-radio,\n" +
  "  .swal2-popup > .swal2-checkbox {\n" +
  "    display: none; }\n" +
  "  .swal2-popup .swal2-content {\n" +
  "    justify-content: center;\n" +
  "    margin: 0;\n" +
  "    padding: 0;\n" +
  "    color: #545454;\n" +
  "    font-size: 1.125em;\n" +
  "    font-weight: 300;\n" +
  "    line-height: normal;\n" +
  "    word-wrap: break-word; }\n" +
  "  .swal2-popup #swal2-content {\n" +
  "    text-align: center; }\n" +
  "  .swal2-popup .swal2-input,\n" +
  "  .swal2-popup .swal2-file,\n" +
  "  .swal2-popup .swal2-textarea,\n" +
  "  .swal2-popup .swal2-select,\n" +
  "  .swal2-popup .swal2-radio,\n" +
  "  .swal2-popup .swal2-checkbox {\n" +
  "    margin: 1em auto; }\n" +
  "  .swal2-popup .swal2-input,\n" +
  "  .swal2-popup .swal2-file,\n" +
  "  .swal2-popup .swal2-textarea {\n" +
  "    width: 100%;\n" +
  "    transition: border-color .3s, box-shadow .3s;\n" +
  "    border: 1px solid #d9d9d9;\n" +
  "    border-radius: 0.1875em;\n" +
  "    font-size: 1.125em;\n" +
  "    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n" +
  "    box-sizing: border-box; }\n" +
  "    .swal2-popup .swal2-input.swal2-inputerror,\n" +
  "    .swal2-popup .swal2-file.swal2-inputerror,\n" +
  "    .swal2-popup .swal2-textarea.swal2-inputerror {\n" +
  "      border-color: #f27474 !important;\n" +
  "      box-shadow: 0 0 2px #f27474 !important; }\n" +
  "    .swal2-popup .swal2-input:focus,\n" +
  "    .swal2-popup .swal2-file:focus,\n" +
  "    .swal2-popup .swal2-textarea:focus {\n" +
  "      border: 1px solid #b4dbed;\n" +
  "      outline: none;\n" +
  "      box-shadow: 0 0 3px #c4e6f5; }\n" +
  "    .swal2-popup .swal2-input::-webkit-input-placeholder,\n" +
  "    .swal2-popup .swal2-file::-webkit-input-placeholder,\n" +
  "    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n" +
  "      color: #cccccc; }\n" +
  "    .swal2-popup .swal2-input:-ms-input-placeholder,\n" +
  "    .swal2-popup .swal2-file:-ms-input-placeholder,\n" +
  "    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n" +
  "      color: #cccccc; }\n" +
  "    .swal2-popup .swal2-input::-ms-input-placeholder,\n" +
  "    .swal2-popup .swal2-file::-ms-input-placeholder,\n" +
  "    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n" +
  "      color: #cccccc; }\n" +
  "    .swal2-popup .swal2-input::placeholder,\n" +
  "    .swal2-popup .swal2-file::placeholder,\n" +
  "    .swal2-popup .swal2-textarea::placeholder {\n" +
  "      color: #cccccc; }\n" +
  "  .swal2-popup .swal2-range input {\n" +
  "    width: 80%; }\n" +
  "  .swal2-popup .swal2-range output {\n" +
  "    width: 20%;\n" +
  "    font-weight: 600;\n" +
  "    text-align: center; }\n" +
  "  .swal2-popup .swal2-range input,\n" +
  "  .swal2-popup .swal2-range output {\n" +
  "    height: 2.625em;\n" +
  "    margin: 1em auto;\n" +
  "    padding: 0;\n" +
  "    font-size: 1.125em;\n" +
  "    line-height: 2.625em; }\n" +
  "  .swal2-popup .swal2-input {\n" +
  "    height: 2.625em;\n" +
  "    padding: 0.75em; }\n" +
  "    .swal2-popup .swal2-input[type='number'] {\n" +
  "      max-width: 10em; }\n" +
  "  .swal2-popup .swal2-file {\n" +
  "    font-size: 1.125em; }\n" +
  "  .swal2-popup .swal2-textarea {\n" +
  "    height: 6.75em;\n" +
  "    padding: 0.75em; }\n" +
  "  .swal2-popup .swal2-select {\n" +
  "    min-width: 50%;\n" +
  "    max-width: 100%;\n" +
  "    padding: .375em .625em;\n" +
  "    color: #545454;\n" +
  "    font-size: 1.125em; }\n" +
  "  .swal2-popup .swal2-radio,\n" +
  "  .swal2-popup .swal2-checkbox {\n" +
  "    align-items: center;\n" +
  "    justify-content: center; }\n" +
  "    .swal2-popup .swal2-radio label,\n" +
  "    .swal2-popup .swal2-checkbox label {\n" +
  "      margin: 0 .6em;\n" +
  "      font-size: 1.125em; }\n" +
  "    .swal2-popup .swal2-radio input,\n" +
  "    .swal2-popup .swal2-checkbox input {\n" +
  "      margin: 0 .4em; }\n" +
  "  .swal2-popup .swal2-validationerror {\n" +
  "    display: none;\n" +
  "    align-items: center;\n" +
  "    justify-content: center;\n" +
  "    padding: 0.625em;\n" +
  "    background: #f0f0f0;\n" +
  "    color: #666666;\n" +
  "    font-size: 1em;\n" +
  "    font-weight: 300;\n" +
  "    overflow: hidden; }\n" +
  "    .swal2-popup .swal2-validationerror::before {\n" +
  "      display: inline-block;\n" +
  "      width: 1.5em;\n" +
  "      min-width: 1.5em;\n" +
  "      height: 1.5em;\n" +
  "      margin: 0 .625em;\n" +
  "      border-radius: 50%;\n" +
  "      background-color: #f27474;\n" +
  "      color: #fff;\n" +
  "      font-weight: 600;\n" +
  "      line-height: 1.5em;\n" +
  "      text-align: center;\n" +
  "      content: '!';\n" +
  "      zoom: normal; }\n" +
  "\n" +
  "@supports (-ms-accelerator: true) {\n" +
  "  .swal2-range input {\n" +
  "    width: 100% !important; }\n" +
  "  .swal2-range output {\n" +
  "    display: none; } }\n" +
  "\n" +
  "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n" +
  "  .swal2-range input {\n" +
  "    width: 100% !important; }\n" +
  "  .swal2-range output {\n" +
  "    display: none; } }\n" +
  "\n" +
  "@-moz-document url-prefix() {\n" +
  "  .swal2-close:focus {\n" +
  "    outline: 2px solid rgba(50, 100, 150, 0.4); } }\n" +
  "\n" +
  ".swal2-icon {\n" +
  "  position: relative;\n" +
  "  justify-content: center;\n" +
  "  width: 5em;\n" +
  "  height: 5em;\n" +
  "  margin: 1.25em auto 1.875em;\n" +
  "  border: .25em solid transparent;\n" +
  "  border-radius: 50%;\n" +
  "  line-height: 5em;\n" +
  "  cursor: default;\n" +
  "  box-sizing: content-box;\n" +
  "  -webkit-user-select: none;\n" +
  "     -moz-user-select: none;\n" +
  "      -ms-user-select: none;\n" +
  "          user-select: none;\n" +
  "  zoom: normal; }\n" +
  "  .swal2-icon-text {\n" +
  "    font-size: 3.75em; }\n" +
  "  .swal2-icon.swal2-error {\n" +
  "    border-color: #f27474; }\n" +
  "    .swal2-icon.swal2-error .swal2-x-mark {\n" +
  "      position: relative;\n" +
  "      flex-grow: 1; }\n" +
  "    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n" +
  "      display: block;\n" +
  "      position: absolute;\n" +
  "      top: 2.3125em;\n" +
  "      width: 2.9375em;\n" +
  "      height: .3125em;\n" +
  "      border-radius: .125em;\n" +
  "      background-color: #f27474; }\n" +
  "      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n" +
  "        left: 1.0625em;\n" +
  "        -webkit-transform: rotate(45deg);\n" +
  "                transform: rotate(45deg); }\n" +
  "      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n" +
  "        right: 1em;\n" +
  "        -webkit-transform: rotate(-45deg);\n" +
  "                transform: rotate(-45deg); }\n" +
  "  .swal2-icon.swal2-warning {\n" +
  "    border-color: #facea8;\n" +
  "    color: #f8bb86; }\n" +
  "  .swal2-icon.swal2-info {\n" +
  "    border-color: #9de0f6;\n" +
  "    color: #3fc3ee; }\n" +
  "  .swal2-icon.swal2-question {\n" +
  "    border-color: #c9dae1;\n" +
  "    color: #87adbd; }\n" +
  "  .swal2-icon.swal2-success {\n" +
  "    border-color: #a5dc86; }\n" +
  "    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n" +
  "      position: absolute;\n" +
  "      width: 3.75em;\n" +
  "      height: 7.5em;\n" +
  "      -webkit-transform: rotate(45deg);\n" +
  "              transform: rotate(45deg);\n" +
  "      border-radius: 50%; }\n" +
  "      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n" +
  "        top: -.4375em;\n" +
  "        left: -2.0635em;\n" +
  "        -webkit-transform: rotate(-45deg);\n" +
  "                transform: rotate(-45deg);\n" +
  "        -webkit-transform-origin: 3.75em 3.75em;\n" +
  "                transform-origin: 3.75em 3.75em;\n" +
  "        border-radius: 7.5em 0 0 7.5em; }\n" +
  "      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n" +
  "        top: -.6875em;\n" +
  "        left: 1.875em;\n" +
  "        -webkit-transform: rotate(-45deg);\n" +
  "                transform: rotate(-45deg);\n" +
  "        -webkit-transform-origin: 0 3.75em;\n" +
  "                transform-origin: 0 3.75em;\n" +
  "        border-radius: 0 7.5em 7.5em 0; }\n" +
  "    .swal2-icon.swal2-success .swal2-success-ring {\n" +
  "      position: absolute;\n" +
  "      top: -.25em;\n" +
  "      left: -.25em;\n" +
  "      width: 100%;\n" +
  "      height: 100%;\n" +
  "      border: 0.25em solid rgba(165, 220, 134, 0.3);\n" +
  "      border-radius: 50%;\n" +
  "      z-index: 2;\n" +
  "      box-sizing: content-box; }\n" +
  "    .swal2-icon.swal2-success .swal2-success-fix {\n" +
  "      position: absolute;\n" +
  "      top: .5em;\n" +
  "      left: 1.625em;\n" +
  "      width: .4375em;\n" +
  "      height: 5.625em;\n" +
  "      -webkit-transform: rotate(-45deg);\n" +
  "              transform: rotate(-45deg);\n" +
  "      z-index: 1; }\n" +
  "    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n" +
  "      display: block;\n" +
  "      position: absolute;\n" +
  "      height: .3125em;\n" +
  "      border-radius: .125em;\n" +
  "      background-color: #a5dc86;\n" +
  "      z-index: 2; }\n" +
  "      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n" +
  "        top: 2.875em;\n" +
  "        left: .875em;\n" +
  "        width: 1.5625em;\n" +
  "        -webkit-transform: rotate(45deg);\n" +
  "                transform: rotate(45deg); }\n" +
  "      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n" +
  "        top: 2.375em;\n" +
  "        right: .5em;\n" +
  "        width: 2.9375em;\n" +
  "        -webkit-transform: rotate(-45deg);\n" +
  "                transform: rotate(-45deg); }\n" +
  "\n" +
  ".swal2-progresssteps {\n" +
  "  align-items: center;\n" +
  "  margin: 0 0 1.25em;\n" +
  "  padding: 0;\n" +
  "  font-weight: 600; }\n" +
  "  .swal2-progresssteps li {\n" +
  "    display: inline-block;\n" +
  "    position: relative; }\n" +
  "  .swal2-progresssteps .swal2-progresscircle {\n" +
  "    width: 2em;\n" +
  "    height: 2em;\n" +
  "    border-radius: 2em;\n" +
  "    background: #3085d6;\n" +
  "    color: #fff;\n" +
  "    line-height: 2em;\n" +
  "    text-align: center;\n" +
  "    z-index: 20; }\n" +
  "    .swal2-progresssteps .swal2-progresscircle:first-child {\n" +
  "      margin-left: 0; }\n" +
  "    .swal2-progresssteps .swal2-progresscircle:last-child {\n" +
  "      margin-right: 0; }\n" +
  "    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n" +
  "      background: #3085d6; }\n" +
  "      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n" +
  "        background: #add8e6; }\n" +
  "      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n" +
  "        background: #add8e6; }\n" +
  "  .swal2-progresssteps .swal2-progressline {\n" +
  "    width: 2.5em;\n" +
  "    height: .4em;\n" +
  "    margin: 0 -1px;\n" +
  "    background: #3085d6;\n" +
  "    z-index: 10; }\n" +
  "\n" +
  "[class^='swal2'] {\n" +
  "  -webkit-tap-highlight-color: transparent; }\n" +
  "\n" +
  ".swal2-show {\n" +
  "  -webkit-animation: swal2-show 0.3s;\n" +
  "          animation: swal2-show 0.3s; }\n" +
  "  .swal2-show.swal2-noanimation {\n" +
  "    -webkit-animation: none;\n" +
  "            animation: none; }\n" +
  "\n" +
  ".swal2-hide {\n" +
  "  -webkit-animation: swal2-hide 0.15s forwards;\n" +
  "          animation: swal2-hide 0.15s forwards; }\n" +
  "  .swal2-hide.swal2-noanimation {\n" +
  "    -webkit-animation: none;\n" +
  "            animation: none; }\n" +
  "\n" +
  "[dir='rtl'] .swal2-close {\n" +
  "  right: auto;\n" +
  "  left: 0; }\n" +
  "\n" +
  ".swal2-animate-success-icon .swal2-success-line-tip {\n" +
  "  -webkit-animation: swal2-animate-success-line-tip 0.75s;\n" +
  "          animation: swal2-animate-success-line-tip 0.75s; }\n" +
  "\n" +
  ".swal2-animate-success-icon .swal2-success-line-long {\n" +
  "  -webkit-animation: swal2-animate-success-line-long 0.75s;\n" +
  "          animation: swal2-animate-success-line-long 0.75s; }\n" +
  "\n" +
  ".swal2-animate-success-icon .swal2-success-circular-line-right {\n" +
  "  -webkit-animation: swal2-rotate-success-circular-line 4.25s ease-in;\n" +
  "          animation: swal2-rotate-success-circular-line 4.25s ease-in; }\n" +
  "\n" +
  ".swal2-animate-error-icon {\n" +
  "  -webkit-animation: swal2-animate-error-icon 0.5s;\n" +
  "          animation: swal2-animate-error-icon 0.5s; }\n" +
  "  .swal2-animate-error-icon .swal2-x-mark {\n" +
  "    -webkit-animation: swal2-animate-error-x-mark 0.5s;\n" +
  "            animation: swal2-animate-error-x-mark 0.5s; }\n" +
  "\n" +
  "@-webkit-keyframes swal2-rotate-loading {\n" +
  "  0% {\n" +
  "    -webkit-transform: rotate(0deg);\n" +
  "            transform: rotate(0deg); }\n" +
  "  100% {\n" +
  "    -webkit-transform: rotate(360deg);\n" +
  "            transform: rotate(360deg); } }\n" +
  "\n" +
  "@keyframes swal2-rotate-loading {\n" +
  "  0% {\n" +
  "    -webkit-transform: rotate(0deg);\n" +
  "            transform: rotate(0deg); }\n" +
  "  100% {\n" +
  "    -webkit-transform: rotate(360deg);\n" +
  "            transform: rotate(360deg); } }");
/*!
 * Bootstrap-select v1.13.1 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2018 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function(a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function(jQuery) {

  (function($) {
    'use strict';

    var testElement = document.createElement('_');

    testElement.classList.toggle('c3', false);

    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains('c3')) {
      var _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function(token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        } else {
          return _toggle.call(this, token);
        }
      };
    }

    // shallow array comparison
    function isEqual(array1, array2) {
      return array1.length === array2.length && array1.every(function(element, index) {
        return element === array2[index];
      });
    };

    //<editor-fold desc="Shims">
    if (!String.prototype.startsWith) {
      (function() {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function() {
          // IE 8 only supports `Object.defineProperty` on DOM elements
          try {
            var object = {};
            var $defineProperty = Object.defineProperty;
            var result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {}
          return result;
        }());
        var toString = {}.toString;
        var startsWith = function(search) {
          if (this == null) {
            throw new TypeError();
          }
          var string = String(this);
          if (search && toString.call(search) == '[object RegExp]') {
            throw new TypeError();
          }
          var stringLength = string.length;
          var searchString = String(search);
          var searchLength = searchString.length;
          var position = arguments.length > 1 ? arguments[1] : undefined;
          // `ToInteger`
          var pos = position ? Number(position) : 0;
          if (pos != pos) { // better `isNaN`
            pos = 0;
          }
          var start = Math.min(Math.max(pos, 0), stringLength);
          // Avoid the `indexOf` call if no match is possible
          if (searchLength + start > stringLength) {
            return false;
          }
          var index = -1;
          while (++index < searchLength) {
            if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
              return false;
            }
          }
          return true;
        };
        if (defineProperty) {
          defineProperty(String.prototype, 'startsWith', {
            'value': startsWith,
            'configurable': true,
            'writable': true
          });
        } else {
          String.prototype.startsWith = startsWith;
        }
      }());
    }

    if (!Object.keys) {
      Object.keys = function(
        o, // object
        k, // key
        r // result array
      ) {
        // initialize object and result
        r = [];
        // iterate over object keys
        for (k in o)
          // fill result array with non-prototypical keys
          r.hasOwnProperty.call(o, k) && r.push(k);
        // return result
        return r;
      };
    }

    // much faster than $.val()
    function getSelectValues(select) {
      var result = [];
      var options = select && select.options;
      var opt;

      if (select.multiple) {
        for (var i = 0, len = options.length; i < len; i++) {
          opt = options[i];

          if (opt.selected) {
            result.push(opt.value || opt.text);
          }
        }
      } else {
        result = select.value;
      }

      return result;
    }

    // set data-selected on select element if the value has been programmatically selected
    // prior to initialization of bootstrap-select
    // * consider removing or replacing an alternative method *
    var valHooks = {
      useDefault: false,
      _set: $.valHooks.select.set
    };

    $.valHooks.select.set = function(elem, value) {
      if (value && !valHooks.useDefault) $(elem).data('selected', true);

      return valHooks._set.apply(this, arguments);
    };

    var changed_arguments = null;

    var EventIsSupported = (function() {
      try {
        new Event('change');
        return true;
      } catch (e) {
        return false;
      }
    })();

    $.fn.triggerNative = function(eventName) {
      var el = this[0],
        event;

      if (el.dispatchEvent) { // for modern browsers & IE9+
        if (EventIsSupported) {
          // For modern browsers
          event = new Event(eventName, {
            bubbles: true
          });
        } else {
          // For IE since it doesn't support Event constructor
          event = document.createEvent('Event');
          event.initEvent(eventName, true, false);
        }

        el.dispatchEvent(event);
      } else if (el.fireEvent) { // for IE8
        event = document.createEventObject();
        event.eventType = eventName;
        el.fireEvent('on' + eventName, event);
      } else {
        // fall back to jQuery.trigger
        this.trigger(eventName);
      }
    };
    //</editor-fold>

    function stringSearch(li, searchString, method, normalize) {
      var stringTypes = [
          'content',
          'subtext',
          'tokens'
        ],
        searchSuccess = false;

      for (var i = 0; i < stringTypes.length; i++) {
        var stringType = stringTypes[i],
          string = li[stringType];

        if (string) {
          string = string.toString();

          // Strip HTML tags. This isn't perfect, but it's much faster than any other method
          if (stringType === 'content') {
            string = string.replace(/<[^>]+>/g, '');
          }

          if (normalize) string = normalizeToBase(string);
          string = string.toUpperCase();

          if (method === 'contains') {
            searchSuccess = string.indexOf(searchString) >= 0;
          } else {
            searchSuccess = string.startsWith(searchString);
          }

          if (searchSuccess) break;
        }
      }

      return searchSuccess;
    }

    function toInteger(value) {
      return parseInt(value, 10) || 0;
    }

    /**
     * Remove all diatrics from the given text.
     * @access private
     * @param {String} text
     * @returns {String}
     */
    function normalizeToBase(text) {
      var rExps = [{
          re: /[\xC0-\xC6]/g,
          ch: "A"
        },
        {
          re: /[\xE0-\xE6]/g,
          ch: "a"
        },
        {
          re: /[\xC8-\xCB]/g,
          ch: "E"
        },
        {
          re: /[\xE8-\xEB]/g,
          ch: "e"
        },
        {
          re: /[\xCC-\xCF]/g,
          ch: "I"
        },
        {
          re: /[\xEC-\xEF]/g,
          ch: "i"
        },
        {
          re: /[\xD2-\xD6]/g,
          ch: "O"
        },
        {
          re: /[\xF2-\xF6]/g,
          ch: "o"
        },
        {
          re: /[\xD9-\xDC]/g,
          ch: "U"
        },
        {
          re: /[\xF9-\xFC]/g,
          ch: "u"
        },
        {
          re: /[\xC7-\xE7]/g,
          ch: "c"
        },
        {
          re: /[\xD1]/g,
          ch: "N"
        },
        {
          re: /[\xF1]/g,
          ch: "n"
        }
      ];
      $.each(rExps, function() {
        text = text ? text.replace(this.re, this.ch) : '';
      });
      return text;
    }


    // List of HTML entities for escaping.
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    };

    var unescapeMap = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x60;': '`'
    };

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function(map) {
      var escaper = function(match) {
        return map[match];
      };
      // Regexes for identifying a key that needs to be escaped.
      var source = '(?:' + Object.keys(map).join('|') + ')';
      var testRegexp = RegExp(source);
      var replaceRegexp = RegExp(source, 'g');
      return function(string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
      };
    };

    var htmlEscape = createEscaper(escapeMap);
    var htmlUnescape = createEscaper(unescapeMap);

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var keyCodeMap = {
      32: ' ',
      48: '0',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',
      59: ';',
      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z',
      96: '0',
      97: '1',
      98: '2',
      99: '3',
      100: '4',
      101: '5',
      102: '6',
      103: '7',
      104: '8',
      105: '9'
    };

    var keyCodes = {
      ESCAPE: 27, // KeyboardEvent.which value for Escape (Esc) key
      ENTER: 13, // KeyboardEvent.which value for Enter key
      SPACE: 32, // KeyboardEvent.which value for space key
      TAB: 9, // KeyboardEvent.which value for tab key
      ARROW_UP: 38, // KeyboardEvent.which value for up arrow key
      ARROW_DOWN: 40 // KeyboardEvent.which value for down arrow key
    }

    var version = {};

    try {
      version.full = ($.fn.dropdown.Constructor.VERSION || '').split(' ')[0].split('.');
      version.major = version.full[0];
    } catch (err) {
      console.error('There was an issue retrieving Bootstrap\'s version. Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision.', err);
      version.major = '3';
    }

    var classNames = {
      DISABLED: 'disabled',
      DIVIDER: version.major === '4' ? 'dropdown-divider' : 'divider',
      SHOW: version.major === '4' ? 'show' : 'open',
      DROPUP: 'dropup',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      // to-do: replace with more advanced template/customization options
      BUTTONCLASS: version.major === '4' ? 'btn-light' : 'btn-default',
      POPOVERHEADER: version.major === '4' ? 'popover-header' : 'popover-title'
    }

    var REGEXP_ARROW = new RegExp(keyCodes.ARROW_UP + '|' + keyCodes.ARROW_DOWN);
    var REGEXP_TAB_OR_ESCAPE = new RegExp('^' + keyCodes.TAB + '$|' + keyCodes.ESCAPE);
    var REGEXP_ENTER_OR_SPACE = new RegExp(keyCodes.ENTER + '|' + keyCodes.SPACE);

    var Selectpicker = function(element, options) {
      var that = this;

      // bootstrap-select has been initialized - revert valHooks.select.set back to its original function
      if (!valHooks.useDefault) {
        $.valHooks.select.set = valHooks._set;
        valHooks.useDefault = true;
      }

      this.$element = $(element);
      this.$newElement = null;
      this.$button = null;
      this.$menu = null;
      this.options = options;
      this.selectpicker = {
        main: {
          // store originalIndex (key) and newIndex (value) in this.selectpicker.main.map.newIndex for fast accessibility
          // allows us to do this.main.elements[this.selectpicker.main.map.newIndex[index]] to select an element based on the originalIndex
          map: {
            newIndex: {},
            originalIndex: {}
          }
        },
        current: {
          map: {}
        }, // current changes if a search is in progress
        search: {
          map: {}
        },
        view: {},
        keydown: {
          keyHistory: '',
          resetKeyHistory: {
            start: function() {
              return setTimeout(function() {
                that.selectpicker.keydown.keyHistory = '';
              }, 800);
            }
          }
        }
      };
      // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
      // data-attribute)
      if (this.options.title === null) {
        this.options.title = this.$element.attr('title');
      }

      // Format window padding
      var winPad = this.options.windowPadding;
      if (typeof winPad === 'number') {
        this.options.windowPadding = [winPad, winPad, winPad, winPad];
      }

      //Expose public methods
      this.val = Selectpicker.prototype.val;
      this.render = Selectpicker.prototype.render;
      this.refresh = Selectpicker.prototype.refresh;
      this.setStyle = Selectpicker.prototype.setStyle;
      this.selectAll = Selectpicker.prototype.selectAll;
      this.deselectAll = Selectpicker.prototype.deselectAll;
      this.destroy = Selectpicker.prototype.destroy;
      this.remove = Selectpicker.prototype.remove;
      this.show = Selectpicker.prototype.show;
      this.hide = Selectpicker.prototype.hide;

      this.init();
    };

    Selectpicker.VERSION = '1.13.1';

    // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
    Selectpicker.DEFAULTS = {
      noneSelectedText: 'Nothing selected',
      noneResultsText: 'No results matched {0}',
      countSelectedText: function(numSelected, numTotal) {
        return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
      },
      maxOptionsText: function(numAll, numGroup) {
        return [
          (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
          (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
        ];
      },
      selectAllText: 'Select All',
      deselectAllText: 'Deselect All',
      doneButton: false,
      doneButtonText: 'Close',
      multipleSeparator: ', ',
      styleBase: 'btn',
      style: 'btn-default',
      size: 'auto',
      title: null,
      selectedTextFormat: 'values',
      width: false,
      container: false,
      hideDisabled: false,
      showSubtext: false,
      showIcon: true,
      showContent: true,
      dropupAuto: true,
      header: false,
      liveSearch: false,
      liveSearchPlaceholder: null,
      liveSearchNormalize: false,
      liveSearchStyle: 'contains',
      actionsBox: false,
      iconBase: 'glyphicon',
      tickIcon: 'glyphicon-ok',
      showTick: false,
      template: {
        caret: '<span class="caret"></span>'
      },
      maxOptions: false,
      mobile: false,
      selectOnTab: false,
      dropdownAlignRight: false,
      windowPadding: 0,
      virtualScroll: 600
    };

    if (version.major === '4') {
      Selectpicker.DEFAULTS.style = 'btn-light';
      Selectpicker.DEFAULTS.iconBase = '';
      Selectpicker.DEFAULTS.tickIcon = 'bs-ok-default';
    }

    Selectpicker.prototype = {

      constructor: Selectpicker,

      init: function() {
        var that = this,
          id = this.$element.attr('id');

        this.$element.addClass('bs-select-hidden');

        this.multiple = this.$element.prop('multiple');
        this.autofocus = this.$element.prop('autofocus');
        this.$newElement = this.createDropdown();
        this.createLi();
        this.$element
          .after(this.$newElement)
          .prependTo(this.$newElement);
        this.$button = this.$newElement.children('button');
        this.$menu = this.$newElement.children('.dropdown-menu');
        this.$menuInner = this.$menu.children('.inner');
        this.$searchbox = this.$menu.find('input');

        this.$element.removeClass('bs-select-hidden');

        if (this.options.dropdownAlignRight === true) this.$menu.addClass(classNames.MENURIGHT);

        if (typeof id !== 'undefined') {
          this.$button.attr('data-id', id);
        }

        this.checkDisabled();
        this.clickListener();
        if (this.options.liveSearch) this.liveSearchListener();
        this.render();
        this.setStyle();
        this.setWidth();
        if (this.options.container) {
          this.selectPosition();
        } else {
          this.$element.on('hide.bs.select', function() {
            if (that.isVirtual()) {
              // empty menu on close
              var menuInner = that.$menuInner[0],
                emptyMenu = menuInner.firstChild.cloneNode(false);

              // replace the existing UL with an empty one - this is faster than $.empty() or innerHTML = ''
              menuInner.replaceChild(emptyMenu, menuInner.firstChild);
              menuInner.scrollTop = 0;
            }
          });
        }
        this.$menu.data('this', this);
        this.$newElement.data('this', this);
        if (this.options.mobile) this.mobile();

        this.$newElement.on({
          'hide.bs.dropdown': function(e) {
            that.$menuInner.attr('aria-expanded', false);
            that.$element.trigger('hide.bs.select', e);
          },
          'hidden.bs.dropdown': function(e) {
            that.$element.trigger('hidden.bs.select', e);
          },
          'show.bs.dropdown': function(e) {
            that.$menuInner.attr('aria-expanded', true);
            that.$element.trigger('show.bs.select', e);
          },
          'shown.bs.dropdown': function(e) {
            that.$element.trigger('shown.bs.select', e);
          }
        });

        if (that.$element[0].hasAttribute('required')) {
          this.$element.on('invalid', function() {
            that.$button.addClass('bs-invalid');

            that.$element.on({
              'shown.bs.select': function() {
                that.$element
                  .val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
                  .off('shown.bs.select');
              },
              'rendered.bs.select': function() {
                // if select is no longer invalid, remove the bs-invalid class
                if (this.validity.valid) that.$button.removeClass('bs-invalid');
                that.$element.off('rendered.bs.select');
              }
            });

            that.$button.on('blur.bs.select', function() {
              that.$element.focus().blur();
              that.$button.off('blur.bs.select');
            });
          });
        }

        setTimeout(function() {
          that.$element.trigger('loaded.bs.select');
        });
      },

      createDropdown: function() {
        // Options
        // If we are multiple or showTick option is set, then add the show-tick class
        var showTick = (this.multiple || this.options.showTick) ? ' show-tick' : '',
          autofocus = this.autofocus ? ' autofocus' : '';
        // Elements
        var header = this.options.header ? '<div class="' + classNames.POPOVERHEADER + '"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
        var searchbox = this.options.liveSearch ?
          '<div class="bs-searchbox">' +
          '<input type="text" class="form-control" autocomplete="off"' +
          (null === this.options.liveSearchPlaceholder ? '' : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search">' +
          '</div>' :
          '';
        var actionsbox = this.multiple && this.options.actionsBox ?
          '<div class="bs-actionsbox">' +
          '<div class="btn-group btn-group-sm btn-block">' +
          '<button type="button" class="actions-btn bs-select-all btn ' + classNames.BUTTONCLASS + '">' +
          this.options.selectAllText +
          '</button>' +
          '<button type="button" class="actions-btn bs-deselect-all btn ' + classNames.BUTTONCLASS + '">' +
          this.options.deselectAllText +
          '</button>' +
          '</div>' +
          '</div>' :
          '';
        var donebutton = this.multiple && this.options.doneButton ?
          '<div class="bs-donebutton">' +
          '<div class="btn-group btn-block">' +
          '<button type="button" class="btn btn-sm ' + classNames.BUTTONCLASS + '">' +
          this.options.doneButtonText +
          '</button>' +
          '</div>' +
          '</div>' :
          '';
        var drop =
          '<div class="dropdown bootstrap-select' + showTick + '">' +
          '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ' role="button">' +
          '<div class="filter-option">' +
          '<div class="filter-option-inner">' +
          '<div class="filter-option-inner-inner"></div>' +
          '</div> ' +
          '</div>' +
          (version.major === '4' ?
            '' :
            '<span class="bs-caret">' +
            this.options.template.caret +
            '</span>'
          ) +
          '</button>' +
          '<div class="dropdown-menu ' + (version.major === '4' ? '' : classNames.SHOW) + '" role="combobox">' +
          header +
          searchbox +
          actionsbox +
          '<div class="inner ' + classNames.SHOW + '" role="listbox" aria-expanded="false" tabindex="-1">' +
          '<ul class="dropdown-menu inner ' + (version.major === '4' ? classNames.SHOW : '') + '">' +
          '</ul>' +
          '</div>' +
          donebutton +
          '</div>' +
          '</div>';

        return $(drop);
      },

      setPositionData: function() {
        this.selectpicker.view.canHighlight = [];

        for (var i = 0; i < this.selectpicker.current.data.length; i++) {
          var li = this.selectpicker.current.data[i],
            canHighlight = true;

          if (li.type === 'divider') {
            canHighlight = false;
            li.height = this.sizeInfo.dividerHeight;
          } else if (li.type === 'optgroup-label') {
            canHighlight = false;
            li.height = this.sizeInfo.dropdownHeaderHeight;
          } else {
            li.height = this.sizeInfo.liHeight;
          }

          if (li.disabled) canHighlight = false;

          this.selectpicker.view.canHighlight.push(canHighlight);

          li.position = (i === 0 ? 0 : this.selectpicker.current.data[i - 1].position) + li.height;
        }
      },

      isVirtual: function() {
        return (this.options.virtualScroll !== false) && this.selectpicker.main.elements.length >= this.options.virtualScroll || this.options.virtualScroll === true;
      },

      createView: function(isSearching, scrollTop) {
        scrollTop = scrollTop || 0;

        var that = this;

        this.selectpicker.current = isSearching ? this.selectpicker.search : this.selectpicker.main;

        var $lis;
        var active = [];
        var selected;
        var prevActive;
        var activeIndex;
        var prevActiveIndex;

        this.setPositionData();

        scroll(scrollTop, true);

        this.$menuInner.off('scroll.createView').on('scroll.createView', function(e, updateValue) {
          if (!that.noScroll) scroll(this.scrollTop, updateValue);
          that.noScroll = false;
        });

        function scroll(scrollTop, init) {
          var size = that.selectpicker.current.elements.length,
            chunks = [],
            chunkSize,
            chunkCount,
            firstChunk,
            lastChunk,
            currentChunk = undefined,
            prevPositions,
            positionIsDifferent,
            previousElements,
            menuIsDifferent = true,
            isVirtual = that.isVirtual();

          that.selectpicker.view.scrollTop = scrollTop;

          if (isVirtual === true) {
            // if an option that is encountered that is wider than the current menu width, update the menu width accordingly
            if (that.sizeInfo.hasScrollBar && that.$menu[0].offsetWidth > that.sizeInfo.totalMenuWidth) {
              that.sizeInfo.menuWidth = that.$menu[0].offsetWidth;
              that.sizeInfo.totalMenuWidth = that.sizeInfo.menuWidth + that.sizeInfo.scrollBarWidth;
              that.$menu.css('min-width', that.sizeInfo.menuWidth);
            }
          }

          chunkSize = Math.ceil(that.sizeInfo.menuInnerHeight / that.sizeInfo.liHeight * 1.5); // number of options in a chunk
          chunkCount = Math.round(size / chunkSize) || 1; // number of chunks

          for (var i = 0; i < chunkCount; i++) {
            var end_of_chunk = (i + 1) * chunkSize;

            if (i === chunkCount - 1) {
              end_of_chunk = size;
            }

            chunks[i] = [
              (i) * chunkSize + (!i ? 0 : 1),
              end_of_chunk
            ];

            if (!size) break;

            if (currentChunk === undefined && scrollTop <= that.selectpicker.current.data[end_of_chunk - 1].position - that.sizeInfo.menuInnerHeight) {
              currentChunk = i;
            }
          }

          if (currentChunk === undefined) currentChunk = 0;

          prevPositions = [that.selectpicker.view.position0, that.selectpicker.view.position1];

          // always display previous, current, and next chunks
          firstChunk = Math.max(0, currentChunk - 1);
          lastChunk = Math.min(chunkCount - 1, currentChunk + 1);

          that.selectpicker.view.position0 = Math.max(0, chunks[firstChunk][0]) || 0;
          that.selectpicker.view.position1 = Math.min(size, chunks[lastChunk][1]) || 0;

          positionIsDifferent = prevPositions[0] !== that.selectpicker.view.position0 || prevPositions[1] !== that.selectpicker.view.position1;

          if (that.activeIndex !== undefined) {
            prevActive = that.selectpicker.current.elements[that.selectpicker.current.map.newIndex[that.prevActiveIndex]];
            active = that.selectpicker.current.elements[that.selectpicker.current.map.newIndex[that.activeIndex]];
            selected = that.selectpicker.current.elements[that.selectpicker.current.map.newIndex[that.selectedIndex]];

            if (init) {
              if (that.activeIndex !== that.selectedIndex) {
                active.classList.remove('active');
                if (active.firstChild) active.firstChild.classList.remove('active');
              }
              that.activeIndex = undefined;
            }

            if (that.activeIndex && that.activeIndex !== that.selectedIndex && selected && selected.length) {
              selected.classList.remove('active');
              if (selected.firstChild) selected.firstChild.classList.remove('active');
            }
          }

          if (that.prevActiveIndex !== undefined && that.prevActiveIndex !== that.activeIndex && that.prevActiveIndex !== that.selectedIndex && prevActive && prevActive.length) {
            prevActive.classList.remove('active');
            if (prevActive.firstChild) prevActive.firstChild.classList.remove('active');
          }

          if (init || positionIsDifferent) {
            previousElements = that.selectpicker.view.visibleElements ? that.selectpicker.view.visibleElements.slice() : [];

            that.selectpicker.view.visibleElements = that.selectpicker.current.elements.slice(that.selectpicker.view.position0, that.selectpicker.view.position1);

            that.setOptionStatus();

            // if searching, check to make sure the list has actually been updated before updating DOM
            // this prevents unnecessary repaints
            if (isSearching || (isVirtual === false && init)) menuIsDifferent = !isEqual(previousElements, that.selectpicker.view.visibleElements);

            // if virtual scroll is disabled and not searching,
            // menu should never need to be updated more than once
            if ((init || isVirtual === true) && menuIsDifferent) {
              var menuInner = that.$menuInner[0],
                menuFragment = document.createDocumentFragment(),
                emptyMenu = menuInner.firstChild.cloneNode(false),
                marginTop,
                marginBottom,
                elements = isVirtual === true ? that.selectpicker.view.visibleElements : that.selectpicker.current.elements;

              // replace the existing UL with an empty one - this is faster than $.empty()
              menuInner.replaceChild(emptyMenu, menuInner.firstChild);

              for (var i = 0, visibleElementsLen = elements.length; i < visibleElementsLen; i++) {
                menuFragment.appendChild(elements[i]);
              }

              if (isVirtual === true) {
                marginTop = (that.selectpicker.view.position0 === 0 ? 0 : that.selectpicker.current.data[that.selectpicker.view.position0 - 1].position),
                  marginBottom = (that.selectpicker.view.position1 > size - 1 ? 0 : that.selectpicker.current.data[size - 1].position - that.selectpicker.current.data[that.selectpicker.view.position1 - 1].position);

                menuInner.firstChild.style.marginTop = marginTop + 'px';
                menuInner.firstChild.style.marginBottom = marginBottom + 'px';
              }

              menuInner.firstChild.appendChild(menuFragment);
            }
          }

          that.prevActiveIndex = that.activeIndex;

          if (!that.options.liveSearch) {
            that.$menuInner.focus();
          } else if (isSearching && init) {
            var index = 0,
              newActive;

            if (!that.selectpicker.view.canHighlight[index]) {
              index = 1 + that.selectpicker.view.canHighlight.slice(1).indexOf(true);
            }

            newActive = that.selectpicker.view.visibleElements[index];

            if (that.selectpicker.view.currentActive) {
              that.selectpicker.view.currentActive.classList.remove('active');
              if (that.selectpicker.view.currentActive.firstChild) that.selectpicker.view.currentActive.firstChild.classList.remove('active');
            }

            if (newActive) {
              newActive.classList.add('active');
              if (newActive.firstChild) newActive.firstChild.classList.add('active');
            }

            that.activeIndex = that.selectpicker.current.map.originalIndex[index];
          }
        }

        $(window).off('resize.createView').on('resize.createView', function() {
          scroll(that.$menuInner[0].scrollTop);
        });
      },

      createLi: function() {
        var that = this,
          mainElements = [],
          widestOption,
          availableOptionsCount = 0,
          widestOptionLength = 0,
          mainData = [],
          optID = 0,
          headerIndex = 0,
          liIndex = -1; // increment liIndex whenever a new <li> element is created to ensure newIndex is correct

        if (!this.selectpicker.view.titleOption) this.selectpicker.view.titleOption = document.createElement('option');

        var elementTemplates = {
            span: document.createElement('span'),
            subtext: document.createElement('small'),
            a: document.createElement('a'),
            li: document.createElement('li'),
            whitespace: document.createTextNode("\u00A0")
          },
          checkMark = elementTemplates.span.cloneNode(false),
          fragment = document.createDocumentFragment();

        checkMark.className = that.options.iconBase + ' ' + that.options.tickIcon + ' check-mark';
        elementTemplates.a.appendChild(checkMark);
        elementTemplates.a.setAttribute('role', 'option');

        elementTemplates.subtext.className = 'text-muted';

        elementTemplates.text = elementTemplates.span.cloneNode(false);
        elementTemplates.text.className = 'text';

        // Helper functions
        /**
         * @param content
         * @param [index]
         * @param [classes]
         * @param [optgroup]
         * @returns {HTMLElement}
         */
        var generateLI = function(content, index, classes, optgroup) {
          var li = elementTemplates.li.cloneNode(false);

          if (content) {
            if (content.nodeType === 1 || content.nodeType === 11) {
              li.appendChild(content);
            } else {
              li.innerHTML = content;
            }
          }

          if (typeof classes !== 'undefined' && '' !== classes) li.className = classes;
          if (typeof optgroup !== 'undefined' && null !== optgroup) li.classList.add('optgroup-' + optgroup);

          return li;
        };

        /**
         * @param text
         * @param [classes]
         * @param [inline]
         * @returns {string}
         */
        var generateA = function(text, classes, inline) {
          var a = elementTemplates.a.cloneNode(true);

          if (text) {
            if (text.nodeType === 11) {
              a.appendChild(text);
            } else {
              a.insertAdjacentHTML('beforeend', text);
            }
          }

          if (typeof classes !== 'undefined' & '' !== classes) a.className = classes;
          if (version.major === '4') a.classList.add('dropdown-item');
          if (inline) a.setAttribute('style', inline);

          return a;
        };

        var generateText = function(options) {
          var textElement = elementTemplates.text.cloneNode(false),
            optionSubtextElement,
            optionIconElement;

          if (options.optionContent) {
            textElement.innerHTML = options.optionContent;
          } else {
            textElement.textContent = options.text;

            if (options.optionIcon) {
              var whitespace = elementTemplates.whitespace.cloneNode(false);

              optionIconElement = elementTemplates.span.cloneNode(false);
              optionIconElement.className = that.options.iconBase + ' ' + options.optionIcon;

              fragment.appendChild(optionIconElement);
              fragment.appendChild(whitespace);
            }

            if (options.optionSubtext) {
              optionSubtextElement = elementTemplates.subtext.cloneNode(false);
              optionSubtextElement.innerHTML = options.optionSubtext;
              textElement.appendChild(optionSubtextElement);
            }
          }

          fragment.appendChild(textElement);

          return fragment;
        };

        var generateLabel = function(options) {
          var labelTextElement = elementTemplates.text.cloneNode(false),
            labelSubtextElement,
            labelIconElement;

          labelTextElement.textContent = options.labelEscaped;

          if (options.labelIcon) {
            var whitespace = elementTemplates.whitespace.cloneNode(false);

            labelIconElement = elementTemplates.span.cloneNode(false);
            labelIconElement.className = that.options.iconBase + ' ' + options.labelIcon;

            fragment.appendChild(labelIconElement);
            fragment.appendChild(whitespace);
          }

          if (options.labelSubtext) {
            labelSubtextElement = elementTemplates.subtext.cloneNode(false);
            labelSubtextElement.textContent = options.labelSubtext;
            labelTextElement.appendChild(labelSubtextElement);
          }

          fragment.appendChild(labelTextElement);

          return fragment;
        }

        if (this.options.title && !this.multiple) {
          // this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
          // since newIndex is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
          liIndex--;

          var element = this.$element[0],
            isSelected = false,
            titleNotAppended = !this.selectpicker.view.titleOption.parentNode;

          if (titleNotAppended) {
            // Use native JS to prepend option (faster)
            this.selectpicker.view.titleOption.className = 'bs-title-option';
            this.selectpicker.view.titleOption.value = '';

            // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
            // the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
            // if so, the select will have the data-selected attribute
            var $opt = $(element.options[element.selectedIndex]);
            isSelected = $opt.attr('selected') === undefined && this.$element.data('selected') === undefined;
          }

          if (titleNotAppended || this.selectpicker.view.titleOption.index !== 0) {
            element.insertBefore(this.selectpicker.view.titleOption, element.firstChild);
          }

          // Set selected *after* appending to select,
          // otherwise the option doesn't get selected in IE
          // set using selectedIndex, as setting the selected attr to true here doesn't work in IE11
          if (isSelected) element.selectedIndex = 0;
        }

        var $selectOptions = this.$element.find('option');

        $selectOptions.each(function(index) {
          var $this = $(this);

          liIndex++;

          if ($this.hasClass('bs-title-option')) return;

          var thisData = $this.data();

          // Get the class and text for the option
          var optionClass = this.className || '',
            inline = htmlEscape(this.style.cssText),
            optionContent = thisData.content,
            text = this.textContent,
            tokens = thisData.tokens,
            subtext = thisData.subtext,
            icon = thisData.icon,
            $parent = $this.parent(),
            parent = $parent[0],
            isOptgroup = parent.tagName === 'OPTGROUP',
            isOptgroupDisabled = isOptgroup && parent.disabled,
            isDisabled = this.disabled || isOptgroupDisabled,
            prevHiddenIndex,
            showDivider = this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP',
            textElement;

          var parentData = $parent.data();

          if (thisData.hidden === true || that.options.hideDisabled && (isDisabled && !isOptgroup || isOptgroupDisabled)) {
            // set prevHiddenIndex - the index of the first hidden option in a group of hidden options
            // used to determine whether or not a divider should be placed after an optgroup if there are
            // hidden options between the optgroup and the first visible option
            prevHiddenIndex = thisData.prevHiddenIndex;
            $this.next().data('prevHiddenIndex', (prevHiddenIndex !== undefined ? prevHiddenIndex : index));

            liIndex--;

            // if previous element is not an optgroup
            if (!showDivider) {
              if (prevHiddenIndex !== undefined) {
                // select the element **before** the first hidden element in the group
                var prevHidden = $selectOptions[prevHiddenIndex].previousElementSibling;

                if (prevHidden && prevHidden.tagName === 'OPTGROUP' && !prevHidden.disabled) {
                  showDivider = true;
                }
              }
            }

            if (showDivider && mainData[mainData.length - 1].type !== 'divider') {
              liIndex++;
              mainElements.push(
                generateLI(
                  false,
                  null,
                  classNames.DIVIDER,
                  optID + 'div'
                )
              );
              mainData.push({
                type: 'divider',
                optID: optID,
                originalIndex: index
              });
            }

            return;
          }

          if (isOptgroup && thisData.divider !== true) {
            if (that.options.hideDisabled && isDisabled) {
              if (parentData.allOptionsDisabled === undefined) {
                var $options = $parent.children();
                $parent.data('allOptionsDisabled', $options.filter(':disabled').length === $options.length);
              }

              if ($parent.data('allOptionsDisabled')) {
                liIndex--;
                return;
              }
            }

            var optGroupClass = ' ' + parent.className || '';

            if (!this.previousElementSibling) { // Is it the first option of the optgroup?
              optID += 1;

              // Get the opt group label
              var label = parent.label,
                labelEscaped = htmlEscape(label),
                labelSubtext = parentData.subtext,
                labelIcon = parentData.icon;

              if (index !== 0 && mainElements.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
                liIndex++;
                mainElements.push(
                  generateLI(
                    false,
                    null,
                    classNames.DIVIDER,
                    optID + 'div'
                  )
                );
                mainData.push({
                  type: 'divider',
                  optID: optID,
                  originalIndex: index
                });
              }
              liIndex++;

              var labelElement = generateLabel({
                labelEscaped: labelEscaped,
                labelSubtext: labelSubtext,
                labelIcon: labelIcon
              });

              mainElements.push(generateLI(labelElement, null, 'dropdown-header' + optGroupClass, optID));
              mainData.push({
                content: labelEscaped,
                subtext: labelSubtext,
                type: 'optgroup-label',
                optID: optID,
                originalIndex: index
              });

              headerIndex = liIndex - 1;
            }

            if (that.options.hideDisabled && isDisabled || thisData.hidden === true) {
              liIndex--;
              return;
            }

            textElement = generateText({
              text: text,
              optionContent: optionContent,
              optionSubtext: subtext,
              optionIcon: icon
            });

            mainElements.push(generateLI(generateA(textElement, 'opt ' + optionClass + optGroupClass, inline), index, '', optID));
            mainData.push({
              content: optionContent || text,
              subtext: subtext,
              tokens: tokens,
              type: 'option',
              optID: optID,
              headerIndex: headerIndex,
              lastIndex: headerIndex + parent.childElementCount,
              originalIndex: index,
              data: thisData
            });

            availableOptionsCount++;
          } else if (thisData.divider === true) {
            mainElements.push(generateLI(false, index, 'divider'));
            mainData.push({
              type: 'divider',
              originalIndex: index
            });
          } else {
            // if previous element is not an optgroup and hideDisabled is true
            if (!showDivider && that.options.hideDisabled) {
              prevHiddenIndex = thisData.prevHiddenIndex;

              if (prevHiddenIndex !== undefined) {
                // select the element **before** the first hidden element in the group
                var prevHidden = $selectOptions[prevHiddenIndex].previousElementSibling;

                if (prevHidden && prevHidden.tagName === 'OPTGROUP' && !prevHidden.disabled) {
                  showDivider = true;
                }
              }
            }

            if (showDivider && mainData[mainData.length - 1].type !== 'divider') {
              liIndex++;
              mainElements.push(
                generateLI(
                  false,
                  null,
                  classNames.DIVIDER,
                  optID + 'div'
                )
              );
              mainData.push({
                type: 'divider',
                optID: optID,
                originalIndex: index
              });
            }

            textElement = generateText({
              text: text,
              optionContent: optionContent,
              optionSubtext: subtext,
              optionIcon: icon
            });

            mainElements.push(generateLI(generateA(textElement, optionClass, inline), index));
            mainData.push({
              content: optionContent || text,
              subtext: subtext,
              tokens: tokens,
              type: 'option',
              originalIndex: index,
              data: thisData
            });

            availableOptionsCount++;
          }

          that.selectpicker.main.map.newIndex[index] = liIndex;
          that.selectpicker.main.map.originalIndex[liIndex] = index;

          // get the most recent option info added to mainData
          var _mainDataLast = mainData[mainData.length - 1];

          _mainDataLast.disabled = isDisabled;

          var combinedLength = 0;

          // count the number of characters in the option - not perfect, but should work in most cases
          if (_mainDataLast.content) combinedLength += _mainDataLast.content.length;
          if (_mainDataLast.subtext) combinedLength += _mainDataLast.subtext.length;
          // if there is an icon, ensure this option's width is checked
          if (icon) combinedLength += 1;

          if (combinedLength > widestOptionLength) {
            widestOptionLength = combinedLength;

            // guess which option is the widest
            // use this when calculating menu width
            // not perfect, but it's fast, and the width will be updating accordingly when scrolling
            widestOption = mainElements[mainElements.length - 1];
          }
        });

        this.selectpicker.main.elements = mainElements;
        this.selectpicker.main.data = mainData;

        this.selectpicker.current = this.selectpicker.main;

        this.selectpicker.view.widestOption = widestOption;
        this.selectpicker.view.availableOptionsCount = availableOptionsCount; // faster way to get # of available options without filter
      },

      findLis: function() {
        return this.$menuInner.find('.inner > li');
      },

      render: function() {
        var that = this,
          $selectOptions = this.$element.find('option'),
          selectedItems = [],
          selectedItemsInTitle = [];

        this.togglePlaceholder();

        this.tabIndex();

        for (var i = 0, len = this.selectpicker.main.elements.length; i < len; i++) {
          var index = this.selectpicker.main.map.originalIndex[i],
            option = $selectOptions[index];

          if (option && option.selected) {
            selectedItems.push(option);

            if (selectedItemsInTitle.length < 100 && that.options.selectedTextFormat !== 'count' || selectedItems.length === 1) {
              if (that.options.hideDisabled && (option.disabled || option.parentNode.tagName === 'OPTGROUP' && option.parentNode.disabled)) return;

              var thisData = this.selectpicker.main.data[i].data,
                icon = thisData.icon && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + thisData.icon + '"></i> ' : '',
                subtext,
                titleItem;

              if (that.options.showSubtext && thisData.subtext && !that.multiple) {
                subtext = ' <small class="text-muted">' + thisData.subtext + '</small>';
              } else {
                subtext = '';
              }

              if (option.title) {
                titleItem = option.title;
              } else if (thisData.content && that.options.showContent) {
                titleItem = thisData.content.toString();
              } else {
                titleItem = icon + option.innerHTML.trim() + subtext;
              }

              selectedItemsInTitle.push(titleItem);
            }
          }
        }

        //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
        //Convert all the values into a comma delimited string
        var title = !this.multiple ? selectedItemsInTitle[0] : selectedItemsInTitle.join(this.options.multipleSeparator);

        // add ellipsis
        if (selectedItems.length > 50) title += '...';

        // If this is a multiselect, and selectedTextFormat is count, then show 1 of 2 selected etc..
        if (this.multiple && this.options.selectedTextFormat.indexOf('count') !== -1) {
          var max = this.options.selectedTextFormat.split('>');

          if ((max.length > 1 && selectedItems.length > max[1]) || (max.length === 1 && selectedItems.length >= 2)) {
            var totalCount = this.selectpicker.view.availableOptionsCount,
              tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;

            title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
          }
        }

        if (this.options.title == undefined) {
          // use .attr to ensure undefined is returned if title attribute is not set
          this.options.title = this.$element.attr('title');
        }

        if (this.options.selectedTextFormat == 'static') {
          title = this.options.title;
        }

        //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
        if (!title) {
          title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
        }

        //strip all HTML tags and trim the result, then unescape any escaped tags
        this.$button[0].title = htmlUnescape(title.replace(/<[^>]*>?/g, '').trim());
        this.$button.find('.filter-option-inner-inner')[0].innerHTML = title;

        this.$element.trigger('rendered.bs.select');
      },

      /**
       * @param [style]
       * @param [status]
       */
      setStyle: function(style, status) {
        if (this.$element.attr('class')) {
          this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
        }

        var buttonClass = style ? style : this.options.style;

        if (status == 'add') {
          this.$button.addClass(buttonClass);
        } else if (status == 'remove') {
          this.$button.removeClass(buttonClass);
        } else {
          this.$button.removeClass(this.options.style);
          this.$button.addClass(buttonClass);
        }
      },

      liHeight: function(refresh) {
        if (!refresh && (this.options.size === false || this.sizeInfo)) return;

        if (!this.sizeInfo) this.sizeInfo = {};

        var newElement = document.createElement('div'),
          menu = document.createElement('div'),
          menuInner = document.createElement('div'),
          menuInnerInner = document.createElement('ul'),
          divider = document.createElement('li'),
          dropdownHeader = document.createElement('li'),
          li = document.createElement('li'),
          a = document.createElement('a'),
          text = document.createElement('span'),
          header = this.options.header && this.$menu.find('.' + classNames.POPOVERHEADER).length > 0 ? this.$menu.find('.' + classNames.POPOVERHEADER)[0].cloneNode(true) : null,
          search = this.options.liveSearch ? document.createElement('div') : null,
          actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
          doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null;

        this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;

        text.className = 'text';
        a.className = 'dropdown-item';
        newElement.className = this.$menu[0].parentNode.className + ' ' + classNames.SHOW;
        newElement.style.width = this.sizeInfo.selectWidth + 'px';
        menu.className = 'dropdown-menu ' + classNames.SHOW;
        menuInner.className = 'inner ' + classNames.SHOW;
        menuInnerInner.className = 'dropdown-menu inner ' + (version.major === '4' ? classNames.SHOW : '');
        divider.className = classNames.DIVIDER;
        dropdownHeader.className = 'dropdown-header';

        text.appendChild(document.createTextNode('Inner text'));
        a.appendChild(text);
        li.appendChild(a);
        dropdownHeader.appendChild(text.cloneNode(true));

        if (this.selectpicker.view.widestOption) {
          menuInnerInner.appendChild(this.selectpicker.view.widestOption.cloneNode(true));
        }

        menuInnerInner.appendChild(li);
        menuInnerInner.appendChild(divider);
        menuInnerInner.appendChild(dropdownHeader);
        if (header) menu.appendChild(header);
        if (search) {
          var input = document.createElement('input');
          search.className = 'bs-searchbox';
          input.className = 'form-control';
          search.appendChild(input);
          menu.appendChild(search);
        }
        if (actions) menu.appendChild(actions);
        menuInner.appendChild(menuInnerInner);
        menu.appendChild(menuInner);
        if (doneButton) menu.appendChild(doneButton);
        newElement.appendChild(menu);

        document.body.appendChild(newElement);

        var liHeight = a.offsetHeight,
          dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0,
          headerHeight = header ? header.offsetHeight : 0,
          searchHeight = search ? search.offsetHeight : 0,
          actionsHeight = actions ? actions.offsetHeight : 0,
          doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
          dividerHeight = $(divider).outerHeight(true),
          // fall back to jQuery if getComputedStyle is not supported
          menuStyle = window.getComputedStyle ? window.getComputedStyle(menu) : false,
          menuWidth = menu.offsetWidth,
          $menu = menuStyle ? null : $(menu),
          menuPadding = {
            vert: toInteger(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) +
              toInteger(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) +
              toInteger(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) +
              toInteger(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
            horiz: toInteger(menuStyle ? menuStyle.paddingLeft : $menu.css('paddingLeft')) +
              toInteger(menuStyle ? menuStyle.paddingRight : $menu.css('paddingRight')) +
              toInteger(menuStyle ? menuStyle.borderLeftWidth : $menu.css('borderLeftWidth')) +
              toInteger(menuStyle ? menuStyle.borderRightWidth : $menu.css('borderRightWidth'))
          },
          menuExtras = {
            vert: menuPadding.vert +
              toInteger(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) +
              toInteger(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2,
            horiz: menuPadding.horiz +
              toInteger(menuStyle ? menuStyle.marginLeft : $menu.css('marginLeft')) +
              toInteger(menuStyle ? menuStyle.marginRight : $menu.css('marginRight')) + 2
          },
          scrollBarWidth;

        menuInner.style.overflowY = 'scroll';

        scrollBarWidth = menu.offsetWidth - menuWidth;

        document.body.removeChild(newElement);

        this.sizeInfo.liHeight = liHeight;
        this.sizeInfo.dropdownHeaderHeight = dropdownHeaderHeight;
        this.sizeInfo.headerHeight = headerHeight;
        this.sizeInfo.searchHeight = searchHeight;
        this.sizeInfo.actionsHeight = actionsHeight;
        this.sizeInfo.doneButtonHeight = doneButtonHeight;
        this.sizeInfo.dividerHeight = dividerHeight;
        this.sizeInfo.menuPadding = menuPadding;
        this.sizeInfo.menuExtras = menuExtras;
        this.sizeInfo.menuWidth = menuWidth;
        this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
        this.sizeInfo.scrollBarWidth = scrollBarWidth;
        this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight;

        this.setPositionData();
      },

      getSelectPosition: function() {
        var that = this,
          $window = $(window),
          pos = that.$newElement.offset(),
          $container = $(that.options.container),
          containerPos;

        if (that.options.container && !$container.is('body')) {
          containerPos = $container.offset();
          containerPos.top += parseInt($container.css('borderTopWidth'));
          containerPos.left += parseInt($container.css('borderLeftWidth'));
        } else {
          containerPos = {
            top: 0,
            left: 0
          };
        }

        var winPad = that.options.windowPadding;

        this.sizeInfo.selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
        this.sizeInfo.selectOffsetBot = $window.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo['selectHeight'] - containerPos.top - winPad[2];
        this.sizeInfo.selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
        this.sizeInfo.selectOffsetRight = $window.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo['selectWidth'] - containerPos.left - winPad[1];
        this.sizeInfo.selectOffsetTop -= winPad[0];
        this.sizeInfo.selectOffsetLeft -= winPad[3];
      },

      setMenuSize: function(isAuto) {
        this.getSelectPosition();

        var selectWidth = this.sizeInfo['selectWidth'],
          liHeight = this.sizeInfo['liHeight'],
          headerHeight = this.sizeInfo['headerHeight'],
          searchHeight = this.sizeInfo['searchHeight'],
          actionsHeight = this.sizeInfo['actionsHeight'],
          doneButtonHeight = this.sizeInfo['doneButtonHeight'],
          divHeight = this.sizeInfo['dividerHeight'],
          menuPadding = this.sizeInfo['menuPadding'],
          menuInnerHeight,
          menuHeight,
          divLength = 0,
          minHeight,
          _minHeight,
          maxHeight,
          menuInnerMinHeight,
          estimate;

        if (this.options.dropupAuto) {
          // Get the estimated height of the menu without scrollbars.
          // This is useful for smaller menus, where there might be plenty of room
          // below the button without setting dropup, but we can't know
          // the exact height of the menu until createView is called later
          estimate = liHeight * this.selectpicker.current.elements.length + menuPadding.vert;
          this.$newElement.toggleClass(classNames.DROPUP, this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && estimate + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot);
        }

        if (this.options.size === 'auto') {
          _minHeight = this.selectpicker.current.elements.length > 3 ? this.sizeInfo.liHeight * 3 + this.sizeInfo.menuExtras.vert - 2 : 0;
          menuHeight = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert;
          minHeight = _minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
          menuInnerMinHeight = Math.max(_minHeight - menuPadding.vert, 0);

          if (this.$newElement.hasClass(classNames.DROPUP)) {
            menuHeight = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert;
          }

          maxHeight = menuHeight;
          menuInnerHeight = menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert;
        } else if (this.options.size && this.options.size != 'auto' && this.selectpicker.current.elements.length > this.options.size) {
          for (var i = 0; i < this.options.size; i++) {
            if (this.selectpicker.current.data[i].type === 'divider') divLength++;
          }

          menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;
          menuInnerHeight = menuHeight - menuPadding.vert;
          maxHeight = menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
          minHeight = menuInnerMinHeight = '';
        }

        if (this.options.dropdownAlignRight === 'auto') {
          this.$menu.toggleClass(classNames.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < (this.$menu[0].offsetWidth - selectWidth));
        }

        this.$menu.css({
          'max-height': maxHeight + 'px',
          'overflow': 'hidden',
          'min-height': minHeight + 'px'
        });

        this.$menuInner.css({
          'max-height': menuInnerHeight + 'px',
          'overflow-y': 'auto',
          'min-height': menuInnerMinHeight + 'px'
        });

        this.sizeInfo['menuInnerHeight'] = menuInnerHeight;

        if (this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight) {
          this.sizeInfo.hasScrollBar = true;
          this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth;

          this.$menu.css('min-width', this.sizeInfo.totalMenuWidth);
        }

        if (this.dropdown && this.dropdown._popper) this.dropdown._popper.update();
      },

      setSize: function(refresh) {
        this.liHeight(refresh);

        if (this.options.header) this.$menu.css('padding-top', 0);
        if (this.options.size === false) return;

        var that = this,
          $window = $(window),
          selectedIndex,
          offset = 0;

        this.setMenuSize();

        if (this.options.size === 'auto') {
          this.$searchbox.off('input.setMenuSize propertychange.setMenuSize').on('input.setMenuSize propertychange.setMenuSize', function() {
            return that.setMenuSize();
          });
          $window.off('resize.setMenuSize scroll.setMenuSize').on('resize.setMenuSize scroll.setMenuSize', function() {
            return that.setMenuSize();
          });
        } else if (this.options.size && this.options.size != 'auto' && this.selectpicker.current.elements.length > this.options.size) {
          this.$searchbox.off('input.setMenuSize propertychange.setMenuSize');
          $window.off('resize.setMenuSize scroll.setMenuSize');
        }

        if (refresh) {
          offset = this.$menuInner[0].scrollTop;
        } else if (!that.multiple) {
          selectedIndex = that.selectpicker.main.map.newIndex[that.$element[0].selectedIndex];

          if (typeof selectedIndex === 'number' && that.options.size !== false) {
            offset = that.sizeInfo.liHeight * selectedIndex;
            offset = offset - (that.sizeInfo.menuInnerHeight / 2) + (that.sizeInfo.liHeight / 2);
          }
        }

        that.createView(false, offset);
      },

      setWidth: function() {
        var that = this;

        if (this.options.width === 'auto') {
          requestAnimationFrame(function() {
            that.$menu.css('min-width', '0');
            that.liHeight();
            that.setMenuSize();

            // Get correct width if element is hidden
            var $selectClone = that.$newElement.clone().appendTo('body'),
              btnWidth = $selectClone.css('width', 'auto').children('button').outerWidth();

            $selectClone.remove();

            // Set width to whatever's larger, button title or longest option
            that.sizeInfo.selectWidth = Math.max(that.sizeInfo.totalMenuWidth, btnWidth);
            that.$newElement.css('width', that.sizeInfo.selectWidth + 'px');
          });
        } else if (this.options.width === 'fit') {
          // Remove inline min-width so width can be changed from 'auto'
          this.$menu.css('min-width', '');
          this.$newElement.css('width', '').addClass('fit-width');
        } else if (this.options.width) {
          // Remove inline min-width so width can be changed from 'auto'
          this.$menu.css('min-width', '');
          this.$newElement.css('width', this.options.width);
        } else {
          // Remove inline min-width/width so width can be changed
          this.$menu.css('min-width', '');
          this.$newElement.css('width', '');
        }
        // Remove fit-width class if width is changed programmatically
        if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
          this.$newElement.removeClass('fit-width');
        }
      },

      selectPosition: function() {
        this.$bsContainer = $('<div class="bs-container" />');

        var that = this,
          $container = $(this.options.container),
          pos,
          containerPos,
          actualHeight,
          getPlacement = function($element) {
            var containerPosition = {};

            that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass(classNames.DROPUP, $element.hasClass(classNames.DROPUP));
            pos = $element.offset();

            if (!$container.is('body')) {
              containerPos = $container.offset();
              containerPos.top += parseInt($container.css('borderTopWidth')) - $container.scrollTop();
              containerPos.left += parseInt($container.css('borderLeftWidth')) - $container.scrollLeft();
            } else {
              containerPos = {
                top: 0,
                left: 0
              };
            }

            actualHeight = $element.hasClass(classNames.DROPUP) ? 0 : $element[0].offsetHeight;

            // Bootstrap 4+ uses Popper for menu positioning
            if (version.major < 4) {
              containerPosition['top'] = pos.top - containerPos.top + actualHeight;
              containerPosition['left'] = pos.left - containerPos.left;
            }

            containerPosition['width'] = $element[0].offsetWidth;

            that.$bsContainer.css(containerPosition);
          };

        this.$button.on('click.bs.dropdown.data-api', function() {
          if (that.isDisabled()) {
            return;
          }

          getPlacement(that.$newElement);

          that.$bsContainer
            .appendTo(that.options.container)
            .toggleClass(classNames.SHOW, !that.$button.hasClass(classNames.SHOW))
            .append(that.$menu);
        });

        $(window).on('resize scroll', function() {
          getPlacement(that.$newElement);
        });

        this.$element.on('hide.bs.select', function() {
          that.$menu.data('height', that.$menu.height());
          that.$bsContainer.detach();
        });
      },

      setOptionStatus: function() {
        var that = this,
          $selectOptions = this.$element.find('option');

        that.noScroll = false;

        if (that.selectpicker.view.visibleElements && that.selectpicker.view.visibleElements.length) {
          for (var i = 0; i < that.selectpicker.view.visibleElements.length; i++) {
            var index = that.selectpicker.current.map.originalIndex[i + that.selectpicker.view.position0], // faster than $(li).data('originalIndex')
              option = $selectOptions[index];

            if (option) {
              var liIndex = this.selectpicker.main.map.newIndex[index],
                li = this.selectpicker.main.elements[liIndex];

              that.setDisabled(
                index,
                option.disabled || option.parentNode.tagName === 'OPTGROUP' && option.parentNode.disabled,
                liIndex,
                li
              );

              that.setSelected(
                index,
                option.selected,
                liIndex,
                li
              );
            }
          }
        }
      },

      /**
       * @param {number} index - the index of the option that is being changed
       * @param {boolean} selected - true if the option is being selected, false if being deselected
       */
      setSelected: function(index, selected, liIndex, li) {
        var activeIndexIsSet = this.activeIndex !== undefined,
          thisIsActive = this.activeIndex === index,
          prevActiveIndex,
          prevActive,
          a,
          // if current option is already active
          // OR
          // if the current option is being selected, it's NOT multiple, and
          // activeIndex is undefined:
          //  - when the menu is first being opened, OR
          //  - after a search has been performed, OR
          //  - when retainActive is false when selecting a new option (i.e. index of the newly selected option is not the same as the current activeIndex)
          keepActive = thisIsActive || selected && !this.multiple && !activeIndexIsSet;

        if (!liIndex) liIndex = this.selectpicker.main.map.newIndex[index];
        if (!li) li = this.selectpicker.main.elements[liIndex];

        a = li.firstChild;

        if (selected) {
          this.selectedIndex = index;
        }

        li.classList.toggle('selected', selected);
        li.classList.toggle('active', keepActive);

        if (keepActive) {
          this.selectpicker.view.currentActive = li;
          this.activeIndex = index;
        }

        if (a) {
          a.classList.toggle('selected', selected);
          a.classList.toggle('active', keepActive);
          a.setAttribute('aria-selected', selected);
        }

        if (!keepActive) {
          if (!activeIndexIsSet && selected && this.prevActiveIndex !== undefined) {
            prevActiveIndex = this.selectpicker.main.map.newIndex[this.prevActiveIndex];
            prevActive = this.selectpicker.main.elements[prevActiveIndex];

            prevActive.classList.remove('selected');
            prevActive.classList.remove('active');
            if (prevActive.firstChild) {
              prevActive.firstChild.classList.remove('selected');
              prevActive.firstChild.classList.remove('active');
            }
          }
        }
      },

      /**
       * @param {number} index - the index of the option that is being disabled
       * @param {boolean} disabled - true if the option is being disabled, false if being enabled
       */
      setDisabled: function(index, disabled, liIndex, li) {
        var a;

        if (!liIndex) liIndex = this.selectpicker.main.map.newIndex[index];
        if (!li) li = this.selectpicker.main.elements[liIndex];

        a = li.firstChild;

        li.classList.toggle(classNames.DISABLED, disabled);

        if (a) {
          if (version.major === '4') a.classList.toggle(classNames.DISABLED, disabled);

          a.setAttribute('aria-disabled', disabled);

          if (disabled) {
            a.setAttribute('tabindex', -1);
          } else {
            a.setAttribute('tabindex', 0);
          }
        }
      },

      isDisabled: function() {
        return this.$element[0].disabled;
      },

      checkDisabled: function() {
        var that = this;

        if (this.isDisabled()) {
          this.$newElement.addClass(classNames.DISABLED);
          this.$button.addClass(classNames.DISABLED).attr('tabindex', -1).attr('aria-disabled', true);
        } else {
          if (this.$button.hasClass(classNames.DISABLED)) {
            this.$newElement.removeClass(classNames.DISABLED);
            this.$button.removeClass(classNames.DISABLED).attr('aria-disabled', false);
          }

          if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
            this.$button.removeAttr('tabindex');
          }
        }

        this.$button.click(function() {
          return !that.isDisabled();
        });
      },

      togglePlaceholder: function() {
        // much faster than calling $.val()
        var element = this.$element[0],
          selectedIndex = element.selectedIndex,
          nothingSelected = selectedIndex === -1;

        if (!nothingSelected && !element.options[selectedIndex].value) nothingSelected = true;

        this.$button.toggleClass('bs-placeholder', nothingSelected);
      },

      tabIndex: function() {
        if (this.$element.data('tabindex') !== this.$element.attr('tabindex') &&
          (this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98')) {
          this.$element.data('tabindex', this.$element.attr('tabindex'));
          this.$button.attr('tabindex', this.$element.data('tabindex'));
        }

        this.$element.attr('tabindex', -98);
      },

      clickListener: function() {
        var that = this,
          $document = $(document);

        $document.data('spaceSelect', false);

        this.$button.on('keyup', function(e) {
          if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
            e.preventDefault();
            $document.data('spaceSelect', false);
          }
        });

        this.$newElement.on('show.bs.dropdown', function() {
          if (version.major > 3 && !that.dropdown) {
            that.dropdown = that.$button.data('bs.dropdown');
            that.dropdown._menu = that.$menu[0];
          }
        });

        this.$button.on('click.bs.dropdown.data-api', function() {
          if (!that.$newElement.hasClass(classNames.SHOW)) {
            that.setSize();
          }
        });

        this.$element.on('shown.bs.select', function() {
          if (that.$menuInner[0].scrollTop !== that.selectpicker.view.scrollTop) {
            that.$menuInner[0].scrollTop = that.selectpicker.view.scrollTop;
          }

          if (that.options.liveSearch) {
            that.$searchbox.focus();
          } else {
            that.$menuInner.focus();
          }
        });

        this.$menuInner.on('click', 'li a', function(e, retainActive) {
          var $this = $(this),
            position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
            clickedIndex = that.selectpicker.current.map.originalIndex[$this.parent().index() + position0],
            prevValue = getSelectValues(that.$element[0]),
            prevIndex = that.$element.prop('selectedIndex'),
            triggerChange = true;

          // Don't close on multi choice menu
          if (that.multiple && that.options.maxOptions !== 1) {
            e.stopPropagation();
          }

          e.preventDefault();

          //Don't run if we have been disabled
          if (!that.isDisabled() && !$this.parent().hasClass(classNames.DISABLED)) {
            var $options = that.$element.find('option'),
              $option = $options.eq(clickedIndex),
              state = $option.prop('selected'),
              $optgroup = $option.parent('optgroup'),
              maxOptions = that.options.maxOptions,
              maxOptionsGrp = $optgroup.data('maxOptions') || false;

            if (clickedIndex === that.activeIndex) retainActive = true;

            if (!retainActive) {
              that.prevActiveIndex = that.activeIndex;
              that.activeIndex = undefined;
            }

            if (!that.multiple) { // Deselect all others if not multi select box
              $options.prop('selected', false);
              $option.prop('selected', true);
              that.setSelected(clickedIndex, true);
            } else { // Toggle the one we have chosen if we are multi select.
              $option.prop('selected', !state);

              that.setSelected(clickedIndex, !state);
              $this.blur();

              if (maxOptions !== false || maxOptionsGrp !== false) {
                var maxReached = maxOptions < $options.filter(':selected').length,
                  maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

                if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                  if (maxOptions && maxOptions == 1) {
                    $options.prop('selected', false);
                    $option.prop('selected', true);
                    that.$menuInner.find('.selected').removeClass('selected');
                    that.setSelected(clickedIndex, true);
                  } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                    $optgroup.find('option:selected').prop('selected', false);
                    $option.prop('selected', true);
                    var optgroupID = that.selectpicker.current.data[$this.parent().index() + that.selectpicker.view.position0].optID;
                    that.$menuInner.find('.optgroup-' + optgroupID).removeClass('selected');
                    that.setSelected(clickedIndex, true);
                  } else {
                    var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                      maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                      maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                      maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                      $notify = $('<div class="notify"></div>');
                    // If {var} is set in array, replace it
                    /** @deprecated */
                    if (maxOptionsArr[2]) {
                      maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                      maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                    }

                    $option.prop('selected', false);

                    that.$menu.append($notify);

                    if (maxOptions && maxReached) {
                      $notify.append($('<div>' + maxTxt + '</div>'));
                      triggerChange = false;
                      that.$element.trigger('maxReached.bs.select');
                    }

                    if (maxOptionsGrp && maxReachedGrp) {
                      $notify.append($('<div>' + maxTxtGrp + '</div>'));
                      triggerChange = false;
                      that.$element.trigger('maxReachedGrp.bs.select');
                    }

                    setTimeout(function() {
                      that.setSelected(clickedIndex, false);
                    }, 10);

                    $notify.delay(750).fadeOut(300, function() {
                      $(this).remove();
                    });
                  }
                }
              }
            }

            if (!that.multiple || (that.multiple && that.options.maxOptions === 1)) {
              that.$button.focus();
            } else if (that.options.liveSearch) {
              that.$searchbox.focus();
            }

            // Trigger select 'change'
            if (triggerChange) {
              if ((prevValue != getSelectValues(that.$element[0]) && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
                // $option.prop('selected') is current option state (selected/unselected). prevValue is the value of the select prior to being changed.
                changed_arguments = [clickedIndex, $option.prop('selected'), prevValue];
                that.$element
                  .triggerNative('change');
              }
            }
          }
        });

        this.$menu.on('click', 'li.' + classNames.DISABLED + ' a, .' + classNames.POPOVERHEADER + ', .' + classNames.POPOVERHEADER + ' :not(.close)', function(e) {
          if (e.currentTarget == this) {
            e.preventDefault();
            e.stopPropagation();
            if (that.options.liveSearch && !$(e.target).hasClass('close')) {
              that.$searchbox.focus();
            } else {
              that.$button.focus();
            }
          }
        });

        this.$menuInner.on('click', '.divider, .dropdown-header', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (that.options.liveSearch) {
            that.$searchbox.focus();
          } else {
            that.$button.focus();
          }
        });

        this.$menu.on('click', '.' + classNames.POPOVERHEADER + ' .close', function() {
          that.$button.click();
        });

        this.$searchbox.on('click', function(e) {
          e.stopPropagation();
        });

        this.$menu.on('click', '.actions-btn', function(e) {
          if (that.options.liveSearch) {
            that.$searchbox.focus();
          } else {
            that.$button.focus();
          }

          e.preventDefault();
          e.stopPropagation();

          if ($(this).hasClass('bs-select-all')) {
            that.selectAll();
          } else {
            that.deselectAll();
          }
        });

        this.$element.on({
          'change': function() {
            that.render();
            that.$element.trigger('changed.bs.select', changed_arguments);
            changed_arguments = null;
          },
          'focus': function() {
            that.$button.focus();
          }
        });
      },

      liveSearchListener: function() {
        var that = this,
          no_results = document.createElement('li');

        this.$button.on('click.bs.dropdown.data-api', function() {
          if (!!that.$searchbox.val()) {
            that.$searchbox.val('');
          }
        });

        this.$searchbox.on('click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api', function(e) {
          e.stopPropagation();
        });

        this.$searchbox.on('input propertychange', function() {
          var searchValue = that.$searchbox.val();

          that.selectpicker.search.map.newIndex = {};
          that.selectpicker.search.map.originalIndex = {};
          that.selectpicker.search.elements = [];
          that.selectpicker.search.data = [];

          if (searchValue) {
            var i,
              searchMatch = [],
              q = searchValue.toUpperCase(),
              cache = {},
              cacheArr = [],
              searchStyle = that._searchStyle(),
              normalizeSearch = that.options.liveSearchNormalize;

            that._$lisSelected = that.$menuInner.find('.selected');

            for (var i = 0; i < that.selectpicker.main.data.length; i++) {
              var li = that.selectpicker.main.data[i];

              if (!cache[i]) {
                cache[i] = stringSearch(li, q, searchStyle, normalizeSearch);
              }

              if (cache[i] && li.headerIndex !== undefined && cacheArr.indexOf(li.headerIndex) === -1) {
                if (li.headerIndex > 0) {
                  cache[li.headerIndex - 1] = true;
                  cacheArr.push(li.headerIndex - 1);
                }

                cache[li.headerIndex] = true;
                cacheArr.push(li.headerIndex);

                cache[li.lastIndex + 1] = true;
              }

              if (cache[i] && li.type !== 'optgroup-label') cacheArr.push(i);
            }

            for (var i = 0, cacheLen = cacheArr.length; i < cacheLen; i++) {
              var index = cacheArr[i],
                prevIndex = cacheArr[i - 1],
                li = that.selectpicker.main.data[index],
                liPrev = that.selectpicker.main.data[prevIndex];

              if (li.type !== 'divider' || (li.type === 'divider' && liPrev && liPrev.type !== 'divider' && cacheLen - 1 !== i)) {
                that.selectpicker.search.data.push(li);
                searchMatch.push(that.selectpicker.main.elements[index]);
                that.selectpicker.search.map.newIndex[li.originalIndex] = searchMatch.length - 1;
                that.selectpicker.search.map.originalIndex[searchMatch.length - 1] = li.originalIndex;
              }
            }

            that.activeIndex = undefined;
            that.noScroll = true;
            that.$menuInner.scrollTop(0);
            that.selectpicker.search.elements = searchMatch;
            that.createView(true);

            if (!searchMatch.length) {
              no_results.className = 'no-results';
              no_results.innerHTML = that.options.noneResultsText.replace('{0}', '"' + htmlEscape(searchValue) + '"');
              that.$menuInner[0].firstChild.appendChild(no_results);
            }
          } else {
            that.$menuInner.scrollTop(0);
            that.createView(false);
          }
        });
      },

      _searchStyle: function() {
        return this.options.liveSearchStyle || 'contains';
      },

      val: function(value) {
        if (typeof value !== 'undefined') {
          this.$element
            .val(value)
            .triggerNative('change');

          return this.$element;
        } else {
          return this.$element.val();
        }
      },

      changeAll: function(status) {
        if (!this.multiple) return;
        if (typeof status === 'undefined') status = true;

        var $selectOptions = this.$element.find('option'),
          previousSelected = 0,
          currentSelected = 0,
          prevValue = getSelectValues(this.$element[0]);

        this.$element.addClass('bs-select-hidden');

        for (var i = 0; i < this.selectpicker.current.elements.length; i++) {
          var index = this.selectpicker.current.map.originalIndex[i], // faster than $(li).data('originalIndex')
            option = $selectOptions[index];

          if (option) {
            if (option.selected) previousSelected++;
            option.selected = status;
            if (option.selected) currentSelected++;
          }
        }

        this.$element.removeClass('bs-select-hidden');

        if (previousSelected === currentSelected) return;

        this.setOptionStatus();

        this.togglePlaceholder();

        changed_arguments = [null, null, prevValue];

        this.$element
          .triggerNative('change');
      },

      selectAll: function() {
        return this.changeAll(true);
      },

      deselectAll: function() {
        return this.changeAll(false);
      },

      toggle: function(e) {
        e = e || window.event;

        if (e) e.stopPropagation();

        this.$button.trigger('click.bs.dropdown.data-api');
      },

      keydown: function(e) {
        var $this = $(this),
          $parent = $this.is('input') ? $this.parent().parent().parent() : $this.parent(),
          that = $parent.data('this'),
          $items = that.findLis(),
          index,
          isActive,
          liActive,
          activeLi,
          offset,
          updateScroll = false,
          downOnTab = e.which === keyCodes.TAB && !$this.hasClass('dropdown-toggle') && !that.options.selectOnTab,
          isArrowKey = REGEXP_ARROW.test(e.which) || downOnTab,
          scrollTop = that.$menuInner[0].scrollTop,
          isVirtual = that.isVirtual(),
          position0 = isVirtual === true ? that.selectpicker.view.position0 : 0;

        isActive = that.$newElement.hasClass(classNames.SHOW);

        if (!isActive &&
          (
            isArrowKey ||
            e.which >= 48 && e.which <= 57 ||
            e.which >= 96 && e.which <= 105 ||
            e.which >= 65 && e.which <= 90
          )
        ) {
          that.$button.trigger('click.bs.dropdown.data-api');
        }

        if (e.which === keyCodes.ESCAPE && isActive) {
          e.preventDefault();
          that.$button.trigger('click.bs.dropdown.data-api').focus();
        }

        if (isArrowKey) { // if up or down
          if (!$items.length) return;

          // $items.index/.filter is too slow with a large list and no virtual scroll
          index = isVirtual === true ? $items.index($items.filter('.active')) : that.selectpicker.current.map.newIndex[that.activeIndex];

          if (index === undefined) index = -1;

          if (index !== -1) {
            liActive = that.selectpicker.current.elements[index + position0];
            liActive.classList.remove('active');
            if (liActive.firstChild) liActive.firstChild.classList.remove('active');
          }

          if (e.which === keyCodes.ARROW_UP) { // up
            if (index !== -1) index--;
            if (index + position0 < 0) index += $items.length;

            if (!that.selectpicker.view.canHighlight[index + position0]) {
              index = that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) - position0;
              if (index === -1) index = $items.length - 1;
            }
          } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) { // down
            index++;
            if (index + position0 >= that.selectpicker.view.canHighlight.length) index = 0;

            if (!that.selectpicker.view.canHighlight[index + position0]) {
              index = index + 1 + that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
            }
          }

          e.preventDefault();

          var liActiveIndex = position0 + index;

          if (e.which === keyCodes.ARROW_UP) { // up
            // scroll to bottom and highlight last option
            if (position0 === 0 && index === $items.length - 1) {
              that.$menuInner[0].scrollTop = that.$menuInner[0].scrollHeight;

              liActiveIndex = that.selectpicker.current.elements.length - 1;
            } else {
              activeLi = that.selectpicker.current.data[liActiveIndex];
              offset = activeLi.position - activeLi.height;

              updateScroll = offset < scrollTop;
            }
          } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) { // down
            // scroll to top and highlight first option
            if (position0 !== 0 && index === 0) {
              that.$menuInner[0].scrollTop = 0;

              liActiveIndex = 0;
            } else {
              activeLi = that.selectpicker.current.data[liActiveIndex];
              offset = activeLi.position - that.sizeInfo.menuInnerHeight;

              updateScroll = offset > scrollTop;
            }
          }

          liActive = that.selectpicker.current.elements[liActiveIndex];
          liActive.classList.add('active');
          if (liActive.firstChild) liActive.firstChild.classList.add('active');
          that.activeIndex = that.selectpicker.current.map.originalIndex[liActiveIndex];

          that.selectpicker.view.currentActive = liActive;

          if (updateScroll) that.$menuInner[0].scrollTop = offset;

          if (that.options.liveSearch) {
            that.$searchbox.focus();
          } else {
            $this.focus();
          }
        } else if (!$this.is('input') &&
          !REGEXP_TAB_OR_ESCAPE.test(e.which) ||
          (e.which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory)
        ) {
          var searchMatch,
            matches = [],
            keyHistory;

          e.preventDefault();

          that.selectpicker.keydown.keyHistory += keyCodeMap[e.which];

          if (that.selectpicker.keydown.resetKeyHistory.cancel) clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
          that.selectpicker.keydown.resetKeyHistory.cancel = that.selectpicker.keydown.resetKeyHistory.start();

          keyHistory = that.selectpicker.keydown.keyHistory;

          // if all letters are the same, set keyHistory to just the first character when searching
          if (/^(.)\1+$/.test(keyHistory)) {
            keyHistory = keyHistory.charAt(0);
          }

          // find matches
          for (var i = 0; i < that.selectpicker.current.data.length; i++) {
            var li = that.selectpicker.current.data[i],
              hasMatch;

            hasMatch = stringSearch(li, keyHistory, 'startsWith', true);

            if (hasMatch && that.selectpicker.view.canHighlight[i]) {
              li.index = i;
              matches.push(li.originalIndex);
            }
          }

          if (matches.length) {
            var matchIndex = 0;

            $items.removeClass('active').find('a').removeClass('active');

            // either only one key has been pressed or they are all the same key
            if (keyHistory.length === 1) {
              matchIndex = matches.indexOf(that.activeIndex);

              if (matchIndex === -1 || matchIndex === matches.length - 1) {
                matchIndex = 0;
              } else {
                matchIndex++;
              }
            }

            searchMatch = that.selectpicker.current.map.newIndex[matches[matchIndex]];

            activeLi = that.selectpicker.current.data[searchMatch];

            if (scrollTop - activeLi.position > 0) {
              offset = activeLi.position - activeLi.height;
              updateScroll = true;
            } else {
              offset = activeLi.position - that.sizeInfo.menuInnerHeight;
              // if the option is already visible at the current scroll position, just keep it the same
              updateScroll = activeLi.position > scrollTop + that.sizeInfo.menuInnerHeight;
            }

            liActive = that.selectpicker.current.elements[searchMatch];
            liActive.classList.add('active');
            if (liActive.firstChild) liActive.firstChild.classList.add('active');
            that.activeIndex = matches[matchIndex];

            liActive.firstChild.focus();

            if (updateScroll) that.$menuInner[0].scrollTop = offset;

            $this.focus();
          }
        }

        // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
        if (
          isActive &&
          (
            (e.which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory) ||
            e.which === keyCodes.ENTER ||
            (e.which === keyCodes.TAB && that.options.selectOnTab)
          )
        ) {
          if (e.which !== keyCodes.SPACE) e.preventDefault();

          if (!that.options.liveSearch || e.which !== keyCodes.SPACE) {
            that.$menuInner.find('.active a').trigger('click', true); // retain active class
            $this.focus();

            if (!that.options.liveSearch) {
              // Prevent screen from scrolling if the user hits the spacebar
              e.preventDefault();
              // Fixes spacebar selection of dropdown items in FF & IE
              $(document).data('spaceSelect', true);
            }
          }
        }
      },

      mobile: function() {
        this.$element.addClass('mobile-device');
      },

      refresh: function() {
        // update options if data attributes have been changed
        var config = $.extend({}, this.options, this.$element.data());
        this.options = config;

        this.selectpicker.main.map.newIndex = {};
        this.selectpicker.main.map.originalIndex = {};
        this.createLi();
        this.checkDisabled();
        this.render();
        this.setStyle();
        this.setWidth();

        this.setSize(true);

        this.$element.trigger('refreshed.bs.select');
      },

      hide: function() {
        this.$newElement.hide();
      },

      show: function() {
        this.$newElement.show();
      },

      remove: function() {
        this.$newElement.remove();
        this.$element.remove();
      },

      destroy: function() {
        this.$newElement.before(this.$element).remove();

        if (this.$bsContainer) {
          this.$bsContainer.remove();
        } else {
          this.$menu.remove();
        }

        this.$element
          .off('.bs.select')
          .removeData('selectpicker')
          .removeClass('bs-select-hidden selectpicker');
      }
    };

    // SELECTPICKER PLUGIN DEFINITION
    // ==============================
    function Plugin(option) {
      // get the args of the outer function..
      var args = arguments;
      // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
      // to get lost/corrupted in android 2.3 and IE9 #715 #775
      var _option = option;

      [].shift.apply(args);

      var value;
      var chain = this.each(function() {
        var $this = $(this);
        if ($this.is('select')) {
          var data = $this.data('selectpicker'),
            options = typeof _option == 'object' && _option;

          if (!data) {
            var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
            config.template = $.extend({}, Selectpicker.DEFAULTS.template, ($.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}), $this.data().template, options.template);
            $this.data('selectpicker', (data = new Selectpicker(this, config)));
          } else if (options) {
            for (var i in options) {
              if (options.hasOwnProperty(i)) {
                data.options[i] = options[i];
              }
            }
          }

          if (typeof _option == 'string') {
            if (data[_option] instanceof Function) {
              value = data[_option].apply(data, args);
            } else {
              value = data.options[_option];
            }
          }
        }
      });

      if (typeof value !== 'undefined') {
        //noinspection JSUnusedAssignment
        return value;
      } else {
        return chain;
      }
    }

    var old = $.fn.selectpicker;
    $.fn.selectpicker = Plugin;
    $.fn.selectpicker.Constructor = Selectpicker;

    // SELECTPICKER NO CONFLICT
    // ========================
    $.fn.selectpicker.noConflict = function() {
      $.fn.selectpicker = old;
      return this;
    };

    $(document)
      .off('keydown.bs.dropdown.data-api')
      .on('keydown.bs.select', '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bs-searchbox input', Selectpicker.prototype.keydown)
      .on('focusin.modal', '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bs-searchbox input', function(e) {
        e.stopPropagation();
      });

    // SELECTPICKER DATA-API
    // =====================
    $(window).on('load.bs.select.data-api', function() {
      $('.selectpicker').each(function() {
        var $selectpicker = $(this);
        Plugin.call($selectpicker, $selectpicker.data());
      })
    });
  })(jQuery);


}));
/*!
 * Jasny Bootstrap v3.1.3 (http://jasny.github.io/bootstrap)
 * Copyright 2012-2014 Arnold Daniels
 * Licensed under Apache-2.0 (https://github.com/jasny/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Jasny Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}void 0===a.support.transition&&(a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()}))}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.state=null,this.placement=null,this.options.recalc&&(this.calcClone(),a(window).on("resize",a.proxy(this.recalc,this))),this.options.autohide&&a(document).on("click",a.proxy(this.autohide,this)),this.options.toggle&&this.toggle(),this.options.disablescrolling&&(this.options.disableScrolling=this.options.disablescrolling,delete this.options.disablescrolling)};b.DEFAULTS={toggle:!0,placement:"auto",autohide:!0,recalc:!0,disableScrolling:!0},b.prototype.offset=function(){switch(this.placement){case"left":case"right":return this.$element.outerWidth();case"top":case"bottom":return this.$element.outerHeight()}},b.prototype.calcPlacement=function(){function b(a,b){if("auto"===e.css(b))return a;if("auto"===e.css(a))return b;var c=parseInt(e.css(a),10),d=parseInt(e.css(b),10);return c>d?b:a}if("auto"!==this.options.placement)return void(this.placement=this.options.placement);this.$element.hasClass("in")||this.$element.css("visiblity","hidden !important").addClass("in");var c=a(window).width()/this.$element.width(),d=a(window).height()/this.$element.height(),e=this.$element;this.placement=c>=d?b("left","right"):b("top","bottom"),"hidden !important"===this.$element.css("visibility")&&this.$element.removeClass("in").css("visiblity","")},b.prototype.opposite=function(a){switch(a){case"top":return"bottom";case"left":return"right";case"bottom":return"top";case"right":return"left"}},b.prototype.getCanvasElements=function(){var b=this.options.canvas?a(this.options.canvas):this.$element,c=b.find("*").filter(function(){return"fixed"===a(this).css("position")}).not(this.options.exclude);return b.add(c)},b.prototype.slide=function(b,c,d){if(!a.support.transition){var e={};return e[this.placement]="+="+c,b.animate(e,350,d)}var f=this.placement,g=this.opposite(f);b.each(function(){"auto"!==a(this).css(f)&&a(this).css(f,(parseInt(a(this).css(f),10)||0)+c),"auto"!==a(this).css(g)&&a(this).css(g,(parseInt(a(this).css(g),10)||0)-c)}),this.$element.one(a.support.transition.end,d).emulateTransitionEnd(350)},b.prototype.disableScrolling=function(){var b=a("body").width(),c="padding-"+this.opposite(this.placement);if(void 0===a("body").data("offcanvas-style")&&a("body").data("offcanvas-style",a("body").attr("style")||""),a("body").css("overflow","hidden"),a("body").width()>b){var d=parseInt(a("body").css(c),10)+a("body").width()-b;setTimeout(function(){a("body").css(c,d)},1)}},b.prototype.show=function(){if(!this.state){var b=a.Event("show.bs.offcanvas");if(this.$element.trigger(b),!b.isDefaultPrevented()){this.state="slide-in",this.calcPlacement();var c=this.getCanvasElements(),d=this.placement,e=this.opposite(d),f=this.offset();-1!==c.index(this.$element)&&(a(this.$element).data("offcanvas-style",a(this.$element).attr("style")||""),this.$element.css(d,-1*f),this.$element.css(d)),c.addClass("canvas-sliding").each(function(){void 0===a(this).data("offcanvas-style")&&a(this).data("offcanvas-style",a(this).attr("style")||""),"static"===a(this).css("position")&&a(this).css("position","relative"),"auto"!==a(this).css(d)&&"0px"!==a(this).css(d)||"auto"!==a(this).css(e)&&"0px"!==a(this).css(e)||a(this).css(d,0)}),this.options.disableScrolling&&this.disableScrolling();var g=function(){"slide-in"==this.state&&(this.state="slid",c.removeClass("canvas-sliding").addClass("canvas-slid"),this.$element.trigger("shown.bs.offcanvas"))};setTimeout(a.proxy(function(){this.$element.addClass("in"),this.slide(c,f,a.proxy(g,this))},this),1)}}},b.prototype.hide=function(){if("slid"===this.state){var b=a.Event("hide.bs.offcanvas");if(this.$element.trigger(b),!b.isDefaultPrevented()){this.state="slide-out";var c=a(".canvas-slid"),d=(this.placement,-1*this.offset()),e=function(){"slide-out"==this.state&&(this.state=null,this.placement=null,this.$element.removeClass("in"),c.removeClass("canvas-sliding"),c.add(this.$element).add("body").each(function(){a(this).attr("style",a(this).data("offcanvas-style")).removeData("offcanvas-style")}),this.$element.trigger("hidden.bs.offcanvas"))};c.removeClass("canvas-slid").addClass("canvas-sliding"),setTimeout(a.proxy(function(){this.slide(c,d,a.proxy(e,this))},this),1)}}},b.prototype.toggle=function(){"slide-in"!==this.state&&"slide-out"!==this.state&&this["slid"===this.state?"hide":"show"]()},b.prototype.calcClone=function(){this.$calcClone=this.$element.clone().html("").addClass("offcanvas-clone").removeClass("in").appendTo(a("body"))},b.prototype.recalc=function(){if("none"!==this.$calcClone.css("display")&&("slid"===this.state||"slide-in"===this.state)){this.state=null,this.placement=null;var b=this.getCanvasElements();this.$element.removeClass("in"),b.removeClass("canvas-slid"),b.add(this.$element).add("body").each(function(){a(this).attr("style",a(this).data("offcanvas-style")).removeData("offcanvas-style")})}},b.prototype.autohide=function(b){0===a(b.target).closest(this.$element).length&&this.hide()};var c=a.fn.offcanvas;a.fn.offcanvas=function(c){return this.each(function(){var d=a(this),e=d.data("bs.offcanvas"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.offcanvas",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.offcanvas.Constructor=b,a.fn.offcanvas.noConflict=function(){return a.fn.offcanvas=c,this},a(document).on("click.bs.offcanvas.data-api","[data-toggle=offcanvas]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.offcanvas"),h=g?"toggle":d.data();b.stopPropagation(),g?g.toggle():f.offcanvas(h)})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.$element.on("click.bs.rowlink","td:not(.rowlink-skip)",a.proxy(this.click,this))};b.DEFAULTS={target:"a"},b.prototype.click=function(b){var c=a(b.currentTarget).closest("tr").find(this.options.target)[0];if(a(b.target)[0]!==c)if(b.preventDefault(),c.click)c.click();else if(document.createEvent){var d=document.createEvent("MouseEvents");d.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),c.dispatchEvent(d)}};var c=a.fn.rowlink;a.fn.rowlink=function(c){return this.each(function(){var d=a(this),e=d.data("bs.rowlink");e||d.data("bs.rowlink",e=new b(this,c))})},a.fn.rowlink.Constructor=b,a.fn.rowlink.noConflict=function(){return a.fn.rowlink=c,this},a(document).on("click.bs.rowlink.data-api",'[data-link="row"]',function(b){if(0===a(b.target).closest(".rowlink-skip").length){var c=a(this);c.data("bs.rowlink")||(c.rowlink(c.data()),a(b.target).trigger("click.bs.rowlink"))}})}(window.jQuery),+function(a){"use strict";var b=void 0!==window.orientation,c=navigator.userAgent.toLowerCase().indexOf("android")>-1,d="Microsoft Internet Explorer"==window.navigator.appName,e=function(b,d){c||(this.$element=a(b),this.options=a.extend({},e.DEFAULTS,d),this.mask=String(this.options.mask),this.init(),this.listen(),this.checkVal())};e.DEFAULTS={mask:"",placeholder:"_",definitions:{9:"[0-9]",a:"[A-Za-z]",w:"[A-Za-z0-9]","*":"."}},e.prototype.init=function(){var b=this.options.definitions,c=this.mask.length;this.tests=[],this.partialPosition=this.mask.length,this.firstNonMaskPos=null,a.each(this.mask.split(""),a.proxy(function(a,d){"?"==d?(c--,this.partialPosition=a):b[d]?(this.tests.push(new RegExp(b[d])),null===this.firstNonMaskPos&&(this.firstNonMaskPos=this.tests.length-1)):this.tests.push(null)},this)),this.buffer=a.map(this.mask.split(""),a.proxy(function(a){return"?"!=a?b[a]?this.options.placeholder:a:void 0},this)),this.focusText=this.$element.val(),this.$element.data("rawMaskFn",a.proxy(function(){return a.map(this.buffer,function(a,b){return this.tests[b]&&a!=this.options.placeholder?a:null}).join("")},this))},e.prototype.listen=function(){if(!this.$element.attr("readonly")){var b=(d?"paste":"input")+".mask";this.$element.on("unmask.bs.inputmask",a.proxy(this.unmask,this)).on("focus.bs.inputmask",a.proxy(this.focusEvent,this)).on("blur.bs.inputmask",a.proxy(this.blurEvent,this)).on("keydown.bs.inputmask",a.proxy(this.keydownEvent,this)).on("keypress.bs.inputmask",a.proxy(this.keypressEvent,this)).on(b,a.proxy(this.pasteEvent,this))}},e.prototype.caret=function(a,b){if(0!==this.$element.length){if("number"==typeof a)return b="number"==typeof b?b:a,this.$element.each(function(){if(this.setSelectionRange)this.setSelectionRange(a,b);else if(this.createTextRange){var c=this.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select()}});if(this.$element[0].setSelectionRange)a=this.$element[0].selectionStart,b=this.$element[0].selectionEnd;else if(document.selection&&document.selection.createRange){var c=document.selection.createRange();a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length}return{begin:a,end:b}}},e.prototype.seekNext=function(a){for(var b=this.mask.length;++a<=b&&!this.tests[a];);return a},e.prototype.seekPrev=function(a){for(;--a>=0&&!this.tests[a];);return a},e.prototype.shiftL=function(a,b){var c=this.mask.length;if(!(0>a)){for(var d=a,e=this.seekNext(b);c>d;d++)if(this.tests[d]){if(!(c>e&&this.tests[d].test(this.buffer[e])))break;this.buffer[d]=this.buffer[e],this.buffer[e]=this.options.placeholder,e=this.seekNext(e)}this.writeBuffer(),this.caret(Math.max(this.firstNonMaskPos,a))}},e.prototype.shiftR=function(a){for(var b=this.mask.length,c=a,d=this.options.placeholder;b>c;c++)if(this.tests[c]){var e=this.seekNext(c),f=this.buffer[c];if(this.buffer[c]=d,!(b>e&&this.tests[e].test(f)))break;d=f}},e.prototype.unmask=function(){this.$element.unbind(".mask").removeData("inputmask")},e.prototype.focusEvent=function(){this.focusText=this.$element.val();var a=this.mask.length,b=this.checkVal();this.writeBuffer();var c=this,d=function(){b==a?c.caret(0,b):c.caret(b)};d(),setTimeout(d,50)},e.prototype.blurEvent=function(){this.checkVal(),this.$element.val()!==this.focusText&&this.$element.trigger("change")},e.prototype.keydownEvent=function(a){var c=a.which;if(8==c||46==c||b&&127==c){var d=this.caret(),e=d.begin,f=d.end;return f-e===0&&(e=46!=c?this.seekPrev(e):f=this.seekNext(e-1),f=46==c?this.seekNext(f):f),this.clearBuffer(e,f),this.shiftL(e,f-1),!1}return 27==c?(this.$element.val(this.focusText),this.caret(0,this.checkVal()),!1):void 0},e.prototype.keypressEvent=function(a){var b=this.mask.length,c=a.which,d=this.caret();if(a.ctrlKey||a.altKey||a.metaKey||32>c)return!0;if(c){d.end-d.begin!==0&&(this.clearBuffer(d.begin,d.end),this.shiftL(d.begin,d.end-1));var e=this.seekNext(d.begin-1);if(b>e){var f=String.fromCharCode(c);if(this.tests[e].test(f)){this.shiftR(e),this.buffer[e]=f,this.writeBuffer();var g=this.seekNext(e);this.caret(g)}}return!1}},e.prototype.pasteEvent=function(){var a=this;setTimeout(function(){a.caret(a.checkVal(!0))},0)},e.prototype.clearBuffer=function(a,b){for(var c=this.mask.length,d=a;b>d&&c>d;d++)this.tests[d]&&(this.buffer[d]=this.options.placeholder)},e.prototype.writeBuffer=function(){return this.$element.val(this.buffer.join("")).val()},e.prototype.checkVal=function(a){for(var b=this.mask.length,c=this.$element.val(),d=-1,e=0,f=0;b>e;e++)if(this.tests[e]){for(this.buffer[e]=this.options.placeholder;f++<c.length;){var g=c.charAt(f-1);if(this.tests[e].test(g)){this.buffer[e]=g,d=e;break}}if(f>c.length)break}else this.buffer[e]==c.charAt(f)&&e!=this.partialPosition&&(f++,d=e);return!a&&d+1<this.partialPosition?(this.$element.val(""),this.clearBuffer(0,b)):(a||d+1>=this.partialPosition)&&(this.writeBuffer(),a||this.$element.val(this.$element.val().substring(0,d+1))),this.partialPosition?e:this.firstNonMaskPos};var f=a.fn.inputmask;a.fn.inputmask=function(b){return this.each(function(){var c=a(this),d=c.data("bs.inputmask");d||c.data("bs.inputmask",d=new e(this,b))})},a.fn.inputmask.Constructor=e,a.fn.inputmask.noConflict=function(){return a.fn.inputmask=f,this},a(document).on("focus.bs.inputmask.data-api","[data-mask]",function(){var b=a(this);b.data("bs.inputmask")||b.inputmask(b.data())})}(window.jQuery),+function(a){"use strict";var b="Microsoft Internet Explorer"==window.navigator.appName,c=function(b,c){if(this.$element=a(b),this.$input=this.$element.find(":file"),0!==this.$input.length){this.name=this.$input.attr("name")||c.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),0===this.$hidden.length&&(this.$hidden=a('<input type="hidden">').insertBefore(this.$input)),this.$preview=this.$element.find(".fileinput-preview");var d=this.$preview.css("height");"inline"!==this.$preview.css("display")&&"0px"!==d&&"none"!==d&&this.$preview.css("line-height",d),this.original={exists:this.$element.hasClass("fileinput-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.listen()}};c.prototype.listen=function(){this.$input.on("change.bs.fileinput",a.proxy(this.change,this)),a(this.$input[0].form).on("reset.bs.fileinput",a.proxy(this.reset,this)),this.$element.find('[data-trigger="fileinput"]').on("click.bs.fileinput",a.proxy(this.trigger,this)),this.$element.find('[data-dismiss="fileinput"]').on("click.bs.fileinput",a.proxy(this.clear,this))},c.prototype.change=function(b){var c=void 0===b.target.files?b.target&&b.target.value?[{name:b.target.value.replace(/^.+\\/,"")}]:[]:b.target.files;if(b.stopPropagation(),0===c.length)return void this.clear();this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);var d=c[0];if(this.$preview.length>0&&("undefined"!=typeof d.type?d.type.match(/^image\/(gif|png|jpeg)$/):d.name.match(/\.(gif|png|jpe?g)$/i))&&"undefined"!=typeof FileReader){var e=new FileReader,f=this.$preview,g=this.$element;e.onload=function(b){var e=a("<img>");e[0].src=b.target.result,c[0].result=b.target.result,g.find(".fileinput-filename").text(d.name),"none"!=f.css("max-height")&&e.css("max-height",parseInt(f.css("max-height"),10)-parseInt(f.css("padding-top"),10)-parseInt(f.css("padding-bottom"),10)-parseInt(f.css("border-top"),10)-parseInt(f.css("border-bottom"),10)),f.html(e),g.addClass("fileinput-exists").removeClass("fileinput-new"),g.trigger("change.bs.fileinput",c)},e.readAsDataURL(d)}else this.$element.find(".fileinput-filename").text(d.name),this.$preview.text(d.name),this.$element.addClass("fileinput-exists").removeClass("fileinput-new"),this.$element.trigger("change.bs.fileinput")},c.prototype.clear=function(a){if(a&&a.preventDefault(),this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name",""),b){var c=this.$input.clone(!0);this.$input.after(c),this.$input.remove(),this.$input=c}else this.$input.val("");this.$preview.html(""),this.$element.find(".fileinput-filename").text(""),this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),void 0!==a&&(this.$input.trigger("change"),this.$element.trigger("clear.bs.fileinput"))},c.prototype.reset=function(){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.$element.find(".fileinput-filename").text(""),this.original.exists?this.$element.addClass("fileinput-exists").removeClass("fileinput-new"):this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),this.$element.trigger("reset.bs.fileinput")},c.prototype.trigger=function(a){this.$input.trigger("click"),a.preventDefault()};var d=a.fn.fileinput;a.fn.fileinput=function(b){return this.each(function(){var d=a(this),e=d.data("bs.fileinput");e||d.data("bs.fileinput",e=new c(this,b)),"string"==typeof b&&e[b]()})},a.fn.fileinput.Constructor=c,a.fn.fileinput.noConflict=function(){return a.fn.fileinput=d,this},a(document).on("click.fileinput.data-api",'[data-provides="fileinput"]',function(b){var c=a(this);if(!c.data("bs.fileinput")){c.fileinput(c.data());var d=a(b.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');d.length>0&&(b.preventDefault(),d.trigger("click.bs.fileinput"))}})}(window.jQuery);
/*



     Creative Tim Modifications

     Lines: 236 was changed from top: 5px to top: 50% and we added margin-top: -9px. In this way the close button will be aligned vertically
     Line:219 - modified when the icon is set, we add the class "alert-with-icon", so there will be enough space for the icon.
	 Lines: 179/222 - class() was changed to html() so we can add the Material Design Icons



*/


/*
 * Project: Bootstrap Notify = v3.1.5
 * Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
 * Author: Mouse0270 aka Robert McIntosh
 * License: MIT License
 * Website: https://github.com/mouse0270/bootstrap-growl
 */

/* global define:false, require: false, jQuery:false */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  // Create the defaults once
  var defaults = {
    element: 'body',
    position: null,
    type: "info",
    allow_dismiss: true,
    allow_duplicates: true,
    newest_on_top: false,
    showProgressbar: false,
    placement: {
      from: "top",
      align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 1031,
    delay: 5000,
    timer: 1000,
    url_target: '_blank',
    mouse_over: null,
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="material-icons">close</i></button><i data-notify="icon" class="material-icons"></i><span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
  };

  String.format = function() {
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
    }
    return str;
  };

  function isDuplicateNotification(notification) {
    var isDupe = false;

    $('[data-notify="container"]').each(function(i, el) {
      var $el = $(el);
      var title = $el.find('[data-notify="title"]').text().trim();
      var message = $el.find('[data-notify="message"]').html().trim();

      // The input string might be different than the actual parsed HTML string!
      // (<br> vs <br /> for example)
      // So we have to force-parse this as HTML here!
      var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
      var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
      var isSameType = $el.hasClass('alert-' + notification.settings.type);

      if (isSameTitle && isSameMsg && isSameType) {
        //we found the dupe. Set the var and stop checking.
        isDupe = true;
      }
      return !isDupe;
    });

    return isDupe;
  }

  function Notify(element, content, options) {
    // Setup Content of Notify
    var contentObj = {
      content: {
        message: typeof content === 'object' ? content.message : content,
        title: content.title ? content.title : '',
        icon: content.icon ? content.icon : '',
        url: content.url ? content.url : '#',
        target: content.target ? content.target : '-'
      }
    };

    options = $.extend(true, {}, contentObj, options);
    this.settings = $.extend(true, {}, defaults, options);
    this._defaults = defaults;
    if (this.settings.content.target === "-") {
      this.settings.content.target = this.settings.url_target;
    }
    this.animations = {
      start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
      end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
    };

    if (typeof this.settings.offset === 'number') {
      this.settings.offset = {
        x: this.settings.offset,
        y: this.settings.offset
      };
    }

    //if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
    if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
      this.init();
    }
  }

  $.extend(Notify.prototype, {
    init: function() {
      var self = this;

      this.buildNotify();
      if (this.settings.content.icon) {
        this.setIcon();
      }
      if (this.settings.content.url != "#") {
        this.styleURL();
      }
      this.styleDismiss();
      this.placement();
      this.bind();

      this.notify = {
        $ele: this.$ele,
        update: function(command, update) {
          var commands = {};
          if (typeof command === "string") {
            commands[command] = update;
          } else {
            commands = command;
          }
          for (var cmd in commands) {
            switch (cmd) {
              case "type":
                this.$ele.removeClass('alert-' + self.settings.type);
                this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
                self.settings.type = commands[cmd];
                this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
                break;
              case "icon":
                var $icon = this.$ele.find('[data-notify="icon"]');
                if (self.settings.icon_type.toLowerCase() === 'class') {
                  $icon.html(commands[cmd]);
                } else {
                  if (!$icon.is('img')) {
                    $icon.find('img');
                  }
                  $icon.attr('src', commands[cmd]);
                }
                break;
              case "progress":
                var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
                this.$ele.data('notify-delay', newDelay);
                this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
                break;
              case "url":
                this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
                break;
              case "target":
                this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
                break;
              default:
                this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
            }
          }
          var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
          self.reposition(posX);
        },
        close: function() {
          self.close();
        }
      };

    },
    buildNotify: function() {
      var content = this.settings.content;
      this.$ele = $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target));
      this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
      if (!this.settings.allow_dismiss) {
        this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
      }
      if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
        this.$ele.find('[data-notify="progressbar"]').remove();
      }
    },
    setIcon: function() {

      this.$ele.addClass('alert-with-icon');

      if (this.settings.icon_type.toLowerCase() === 'class') {
        this.$ele.find('[data-notify="icon"]').html(this.settings.content.icon);
      } else {
        if (this.$ele.find('[data-notify="icon"]').is('img')) {
          this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
        } else {
          this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
        }
      }
    },
    styleDismiss: function() {
      this.$ele.find('[data-notify="dismiss"]').css({
        position: 'absolute',
        right: '10px',
        top: '50%',
        marginTop: '-9px',
        zIndex: this.settings.z_index + 2
      });
    },
    styleURL: function() {
      this.$ele.find('[data-notify="url"]').css({
        backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: this.settings.z_index + 1
      });
    },
    placement: function() {
      var self = this,
        offsetAmt = this.settings.offset.y,
        css = {
          display: 'inline-block',
          margin: '15px auto',
          position: this.settings.position ? this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
          transition: 'all .5s ease-in-out',
          zIndex: this.settings.z_index
        },
        hasAnimation = false,
        settings = this.settings;

      $('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])').each(function() {
        offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + parseInt($(this).outerHeight()) + parseInt(settings.spacing));
      });
      if (this.settings.newest_on_top === true) {
        offsetAmt = this.settings.offset.y;
      }
      css[this.settings.placement.from] = offsetAmt + 'px';

      switch (this.settings.placement.align) {
        case "left":
        case "right":
          css[this.settings.placement.align] = this.settings.offset.x + 'px';
          break;
        case "center":
          css.left = 0;
          css.right = 0;
          break;
      }
      this.$ele.css(css).addClass(this.settings.animate.enter);
      $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function(index, prefix) {
        self.$ele[0].style[prefix + 'AnimationIterationCount'] = 1;
      });

      $(this.settings.element).append(this.$ele);

      if (this.settings.newest_on_top === true) {
        offsetAmt = (parseInt(offsetAmt) + parseInt(this.settings.spacing)) + this.$ele.outerHeight();
        this.reposition(offsetAmt);
      }

      if ($.isFunction(self.settings.onShow)) {
        self.settings.onShow.call(this.$ele);
      }

      this.$ele.one(this.animations.start, function() {
        hasAnimation = true;
      }).one(this.animations.end, function() {
        if ($.isFunction(self.settings.onShown)) {
          self.settings.onShown.call(this);
        }
      });

      setTimeout(function() {
        if (!hasAnimation) {
          if ($.isFunction(self.settings.onShown)) {
            self.settings.onShown.call(this);
          }
        }
      }, 600);
    },
    bind: function() {
      var self = this;

      this.$ele.find('[data-notify="dismiss"]').on('click', function() {
        self.close();
      });

      this.$ele.mouseover(function() {
        $(this).data('data-hover', "true");
      }).mouseout(function() {
        $(this).data('data-hover', "false");
      });
      this.$ele.data('data-hover', "false");

      if (this.settings.delay > 0) {
        self.$ele.data('notify-delay', self.settings.delay);
        var timer = setInterval(function() {
          var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
          if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause") || self.settings.mouse_over != "pause") {
            var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
            self.$ele.data('notify-delay', delay);
            self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
          }
          if (delay <= -(self.settings.timer)) {
            clearInterval(timer);
            self.close();
          }
        }, self.settings.timer);
      }
    },
    close: function() {
      var self = this,
        posX = parseInt(this.$ele.css(this.settings.placement.from)),
        hasAnimation = false;

      this.$ele.data('closing', 'true').addClass(this.settings.animate.exit);
      self.reposition(posX);

      if ($.isFunction(self.settings.onClose)) {
        self.settings.onClose.call(this.$ele);
      }

      this.$ele.one(this.animations.start, function() {
        hasAnimation = true;
      }).one(this.animations.end, function() {
        $(this).remove();
        if ($.isFunction(self.settings.onClosed)) {
          self.settings.onClosed.call(this);
        }
      });

      setTimeout(function() {
        if (!hasAnimation) {
          self.$ele.remove();
          if (self.settings.onClosed) {
            self.settings.onClosed(self.$ele);
          }
        }
      }, 600);
    },
    reposition: function(posX) {
      var self = this,
        notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
        $elements = this.$ele.nextAll(notifies);
      if (this.settings.newest_on_top === true) {
        $elements = this.$ele.prevAll(notifies);
      }
      $elements.each(function() {
        $(this).css(self.settings.placement.from, posX);
        posX = (parseInt(posX) + parseInt(self.settings.spacing)) + $(this).outerHeight();
      });
    }
  });

  $.notify = function(content, options) {
    var plugin = new Notify(this, content, options);
    return plugin.notify;
  };
  $.notifyDefaults = function(options) {
    defaults = $.extend(true, {}, defaults, options);
    return defaults;
  };
  $.notifyClose = function(command) {
    if (typeof command === "undefined" || command === "all") {
      $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
    } else {
      $('[data-notify-position="' + command + '"]').find('[data-notify="dismiss"]').trigger('click');
    }
  };

}));
/*!

 =========================================================
 * Material Dashboard PRO - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-pro
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

(function() {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

    $('html').addClass('perfect-scrollbar-on');
  } else {
    $('html').addClass('perfect-scrollbar-off');
  }
})();


var breakCards = true;

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var mobile_menu_visible = 0,
  mobile_menu_initialized = false,
  toggle_initialized = false,
  bootstrap_nav_initialized = false;

var seq = 0,
  delays = 80,
  durations = 500;
var seq2 = 0,
  delays2 = 80,
  durations2 = 500;

$(document).ready(function() {
  var $sidebar = $('.sidebar');

  $('body').bootstrapMaterialDesign({
    autofill: false
  });

  md.initSidebarsCheck();

  md.initMinimizeSidebar();

  // Multilevel Dropdown menu

  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    var $el = $(this);
    var $parent = $(this).offsetParent(".dropdown-menu");
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).closest("a").toggleClass('open');

    $(this).parents('a.dropdown-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-menu .show').removeClass("show");
    });

    if (!$parent.parent().hasClass('navbar-nav')) {
      $el.next().css({
        "top": $el[0].offsetTop,
        "left": $parent.outerWidth() - 4
      });
    }

    return false;
  });


  //   Activate bootstrap-select
  if ($(".selectpicker").length != 0) {
    $(".selectpicker").selectpicker();
  }

  //  Activate the tooltips
  $('[rel="tooltip"]').tooltip();

  // Activate Popovers
  $('[data-toggle="popover"]').popover();

  //Activate tags
  // we style the badges with our colors
  var tagClass = $('.tagsinput').data('color');

  if ($(".tagsinput").length != 0) {
    $('.tagsinput').tagsinput();
  }

  $('.bootstrap-tagsinput').addClass('' + tagClass + '-badge');

  //    Activate bootstrap-select
  $(".select").dropdown({
    "dropdownClass": "dropdown-menu",
    "optionClass": ""
  });

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });


  if (breakCards == true) {
    // We break the cards headers if there is too much stress on them :-)
    $('[data-header-animation="true"]').each(function() {
      var $fix_button = $(this)
      var $card = $(this).parent('.card');

      $card.find('.fix-broken-card').click(function() {
        console.log(this);
        var $header = $(this).parent().parent().siblings('.card-header, .card-header-image');

        $header.removeClass('hinge').addClass('fadeInDown');

        $card.attr('data-count', 0);

        setTimeout(function() {
          $header.removeClass('fadeInDown animate');
        }, 480);
      });

      $card.mouseenter(function() {
        var $this = $(this);
        hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
        $this.attr("data-count", hover_count);

        if (hover_count >= 20) {
          $(this).children('.card-header, .card-header-image').addClass('hinge animated');
        }
      });
    });
  }

  // remove class has-error for checkbox validation
  $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on('click', function() {
    if ($(this).hasClass('error')) {
      $(this).closest('div').removeClass('has-error');
    }
  });

});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (mobile_menu_visible == 1) {
    $('html').removeClass('nav-open');

    $('.close-layer').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 400);

    mobile_menu_visible = 0;
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 430);

    var $layer = $('<div class="close-layer"></div>');

    if ($('body').find('.main-panel').length != 0) {
      $layer.appendTo(".main-panel");

    } else if (($('body').hasClass('off-canvas-sidebar'))) {
      $layer.appendTo(".wrapper-full-page");
    }

    setTimeout(function() {
      $layer.addClass('visible');
    }, 100);

    $layer.click(function() {
      $('html').removeClass('nav-open');
      mobile_menu_visible = 0;

      $layer.removeClass('visible');

      setTimeout(function() {
        $layer.remove();
        $toggle.removeClass('toggled');

      }, 400);
    });

    $('html').addClass('nav-open');
    mobile_menu_visible = 1;

  }

});

// activate collapse right menu when the windows is resized
$(window).resize(function() {
  md.initSidebarsCheck();

  // reset the seq for charts drawing animations
  seq = seq2 = 0;

});

var md = {
  misc: {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
  },

  showNotification: function(from, align) {
    type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

    color = Math.floor((Math.random() * 6) + 1);

    $.notify({
      icon: "add_alert",
      message: "Welcome to <b>Material Dashboard Pro</b> - a beautiful admin panel for every web developer."

    }, {
      type: type[color],
      timer: 3000,
      placement: {
        from: from,
        align: align
      }
    });
  },

  initSidebarsCheck: function() {
    if ($(window).width() <= 991) {
      if ($sidebar.length != 0) {
        md.initRightMenu();
      }
    }
  },

  initMinimizeSidebar: function() {

    $('#minimizeSidebar').click(function() {
      var $btn = $(this);

      if (md.misc.sidebar_mini_active == true) {
        $('body').removeClass('sidebar-mini');
        md.misc.sidebar_mini_active = false;
      } else {
        $('body').addClass('sidebar-mini');
        md.misc.sidebar_mini_active = true;
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      var simulateWindowResize = setInterval(function() {
        window.dispatchEvent(new Event('resize'));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(function() {
        clearInterval(simulateWindowResize);
      }, 1000);
    });
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > 260) {
      if (transparent) {
        transparent = false;
        $('.navbar-color-on-scroll').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar-color-on-scroll').addClass('navbar-transparent');
      }
    }
  }, 17),

  initRightMenu: debounce(function() {
    $sidebar_wrapper = $('.sidebar-wrapper');

    if (!mobile_menu_initialized) {
      $navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');

      mobile_menu_content = '';

      nav_content = $navbar.html();

      nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';

      navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

      $sidebar_nav = $sidebar_wrapper.find(' > .nav');

      // insert the navbar form before the sidebar list
      $nav_content = $(nav_content);
      $navbar_form = $(navbar_form);
      $nav_content.insertBefore($sidebar_nav);
      $navbar_form.insertBefore($nav_content);

      $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
        event.stopPropagation();

      });

      // simulate resize so all the charts/maps will be redrawn
      window.dispatchEvent(new Event('resize'));

      mobile_menu_initialized = true;
    } else {
      if ($(window).width() > 991) {
        // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
        $sidebar_wrapper.find('.navbar-form').remove();
        $sidebar_wrapper.find('.nav-mobile-menu').remove();

        mobile_menu_initialized = false;
      }
    }
  }, 200),

};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

var main = {}; // namespace

$ = jQuery.noConflict();

$(function () {

    main.ui.init();

});

/**
 * main namespace for helper declarative methods
 */

main.ui = (function ($) {

    return {
        cachedTemplates: {},
        modal: null,
        loadingIcon: '<i class="fa fa-spinner fa-spin mr-0"></i> ',
        hiddenLoadingIcon: '<i class="fa fa-spinner fa-spin hidden"></i> ',
        buttonLoadingText: '<i class="fa fa-spinner fa-spin"></i> Loading...',
        buttonSavingText: '<i class="fa fa-spinner fa-spin"></i> Saving...',
        defaultConfirmMessage: 'Do you wish to delete this item?',
        messageDuration: 6000,
        color: {
            primary: '#5e72e4',
            secondary: '#f7fafc',
            danger: '#f5365c',
            success: '#2dce89',
            info: '#11cdef'
        },
        unmask: function (val) {
            return Number(val.replace(/[^0-9\.-]+/g, ""));
        },

        confirm: function (message, type, title) {
            type = type || 'error';

            return swal({
                type: type,
                title: message,
                showCancelButton: true,
                confirmButtonColor: type === 'error' ? this.color.danger : this.color.primary,
                confirmButtonText: 'Yes'
            });
        },

        notify: function (message, type) {

            if (!message) {
                return;
            }

            if (type) {
                switch (type) {
                    case 'success':
                        type = 'success';
                        break;
                    case 'warning':
                        type = 'warning';
                        break;
                    case 'error':
                        type = 'danger';
                        break;
                }
            } else {
                type = 'info';
            }

            $.notify({icon: "add_alert", message: message}, {
                type: type,
                timer: 3000,
                z_index: 1081,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });

            return this;
        },

        loading: function (state) {
            if (state) {
                $('.loading-overlay').show();
            } else {
                $('.loading-overlay').hide();
            }
        },

        controlAjaxSubmit: function (e) {
            e.preventDefault();
            var self = $(this);

            if (self.hasClass('disabled')) {
                return false;
            }
            var frm = this.form ? $(this.form) : self.data('form-id') ? $('#' + self.data('form-id')) : self.closest('form')[0];
            var url = self.attr('data-href') || frm.attr('action');

            main.ui.buttonLoading(self, true);

            $.ajax({
                url: url,
                type: 'post',
                data: frm.serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        main.ui.refreshNotificationWidgets();
                    } else {
                        main.yiiactiveform.updateInputs(frm, data.errors || []);
                    }

                    main.ui.notify(data.message, data.success ? 'success' : 'error');
                    main.ui.buttonLoading(self, false);

                    self.trigger('ajax-form-submitted', [data, self, frm]);
                },
                error: function (XHR) {
                    frm.parent().html(XHR.responseText);
                    main.ui.buttonLoading(self, false);
                }
            });
            return false;
        },

        controlPjaxAction: function () {
            var self = $(this), data = {},
                gridId = self.data('grid'),
                confirmMsg = self.data('confirm-msg') || false,
                confirmType = self.data('confirm-type') || '',
                type = self.data('type') || 'get',
                url = self.prop('href') || self.attr('data-href');

            if (self.hasClass('disabled') || !url) {
                return false;
            }

            main.ui.buttonLoading(self, true);

            $.each(self.data(), function (key, value) {
                data[key] = value;
            });

            var sendRequest = function (confirmResponse) {
                if (confirmResponse.value !== true) {
                    main.ui.buttonLoading(self, false);
                    return false;
                }

                $.ajax({
                    url: url,
                    type: type,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.success && $('#' + gridId).length) {
                            $.pjax.reload({container: '#' + gridId, timeout: 5000});

                            main.ui.refreshNotificationWidgets();
                        }

                        main.ui.notify(data.message, data.success ? 'success' : 'error');
                        main.ui.buttonLoading(self, false);

                        $(document).trigger('pjax-action-submitted', [data, self, gridId]);
                    },
                    error: function (XHR) {
                        main.ui.notify(XHR.responseText, 'error');
                        main.ui.buttonLoading(self, false);
                    }
                });
            };

            if (confirmMsg) {
                main.ui.confirm(confirmMsg, confirmType).then(sendRequest);
                return false;
            }

            sendRequest({value: true});

            return false;
        },

        controlConfirm: function (e) {
            var self = $(this);

            if (self.hasClass('disabled')) {
                return false;
            }

            var msg = self.attr('data-msg') || main.ui.defaultConfirmMessage;
            var url = self.prop('href') || self.attr('data-url');
            var pjaxId = self.data('pjax-id');
            var method = self.data('method') || 'POST';
            var hasLoader = self.data('loader') !== undefined ? self.data('loader') : true;
            var isJsonResponse = (self.data('json-response') == 1);

            main.ui.confirm(msg).then(result => {
                if (!result.value) {
                    return false;
                }

                main.ui.loading(true);

                if (!isJsonResponse) {
                    return document.location.href = url;
                }

                if (hasLoader) {
                    main.ui.buttonLoading(self, true);
                }

                $.ajax({
                    url: url,
                    type: method,
                    success: function (data) {
                        if (data.success && $('#' + pjaxId).length) {
                            $.pjax.reload({container: '#' + pjaxId, timeout: 5000});

                            main.ui.refreshNotificationWidgets();
                        }

                        main.ui.notify(data.message, data.success ? 'success' : 'error');
                        main.ui.loading(false);

                        main.ui.buttonLoading(self, false);

                        $(document).trigger('confirm-action-submitted', [data, self, pjaxId]);
                    },
                    error: function (error) {
                        if (error.responseText) {
                            main.ui.notify(error.responseText, 'error');
                            main.ui.buttonLoading(self, false);
                        }

                        main.ui.loading(false);
                    }
                });

                return true;
            });

            return false;
        },

        buttonLoading: function (btn, loading) {
            if (loading) {
                btn.attr('disabled', true).addClass('disabled');
                btn.find('[class*="fa-"]').hide();
                btn.prepend(main.ui.loadingIcon);
            } else {
                btn.removeAttr('disabled').removeClass('disabled');
                btn.find('.fa-spinner').remove();
                btn.find('[class*="fa-"]').show();
            }
        },

        alert: function (message, callback) {
            bootbox.alert(message, callback);
        },

        initButtonSpinners: function () {
            $('.btn-loading').closest('form').on('submit', function () {
                var form = $(this), btn = form.find(':submit');
                main.ui.buttonLoading(btn, true);

                setTimeout(function () {
                    if (form.find('.is-invalid').length > 0) {
                        main.ui.buttonLoading(btn, false);
                    }
                }, 300);
            });
        },

        initNicescroll: function (selector = '.nicescroll') {
            $(selector).niceScroll({
                cursorcolor: main.ui.color.primary,
                cursorwidth: '6px',
                cursorborderradius: '5px',
                spacebarenabled: false
            });
        },

        yiiConfirm: function (message, ok, cancel) {
            main.ui.confirm(message, function (result) {
                if (result) {
                    !ok || ok();
                    return;
                }

                !cancel || cancel();
            });
        },

        refreshNotificationWidgets: function () {
            setTimeout(function () {
                $.pjax.reload({
                    container: '#notification-pjax-container',
                    url: window.location.origin + '/site/header',
                    data: {page: 1, 'per-page': 5},
                    push: false,
                    replace: false,
                    timeout: 10000
                });
            }, 1000);
        }
        ,

        removeDuplicateUrlParams: function (url) {
            var params = new URLSearchParams(url);
            var result = {},
                isArrayKey,
                arrayKey,
                prevArrayKey = '';

            for (var p of params.entries()) {
                isArrayKey = p[0].indexOf('[]', p[0].length - 2) !== -1;
                if (isArrayKey) {
                    arrayKey = p[0].substr(0, p[0].length - 2);
                    if (arrayKey === prevArrayKey) {
                        result[arrayKey].push(p[1]);
                    } else {
                        result[arrayKey] = [p[1]];
                    }
                    prevArrayKey = arrayKey;
                } else {
                    result[p[0]] = p[1];
                    prevArrayKey = '';
                }
            }

            return $.param(result);
        },
        /**
         * module init
         */
        init: function () {

            Dropzone.autoDiscover = false;

            modal.init();
            main.ui.initButtonSpinners();

            $(document)
                .on('click', '.btn-control-confirm', this.controlConfirm)
                .on('click', '.btn-control-ajax-submit', this.controlAjaxSubmit)
                .on('click', '.btn-control-pjax-action', this.controlPjaxAction)
                .on('click', '.allow-focus .dropdown-menu', function (e) {
                    e.stopPropagation();
                })
                .on('shown.bs.modal', function () {
                    // main.ui.initNicescroll();
                })
                .on('pjax:beforeSend', function (event, xhr, options) {
                    var url = new URL(options.url, window.location.origin) || null;
                    if (url && url.search) {
                        options.url = url.origin + url.pathname + '?' + main.ui.removeDuplicateUrlParams(url.search);
                    }
                    return true;
                });

            yii.confirm = main.ui.yiiConfirm;

            $('[data-toggle="popover"]').popover();
            $('[data-toggle="tooltip"]').tooltip({container: 'body'});

            $.fn.modal.Constructor.prototype.enforceFocus = $.noop;
        }
    };
})
(jQuery);

/**
 * Lot ot yiiactiveform.js code, so active form javascript can be used internaly
 *
 * @type {{submit, validate, updateSummary, addAttribute, createAttribute, updateInputs, updateInput, findInput, getValue, updateAriaInvalid}}
 */
main.yiiactiveform = (function ($) {
    return {
        submit: function ($form, $trigger) {
            var url = $form.attr('action');
            $.ajax({
                url: url,
                data: $form.serialize(),
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    var reset = $trigger.attr('data-reset');
                    if (reset) {
                        $form[0].reset();
                    }
                    $trigger.button('reset');
                },
                error: function (xhr) {
                    $trigger.button('reset');
                    var reset = $trigger.attr('data-reset');
                    if (reset) {
                        $form[0].reset();
                    }
                }
            });
        },
        validate: function ($form, $trigger) {
            var settings = $.fn.yiiactiveform.getSettings($form);
            if ($trigger.length === 0) {
                $trigger = $("div[class$='-submit'],div[class*='-submit ']");
            }
            if (!settings.validateOnSubmit) {
                return main.yiiactiveform.submit($form, $trigger);
            }
            settings.submitting = true;
            $.fn.yiiactiveform.validate($form, function (messages) {
                if ($.isEmptyObject(messages)) {
                    $.each(settings.attributes, function () {
                        $.fn.yiiactiveform.updateInput(this, messages, $form);
                    });
                    main.yiiactiveform.submit($form, $trigger);
                    return true;
                } else {
                    settings = $.fn.yiiactiveform.getSettings($form);
                    $.each(settings.attributes, function () {
                        $.fn.yiiactiveform.updateInput(this, messages, $form);
                    });
                    settings.submitting = false;
                    main.yiiactiveform.updateSummary($form, messages);
                    $trigger.button('reset');
                    return false;
                }
            });
        },
        updateSummary: function ($form, messages) {
            var settings = $.fn.yiiactiveform.getSettings($form),
                heading = '<p>Please fix the following input errors:</p>',
                list = '';

            $.each(settings.attributes, function () {
                if (messages && $.isArray(messages[this.id])) {
                    $.each(messages[this.id], function (j, message) {
                        list = list + '<li>' + message + '</li>';
                    });
                }
            });
        },
        addAttribute: function ($form, attribute) {
          var settings = $.fn.yiiactiveform.getSettings($form);
          settings.attributes.push(attribute);
          $form.data('settings', settings);
          /*
           * returns the value of the CActiveForm input field
           * performs additional checks to get proper values for checkbox / radiobutton / checkBoxList / radioButtonList
           * @param o object the jQuery object of the input element
           */
          var getAFValue = function (o) {
            var type;
            if (!o.length)
              return undefined;
            if (o[0].tagName.toLowerCase() == 'span') {
              var c = [];
              o.find(':checked').each(function () {
                c.push(this.value);
              });
              return c.join(',');
            }
            type = o.attr('type');
            if (type === 'checkbox' || type === 'radio') {
              return o.filter(':checked').val();
            } else {
              return o.val();
            }
          };
          var validate = function (attribute, forceValidate) {
            if (forceValidate) {
              attribute.status = 2;
            }
            $.each(settings.attributes, function () {
              if (this.value !== getAFValue($form.find('#' + this.inputID))) {
                this.status = 2;
                forceValidate = true;
              }
            });
            if (!forceValidate) {
              return;
            }

            if (settings.timer !== undefined) {
              clearTimeout(settings.timer);
            }
            settings.timer = setTimeout(function () {
              if (settings.submitting || $form.is(':hidden')) {
                return;
              }
              if (attribute.beforeValidateAttribute === undefined || attribute.beforeValidateAttribute($form, attribute)) {
                $.each(settings.attributes, function () {
                  if (this.status === 2) {
                    this.status = 3;
                    $.fn.yiiactiveform.getInputContainer(this, $form).addClass(this.validatingCssClass);
                  }
                });
                $.fn.yiiactiveform.validate($form, function (data) {
                  var hasError = false;
                  $.each(settings.attributes, function () {
                    if (this.status === 2 || this.status === 3) {
                      hasError = $.fn.yiiactiveform.updateInput(this, data, $form) || hasError;
                    }
                  });
                  if (attribute.afterValidateAttribute !== undefined) {
                    attribute.afterValidateAttribute($form, attribute, data, hasError);
                  }
                });
              }
            }, attribute.validationDelay);
          };
          if (attribute.validateOnChange) {
            $form.find('#' + attribute.inputID).change(function () {
              validate(attribute, false);
            }).blur(function () {
              if (attribute.status !== 2 && attribute.status !== 3) {
                validate(attribute, !attribute.status);
              }
            });
          }
          /*
* Nikola Kukric <info@singularity.is>
* Company: Singularity Solution <https://singularity.is>
*
* For the full copyright and license information, please view
* the LICENSE file that was distributed with this source code.
*/

          var main = {}; // namespace

          $ = jQuery.noConflict();

          $(function () {

            main.ui.init();

          });

          /**
           * main namespace for helper declarative methods
           */

          main.ui = (function ($) {

            return {
              cachedTemplates: {},
              modal: null,
              loadingIcon: '<i class="fa fa-spinner fa-spin mr-0"></i> ',
              hiddenLoadingIcon: '<i class="fa fa-spinner fa-spin hidden"></i> ',
              buttonLoadingText: '<i class="fa fa-spinner fa-spin"></i> Loading...',
              buttonSavingText: '<i class="fa fa-spinner fa-spin"></i> Saving...',
              defaultConfirmMessage: 'Do you wish to delete this item?',
              messageDuration: 6000,
              color: {
                primary: '#5e72e4',
                secondary: '#f7fafc',
                danger: '#f5365c',
                success: '#2dce89',
                info: '#11cdef'
              },
              unmask: function (val) {
                return Number(val.replace(/[^0-9\.-]+/g, ""));
              },

              confirm: function (message, type, title) {
                type = type || 'error';

                return swal({
                  type: type,
                  title: message,
                  showCancelButton: true,
                  confirmButtonColor: type === 'error' ? this.color.danger : this.color.primary,
                  confirmButtonText: 'Yes'
                });
              },

              notify: function (message, type) {

                if (!message) {
                  return;
                }

                if (type) {
                  switch (type) {
                    case 'success':
                      type = 'success';
                      break;
                    case 'warning':
                      type = 'warning';
                      break;
                    case 'error':
                      type = 'danger';
                      break;
                  }
                } else {
                  type = 'info';
                }

                $.notify({icon: "add_alert", message: message}, {
                  type: type,
                  timer: 3000,
                  z_index: 1081,
                  placement: {
                    from: 'top',
                    align: 'right'
                  }
                });

                return this;
              },

              loading: function (state) {
                if (state) {
                  $('.loading-overlay').show();
                } else {
                  $('.loading-overlay').hide();
                }
              },

              controlAjaxSubmit: function (e) {
                e.preventDefault();
                var self = $(this);

                if (self.hasClass('disabled')) {
                  return false;
                }
                var frm = this.form ? $(this.form) : self.data('form-id') ? $('#' + self.data('form-id')) : self.closest('form')[0];
                var url = self.attr('data-href') || frm.attr('action');

                main.ui.buttonLoading(self, true);

                $.ajax({
                  url: url,
                  type: 'post',
                  data: frm.serialize(),
                  dataType: 'json',
                  success: function (data) {
                    if (data.success) {
                      main.ui.refreshNotificationWidgets();
                    } else {
                      main.yiiactiveform.updateInputs(frm, data.errors || []);
                    }

                    main.ui.notify(data.message, data.success ? 'success' : 'error');
                    main.ui.buttonLoading(self, false);

                    self.trigger('ajax-form-submitted', [data, self, frm]);
                  },
                  error: function (XHR) {
                    frm.parent().html(XHR.responseText);
                    main.ui.buttonLoading(self, false);
                  }
                });
                return false;
              },

              controlPjaxAction: function () {
                var self = $(this), data = {},
                  gridId = self.data('grid'),
                  confirmMsg = self.data('confirm-msg') || false,
                  confirmType = self.data('confirm-type') || '',
                  type = self.data('type') || 'get',
                  url = self.prop('href') || self.attr('data-href');

                if (self.hasClass('disabled') || !url) {
                  return false;
                }

                main.ui.buttonLoading(self, true);

                $.each(self.data(), function (key, value) {
                  data[key] = value;
                });

                var sendRequest = function (confirmResponse) {
                  if (confirmResponse.value !== true) {
                    main.ui.buttonLoading(self, false);
                    return false;
                  }

                  $.ajax({
                    url: url,
                    type: type,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                      if (data.success && $('#' + gridId).length) {
                        $.pjax.reload({container: '#' + gridId, timeout: 5000});

                        main.ui.refreshNotificationWidgets();
                      }

                      main.ui.notify(data.message, data.success ? 'success' : 'error');
                      main.ui.buttonLoading(self, false);

                      $(document).trigger('pjax-action-submitted', [data, self, gridId]);
                    },
                    error: function (XHR) {
                      main.ui.notify(XHR.responseText, 'error');
                      main.ui.buttonLoading(self, false);
                    }
                  });
                };

                if (confirmMsg) {
                  main.ui.confirm(confirmMsg, confirmType).then(sendRequest);
                  return false;
                }

                sendRequest({value: true});

                return false;
              },

              controlConfirm: function (e) {
                var self = $(this);

                if (self.hasClass('disabled')) {
                  return false;
                }

                var msg = self.attr('data-msg') || main.ui.defaultConfirmMessage;
                var url = self.prop('href') || self.attr('data-url');
                var pjaxId = self.data('pjax-id');
                var method = self.data('method') || 'POST';
                var hasLoader = self.data('loader') !== undefined ? self.data('loader') : true;
                var isJsonResponse = (self.data('json-response') == 1);

                main.ui.confirm(msg).then(result => {
                  if (!result.value) {
                    return false;
                  }

                  main.ui.loading(true);

                  if (!isJsonResponse) {
                    return document.location.href = url;
                  }

                  if (hasLoader) {
                    main.ui.buttonLoading(self, true);
                  }

                  $.ajax({
                    url: url,
                    type: method,
                    success: function (data) {
                      if (data.success && $('#' + pjaxId).length) {
                        $.pjax.reload({container: '#' + pjaxId, timeout: 5000});

                        main.ui.refreshNotificationWidgets();
                      }

                      main.ui.notify(data.message, data.success ? 'success' : 'error');
                      main.ui.loading(false);

                      main.ui.buttonLoading(self, false);

                      $(document).trigger('confirm-action-submitted', [data, self, pjaxId]);
                    },
                    error: function (error) {
                      if (error.responseText) {
                        main.ui.notify(error.responseText, 'error');
                        main.ui.buttonLoading(self, false);
                      }

                      main.ui.loading(false);
                    }
                  });

                  return true;
                });

                return false;
              },

              buttonLoading: function (btn, loading) {
                if (loading) {
                  btn.attr('disabled', true).addClass('disabled');
                  btn.find('[class*="fa-"]').hide();
                  btn.prepend(main.ui.loadingIcon);
                } else {
                  btn.removeAttr('disabled').removeClass('disabled');
                  btn.find('.fa-spinner').remove();
                  btn.find('[class*="fa-"]').show();
                }
              },

              alert: function (message, callback) {
                bootbox.alert(message, callback);
              },

              initButtonSpinners: function () {
                $('.btn-loading').closest('form').on('submit', function () {
                  var form = $(this), btn = form.find(':submit');
                  main.ui.buttonLoading(btn, true);

                  setTimeout(function () {
                    if (form.find('.is-invalid').length > 0) {
                      main.ui.buttonLoading(btn, false);
                    }
                  }, 300);
                });
              },

              initNicescroll: function (selector = '.nicescroll') {
                $(selector).niceScroll({
                  cursorcolor: main.ui.color.primary,
                  cursorwidth: '6px',
                  cursorborderradius: '5px',
                  spacebarenabled: false
                });
              },

              yiiConfirm: function (message, ok, cancel) {
                main.ui.confirm(message, function (result) {
                  if (result) {
                    !ok || ok();
                    return;
                  }

                  !cancel || cancel();
                });
              },

              refreshNotificationWidgets: function () {
                setTimeout(function () {
                  $.pjax.reload({
                    container: '#notification-pjax-container',
                    url: window.location.origin + '/site/header',
                    data: {page: 1, 'per-page': 5},
                    push: false,
                    replace: false,
                    timeout: 10000
                  });
                }, 1000);
              }
              ,

              removeDuplicateUrlParams: function (url) {
                var params = new URLSearchParams(url);
                var result = {},
                  isArrayKey,
                  arrayKey,
                  prevArrayKey = '';

                for (var p of params.entries()) {
                  isArrayKey = p[0].indexOf('[]', p[0].length - 2) !== -1;
                  if (isArrayKey) {
                    arrayKey = p[0].substr(0, p[0].length - 2);
                    if (arrayKey === prevArrayKey) {
                      result[arrayKey].push(p[1]);
                    } else {
                      result[arrayKey] = [p[1]];
                    }
                    prevArrayKey = arrayKey;
                  } else {
                    result[p[0]] = p[1];
                    prevArrayKey = '';
                  }
                }

                return $.param(result);
              },
              /**
               * module init
               */
              init: function () {

                Dropzone.autoDiscover = false;

                modal.init();
                main.ui.initButtonSpinners();

                $(document)
                  .on('click', '.btn-control-confirm', this.controlConfirm)
                  .on('click', '.btn-control-ajax-submit', this.controlAjaxSubmit)
                  .on('click', '.btn-control-pjax-action', this.controlPjaxAction)
                  .on('click', '.allow-focus .dropdown-menu', function (e) {
                    e.stopPropagation();
                  })
                  .on('shown.bs.modal', function () {
                    // main.ui.initNicescroll();
                  })
                  .on('pjax:beforeSend', function (event, xhr, options) {
                    var url = new URL(options.url, window.location.origin) || null;
                    if (url && url.search) {
                      options.url = url.origin + url.pathname + '?' + main.ui.removeDuplicateUrlParams(url.search);
                    }
                    return true;
                  });

                yii.confirm = main.ui.yiiConfirm;

                $('[data-toggle="popover"]').popover();
                $('[data-toggle="tooltip"]').tooltip({container: 'body'});

                $.fn.modal.Constructor.prototype.enforceFocus = $.noop;
              }
            };
          })
          (jQuery);

          /**
           * Lot ot yiiactiveform.js code, so active form javascript can be used internaly
           *
           * @type {{submit, validate, updateSummary, addAttribute, createAttribute, updateInputs, updateInput, findInput, getValue, updateAriaInvalid}}
           */
          main.yiiactiveform = (function ($) {
            return {
              submit: function ($form, $trigger) {
                var url = $form.attr('action');
                $.ajax({
                  url: url,
                  data: $form.serialize(),
                  type: 'post',
                  dataType: 'json',
                  success: function (data) {
                    var reset = $trigger.attr('data-reset');
                    if (reset) {
                      $form[0].reset();
                    }
                    $trigger.button('reset');
                  },
                  error: function (xhr) {
                    $trigger.button('reset');
                    var reset = $trigger.attr('data-reset');
                    if (reset) {
                      $form[0].reset();
                    }
                  }
                });
              },
              validate: function ($form, $trigger) {
                var settings = $.fn.yiiactiveform.getSettings($form);
                if ($trigger.length === 0) {
                  $trigger = $("div[class$='-submit'],div[class*='-submit ']");
                }
                if (!settings.validateOnSubmit) {
                  return main.yiiactiveform.submit($form, $trigger);
                }
                settings.submitting = true;
                $.fn.yiiactiveform.validate($form, function (messages) {
                  if ($.isEmptyObject(messages)) {
                    $.each(settings.attributes, function () {
                      $.fn.yiiactiveform.updateInput(this, messages, $form);
                    });
                    main.yiiactiveform.submit($form, $trigger);
                    return true;
                  } else {
                    settings = $.fn.yiiactiveform.getSettings($form);
                    $.each(settings.attributes, function () {
                      $.fn.yiiactiveform.updateInput(this, messages, $form);
                    });
                    settings.submitting = false;
                    main.yiiactiveform.updateSummary($form, messages);
                    $trigger.button('reset');
                    return false;
                  }
                });
              },
              updateSummary: function ($form, messages) {
                var settings = $.fn.yiiactiveform.getSettings($form),
                  heading = '<p>Please fix the following input errors:</p>',
                  list = '';

                $.each(settings.attributes, function () {
                  if (messages && $.isArray(messages[this.id])) {
                    $.each(messages[this.id], function (j, message) {
                      list = list + '<li>' + message + '</li>';
                    });
                  }
                });
              },
              addAttribute: function ($form, attribute) {
                var settings = $.fn.yiiactiveform.getSettings($form);
                settings.attributes.push(attribute);
                $form.data('settings', settings);
                /*
                 * returns the value of the CActiveForm input field
                 * performs additional checks to get proper values for checkbox / radiobutton / checkBoxList / radioButtonList
                 * @param o object the jQuery object of the input element
                 */
                var getAFValue = function (o) {
                  var type;
                  if (!o.length)
                    return undefined;
                  if (o[0].tagName.toLowerCase() == 'span') {
                    var c = [];
                    o.find(':checked').each(function () {
                      c.push(this.value);
                    });
                    return c.join(',');
                  }
                  type = o.attr('type');
                  if (type === 'checkbox' || type === 'radio') {
                    return o.filter(':checked').val();
                  } else {
                    return o.val();
                  }
                };
                var validate = function (attribute, forceValidate) {
                  if (forceValidate) {
                    attribute.status = 2;
                  }
                  $.each(settings.attributes, function () {
                    if (this.value !== getAFValue($form.find('#' + this.inputID))) {
                      this.status = 2;
                      forceValidate = true;
                    }
                  });
                  if (!forceValidate) {
                    return;
                  }

                  if (settings.timer !== undefined) {
                    clearTimeout(settings.timer);
                  }
                  settings.timer = setTimeout(function () {
                    if (settings.submitting || $form.is(':hidden')) {
                      return;
                    }
                    if (attribute.beforeValidateAttribute === undefined || attribute.beforeValidateAttribute($form, attribute)) {
                      $.each(settings.attributes, function () {
                        if (this.status === 2) {
                          this.status = 3;
                          $.fn.yiiactiveform.getInputContainer(this, $form).addClass(this.validatingCssClass);
                        }
                      });
                      $.fn.yiiactiveform.validate($form, function (data) {
                        var hasError = false;
                        $.each(settings.attributes, function () {
                          if (this.status === 2 || this.status === 3) {
                            hasError = $.fn.yiiactiveform.updateInput(this, data, $form) || hasError;
                          }
                        });
                        if (attribute.afterValidateAttribute !== undefined) {
                          attribute.afterValidateAttribute($form, attribute, data, hasError);
                        }
                      });
                    }
                  }, attribute.validationDelay);
                };
                if (attribute.validateOnChange) {
                  $form.find('#' + attribute.inputID).change(function () {
                    validate(attribute, false);
                  }).blur(function () {
                    if (attribute.status !== 2 && attribute.status !== 3) {
                      validate(attribute, !attribute.status);
                    }
                  });
                }
                if (attribute.validateOnType) {
                  $form.find('#' + attribute.inputID).keyup(function () {
                    if (attribute.value !== getAFValue($(attribute))) {
                      validate(attribute, false);
                    }
                  });
                }
              },
              createAttribute: function (model, id, name, options) {
                var defaults = {
                  enableAjaxValidation: true,
                  errorCssClass: "has-error",
                  errorID: id + '_em_',
                  hideErrorMessage: false,
                  id: id,
                  inputContainer: "div.form-group",
                  inputID: id,
                  model: model,
                  name: name,
                  status: 1,
                  successCssClass: 'has-success',
                  validateOnChange: true,
                  validateOnType: false,
                  validatingCssClass: 'validating',
                  validationDelay: 200
                };
                return $.extend({}, defaults, options);
              },
              /**
               * Updates the error messages and the input containers for all applicable attributes
               * @param $form the form jQuery object
               * @param messages array the validation error messages
               * @param submitting whether this method is called after validation triggered by form submission
               */
              updateInputs: function ($form, messages) {
                var data = $form.data('yiiActiveForm');

                if (data === undefined) {
                  return false;
                }

                $.each(data.attributes, function () {
                  main.yiiactiveform.updateInput($form, this, messages);
                });
              },
              /**
               * Updates the error message and the input container for a particular attribute.
               * @param $form the form jQuery object
               * @param attribute object the configuration for a particular attribute.
               * @param messages array the validation error messages
               * @return boolean whether there is a validation error for the specified attribute
               */
              updateInput: function ($form, attribute, messages) {
                var data = $form.data('yiiActiveForm'),
                  $input = main.yiiactiveform.findInput($form, attribute),
                  hasError = false;

                if (!$.isArray(messages[attribute.id])) {
                  messages[attribute.id] = [];
                }

                data.settings.successCssClass = ''; //disable successfully validated attributes highlight

                if ($input.length) {
                  hasError = messages[attribute.id].length > 0;
                  var $container = $form.find(attribute.container);
                  var $error = $container.find(attribute.error);
                  main.yiiactiveform.updateAriaInvalid($form, attribute, hasError);
                  if (hasError) {
                    if (attribute.encodeError) {
                      $error.text(messages[attribute.id][0]);
                    } else {
                      $error.html(messages[attribute.id][0]);
                    }
                    $container.removeClass(data.settings.validatingCssClass + ' ' + data.settings.successCssClass).addClass(data.settings.errorCssClass);
                  } else {
                    $error.empty();
                    $container.removeClass(data.settings.validatingCssClass + ' ' + data.settings.errorCssClass + ' ').addClass(data.settings.successCssClass);
                  }
                }
                return hasError;
              },
              findInput: function ($form, attribute) {
                var $input = $form.find(attribute.input);

                if ($input.length && $input[0].tagName.toLowerCase() === 'div') {
                  return $input.find('input');
                } else {
                  return $input;
                }
              },
              updateAriaInvalid: function ($form, attribute, hasError) {
                if (attribute.updateAriaInvalid) {
                  $form.find(attribute.input).attr('aria-invalid', hasError ? 'true' : 'false');
                }
              }
            };
          })(jQuery);

          main.search = (function () {

            return {
              init: function (config) {
                main.template.cache('search-widget-result-item', config.template);

                for (var iconName in config.iconList) {
                  main.template.cache('search-widget-type-' + iconName, config.iconList[iconName]);
                }

                for (var colorClass in config.colorList) {
                  main.template.cache('search-widget-color-class-' + colorClass, config.colorList[colorClass]);
                }

                var select2 = $('#' + config.id + '-search-box');

                select2.on('select2:select', function (e) {
                  $(this).val(null).trigger('change');

                  if (('showSearchResults' in e.params.data) && e.params.data.showSearchResults) {
                    modal.modalControl.call($('<a href="' + config.searchUrl + '?' + config.searchQuery + '=' + encodeURI(e.params.data.query) + '">'), {preventDefault: $.noop});
                    return;
                  }

                  $('#' + config.id + '-search-box + span input').val(e.params.data[config.resultTextParam]);

                  var widget = $('#' + config.id);
                  widget.find('.search-query').val(e.params.data[config.resultTextParam]);
                  widget.find('.search-model-id').val(e.params.data[config.resultModelIdParam]);
                  widget.find('.search-model-class').val(e.params.data[config.modelClassParam]);

                  widget.submit();
                });

                select2.on('select2:opening select2:closing', function (e) {
                  $(this).parents('.form-group').toggleClass('focused');
                });

                $(document).ready(function () {
                  var s2Api = select2.data('select2');
                  var oldDropDownPositionFunction = s2Api.dropdown._positionDropdown;

                  s2Api.dropdown._positionDropdown = function () {
                    oldDropDownPositionFunction.call(s2Api.dropdown);
                    var dropDownContainer = this.$dropdownContainer;
                    var width = $(document).width();

                    dropDownContainer.addClass('search-widget');
                    dropDownContainer.css('top', (dropDownContainer.offset().top + 3) + 'px');
                    dropDownContainer.css('left', (dropDownContainer.offset().left - 25) + 'px');
                    dropDownContainer.css('width', 'auto');

                    if (width > 992) {
                      dropDownContainer.css('width', '385px');
                    } else {
                      dropDownContainer.css('right', '36px');
                    }

                    this.$dropdown.attr('style', 'width: 100%; border-radius: 7px');
                  };

                  s2Api.dropdown._resizeDropdown = function () {
                    this.$dropdown.css({'width': '100%'});
                  };
                });

              }
            };
          })();

          main.template = (function () {
            var templateCache = {};


            return {
              cache: function (identifier, templateString) {
                templateCache[identifier] = _.template(templateString);
              },
              render: function (templateString, params) {
                var template = _.template(templateString);

                if (!params) {
                  params = {};
                }

                return template(params);
              },
              renderCached: function (templateIdentifier, params) {
                if (!(templateIdentifier in templateCache)) {
                  return '';
                }

                if (!params) {
                  params = {};
                }

                return templateCache[templateIdentifier](params);
              }
            }
          })();
        }
    }
});



var modal = {}; // namespace

$ = jQuery.noConflict();

modal = (function ($) {
    return {
        instance: null,
        id: null,
        loadingOverlayId: '#main-loading-overlay',
        init: function () {
            modal.id = 'main-modal';
            modal.instance = $('#' + modal.id);
            modal.instance.on('hidden.bs.modal', function () {
                modal.instance.find('.modal-content').empty();
            });

            $(document)
                .on('click', '.btn-modal-control-close', this.modalClose)
                .on('click', '.btn-modal-control', this.modalControl)
                .on('click', '.btn-modal-control-expand', this.modalControlSize)
                .on('click', '.btn-modal-control-minimise', this.modalControlSize)
                .on('click', '.btn-modal-control-submit', this.modalControlSubmit);
        },
        /**
         * displays a modal with url
         */
        modalControl: function (e) {
            e.preventDefault();
            var self = $(this);

            if (self.hasClass('disabled')) {
                return false;
            }
            var url = self.attr('data-href') || self.attr('href');
            var data = self.data('params') || '';
            var options = {backdrop: 'static'};
            if (self.attr('data-height')) {
                options.height = self.attr('data-height');
                if (modal.instance.data('modal')) {
                    modal.instance.data('modal').options.height = self.attr('data-height');
                }
            }
            if (self.attr('data-width')) {
                options.width = self.attr('data-width');
                if (modal.instance.data('modal')) {
                    modal.instance.data('modal').options.width = self.attr('data-width');
                }
            }
            if (self.attr('data-size')) {
                modal.instance.find('.modal-dialog').removeClass('modal-xl modal-lg modal-md modal-sm modal-xs').addClass(self.attr('data-size'));
            }

            modal.instance.find('.modal-content').attr('class', 'modal-content');
            if (self.attr('data-content-class')) {
                modal.instance.find('.modal-content').addClass(self.attr('data-content-class'));
            }

            modal.loading(true);
            main.ui.buttonLoading(self, true);

            setTimeout(function () {
                var modalContent = modal.instance.find('.modal-content');
                modalContent.load(url, data, function () {
                    modal.loading(false);
                    modal.instance.modal(options);
                    main.ui.buttonLoading(self, false);
                    $(document).trigger('modal-opened', [modal]);
                });
            }, 200);
            return false;
        },
        modalControlSize: function () {
            var modalClass = $(this).data('size');
            modal.instance.find('.modal-dialog').attr('class', 'modal-dialog');
            modal.instance.find('.modal-dialog').addClass(modalClass);

            return true;
        },
        openModal: function(url) {
            this.modalControl.call($('<a href="' + url + '">'), {preventDefault: $.noop});
        },
        /**
         * closes a modal
         */
        modalClose: function () {
            modal.instance.modal('hide');
            $(document).trigger('modal-hidden', [modal]);
        },
        /**
         * submits a form within a modal
         * @return {Boolean}
         */
        modalControlSubmit: function (e) {
            e.preventDefault();
            var self = $(this);

            if (self.hasClass('disabled')) {
                return false;
            }
            var frm = this.form ? $(this.form) : self.data('form-id') ? $('#' + self.data('form-id')) : self.closest('.modal-content').find('form');

            var hide = self.data('hide') !== undefined? self.data('hide') : true;

            modal.loading(true);
            main.ui.buttonLoading(self, true);


            $.ajax({
                url: frm.attr('action'),
                type: 'post',
                data: new FormData(frm[0]),
                processData: false,
                contentType: false,
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        main.ui.refreshNotificationWidgets();
                    } else {
                        main.yiiactiveform.updateInputs(frm, data.errors || []);
                        hide = false;
                    }

                    if (hide) {
                        modal.instance.modal('hide');
                    }

                    modal.notify(data.message, data.success ? 'success' : 'error');
                    main.ui.buttonLoading(self, false);
                    modal.loading(false);

                    $(document).trigger('modal-submitted', [data, self, frm, {'grid_id': frm.data('grid-id')}]);
                },
                error: function (XHR) {
                    modal.instance.find('.modal-content').html(XHR.responseText);
                    main.ui.buttonLoading(self, false);
                    modal.loading(false);
                }
            });
            return false;
        },
        notify: function (message, type, position) {

            main.ui.notify(message, type, position);

            return this;
        },
        loading: function(state) {
            main.ui.loading(state);
        }
    };
})($);
var modal = {}; // namespace

$ = jQuery.noConflict();

modal = (function ($) {
    return {
        instance: null,
        id: null,
        loadingOverlayId: '#main-loading-overlay',
        init: function () {
            modal.id = 'main-modal';
            modal.instance = $('#' + modal.id);
            modal.instance.on('hidden.bs.modal', function () {
                modal.instance.find('.modal-content').empty();
            });

            $(document)
                .on('click', '.btn-modal-control-close', this.modalClose)
                .on('click', '.btn-modal-control', this.modalControl)
                .on('click', '.btn-modal-control-expand', this.modalControlSize)
                .on('click', '.btn-modal-control-minimise', this.modalControlSize)
                .on('click', '.btn-modal-control-submit', this.modalControlSubmit);
        },
        /**
         * displays a modal with url
         */
        modalControl: function (e) {
            e.preventDefault();
            var self = $(this);

            if (self.hasClass('disabled')) {
                return false;
            }
            var url = self.attr('data-href') || self.attr('href');
            var data = self.data('params') || '';
            var options = {backdrop: 'static'};
            if (self.attr('data-height')) {
                options.height = self.attr('data-height');
                if (modal.instance.data('modal')) {
                    modal.instance.data('modal').options.height = self.attr('data-height');
                }
            }
            if (self.attr('data-width')) {
                options.width = self.attr('data-width');
                if (modal.instance.data('modal')) {
                    modal.instance.data('modal').options.width = self.attr('data-width');
                }
            }
            if (self.attr('data-size')) {
                modal.instance.find('.modal-dialog').removeClass('modal-xl modal-lg modal-md modal-sm modal-xs').addClass(self.attr('data-size'));
            }

            modal.instance.find('.modal-content').attr('class', 'modal-content');
            if (self.attr('data-content-class')) {
                modal.instance.find('.modal-content').addClass(self.attr('data-content-class'));
            }

            modal.loading(true);
            main.ui.buttonLoading(self, true);

            setTimeout(function () {
                var modalContent = modal.instance.find('.modal-content');
                modalContent.load(url, data, function () {
                    modal.loading(false);
                    modal.instance.modal(options);
                    main.ui.buttonLoading(self, false);
                    $(document).trigger('modal-opened', [modal]);
                });
            }, 200);
            return false;
        },
        modalControlSize: function () {
            var modalClass = $(this).data('size');
            modal.instance.find('.modal-dialog').attr('class', 'modal-dialog');
            modal.instance.find('.modal-dialog').addClass(modalClass);

            return true;
        },
        openModal: function(url) {
            this.modalControl.call($('<a href="' + url + '">'), {preventDefault: $.noop});
        },
        /**
         * closes a modal
         */
        modalClose: function () {
            modal.instance.modal('hide');
            $(document).trigger('modal-hidden', [modal]);
        },
        /**
         * submits a form within a modal
         * @return {Boolean}
         */
        modalControlSubmit: function (e) {
            e.preventDefault();
            var self = $(this);

            if (self.hasClass('disabled')) {
                return false;
            }
            var frm = this.form ? $(this.form) : self.data('form-id') ? $('#' + self.data('form-id')) : self.closest('.modal-content').find('form');

            var hide = self.data('hide') !== undefined? self.data('hide') : true;

            modal.loading(true);
            main.ui.buttonLoading(self, true);


            $.ajax({
                url: frm.attr('action'),
                type: 'post',
                data: new FormData(frm[0]),
                processData: false,
                contentType: false,
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        main.ui.refreshNotificationWidgets();
                    } else {
                        main.yiiactiveform.updateInputs(frm, data.errors || []);
                        hide = false;
                    }

                    if (hide) {
                        modal.instance.modal('hide');
                    }

                    modal.notify(data.message, data.success ? 'success' : 'error');
                    main.ui.buttonLoading(self, false);
                    modal.loading(false);

                    $(document).trigger('modal-submitted', [data, self, frm, {'grid_id': frm.data('grid-id')}]);
                },
                error: function (XHR) {
                    modal.instance.find('.modal-content').html(XHR.responseText);
                    main.ui.buttonLoading(self, false);
                    modal.loading(false);
                }
            });
            return false;
        },
        notify: function (message, type, position) {

            main.ui.notify(message, type, position);

            return this;
        },
        loading: function(state) {
            main.ui.loading(state);
        }
    };
})($);
