;(function($, window, undefined) {
    
    var win = $(window),
        doc = $(document),
        count = 1,
        isLock = false;

    var Dialog = function(options) {
        
        this.settings = $.extend({}, Dialog.defaults, options);
        
        this.init();
        
    }
    
    Dialog.prototype = {
        
        /**
         * 初始化
         */
        init : function() {
            
            this.create();
        
            if (this.settings.lock) {
                this.lock();
            }

            if (!isNaN(this.settings.time)&&this.settings.time!=null) {
                this.time();
            }
            
        },
        
        /**
         * 创建
         */
        create : function() {

            var divHeader = (this.settings.title==null)?'':'<div class="rDialog-header-'+ this.settings.title +'"></div>';
            
            // HTML模板
            var templates = '<div class="rDialog-wrap">' +
                                divHeader +
                                '<div class="rDialog-content">'+ this.settings.content +'</div>' +
                                '<div class="rDialog-footer"></div>' +
                            '</div>';
            
            // 追回到body
            this.dialog = $('<div>').addClass('rDialog').css({ zIndex : this.settings.zIndex + (count++) }).html(templates).prependTo('body');
            
            // 设置ok按钮
            if ($.isFunction(this.settings.ok)) {
                this.ok();
            }
            
            // 设置cancel按钮
            if ($.isFunction(this.settings.cancel)) {
               this.cancel(); 
            }
            
            // 设置大小
            this.size();
            
            // 设置位置
            this.position();
            
        },
        
        /**
         * ok
         */
        ok : function() {
            var _this = this,
                footer = this.dialog.find('.rDialog-footer');
            
            $('<a>', {
                href : 'javascript:;',
                text : this.settings.okText
            }).on("click", function() {
                    var okCallback = _this.settings.ok();
                    if (okCallback == undefined || okCallback) {
                        _this.close();
                    }

            }).addClass('rDialog-ok').prependTo(footer);
            
        },
        
        /**
         * cancel
         */
        cancel : function() {
            
            var _this = this,
                footer = this.dialog.find('.rDialog-footer');
            
            $('<a>', {
                href : 'javascript:;',
                text : this.settings.cancelText
            }).on("click",function() {
                    var cancelCallback = _this.settings.cancel();
                    if (cancelCallback == undefined || cancelCallback) {
                        _this.close();
                    }
            }).addClass('rDialog-cancel').appendTo(footer);
            
        },
        
        /**
         * 设置大小
         */
        size : function() {
            
            var content = this.dialog.find('.rDialog-content'),
            	wrap = this.dialog.find('.rDialog-wrap');
            
            content.css({ 
                width : this.settings.width,
                height : this.settings.height
            });
            //wrap.width(content.width());
        },
        
        /**
         * 设置位置
         */
        position : function() {
            
            var _this = this,
                winWidth = win.width(),
                winHeight = win.height(),
                scrollTop = 0;
            
            this.dialog.css({ 
                left : (winWidth - _this.dialog.width()) / 2,
                top : (winHeight - _this.dialog.height()) / 2 + scrollTop
            });

        },
        
        /**
         * 设置锁屏
         */
        lock : function() {
            
            if (isLock) return;
            
            this.lock = $('<div>').css({ zIndex : this.settings.zIndex }).addClass('rDialog-mask');
            this.lock.appendTo('body');
            
            isLock = true;

        },
        
        /**
         * 关闭锁屏
         */
        unLock : function() {
    		if (this.settings.lock) {
    			if (isLock) {
	                this.lock.remove();
	                isLock = false;
                }
            }
        },
        
        /**
         * 关闭方法
         */
        close : function() {
            this.dialog.remove();
            this.unLock();
        },
        
        /**
         * 定时关闭
         */
        time : function() {
            
            var _this = this;
            
            this.closeTimer = setTimeout(function() {
                _this.close();
            }, this.settings.time);

        }
        
    }
    
    /**
     * 默认配置
     */
    Dialog.defaults = {
        
        // 内容
        content: '加载中...',
        
        // 标题
        title: 'load',
        
        // 宽度
        width: 'auto',
        
        // 高度
        height: 'auto',
        
        // 确定按钮回调函数
        ok: null,
        
        // 取消按钮回调函数
        cancel: null,
        
        // 确定按钮文字
        okText: '确定',
        
        // 取消按钮文字
        cancelText: '取消',
        
        // 自动关闭时间(毫秒)
        time: null,
        
        // 是否锁屏
        lock: true,

        // z-index值
        zIndex: 9999
        
    }
    
    var rDialog = function(options) {
        return new Dialog(options);
    }
    
    window.rDialog = $.rDialog = $.dialog = rDialog;
    
})(window.jQuery || window.Zepto, window);
