<template>
  <div class="home">
      <flexbox>
          <flexbox-item>
                <div class="case-class bgimg">
                    <img src="../assets/images/pic/n-slider1.png" alt="">
                </div>                
            </flexbox-item>
      </flexbox>
        <flexbox>
            <flexbox-item>
                <div class="case-class">
                    <img src="../assets/images/icons/icon_01.png" alt="">
                    <p>婚姻家庭</p>
                </div>                
            </flexbox-item>
             <flexbox-item>
                <div class="case-class">
                    <img src="../assets/images/icons/icon_02.png" alt="">
                    <p>交通事故</p>
                </div> 
            </flexbox-item>
             <flexbox-item>
                <div class="case-class">
                    <img src="../assets/images/icons/icon_03.png" alt="">
                    <p>继承纠纷</p>
                </div> 
            </flexbox-item>
             <flexbox-item>
                <div class="case-class">
                    <img src="../assets/images/icons/icon_4.png" alt="">
                    <p>拆迁安置</p>
                </div> 
            </flexbox-item>
    </flexbox>
        <flexbox>
      <flexbox-item>
          <div class="case-class">
                    <img src="../assets/images/icons/icon_5.png" alt="">
                    <p>劳动仲裁</p>
                </div> 
      </flexbox-item>
      <flexbox-item>
          <div class="case-class">
                    <img src="../assets/images/icons/icon_6.png" alt="">
                    <p>消费权益</p>
                </div> 
      </flexbox-item>
      <flexbox-item>
          <div class="case-class">
                    <img src="../assets/images/icons/icon_7.png" alt="">
                    <p>刑事辩护</p>
                </div> 
      </flexbox-item>
      <flexbox-item>
          <div class="case-class">
                    <img src="../assets/images/icons/icon_8.png" alt="">
                    <p>人身损害</p>
                </div> 
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    };
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
.home img {
    width: 80%
}
.home .bgimg img{
    width:100%;
}
.case-class {
  text-align: center;
  color: #2d374b;
}
</style>
