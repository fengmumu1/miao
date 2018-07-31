

function MyArray(...arg) {
  this._length = 0
  let arr = [...arg]
  let l = arr.length

  if(l === 1) {
    this.length = l
  } else {
    this.length = l
    for(let i = 0; i < l; i++) {
      this[i] = arr[i]
    }
  }

}
MyArray.prototype = {
 /**
  * @param {function} fun 执行函数
  * @param {obj} th 可选参数，执行函数的this数值
  */
  ForEach: function(fun,th = this) {
    that = th
    for(let i = 0; i < this.length; i++) {
      fun.call(that,this[i],i,this)
    }
  },

  /**
   * 末尾增加元素
   */
  push: function(element) {
    if(element) {
      let l = this.length
      this.length = l + 1
      this[l] = element
    }
    return element
  },
  /**
   * 末尾删除元素
   */
  pop: function() {
    let result = this[this.length]
    this.length = this.length - 1
    return result
  },
  /**
   * 在前面加入一个元素
   */
  unshift: function(element){
    if(element) {
      let l = this.length
      this.length = l + 1
      for(let i = l; i > 0; i--) {
        this[i] = this[ i - 1]
      }
      this[0] = element
    }
    return element
  },

  /**
   * 删除第一个元素
   */
  shift: function() {
    let result = this[0]
    let l = this.length
    for(let i = 0; i < l; i++) {
      this[i] = this[ i + 1]
    }
    this.length = l - 1
    return result
  },
  /**
   * 查找数组中的元素
   */
  indexOf: function(element) {
    let l = this.length
    if(element === element) {
      for(let i = 0; i< l; i++) {
        if(this[i] === element) return i
      }
    } else {
      for(let i = 0; i< l; i++) {
        if(this[i] !== this[i]) return i
      }
    }

    return -1  
  },
  // _length: 0,
  get length() {
    return this._length
  },
  set length(l){
    let temp = this._length
    if(temp < l) {
      for(i = temp; i < l; i++) {
        this[i] = undefined
      }
      this._length = l
    } else {
      for(i = temp; i >= l; i--) {
        delete this[i]
      }
      this._length = l
    }
  },

  /**
   * 通过索引删除元素
   * @param {Number} star 从0开始下标
   * @param {Number} end 不写默认删除到结尾，
   */
  slice_temp: function(star, end) {
    let result = []
    if(end === undefined) end = this.length
    if(star > end ) return new MyArray()
    for(let i = star; i < end; i++) {
      result.push(this[i])
    }
    for(let i = end,j = star; i < this.length; i++, j++) {
      this[star] = this[end]
    }
    this.length = this.length - (end - star)
    return result
  },

  /**
   * start[, deleteCount[, item1[, item2[, ...]]]]
   */
  splice: function(star,deleteCount = this.length - star, ...arg) {
    debugger;
    star = star % this.length
    if(star < 0)  star = this.length + star 
    if(deleteCount !== 0) {
        if(deleteCount > (this.length - star)) return this.slice_temp(star)
        return this.slice_temp(star, star + deleteCount)
    }else {
      let temp = [...arg]
      let l =  this.length - 1
      this.length = this.length + temp.length
      let bresth = temp.length
      for(let i = l; i > (star - bresth); i--) {
        this[i + bresth] = this[i]
      }
      l = temp.length
      for(let i = 0; i < l; i++) {
        this[star] = temp[i]
        star++
      }
      return temp
    } 
    return new MyArray()
    },

    map: function(f) {
      let l = this.length
      let result = new MyArray()
      for(let i = 0; i < l; i++) {
        result.push(f(this[i], i, this))
      }
      return result
    },
    filter: function(f){
      let l = this.length
      let result = new MyArray()
      for(let i = 0; i < l; i++) {
        if(f(this[i], i, this)) result.push(this[i])
      }
      return result
    },

    reduce: function(f,initialValue) {
      let i = 0
      if(!initialValue) {
        initialValue = this[0]
        i = 1
      }
        let l = this.length
      for( i; i < l; i++) {
        initialValue = f(initialValue,this[i], i, this)
      }
      return initialValue
    },

    /**
     * 返回一个新数组，深拷贝
     */
    slice: function(){
     return this.map(function(iteam){
      if(iteam instanceof Object) {
        let re = {}
        for(index in iteam) {
          re[index] = iteam[index]
        }
        return re
      } else {
        return iteam
      }
      })
    },
    /**
     * 返回数组内部元素组成的数组
     */
    values: function() {
      let result = new MyArray()
      let l = this.length
      for(let i = 0; i < l; i++) {
        result.push(this[i])
      }
      return this.result
    },

    fill: function(value) {
      this.reduce((init, iteam, index) => this[index] = value )
    },

    reverse: function() {
      let l = this.length / 2 >> 0
      let i = 0
      let j = this.length - 1
      let temp = 0
      while(i < j) {
        temp = this[i]
        this[i] = this[j]
        this[j] = temp
        i++
        j--
      }
    },

    join: function(ini = ',') {
      debugger;
      return this.reduce(function(init,iteam){
        return init =  init + ini + iteam
     })
   }

}



// a = new MyArray(1,2,3,4,5,6)
// console.log(a.reduce((a,b) => a +b ))
// console.log(a.join('a'))

// b = a.slice()
// b.pop()
// console.log(b)


// var c = [1,2,3,4,5,6]
// console.log(c.reduce((a ,b) => a + b, ","))
