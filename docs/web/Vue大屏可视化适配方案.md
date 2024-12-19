# Vue大屏可视化适配方案

### 场景一:
在这个页面中只有echarts图表,这种大屏适配较为简单！
```vue
<template>
  <div class="container">
      <div id="chartContainer" style="width: 100%; height: 100%;"></div>
      <div id="chartContainer2" style="width: 100%; height: 100%;"></div>
  </div>
</template>
 
<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
 
onMounted(() => {
  const chartContainer = document.getElementById("chartContainer")
  const chart = echarts.init(chartContainer);
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  chart.setOption(option);
  window.addEventListener("resize",function() {
  resizeChart(chart) //重新渲染
})
});

function resizeChart(a) {
  a.resize();
}

</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  background: #333;
  justify-content: center;
}
</style>
```
效果如下:
![img](/images/fullscreen/echarts.png)

这段代码的适配主要是百分比和屏幕变化echarts图表的重新渲染

#### 接下来我们

