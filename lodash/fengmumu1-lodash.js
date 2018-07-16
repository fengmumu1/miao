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
       * 返回去掉num个元素后的数组
       * @param {[]} arry
       * @param {[]} num
       * @returns {[]}
       */
      drop: function(arry, num){
        if(num === undefined) return arry
        if(num > arry.length) num = 0
        let cous = arry.splice(arry.length - num + 1, arry.length )
        return cous
      }

  }

 //console.log(fengmumu1.drop([1,2,3],5)) 
