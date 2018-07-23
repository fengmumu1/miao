var fengmumu1 = {
   /**
    * chunk 把一维数组按照指定数量，拆成二维数组，不能正好拆分的，多余的数组元素放到一 个数组中
    * @param {[]} array 一维数组 省略后返回 []
    * @param {Number} size 数量  省略后返回原数组
    * @returns {[[]]} 分割后的数组
    */
    chunk: function(array, size) {
      debugger
      let cous = []
      //不输入，则直接返回原数组
      if(array == undefined) return []
      if(size == undefined) return array
      //slice的第二个参数大于数组长度会截取数组长度
      //我们只需要保证每次截取的长度都是size即可
      //也就是起始游标记为i 那么结束游标为i + size 每次给起始游标加 size 大小即可    
      for(let i = 0; i < array.length; i += size) {
        cous.push(array.slice(i,size + i))
      }
      return cous
    },
    
    /**
     * 返回一个删除了数组所有 false, null, 0, "", undefined, and NaN 数值的数组
     * 通过查看ES里的ToBoolean，以上假值(+/- 0)都是假，然后需要注意除了null以外的
     * object都是真，比如{}
     * @param {[]} 原始数组，省略返回[]
     * @return {[]}
     */
     compact: function(array) {
      if(array == undefined) return []
      let arry_temp = []
      for(let i = 0; i <array.length; i++){
        if(array[i]) {
          arry_temp.push(array[i])
        }
      }
      return arry_temp
     },
     

     /**
      * 返回第一个数组中不属于第二个数组的元素 
      * @param {[]} 必须参数，原始数组，省略返回[]
      * @param {[]} 非必须参数，对比数组，省略返回原始数组
      * @returns {[]} 对比后的数组
      */
      difference: function(old_arry,...arry){
        let aim_arry = [].concat(...arry)
        let cous = []
        for(let i = 0; i < old_arry.length; i++){
          if(aim_arry.indexOf(old_arry[i]) === -1 ){
            cous.push(old_arry[i])
          }
        }
        return cous
      },

      /**
      * 对arry和value分别用iteratee处理，然后对比二者的差异，返回与之对应的原始数据
      * @param {[]} 必须参数，原始数组，省略返回[]
      * @param {[]} 非必须参数，对比数组，省略返回原始数组
      * @param {object} 非必须参数，处理函数，省略返回原始数组
      * @returns {[]} 对比后的数组
      */
      differenceBy: function(arry,value,iteratee){
        let cous = []
        let value_temp = []
        if(typeof iteratee === 'function') {
          for(let i =0; i < value.length; i++) {
            value_temp.push(iteratee(value[i]))
          }
          for(let i = 0; i < arry.length; i++){
            if(value_temp.indexOf(iteratee(arry[i])) === -1 ){
              cous.push(arry[i])
            }
          }
          return cous
        }

        if(typeof iteratee === 'string') {
          for(let i =0; i < value.length; i++) {
            value_temp.push(value[i][iteratee])
          }
          for(let i = 0; i < arry.length; i++){
            if(value_temp.indexOf(arry[i][iteratee]) === -1 ){
              cous.push(arry[i])
            }
          }
          return cous
        }
        if(iteratee === undefined){
          return fengmumu1.difference(arry,value)
        }
      },

      /**
       * @description 前两个参数传入comparator中，返回函数得出否定结论的元素数组
       * @param {[]} array 
       * @param {[]} values 
       * @param {object} comparator 
       * @returns {[]} 
       */
      differenceWith: function(array, values, comparator) {
       return array.filter( iteam => {for(value of values) return !comparator(iteam,value)
        })
      },

      /**
       * 返回去掉num个元素后的数组
       * @param {[]} arry
       * @param {[]} num 默认为 1
       * @returns {[]}
       */
      drop: function(arry, num){
        let cous = []
        if(num === undefined) num = 1
        if(num  > arry.length) num =  arry.length
          cous = arry.splice(num , arry.length )
        return cous
      },

      /**
       * 返回从右边去掉num个元素后的数组
       * @param {[]} arry
       * @param {[]} num 默认为 1
       * @returns {[]}
       */
      dropRight: function(arry, num){
        let cous = []
        if(num === undefined) num = 1
        if(num  > arry.length) num =  arry.length
          cous = arry.splice(0 , arry.length - num )
        return cous
      },
      /**
       * @description 创建一个切片数组，去除array中从 predicate 返回假值开始到尾部的部分。predicate 会传入3个参数： (value, index, array)。
       */
      dropRightWhile: function(array, iteratee){
        let iteratees
        let result = []
        if(typeof iteratee === 'object') {
          iteratees = this.matches(iteratee)
        } else {
          iteratees = iteratee
        }
        for(index in array) {
          if(!iteratees(array[index] , index,array)) result.push(array[index])
        }
        return result
      },


      /**
       * @description 对数组进行迭代处理，迭代后的结果，扁平化的返回
       * @param {[]} collextion 目标数组
       * @param {object} [iteratee=_.identity] 处理函数(迭代处理) 其c传入参数为value, index|key, collection
       * @returns {[]} 处理后的数组
       */
      flatMap: function(collextion,identity) {
        let result = []
        if(arguments.length === 1) return collextion 
        collextion.forEach((value, index, collection) => {
          identity(value, index, collection).forEach(value => result.push(value))
        });
        return result
      },

      /**
       * @description 减少一个嵌套
       * @param {[]} arry 目标数组
       * @returns {[]} 减少后的数组
       */
      flatten: function(arry){
        let result = []
        // for(let i = 0; i < arry.length; i++) {
        //   if(Array.isArray(arry[i])) {
        //     for(item in arry[i]) {
        //       result.push(arry[i][item])
        //     }
        //   } else {
        //     result.push(arry[i])
        //   }
        // }
        // return result
        return result.concat(...arry)
      }, 

      /**
       * @description 把数组变成扁平化的数组
       * @param {[]} 目标数组
       * @returns {[]} 处理后的数组
       */
      flattenDeep: function(arry){
        let result = []
        let temp = []        
        for(let i = 0; i < arry.length; i++) {
          if(Array.isArray(arry[i])){
            temp =  fengmumu1.flattenDeep(arry[i])
            result = [...result, ...temp]
          } else {
            result.push(arry[i])
          }
        } 
        return result
      },

      /**
       * @description 根据deep减少数组的嵌套等级
       * @param {[]} array 目标数组
       * @param {[]} depth 嵌套深度(可省略) 
       * @returns{[]}
       */
      flattenDepth: function(array, depth){
        let result = []
        let temp = []
        if(depth === 0) return array.slice()
        for(let i = 0; i < array.length; i++) {
          if(Array.isArray(array[i])){
            temp = fengmumu1.flattenDepth(array[i],depth - 1)
            result = [...result, ...temp]
          } else {
            result.push(array[i])
          }
        }
        return result
      },

      /**
       * @description 返回一个键值对构成的对象
       * @param {[]} paris 目标数组
       * @returns {object}   
       */
      fromPairs: function(paris){
        let index
        let result = {}
        for(index in paris) {
          result[paris[index][0]] = paris[index][1]
        }
        return result
      },
      /** 
       * @description  把对象转化成键值对存放在数组中
       * @param {object} obj 目标对象
       * @returns {[]} 转化后的数组
      */
     toPairs: function(obj){
      let result = []
      let result_temp = []
      let i = 0
      for(let key in obj) {
        result_temp.push(key)
        result_temp.push(obj[key])
        //slice 返回的是[star,end)
        result.push(result_temp.slice(i,i += 2)) 
      }
      return result
    },
      /**
       * @description 返回数组的第一个元素
       * @param {[]} array 目标数组
       * @returns {*} 
       */
      head: function(array) {
        return array[0]
      },

      /**
       * @description 返回查找元素在数组中首次出现的位置(下标)
       * @param {[]} array 目标数组
       * @param {*} value 需要查找的元素数值
       * @param {Number} fromIndex 查找的起始位置，小于0从末尾开始查找，可以省略，默认为0
       * @returns {number} 找到就传回元素下标。没有就传回-1
       */
      indexOf: function(array, value, fromIndex){
        let i = 0
        if(fromIndex === undefined) fromIndex = 0
        if(fromIndex >= 0) {
          for(i = fromIndex; i < array.length; i++ ){
            if(array[i] === value) return i
          }
        } else if(array.length + fromIndex - 1 >= 0 ){
            for(i = array.length + fromIndex - 1; i > 0; i--){
              if(array[i] === value) return i
            } 
          } else {
            for(i = 0; i < array.length; i++){
              if(array[i] === value) return i
            } 
          }      
        return -1
      },
      /**
       * @description 返回去除了数组最后一个元素的数组
       * @param {[]} array 目标数组
       * @returns {[]} 
       */
      initial: function(array){
        let soult = array.slice()
        soult.pop()
        return soult
      },

      /**
       * @description 返回数组所有元素的交集
       * @param {[]} array 目标数组
       * @returns {[]} 
       */
      intersection: function(...arrays){
        let array = []
        array.push(...arrays)
       return array.reduce(function(initValue,iteam){
          return initValue.filter(iteams => iteam.indexOf(iteams) !== -1)
        })
      },


  


      /**
       * @description  求数组所有元素和
       * @param {[]} array
       * @returns {[number]}
       */
      sum: function(array){
        let result = 0  
        return array.reduce((initvalue,iteam) => {
          return initvalue + iteam
        },result)
      },

      /**
       * @description 求所有iteratee返回的元素的合
       * @param {[]} 目标数组
       * @param {object} 处理函数
       * @returns  
       */
      sumBy: function(arry,iteratee){
        let iteratees 
        if( typeof iteratee === 'string') {
          iteratees = iteam => iteam[iteratee]
        } else {
          iteratees = iteratee 
        }
        return this.sum(arry.map(iteratees))
      },

      /**
       * @description 与原map不同的是可以传入对象
       */
      map: function(array,iteratee){
        let result = []
        for(index in array){
          result.push(iteratee(array[index],index,array)) 
        }
        return result
      },
      /**
       * @description 与原filter不同的是可以传入对象
       */
     filter: function(array,iteratee){
      let result = []
      for(index in array) {
        if(iteratee(array[index],index,array)) result.push(array[index])
      }
      return result
     },


     match: function(obj){
       return function(objs){
          for(iteam in obj) {
            if(obj[iteam] !== objs[iteam]) {
              if(!isMatches(objs[iteam],obj[iteam])) {
                return false
              } else if(obj[iteam] !== objs[iteam]) {
                return false
              }
            }
            
          }
          return true
       }  
     },

     isMatch: function(obj, souce){
       for(let iteam in souce){
         if(souce[iteam] !== obj[iteam]) return false
       }
       return true
     },

     isMatchWitch: function(objects, source, customizer) {
       let result
       for(let index in objects) {
        result =  customizer (objects[index], source[index], index, objects, source)
        if(result === undefined) result = this.isMatches(objects, source)
        if(result === false) return false
       }
        return true
     },
     matches: function(obj){
       return function(objs) {
          this.isMatch(bojs, boj)
       }
     },

     property:function(name){
        return obj => obj[name]
     },

     keyBy: function(collection, iteratee){
       let result = {}
       let iteratees = iteratee
       if(typeof iteratee === "string") iteratees = obj => obj[iteratee]
       for(iteam in collection) {
         result[iteratees(collection[iteam])] = collection[iteam]
       }
       return result
     },

     /**
      * 创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。每个键对应的值负责生成 key 的元素组成的数组。iteratee 调用 1 个参数： (value)。
      */
     groupBy: function(array, iteratee){
       let iteratees = iteratee
       let result = {}
       if(typeof iteratee === 'string') iteratees = obj => obj[iteratee]

       for(iteam in array) {
          if(iteratees(array[iteam]) in result) {
            result[iteratees(array[iteam])].push(array[iteam])
          } else {
            result[iteratees(array[iteam])] = [array[iteam]]
          }
       }
       return result
     },

     /**
      * 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
      */
     fill: function(array, value, start = 0, end = array.length) {
       for(let i = start; i < end; i++) {
          array[i] = value
       }
       return array
     },

     iteratee: function(fun){
       let func = fun
        if(Array.isArray(fun)) {
          return function(obj){
          for(let i = 0; i < fun.length; i += 2) {
            if(fun[i + 1] !== obj[fun[i]]) {
              return false
            } else {
              return true
            } 
          }
          }
        }
       if(typeof fun === 'object') {
         return function(obj){
           for(let iteam in fun) {
            if(fun[iteam] !== obj[iteam] ) {
              return false
            } else {
              return true
            }
           }
         }  
       }

       if(typeof fun === 'string') {
         return function(obj) {
           return obj[fun]
         }
       }
     },

     identity: function(array) {
      return array
     },

     findIndex: function(array, interatee = this.indentity, fromIndex = 0) {
      let interatees = this.iteratee(interatee ) 
      for(let i = fromIndex; i < array.length; i++) {
        if(interatees(array[i])) return i
      }
      return -1
     },

     /**
      * 将 array 中的所有元素转换为由 separator 分隔的字符串。
      */
     join: function(array,separator = '') {
       let resul = ''
       for(let i = 0; i < array.length - 1; i++){
        resul = resul + array[i] + separator
       }
       return resul = resul + array[array.length - 1]
     },
     
     /**
      * 获取array中的最后一个元素。
      */
     last: function(array){
      return array[array.length - 1]
     },

     /**
      * 这个方法类似 this.indexOf ，区别是它是从右到左遍历array的元素。
      */
     lastIndexOf: function(array, value, fromIndex=array.length-1) {
        for(let i = fromIndex; i > 0; i--) {
          if(array[i] === value) return i
        }
        return -1
     },

     /**
      * 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
      */
     nth: function(array, n = 0) {
      if(n < 0) n = array.length + n
      return array[n]
     },

     /**
      * 移除数组array中所有和给定值相等的元素
      */
     pull: function(array,...value) {
       let aim = [].concat(...value)
        for(let i = 0; i < array.length; i++) {
          if(aim.indexOf(array[i]) !== -1) {
            array.splice(i,1)
            i--
          }
        }
        return array
     },

     pullBy: function(array, value){
      let aim = [].concat(value)
      for(let i = 0; i < array.length; i++) {
        if(aim.indexOf(array[i]) !== -1) {
          array.splice(i,1)
          i--
        }
      }
      return array
     },

     reverse: function(array) {
       let temp 
       let i = 0
       let j = array.length - 1
       while(i < j) {
        temp  = array[i]
        array[i] = array[j]
        i++
        array[j] = temp
        j--
       }
       return array
     },
}


// 输入：findIndex([{"user":"barney","active":false},{"user":"fred","active":false},{"user":"pebbles","active":true}],"function(o)  {        return  o.user  ==  'barney';   }")
// 输出/期望：0
// =================


// 输入：reverse([1,2,3])
// 输出/期望：[3,2,1]
// =================
// 输入：reverse([1,2,3])
// 输出/期望：[3,2,1]


debugger;console.log(fengmumu1.reverse([1,2,3,4]))
