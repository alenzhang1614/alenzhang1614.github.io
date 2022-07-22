# 手写promise
## 什么是Promise
:::tip
Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值。
目的
1.首先定义构造函数Promise，外面要调用，返回Promise(先搭框架)
2.实现原型上的方法
3.实现构造函数上的方法
::: 
实现步骤
1..默认promise实例对象的值是初识状态是pending，通过new调用this指向实例对象，通过this.status给实例对象添加状态
2.还要定义一步结果的值，this.data=undefined作为异步返回值
3..promise中穿了一个函数executor，需要立即调用,executor(resolve, reject)传参为两个函数，定义resolve，和reject
4.. resolve做的事情：改变实力对象的状态为fulfilled，在严格模式下，想用this指向window，可以在外面缓存一下this
5.reject：改变实力对象的状态为rejected
6.及调用resolve有调用reject时，状态只能改一次，只能从pending变fulfilled或者rejected，promise中有可能电泳多次，只让第一次生效，判断一下是不是pending状态
7.调用时可能传参，一旦传参，实例对象返回该参数，

改成失败的状态还有throw error，希望抛出异常也会报错，给executor抱一个try..catch
::: details 点击查看代码
```js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : // 检测是否是commonjs，如果是就以commonjs方式暴露
        typeof define === 'function' && define.amd ? define(factory) :  // 检测是否是AMD / requirejs，如果是就以AMD方式定义模块
            (global.Promise = factory()); // 既不是commonjs 也不是AMD，就是window.Promise = factory()
}(this, (function () {
    'use strict';
    'use strict';

    /*1.Promise对象传参穿的是一个函数executor，需要理解调用
    2.executor,有两个参数resolve().reject()都是函数
    3.每个Promise都有一个初始状态pending
    3.resolve接收参数为value，将实例对象的状态改为fulFilled
    4.reject接收参数为reason，并将reason返回

    * */
    function Promise(executor) {
        this.status = 'pending';
        this.data = undefined;
        this.callbacks = [];
        const _self = this;//为了保证后面this指向都是指向实例对象，将this缓存

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }

        function resolve(value) {//调用成功的回调函数
            if (_self.status === 'pending') {
                _self.status = 'fulFilled';//状态只能从pending改成fullFilled，并将参数传给实例对象
                _self.data = value;
                setTimeout(() => {
                    _self.callbacks.forEach((fnObj) => fnObj.onFulFilled())//需要异步执行
                })

            }
        }

        function reject(reason) {
            if (_self.status === 'fulFilled') {
                _self.status = 'rejected'
                _self.data = reason
                setTimeout(() => {
                    _self.callbacks.forEach((fnObj) => fnObj.onFulFilled())//需要异步执行
                })
            }
        }
    }

    Promise.prototype.then = function (onFulFilled, onRejected) {
      

    }
    Promise.resolve = function () {

    }
    Promise.reject = function () {

    }
    Promise.all = function () {

    }
    return Promise

})))
```
自己定义函数的是可以将原生的覆盖掉，先对then方法进行实现

每一个Promise对象都有三个状态
pending：初始状态
fulFilled ：成功状态
rejected ：失败的状态
Promise对象的状态只能从pending变为fulFilled或者由pending变为rejected，不能有fulFilled变为rejected
resolve传参数value，成功的数据，rejeced传参reason ,当异步任务顺利完成且返回结果值时，会调用 resolve 函数；而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用reject 函数。
function Promise(executor) {
        this.status = 'pending';
        this.data = undefined;
        this.callbacks = [];//后面可以链式调用，有n个成功的回调或者失败的回调，定义成数组，为了方便依次执行
        const _self = this;//为了保证后面this指向都是指向实例对象，将this缓存

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }

        function resolve(value) {//调用成功的回调函数
            if (_self.status === 'pending') {
                _self.status = 'fulFilled';//状态只能从pending改成fullFilled，并将参数传给实例对象
                _self.data = value;
                setTimeout(()=>{//为了实现异步调用回调函数
                    _self.callbacks.forEach((fnObj)=>fnObj.onFulfilled())
                 })
            }
        }

        function reject(reason) {
            if (_self.status === 'fulFilled') {
                _self.status = 'rejected'
                _self.data = reason
                setTimeout(()=>{
                    _self.callbacks.forEach((fnObj)=>fnObj.onRejected())
                 })    
            }
        }
    }
Promise.prototype.then = function (onFullFilled, onRejected) {
      this.callbacks,push({
            onFulFilled:onFulFilled,
            onRejected:onrejected,
      })
    }
至此，完成了一个最简单的promise 的then方法实现，但是还不能链式调用
创建html文件引入自己创建的Promise，对这段代码进行测试

 const promise = new Promise((resolve, reject) => {
        resolve(11);
        // reject(22);
        // throw 22;
    });
    promise
    .then(
      (value) => {
        console.log('成功回调函数触发了111~', value);
     
      },
      (reason) => {
        console.log('失败回调函数触发了111~', reason);
      }
    )
    console.log('同步代码执行完了');
下面要开始实现链式调用了。
要想实现then方法的链式调用返回值，then方法的返回值必须是一个新的promise对象
添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, 返回一个新的 promise, 将以回调的返回值来resolve.
当前操作的Promise对象，有三种状态，内种状态对应着不同的方法
pending 状态的 Promise 对象可能会变为fulfilled 状态并传递一个值给相应的状态处理方法，也可能变为失败状态（rejected）并传递失败信息。当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers ）就会被调用（then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，当Promise状态为rejected时，调用 then 的 onrejected 方法）
Promise.prototype.then = function (onFulFilled, onRejected) {
        // this.callacks.push({
        //     onFulFilled:onFulFilled,
        //     onRejected:onRejected
        // })
       //当前操作Promise实例对象没有改变状态，或者有一些异步函数在里面，也就是状态为pending时，需要将等待状态变化，一旦状态变化就去调用对应的函数
        let promise;
        const _self =this

        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : function (value) { return value };
        onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason };

        if (this.status === 'pending'){
            promise = new Promise((resolve,reject)=>{
                _self.callacks.push({
                    onFulFilled:function () {
                        setTimeout(()=>{
                            try {
                                const result = onFulFilled(_self.data)//通过结果，来判断次Promise(1)的状态，返回结果有可能是普通值，也有可能是promise对象
                                if(result instanceof Promise){//假如返回值result的值为promise(2)对象，决定了promise(1)的状态是成功还是失败
                                    result.then(function (value) {
                                        resolve(value)
                                    },function (reason) {
                                        console.log(reason)
                                        reject(reason)
                                    })
                                    //简写
                                    // result.then(resolve,reject)
                                }else{
                                    resolve(result)
                                }
                            }catch (e) {
                                reject(e)//将promise1的状态改为reject，并将e传给了promise(0)
                            }

                        })
                    },
                    onRejected:function () {
                        setTimeout(()=>{
                            try {
                                const result = onRejected(_self.data)//通过结果，来判断次Promise(1)的状态，返回结果有可能是普通值，也有可能是promise对象
                                if(result instanceof Promise){//假如返回值result的值为promise(2)对象，决定了promise(1)的状态是成功还是失败
                                    result.then(function (value) {
                                        resolve(value)
                                    },function (reason) {
                                        console.log(reason)
                                        reject(reason)
                                    })
                                    //简写
                                    // result.then(resolve,reject)
                                }else{
                                    resolve(result)
                                }
                            }catch (e) {
                                reject(e)//将promise1的状态改为reject，并将e传给了promise(0)
                            }

                        })
                    }
                })
            })
        }else if(this.status === 'fulFilled'){//调用成功的回调函数，异步的
            promise = new Promise((resolve,reject)=>{//promise(1)
                setTimeout(()=>{
                    try {
                        const result = onFulFilled(_self.data)//通过结果，来判断次Promise(1)的状态，返回结果有可能是普通值，也有可能是promise对象
                        if(result instanceof Promise){//假如返回值result的值为promise(2)对象，决定了promise(1)的状态是成功还是失败
                             result.then(function (value) {
                               resolve(value)
                             },function (reason) {
                                 console.log(reason)
                                 reject(reason)
                             })
                            //简写
                           // result.then(resolve,reject)
                        }else{
                            resolve(result)
                        }
                    }catch (e) {
                        reject(e)//将promise1的状态改为reject，并将e传给了promise(0)
                    }

                })
            })
        }else{
            promise = new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    try {
                        const result = onRejected(_self.data)//通过结果，来判断次Promise(1)的状态，返回结果有可能是普通值，也有可能是promise对象
                        if(result instanceof Promise){//假如返回值result的值为promise(2)对象，决定了promise(1)的状态是成功还是失败
                            result.then(function (value) {
                                resolve(value)
                            },function (reason) {
                                console.log(reason)
                                reject(reason)
                            })
                            //简写
                            // result.then(resolve,reject)
                        }else{
                            resolve(result)
                        }
                    }catch (e) {
                        reject(e)//将promise1的状态改为reject，并将e传给了promise(0)
                    }

                })
            })
        }
       return promise//调用then方法需要返回一个promise对象，返回的这个promise对象
    };
公共代码可提取出来

  Promise.prototype.then = function (onFulFilled, onRejected) {
        // this.callacks.push({
        //     onFulFilled:onFulFilled,
        //     onRejected:onRejected
        // })
       //当前操作Promise实例对象没有改变状态，或者有一些异步函数在里面，也就是状态为pending时，需要将等待状态变化，一旦状态变化就去调用对应的函数
        let promise;
        const _self =this

        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : function (value) { return value };
        onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason };

        if (this.status === 'pending'){
            promise = new Promise((resolve,reject)=>{
                _self.callacks.push({
                    onFulFilled:function () {
                        setTimeout(()=>{
                            handlePromiseStatus(resolve,reject,onFulFilled,_self.data)
                        })
                    },
                    onRejected:function () {
                        setTimeout(()=>{
                            handlePromiseStatus(resolve,reject,onRejected,_self.data)
                        })
                    }
                })
            })
        }else if(this.status === 'fulFilled'){//调用成功的回调函数，异步的
            promise = new Promise((resolve,reject)=>{//promise(1)
                setTimeout(()=>{
                    handlePromiseStatus(resolve,reject,onFulFilled,_self.data)
                })
            })
        }else{
            promise = new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    handlePromiseStatus(resolve,reject,onRejected,_self.data)
                })
            })
        }
       return promise//调用then方法需要返回一个promise对象，返回的这个promise对象
    };
    //上面try catch 只有函数不同，数据不同，因此提起公共代码
    function handlePromiseStatus(resolve,reject,onFn,_self_data){
        try {
            const result = onFn(_self_data)//通过结果，来判断次Promise(1)的状态，返回结果有可能是普通值，也有可能是promise对象
            if(result instanceof Promise){//假如返回值result的值为promise(2)对象，决定了promise(1)的状态是成功还是失败
                result.then(resolve,reject)
            }else{
                resolve(result)
            }
        }catch (e) {
            reject(e)//将promise1的状态改为reject，并将e传给了promise(0)
        }
    }
catch 方法的实现
本质上 catch方法就是then方法的失败
Promise.prototype.catch = function (onReject) {
        return this.then(null,onReject)
  };
resolve 方法实现
resolve 方法的使用
如上面提到的resolve本质上是个函数，在实际使用时有两种情况，如果value是一个promise函数，则应该将promise函数返回去，如果是普通参数，就应该返回一个promise值
Promise.resolve = function (value) {
    if (value instanceof Promise) return value;

    return new Promise((resolve, reject) => {
      resolve(value);
    })
  };
reject 于resolve类似
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  };

实现all方法
必须所有的promise 都成功才能返回成功，否则报错
Promise.all = function (promises) {
    let resolvedNum = 0;
    const promisesLength = promises.length;
    const results = new Array(promisesLength);

    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise.then((value) => {
          // 成功
          // 保证对应的添加数据
          results[index] = value;
          resolvedNum++;
          if (resolvedNum === promisesLength) {
            // 全部成功
            resolve(results);
          }
        }, (reason) => {
          // 失败
          reject(reason);
        })
      })
    })
  };
实现race
  Promise.race = function (promises) {

    // return new Promise((resolve, reject) => promises.forEach((promise) => promise.then(resolve, reject)))
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then((value) => {
          // 成功
          resolve(value);
        }, (reason) => {
          // 失败
          reject(reason);
        })
      })

    })

  };
