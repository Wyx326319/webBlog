# Javascript
对于算法的理解  
程序 = 算法 + 数据结构

在算法中合理的运用数据结构来减少时间复杂度和空间复杂度,尽可能的提高效率
## 1.求两数之和
第一次写的代码
~~~js
    var twoSum = function(nums, target) {
    const result = []
    for(let i = 0; i < nums.length; i++) {
        if(i !== nums.length){
            add = nums[i] + nums[i+1]
            if(add === target) {
                result.push(i);
                result.push(i+1);
            }
        }
    }
    return result;
};
~~~

### 进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？
    
