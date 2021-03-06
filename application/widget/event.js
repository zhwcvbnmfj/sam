define(['../../scripts/lang'], function(){
        
    /* 事件有关函数的加强 */
    var Event = {
        
        bind: function(ev, callback) {
            var calls, evs, name, _i, _len;
            evs = ev.split(' ');
            calls = this.hasOwnProperty('_callbacks') && this._callbacks || (this._callbacks = {});
            for(_i = 0, _len = evs.length; _i < _len; _i++){
                name = evs[_i];
                calls[name] || (calls[name] = []);
                calls[name].push(callback);
            }
            return this;
        },

        one: function(ev, callback) {
            return this.bind(ev, function(){
                this.unbind(ev, arguments.callee);
                return callback.apply(this, arguments);
            });
        },

        trigger: function() {
            var args, callback, ev, list, _i, _len, _ref;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            ev = args.shift();
            list = this.hasOwnProperty('_callbacks') && ((_ref = this._callbacks) != null ? _ref[ev] : void 0);
            if (!list) {
            
                // TODO: for debug
                console.log('info: trigger: ', ev, args, 'no callback');

                return;;
            }

            // TODO : for debug
            console.log('info: trigger: ', ev, args, list.length, 'callback:', list);

            for(_i = 0, _len = list.length; _i < _len; _i++) {
                callback = list[_i];
                if (callback.apply(this, args) === false) {
                    break;
                }
            }
            return true;
        },

        unbind: function(ev, callback) {
            var cb, i, list, _i, _len, _ref;
            if (!ev) {
                this._callbacks = {};
                return this;
            }
            list = (_ref = this._callbacks) != null ? _ref[ev] : void 0;
            if(!list){
                return this;
            }
            if(!callback){
                delete this._callbacks[ev];
                return this;
            }
            for(i=_i=0, _len=list.length; _i<_len; i = ++_i){
                cb = list[i];
                if(!(cb === callback)){
                    continue;
                }
                list = list.slice();
                list.splice(i, 1);
                this._callbacks[ev] = list;
                break;
            }
            return this;
        }
    };

    return Event;
});
